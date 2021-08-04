import { useForm } from 'react-hook-form'

import { createStore, findStoreList } from '../../services/StoreService'
import useTokens from '../../utils/useTokens'

function StoreCreate() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()
  const { tokens } = useTokens()

  const onSubmit = async (data: { storeName: string; selectUpdateOrRemoveStore: any }) => {
    const { storeName } = data

    const storeRet = await findStoreList({ tokens, query: { name: storeName } })

    if (storeRet.items.length > 0) {
      setError('storeName', {
        type: 'invalidStoreName',
        message: `매장 "${storeName}"은(는) 이미 존재합니다.`,
      })
      return
    }

    await createStore({ tokens, data: { name: storeName } }).then(() => {
      alert(`매장 "${storeName}"를 성공적으로 생성했습니다.`)
    })
  }

  const validators = {
    usernameValidator: {
      required: '권한을 부여할 사용자 아이디를 입력하세요.',
    },
    storeNameValidator: {
      required: '매장 이름을 입력하세요.',
    },
  }

  return (
    <div className="flex flex-col items-center p-5 rounded-md border-2 border-gray-500">
      <h1 className="pb-1 text-lg font-bold">매장 생성</h1>
      <div className="pb-3">새로운 매장을 생성합니다.</div>

      <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col flex-shrink-0">
          <div className="flex flex-row items-center whitespace-nowrap">
            <p className="w-full font-bold">*매장 이름</p>
            <input
              className="p-1 w-full rounded-md border-2 border-gray-500"
              type="text"
              placeholder="매장 이름"
              {...register('storeName', validators.storeNameValidator)}
            />
          </div>
          {errors.storeName && (
            <div className="text-right text-red-600 truncate">{errors.storeName.message}</div>
          )}
        </label>

        <div className="flex justify-center items-center">
          <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
            생성하기
          </button>
        </div>
      </form>
    </div>
  )
}

export default StoreCreate
