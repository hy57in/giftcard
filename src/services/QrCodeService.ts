import axios from "axios";

import { API_V1_URL } from "../utils/constants";
import { gcs } from "../utils/types";
import { jsonAuthHeaders } from "./headers";

const createAndGetQrCode = async ({
  tokens,
  data,
}: {
  tokens: gcs.TokensInterface;
  data: gcs.QrCodeCreateRequestInterface;
}) =>
  await axios
    .post(API_V1_URL + `/qrcodes`, data, { headers: jsonAuthHeaders(tokens.access_token) })
    .then((res) => res.data);

export { createAndGetQrCode };
