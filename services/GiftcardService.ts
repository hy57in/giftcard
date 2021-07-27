import axios from "axios";

import { API_V1_URL } from "../utils/constants";
import { gcs } from "../utils/types";
import { jsonAuthHeaders } from "./headers";

const createGiftcard = async ({ tokens, data }: { tokens: gcs.TokensInterface; data: gcs.GiftcardInterface }) =>
  await axios
    .post(API_V1_URL + `/giftcards`, data, { headers: jsonAuthHeaders(tokens.access_token) })
    .then((res) => res.data);

const updateGiftcard = async ({
  tokens,
  giftcardId,
  data,
}: {
  tokens: gcs.TokensInterface;
  giftcardId: string;
  data: gcs.GiftcardUpdateRequestInterface;
}) =>
  await axios
    .patch(API_V1_URL + `/giftcards/${giftcardId}`, data, { headers: jsonAuthHeaders(tokens.access_token) })
    .then((res) => res.data);

const getGiftcard = async ({
  tokens,
  giftcardId,
}: {
  tokens: gcs.TokensInterface;
  giftcardId: string;
}): Promise<gcs.GiftcardResponseInterface> => {
  return await axios
    .get(API_V1_URL + `/giftcards/${giftcardId}`, {
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data);
};

const findGiftcardList = async ({
  tokens,
  query,
}: {
  tokens: gcs.TokensInterface;
  query?: {
    page?: number;
    limit?: number;
    userId?: string;
    storeId?: string;
    expirationStart?: Date | string;
    expirationEnd?: Date | string;
  };
}): Promise<gcs.PaginationResponseInterface> => {
  return await axios
    .get(API_V1_URL + "/giftcards", {
      params: {
        page: query?.page,
        limit: query?.limit,
        "user-id": query?.userId,
        "store-id": query?.storeId,
        "exp-start": query?.expirationStart,
        "exp-end": query?.expirationEnd,
      },
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data);
};

export { createGiftcard, updateGiftcard, getGiftcard, findGiftcardList };
