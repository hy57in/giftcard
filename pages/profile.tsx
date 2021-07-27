import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { API_V1_URL } from "../src/utils/constants";
import useTokens from "../src/utils/useTokens";
import { jsonAuthHeaders } from "../src/services/headers";
import { getUser } from "../src/services/UserService";

function Profile() {
  const { tokens } = useTokens();
  const [user, setUser] = useState({ id: "", username: "", isManager: false, store: { id: "", name: "" } });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  async function updateUser({ username }: { username: string }) {
    return axios
      .patch(API_V1_URL + `/users/${user.id}`, JSON.stringify({ username }), {
        headers: jsonAuthHeaders(tokens.access_token),
      })
      .then(() => {
        alert("정보 수정에 성공했습니다! 반영을 위해 다시 로그인해주세요.");
        if (typeof window !== "undefined") {
          window.localStorage.clear();
          router.push("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err.response.data);
        alert("정보 수정에 실패했습니다.");
      });
  }

  const onSubmit = async (data: { username: string }) => {
    const { username } = data;

    await updateUser({ username });
  };

  useEffect(() => {
    (async () => {
      await getUser({ tokens })
        .then((user) => {
          setUser(user);
          setValue("username", user.username, { shouldValidate: true });
        })
        .catch(() => {
          router.push("/");
        });
    })();
  }, [tokens, setValue]);

  const usernameValidation = {
    required: "필수 필드입니다.",
    minLength: { value: 5, message: "아이디는 5자 이상 20자 이하여야 합니다." },
    maxLength: { value: 20, message: "아이디는 5자 이상 20자 이하여야 합니다." },
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      {user ? (
        <div className="flex flex-col items-center w-full md:w-96 p-5 my-5 rounded-md border-2 border-gray-500">
          <h1 className="pb-5 text-xl font-bold">회원정보 수정</h1>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col flex-shrink-0 mb-3">
              <div className="flex flex-row items-center whitespace-nowrap">
                <p className="w-full font-bold">아이디</p>
                <input
                  className="p-1 w-full rounded-md border-2 border-gray-500"
                  type="text"
                  placeholder="아이디"
                  {...register("username", usernameValidation)}
                />
              </div>
              {errors.username && <div className="text-right text-red-600">{errors.username.message}</div>}
            </label>

            <div className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3">
              <p className="w-full font-bold">상태</p>
              <div className="p-1 w-full rounded-md border-0 border-gray-500">
                {user.isManager ? "관리자" : "사용자"}
              </div>
            </div>

            <div className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3">
              <p className="w-full font-bold">소속 매장</p>
              <div className="p-1 w-full rounded-md border-0 border-gray-500">
                {user.store ? user.store.name : "없음"}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <button className="rounded-md bg-gray-600 text-white font-bold p-2 mb-2" type="submit">
                수정하기
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>로그인 되어있지 않습니다.</div>
      )}

      <div className="flex flex-col m-2 items-center justify-center space-y-2">
        <div className="flex flex-row space-x-2">
          {user.isManager && (
            <button
              className="rounded-md bg-gray-600 text-white font-bold p-2"
              onClick={() => {
                router.push("/admin");
              }}
            >
              관리자 페이지
            </button>
          )}

          {user.store && (
            <button
              className="rounded-md bg-gray-600 text-white font-bold p-2"
              onClick={() => {
                router.push({
                  pathname: "/giftcards",
                  search: "?" + new URLSearchParams({ "store-id": user.store.id }).toString(),
                });
              }}
            >
              매장 상품권 관리
            </button>
          )}
        </div>
        <div className="flex flex-row space-x-2">
          <button
            className="rounded-md bg-gray-600 text-white font-bold p-2"
            onClick={() => {
              router.push("/giftcard-purchases");
            }}
          >
            상품권 이용 내역
          </button>

          <button
            className="rounded-md bg-gray-600 text-white font-bold p-2"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.clear();
                router.push("/");
                alert("로그아웃 되었습니다.");
              }
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
