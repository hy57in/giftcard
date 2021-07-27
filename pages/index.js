import useTokens from "../src/utils/useTokens";
import GiftcardList from "../src/components/Giftcard/GiftcardList";

export default function Index() {
  const { isLoggedIn } = useTokens();

  return (
    <div>
      <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
        <div className="p-5 text-3xl font-bold">상품권 관리 서비스</div>
        {isLoggedIn && (
          <div className="w-full">
            <GiftcardList />
          </div>
        )}
      </div>
    </div>
  );
}
