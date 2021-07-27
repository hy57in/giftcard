import { useRouter } from "next/router";

function NotFound() {
  const router = useRouter();

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center pt-24">
      <div className="text-3xl md:text-5xl font-bold mb-5 text-gray-600">404 Not Found</div>
      <div className="md:text-xl mb-5 text-gray-800">존재하지 않는 페이지입니다!</div>
      <button className="rounded-md bg-gray-600 text-white font-bold p-2" onClick={() => router.push("/")}>
        메인 페이지로
      </button>
    </div>
  );
}

export default NotFound;
