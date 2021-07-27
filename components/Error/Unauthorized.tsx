import { useRouter } from "next/router";

function Unauthorized() {
  const router = useRouter();

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center pt-24">
      <div className="text-3xl md:text-5xl font-bold mb-5 text-gray-600">401 Unauthorized</div>
      <div className="md:text-xl mb-5 text-gray-800">권한이 없습니다!</div>
      <div className="flex flex-row">
        <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" onClick={() => router.push("/login")}>
          로그인
        </button>
        <button className="rounded-md bg-gray-600 text-white font-bold p-2" onClick={() => router.push("/")}>
          메인 페이지로
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
