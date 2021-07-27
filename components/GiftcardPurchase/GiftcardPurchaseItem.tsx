import { useRouter } from "next/router";
import moment from "moment";

interface GiftcardPurchaseItemPropsInterface {
  giftcardPurchase: {
    id: string;
    giftcard: { id: string; expirationTime: Date };
    store: { id: string; name: string };
    user: { id: string; username: string };
    amount: number;
    creationTime: Date;
  };
}

function GiftcardPurchaseItem({ giftcardPurchase }: GiftcardPurchaseItemPropsInterface) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-2 mb-5 rounded-md border-2 border-gray-500 w-full">
      <div className="flex flex-row w-full items-center">
        <div className="w-2/3 font-bold mr-1">구매 ID:</div>
        <div className="w-full text-right truncate">{giftcardPurchase?.giftcard.id}</div>
      </div>
      <div className="flex flex-row w-full items-center">
        <div className="w-2/3 font-bold mr-1">사용자 아이디:</div>
        <div className="w-full text-right truncate">{giftcardPurchase?.user.username}</div>
      </div>
      <div className="flex flex-row w-full items-center text-green-500">
        <div className="w-2/3 font-bold mr-1">사용 금액:</div>
        <div className="w-full text-right truncate">{giftcardPurchase?.amount + "원"}</div>
      </div>
      <div className="flex flex-row w-full items-center">
        <div className="w-2/3 font-bold mr-1">사용일:</div>
        <div className="w-full text-right truncate">
          {moment(giftcardPurchase?.creationTime).format("YYYY/MM/DD, HH:mm:ss")}
        </div>
      </div>
      <div
        className="flex flex-col w-full p-2 rounded-md border-2 border-gray-500 cursor-pointer"
        onClick={() => router.push(`/giftcards/${giftcardPurchase?.giftcard.id}`)}
      >
        <div className="text-center font-bold">상품권 정보</div>
        <div className="flex flex-row w-full text-sm">
          <div className="w-1/3 font-bold mr-1">상품권 ID:</div>
          <div className="w-full text-right truncate">{giftcardPurchase?.giftcard.id}</div>
        </div>
        <div className="flex flex-row w-full text-sm">
          <div className="w-1/3 font-bold mr-1">매장 ID:</div>
          <div className="w-full text-right truncate">{giftcardPurchase?.store.id}</div>
        </div>
        <div className="flex flex-row w-full text-sm">
          <div className="w-1/3 font-bold mr-1">매장 이름:</div>
          <div className="w-full text-right truncate">{giftcardPurchase?.store.name}</div>
        </div>
        <div className="flex flex-row w-full text-sm">
          <div className="w-1/3 font-bold mr-1">만료일:</div>
          <div className="w-full text-right truncate">
            {moment(giftcardPurchase?.giftcard.expirationTime).format("YYYY/MM/DD, HH:mm:ss")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftcardPurchaseItem;
