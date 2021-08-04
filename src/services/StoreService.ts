import axios from 'axios'

import { API_V1_URL } from '../utils/constants'
import { gcs } from '../utils/types'
import { jsonAuthHeaders } from './headers'

const findStoreList = async ({
  tokens,
  query,
}: {
  tokens: gcs.TokensInterface
  query: { name: string }
}): Promise<gcs.PaginationResponseInterface> =>
  await axios
    .get(API_V1_URL + '/stores', {
      params: { name: query.name },
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data)

const getStore = async ({ tokens, storeId }: { tokens: gcs.TokensInterface; storeId: string }) =>
  await axios
    .get(API_V1_URL + `/stores/${storeId}`, {
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data)

const createStore = async ({
  tokens,
  data,
}: {
  tokens: gcs.TokensInterface
  data: { name: string }
}) =>
  await axios
    .post(API_V1_URL + `/stores`, data, {
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data)

export { findStoreList, getStore, createStore }
