import axios from "axios";

import { API_V1_URL } from "../utils/constants";
import { gcs } from "../utils/types";
import { jsonAuthHeaders } from "./headers";

const makeGiftcardPurchase = async ({
  tokens,
  data,
}: {
  tokens: gcs.TokensInterface;
  data: gcs.GiftcardPurchaseInterface;
}) =>
  await axios
    .post(API_V1_URL + `/giftcard-purchases`, data, { headers: jsonAuthHeaders(tokens.access_token) })
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

const findGiftcardPurchaseList = async ({
  tokens,
  query,
}: {
  tokens: gcs.TokensInterface;
  query?: { page?: number; limit?: number; userId?: string; storeId?: string; giftcardId?: string };
}): Promise<gcs.PaginationResponseInterface> => {
  return await axios
    .get(API_V1_URL + "/giftcard-purchases", {
      params: {
        page: query?.page,
        limit: query?.limit,
        "user-id": query?.userId,
        "store-id": query?.storeId,
        "giftcard-id": query?.giftcardId,
      },
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data);
};

export { makeGiftcardPurchase, getGiftcard, findGiftcardPurchaseList };
