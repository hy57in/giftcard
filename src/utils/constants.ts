/** 백엔드 API 주소 */
export const API_URL = process.env.API_URL || 'http://localhost:8000'

/** 백엔드 API v1 주소 */
export const API_V1_URL = API_URL + '/v1'

/** QR 코드 암호화를 위한 비밀 키 */
export const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'foo'
