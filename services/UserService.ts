import axios from "axios";

import { API_V1_URL } from "../utils/constants";
import { gcs } from "../utils/types";
import { jsonAuthHeaders, jsonHeader } from "./headers";

const loginUser = async ({ credentials }: { credentials: gcs.CredentialsInterface }) =>
  await axios
    .post(API_V1_URL + "/login", JSON.stringify(credentials), {
      headers: jsonHeader,
    })
    .then((res) => res.data);

const registerUser = async (credentials: gcs.CredentialsInterface) =>
  await axios
    .post(API_V1_URL + "/users", JSON.stringify(credentials), {
      headers: jsonHeader,
    })
    .then((res) => res.data);

const getUser = async ({ tokens }: { tokens: gcs.TokensInterface }) =>
  await axios
    .get(API_V1_URL + "/me", {
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data);

const findUserList = async ({
  tokens,
  query,
}: {
  tokens: gcs.TokensInterface;
  query: { username: string };
}): Promise<gcs.PaginationResponseInterface> =>
  await axios
    .get(API_V1_URL + "/users", {
      params: {
        username: query.username,
      },
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data);

const updateUserStore = async ({
  tokens,
  userId,
  data,
}: {
  tokens: gcs.TokensInterface;
  userId: string;
  data: { storeId?: string | null };
}) =>
  await axios
    .patch(
      API_V1_URL + `/users/${userId}`,
      { storeId: data.storeId },
      { headers: jsonAuthHeaders(tokens.access_token) }
    )
    .then((res) => res.data);

export { loginUser, registerUser, getUser, findUserList, updateUserStore };
