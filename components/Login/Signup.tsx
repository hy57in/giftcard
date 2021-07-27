import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

import { registerUser } from "../../services/UserService";

function Signup({ history }: { history: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { username: string; password: string; password2: string }) => {
    const { username, password, password2 } = data;

    if (password !== password2) {
      alert("비밀번호와 비밀번호 확인 내용이 일치하지 않습니다.");
    } else {
      await registerUser({ username, password })
        .then((res) => {
          alert("회원가입에 성공했습니다!");
          history.push("/");
          window.location.reload();
          return res;
        })
        .catch((err) => {
          console.error(err.response.data);
          alert("회원가입에 실패했습니다.");
          return null;
        });
    }
  };

  const usernameValidation = {
    required: "필수 필드입니다.",
    minLength: { value: 5, message: "아이디는 5자 이상 20자 이하여야 합니다." },
    maxLength: { value: 20, message: "아이디는 5자 이상 20자 이하여야 합니다." },
  };
  const passwordValidation = {
    required: "필수 필드입니다.",
    minLength: { value: 8, message: "비밀번호는 8자 이상 16자 이하여야 합니다." },
    maxLength: { value: 16, message: "비밀번호는 8자 이상 16자 이하여야 합니다." },
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      <div className="flex flex-col items-center w-full md:w-96 p-5 my-5 rounded-md border-2 border-gray-500">
        <h1 className="pb-5 text-xl font-bold">회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">아이디</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="text"
                placeholder="아이디"
                {...register("username", usernameValidation)}
              />
            </div>
            {errors.username && <div className="text-right text-red-600">{errors.username.message}</div>}
          </label>

          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">비밀번호</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="password"
                placeholder="비밀번호"
                {...register("password", passwordValidation)}
              />
            </div>
            {errors.password && <div className="text-right text-red-600">{errors.password.message}</div>}
          </label>

          <label className="flex flex-col flex-shrink-0 mb-4">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">비밀번호 확인</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="password"
                placeholder="비밀번호 확인"
                {...register("password2", passwordValidation)}
              />
            </div>
            {errors.password2 && <div className="text-right text-red-600">{errors.password2.message}</div>}
          </label>

          <div className="flex justify-center items-center">
            <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
              회원가입
            </button>

            <button
              className="rounded-md bg-gray-600 text-white font-bold p-2"
              onClick={(e) => {
                e.preventDefault();
                history.push("/login");
              }}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup);
