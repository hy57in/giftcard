import moment from 'moment'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

import { findGiftcardList } from '../services/GiftcardService'
import { getUser } from '../services/UserService'
import useTokens from '../utils/useTokens'
import GiftcardItem from '../components/Giftcard/GiftcardItem'

function GiftcardNotificationList() {
  const { isLoggedIn, tokens } = useTokens()
  const router = useRouter()
  const [user, setUser] = useState<{ id: string }>({ id: '' })
  const [expStartDays, setExpStartDays] = useState(1)
  const [giftcardList, setGiftcardList] = useState({
    items: [] as any[],
    links: {},
    meta: { totalItems: 0, totalPages: 0 },
  })

  /** 페이지당 몇 개의 항목이 존재하는지 */
  const PER_PAGE = 10

  const handlePageClick = async (data: { selected: number }) => {
    const page = data.selected + 1

    await findGiftcardList({ tokens, query: { page, limit: PER_PAGE, userId: user.id } }).then(
      (res) => {
        setGiftcardList(res)
      }
    )
  }

  const onChangeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setExpStartDays(parseInt(e.target.value))

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }

    ;(async () => {
      const tempUser = await getUser({ tokens }).then((res) => {
        setUser(res)
        return res
      })

      if (expStartDays < 0) {
        await findGiftcardList({
          tokens,
          query: {
            userId: tempUser?.id,
            expirationEnd: moment(Date.now()).toISOString(),
          },
        }).then((res) => {
          setGiftcardList(res)
        })
      } else {
        await findGiftcardList({
          tokens,
          query: {
            userId: tempUser?.id,
            expirationStart: moment(Date.now()).toISOString(),
            expirationEnd: moment(Date.now() + expStartDays * 24 * 3600 * 1000).toISOString(),
          },
        }).then((res) => {
          setGiftcardList(res)
        })
      }
    })()
  }, [tokens, expStartDays])

  return (
    <div className="flex flex-col w-full items-center mx-auto p-4">
      <h1 className="pb-1 text-xl font-bold mb-2">상품권 만료 알림</h1>
      <div className="flex flex-row space-x-2 mb-4">
        <div>만료</div>
        <select
          id="notificationRange"
          className="rounded-md border-2 border-gray-500"
          onChange={onChangeDropdown}
          value={expStartDays}
        >
          <option value={-1}>만료</option>
          <option value={1}>1일 전</option>
          <option value={3}>3일 전</option>
          <option value={7}>7일 전</option>
          <option value={14}>2주(14일) 전</option>
          <option value={30}>1달(30일) 전</option>
        </select>
        <div>까지 조회</div>
      </div>

      <div className="flex flex-col w-full md:w-1/3">
        {giftcardList.items.map((giftcard) => (
          <GiftcardItem key={giftcard.id} giftcard={giftcard} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={giftcardList.meta.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex flex-row space-x-4"
        activeClassName="text-green-500"
        disabledClassName="text-gray-300 cursor-not-allowed"
      />
    </div>
  )
}

export default GiftcardNotificationList
