const jsonHeader = {
  'Content-Type': 'application/json',
}

const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

const jsonAuthHeaders = (token: string) => Object.assign({}, jsonHeader, authHeader(token))

export { jsonHeader, authHeader, jsonAuthHeaders }
