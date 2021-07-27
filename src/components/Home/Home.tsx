import useTokens from "../../utils/useTokens";
import GiftcardList from "../Giftcard/GiftcardList";

function Home() {
  const { isLoggedIn } = useTokens();

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      <div className="p-5 text-3xl font-bold">상품권 관리 서비스</div>

      {isLoggedIn && (
        <div className="w-full">
          <GiftcardList />
        </div>
      )}
    </div>
  );
}

export default Home;
