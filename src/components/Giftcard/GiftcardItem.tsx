import moment from "moment";
import { useRouter } from "next/router";

interface GiftcardItemPropsInterface {
  giftcard: {
    id: string;
    owner: { id: string; username: string } | null;
    store: { id: string; name: string };
    expirationTime: Date;
    amount: number;
    amountLeft: number;
  };
}

function GiftcardItem({ giftcard }: GiftcardItemPropsInterface) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center p-2 mb-5 rounded-md border-2 border-gray-500 w-full cursor-pointer"
      onClick={() => router.push(`/giftcards/${giftcard.id}`)}
    >
      <div className="text-center font-bold text-xl">상품권</div>
      <div className="flex flex-row w-full items-center mb-1">
        <div className="w-2/3 font-bold mr-1">ID:</div>
        <div className="w-full text-right truncate">{giftcard.id}</div>
      </div>
      <div className="flex flex-row w-full items-center mb-1">
        <div className="w-2/3 font-bold mr-1">상태:</div>

        {moment(new Date()) >= moment(giftcard?.expirationTime) ? (
          <div className="w-full text-right text-red-500">만료됨</div>
        ) : (
          <div className="w-full text-right text-green-500">사용 가능</div>
        )}
      </div>
      <div className="flex flex-row w-full items-center mb-1">
        <div className="w-2/3 font-bold mr-1">만료일:</div>
        <div className="w-full text-right truncate">
          {moment(giftcard?.expirationTime).format("YYYY/MM/DD, HH:mm:ss")}
        </div>
      </div>
      <div className="flex flex-col w-full p-2 rounded-md border-2 border-gray-500">
        <div className="text-center font-bold">소유자 정보</div>
        <div className="flex flex-row w-full text-sm">
          <div className="w-1/3 font-bold mr-1">아이디:</div>
          <div className="w-full text-right truncate">{giftcard.owner ? giftcard.owner?.username : "없음"}</div>
        </div>
        <div className="w-full h-px bg-gray-500 my-2" />

        <div className="text-center font-bold">매장 정보</div>
        <div className="flex flex-row w-full text-sm">
          <div className="w-1/3 font-bold mr-1">매장 ID:</div>
          <div className="w-full text-right truncate">{giftcard.store.id}</div>
        </div>
        <div className="flex flex-row w-full text-sm">
          <div className="w-1/3 font-bold mr-1">매장 이름:</div>
          <div className="w-full text-right truncate">{giftcard.store.name}</div>
        </div>
        <div className="w-full h-px bg-gray-500 my-2" />

        <div className="text-center font-bold">금액 정보</div>
        <div className="flex flex-row w-full items-center text-sm text-gray-500">
          <div className="w-full font-bold mr-1">발급 금액:</div>
          <div className="w-full text-right truncate">{giftcard?.amount}</div>
        </div>
        <div className="flex flex-row w-full items-center text-sm text-red-500">
          <div className="w-full font-bold mr-1">사용 금액:</div>
          <div className="w-full text-right truncate">{giftcard?.amount - giftcard?.amountLeft}</div>
        </div>
        <div className="flex flex-row w-full items-center text-sm text-green-500">
          <div className="w-full font-bold mr-1">잔여 금액:</div>
          <div className="w-full text-right truncate font-bold">{giftcard?.amountLeft}</div>
        </div>
      </div>
    </div>
  );
}

export default GiftcardItem;
