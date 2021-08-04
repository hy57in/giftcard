import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { makeGiftcardPurchase } from '../services/GiftcardPurchaseService'
import { getGiftcard } from '../services/GiftcardService'
import { gcs } from '../utils/types'
import useTokens from '../utils/useTokens'

function QrRead() {
  const { isLoggedIn } = useTokens()
  const router = useRouter()
  const { tokens } = useTokens()
  const { qrCodeId, userId, username, storeId, giftcardId, amount } = router.query

  const [giftcard, setGiftcard] = useState<gcs.GiftcardResponseInterface | null>(null)
  enum PurchaseStateEnum {
    SUCCESS,
    FAIL,
    TRYING,
  }
  const [purchaseState, setPurchaseState] = useState<PurchaseStateEnum>(PurchaseStateEnum.TRYING)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }

    ;(async () => {
      const tempGiftcard = await getGiftcard({ tokens, giftcardId: giftcardId as string }).then(
        async (res) => {
          setGiftcard(res)
          return res
        }
      )

      const tempAmount = parseInt(amount as string)
      if (tempAmount <= 0 || tempGiftcard.amountLeft < tempAmount) {
        alert('올바른 금액을 입력하세요.')
        router.push('/qr')
        return
      }

      if (purchaseState === PurchaseStateEnum.TRYING) {
        console.log(userId)
        await makeGiftcardPurchase({
          tokens,
          data: {
            userId: userId as string,
            storeId: storeId as string,
            giftcardId: giftcardId as string,
            qrCodeId: qrCodeId as string,
            amount: parseInt(amount as string),
          },
        })
          .then(() => {
            setPurchaseState(PurchaseStateEnum.SUCCESS)
          })
          .catch((err) => {
            console.error(err.response.data)
            if (err.response.data.message.includes('Giftcard given has been expired')) {
              alert('상품권이 만료되었습니다.')
            } else {
              alert('QR 정보가 올바르지 않거나 만료되었습니다.')
            }
            router.push('/qr')
          })
      }
    })()
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      <h1 className="pb-5 text-xl font-bold">
        {qrCodeId && purchaseState === PurchaseStateEnum.SUCCESS && 'QR 정보 결제 성공'}
        {purchaseState === PurchaseStateEnum.FAIL && 'QR 정보 읽는 데 실패'}
        {purchaseState === PurchaseStateEnum.TRYING && 'QR 정보 조회 완료'}
      </h1>

      {qrCodeId && giftcard && purchaseState === PurchaseStateEnum.SUCCESS && (
        <div className="flex flex-col w-full md:w-1/2 items-center p-2 mb-5 rounded-md border-2 border-gray-500">
          <h1 className="text-xl font-bold mb-2">상품권 정보</h1>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">상품권 ID:</div>
            <div className="w-full text-right truncate">{giftcard?.id}</div>
          </div>
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">만료일:</div>
            <div className="w-full text-right truncate">
              {new Date(giftcard?.expirationTime).toDateString()}
            </div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">매장 이름:</div>
            <div className="w-full text-right">{giftcard?.store?.name}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">사용자 아이디:</div>
            <div className="w-full text-right">{username}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">결제 금액:</div>
            <div className="w-full text-right">{amount}</div>
          </div>
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">잔여 금액:</div>
            <div className="w-full text-right">{giftcard?.amountLeft}</div>
          </div>
          <button
            className="rounded-md bg-gray-600 text-white font-bold p-2"
            onClick={(e) => {
              e.preventDefault()
              router.push('/')
            }}
          >
            메인 페이지로
          </button>
        </div>
      )}
    </div>
  )
}

export default QrRead
