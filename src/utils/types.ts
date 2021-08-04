export namespace gcs {
  export interface CredentialsInterface {
    username: string
    password: string
  }

  export interface TokensInterface {
    userId: string
    access_token: string
  }

  export interface UserProfileInterface {
    id: string
    username: string
    isManager: boolean
    store?: {
      id: string
      name: string
    }
  }

  export interface StoreFindOneResponseInterface {
    id?: string
    name?: string
    sumIssuedGiftcardAmount?: number
    sumIssuedGiftcardAmountLeft?: number
  }

  export interface GiftcardInterface {
    ownerId: string | null
    storeId: string
    amount: number
    creationTime: Date | string
    expirationTime: Date | string
    isUsed?: boolean
  }

  export interface GiftcardUpdateRequestInterface {
    ownerId?: string
    storeId?: string
  }

  export interface GiftcardResponseInterface {
    id: string
    owner: { id: string; username: string; store: string }
    store: { id: string; name: string }
    amount: number
    amountLeft: number
    creationTime: Date | string
    expirationTime: Date | string
    isUsed?: boolean
  }

  export interface QrCodeCreateRequestInterface {
    giftcardId: string
  }

  export interface GiftcardPurchaseInterface {
    userId: string
    storeId: string
    giftcardId: string
    qrCodeId: string
    amount: number
  }

  export interface QrCodeResponseInterface {
    id: string
    giftcard: gcs.GiftcardInterface
    creationTime: Date | string
    expirationTime: Date | string
  }

  export interface PaginationResponseInterface {
    items: Array<any>
    links: {
      first: string
      previous: string
      next: string
      last: string
    }
    meta: {
      totalItems: number
      itemCount: number
      itemsPerPage: number
      totalPages: number
      currentPage: number
    }
  }
}
