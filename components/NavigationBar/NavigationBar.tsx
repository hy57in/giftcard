import { Fragment } from "react";
import { useRouter } from "next/router";

import NavigationButton from "./NavigationButton";
import useTokens from "../../utils/useTokens";

function NavigationBar() {
  const { isLoggedIn } = useTokens();
  const router = useRouter();

  return (
    <div className="navigation-bar flex flex-row justify-between bg-gray-600 text-gray-100 py-2 px-5 md:px-7 lg:px-10">
      <NavigationButton name="메인" onClick={() => router.push("/")} />
      {!isLoggedIn ? (
        <NavigationButton name="로그인" onClick={() => router.push("/login")} />
      ) : (
        <Fragment>
          <NavigationButton name="QR 인식" onClick={() => router.push("/qr")} />
          <NavigationButton name="프로필" onClick={() => router.push("/profile")} />
          <NavigationButton name="알림" onClick={() => router.push("/notifications")} />
          <div className="hidden md:inline">
            <NavigationButton
              name="로그아웃"
              onClick={() => {
                localStorage.clear();
                alert("로그아웃 되었습니다.");
                router.push("/");
                window.location.reload();
              }}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default NavigationBar;
