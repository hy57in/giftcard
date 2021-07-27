import { useState } from "react";
import { gcs } from "./types";

export default function useTokens(): { setTokens: Function; tokens: gcs.TokensInterface; isLoggedIn: boolean } {
  const getTokens = (): gcs.TokensInterface => {
    const tokensString = localStorage.getItem("tokens");

    const ret = { userId: "", access_token: "" };
    if (tokensString) {
      const userTokens = JSON.parse(tokensString);
      ret.userId = userTokens.userId;
      ret.access_token = userTokens.access_token;
    }

    return ret;
  };

  const [tokens, setTokens] = useState(getTokens());

  const isLoggedIn = ((): boolean => {
    return tokens && tokens.access_token ? true : false;
  })();

  function saveTokens(tokens: gcs.TokensInterface) {
    if (tokens) {
      localStorage.setItem("tokens", JSON.stringify(tokens));
      setTokens(tokens);
    }
  }

  return {
    setTokens: saveTokens,
    tokens,
    isLoggedIn,
  };
}
