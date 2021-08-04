import moment from 'moment'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { getGiftcard, updateGiftcard } from '../services/GiftcardService'
import { findUserList, getUser } from '../services/UserService'
import { gcs } from '../utils/types'
import useTokens from '../utils/useTokens'

function GiftcardGive() {
  const { tokens } = useTokens()
  const router = useRouter()
  const [user, setUser] = useState<gcs.UserProfileInterface | null>(null)
  const { giftcardId } = router.query
  const [giftcard, setGiftcard] = useState<gcs.GiftcardResponseInterface | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const validators = {
    usernameValidator: {
      required: '소유권을 이전할 사용자 이름을 입력하세요.',
    },
  }

  const onSubmit = async (data: { username: string }) => {
    const { username } = data

    const userRet = await findUserList({ tokens, query: { username } })

    if (!(userRet.items.length > 0)) {
      setError('username', {
        type: 'invalidUsername',
        message: `아이디 "${username}"은(는) 존재하지 않습니다.`,
      })
      return
    }

    if (window.confirm('소유권을 정말로 이전하시겠습니까?') === true) {
      await updateGiftcard({
        tokens,
        giftcardId: giftcardId as string,
        data: { ownerId: userRet.items[0].id },
      })
        .then(() => {
          alert('소유권 이전에 성공했습니다!')
          router.push('/giftcards')
        })
        .catch(() => {
          alert('소유권 이전에 실패했습니다.')
        })
    }
  }

  useEffect(() => {
    if (!giftcardId) {
      router.push('/not-found')
    }

    ;(async () => {
      await getGiftcard({ tokens, giftcardId: giftcardId as string }).then(async (res) => {
        setGiftcard(res)
      })
      ;(async () => {
        const user = await getUser({ tokens })
        setUser(user)
      })()
    })()
  }, [tokens, giftcardId])

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      <h1 className="pb-5 text-xl font-bold">상품권 소유권 이전</h1>
      {giftcardId && giftcard && user && (
        <div className="flex flex-col w-full md:w-1/2 items-center p-2 mb-5 rounded-md border-2 border-gray-500">
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">상품권 ID:</div>
            <div className="w-full text-right truncate">{giftcard?.id}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">만료일:</div>
            <div className="w-full text-right truncate">
              {moment(giftcard?.expirationTime).format('YYYY/MM/DD, HH:mm:ss')}
            </div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2 text-gray-500">
            <div className="w-full font-bold mr-1">발급 금액:</div>
            <div className="w-full text-right truncate">{giftcard?.amount}</div>
          </div>
          <div className="flex flex-row w-full items-center mb-2 text-red-500">
            <div className="w-full font-bold mr-1">사용 금액:</div>
            <div className="w-full text-right truncate">
              {giftcard?.amount - giftcard?.amountLeft}
            </div>
          </div>
          <div className="flex flex-row w-full items-center mb-2 text-green-500">
            <div className="w-full font-bold mr-1">잔여 금액:</div>
            <div className="w-full text-right truncate">{giftcard?.amountLeft}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">매장 ID:</div>
            <div className="w-full text-right truncate">{giftcard?.store?.id}</div>
          </div>
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">매장 이름:</div>
            <div className="w-full text-right">{giftcard?.store?.name}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <form className="flex flex-col w-full items-center" onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col w-full mb-3">
              <div className="flex flex-row items-center whitespace-nowrap">
                <p className="w-full font-bold">사용자 아이디</p>
                <input
                  className="p-1 w-full rounded-md border-2 border-gray-500"
                  type="text"
                  placeholder="소유권을 이전할 사용자 아이디"
                  {...register('username', validators.usernameValidator)}
                />
              </div>
              {errors.username && (
                <div className="text-right text-red-600">{errors.username.message}</div>
              )}
            </label>
            <div className="">
              <button type="submit" className="rounded-md bg-gray-600 text-white font-bold p-2">
                소유권 이전
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default GiftcardGive
