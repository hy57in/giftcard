import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import useTokens from '../utils/useTokens'
import { loginUser } from '../services/UserService'
import { useEffect } from 'react'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  const { setTokens, isLoggedIn } = useTokens()

  const onSubmit = async (data: { username: string; password: string }) => {
    const { username, password } = data
    const tokens = await loginUser({
      credentials: {
        username: username,
        password: password,
      },
    })
      .then((res: any) => {
        router.push('/giftcards')
        window.location.reload()
        alert('로그인에 성공했습니다!')
        return res
      })
      .catch(() => {
        alert('로그인 정보가 틀립니다!')
        return null
      })

    if (setTokens) {
      setTokens(tokens)
    }
  }

  const usernameValidation = {
    required: '아이디를 입력하세요.',
  }
  const passwordValidation = {
    required: '비밀번호를 입력하세요.',
  }

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      <div className="flex flex-col items-center w-full md:w-96 p-5 my-5 rounded-md border-2 border-gray-500">
        <h1 className="pb-5 text-xl font-bold">로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">아이디</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="text"
                placeholder="아이디"
                {...register('username', usernameValidation)}
              />
            </div>
            {errors.username && (
              <div className="text-right text-red-600">{errors.username.message}</div>
            )}
          </label>

          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">비밀번호</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="password"
                placeholder="비밀번호"
                {...register('password', passwordValidation)}
              />
            </div>
            {errors.password && (
              <div className="text-right text-red-600">{errors.password.message}</div>
            )}
          </label>

          <div className="flex justify-center items-center">
            <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
              로그인
            </button>
            <button
              className="rounded-md bg-gray-600 text-white font-bold p-2"
              onClick={(e) => {
                e.preventDefault()
                router.push('/signup')
              }}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
