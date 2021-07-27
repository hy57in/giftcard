import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { findGiftcardList } from "../../services/GiftcardService";
import { getStore } from "../../services/StoreService";
import { getUser } from "../../services/UserService";
import { gcs } from "../../utils/types";
import useTokens from "../../utils/useTokens";
import GiftcardItem from "./GiftcardItem";

function GiftcardList({ location }: { location?: { search: string } }) {
  const { tokens } = useTokens();
  const [user, setUser] = useState<{ id: string }>({ id: "" });
  const [storeId, setStoreId] = useState(new URLSearchParams(location?.search).get("store-id") || undefined);
  const [store, setStore] = useState<gcs.StoreFindOneResponseInterface>({});
  const [giftcardList, setGiftcardList] = useState({
    items: [] as any[],
    links: {},
    meta: { totalItems: 0, totalPages: 0 },
  });

  /** 페이지당 몇 개의 항목이 존재하는지 */
  const PER_PAGE = 10;

  const handlePageClick = async (data: { selected: number }) => {
    const page = data.selected + 1;

    await findGiftcardList({ tokens, query: { page, limit: PER_PAGE } }).then((res) => {
      setGiftcardList(res);
    });
  };

  useEffect(() => {
    (async () => {
      const tempUser = await getUser({ tokens }).then((res) => {
        setUser(res);
        return res;
      });

      let tempStoreId = undefined;
      if (tempUser.store && storeId) {
        tempStoreId = storeId;

        const store = await getStore({ tokens, storeId });
        setStore(store);
      }

      if (tempStoreId) {
        await findGiftcardList({
          tokens,
          query: { page: 1, limit: PER_PAGE, storeId: tempStoreId },
        }).then((res) => {
          setGiftcardList(res);
        });
      } else {
        await findGiftcardList({
          tokens,
          query: { page: 1, limit: PER_PAGE, userId: tempUser.id },
        }).then((res) => {
          setGiftcardList(res);
        });
      }
    })();
  }, [tokens]);

  return (
    <div className="flex flex-col w-full items-center mx-auto p-4">
      <h1 className="pb-1 text-xl font-bold mb-2">{`${storeId ? `매장 "${store.name}" ` : ""}상품권: 총 ${
        giftcardList.meta.totalItems
      }개`}</h1>
      {store && store.id && (
        <div className="flex flex-col w-full md:w-1/3 items-center rounded-md border-2 p-2 border-gray-500 space-y-2 mb-2">
          <div className="text-xl font-bold">매장 상품권 통계</div>
          <div className="w-full h-px bg-gray-500 my-2" />
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex space-x-4 justify-between">
              <div className="font-bold">총 발급 금액 (원):</div>
              <div className="text-right">{store.sumIssuedGiftcardAmount}</div>
            </div>
            <div className="flex space-x-4 justify-between">
              <div className="font-bold">총 정산 금액 (원):</div>
              <div className="text-right text-red-500">
                {store.sumIssuedGiftcardAmount &&
                  store.sumIssuedGiftcardAmountLeft &&
                  store.sumIssuedGiftcardAmount - store.sumIssuedGiftcardAmountLeft}
              </div>
            </div>
            <div className="flex space-x-4 justify-between">
              <div className="font-bold">총 잔여 금액 (원):</div>
              <div className="text-right text-green-500">{store.sumIssuedGiftcardAmountLeft}</div>
            </div>
          </div>
        </div>
      )}
      {user ? (
        <Fragment>
          <div className="flex flex-col w-full md:w-1/3">
            {giftcardList.items.map((giftcard) => (
              <GiftcardItem
                //  key={giftcard.id}
                giftcard={giftcard}
              />
            ))}
          </div>
          <ReactPaginate
            previousLabel={"이전"}
            nextLabel={"다음"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={giftcardList.meta.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex flex-row space-x-4"
            activeClassName="text-green-500"
            disabledClassName="text-gray-300 cursor-not-allowed"
          />
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
}

export default GiftcardList;
