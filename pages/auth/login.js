import { useRouter } from "next/router"
import { useRef, useState } from "react"
import Link from 'next/link'
import { BrandFavicon } from "../../components/Brand"
import SignInGoogleBtn from "../../components/SignInGoogleBtn"
import useFirebaseAuth from '../../utils/useFirebaseAuth'
import { firebaseAuthErrorList } from "../../utils/firebase"
import { ExclamationCircleIcon } from '@heroicons/react/solid'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const router = useRouter()
    const [error, setError] = useState(undefined)
    const { signInWithEmailAndPassword } = useFirebaseAuth()

    function handleLogin(e) {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        signInWithEmailAndPassword(email, password)
            .then(() => { router.push('/') })
            .catch((e) => {
                const ErrorMessage = firebaseAuthErrorList[e.code] ? firebaseAuthErrorList[e.code] : "Ups, there's been an error, please try again."
                setError(ErrorMessage)
            })
    }

    return (
        <div className="max-w-sm px-4 mx-auto my-12">
            <div>
                <BrandFavicon className="mx-auto mb-6" />
                <h1 className="mb-20 text-3xl font-bold text-center text-gray-900">
                    Sign in to your account
                </h1>
                <form onSubmit={handleLogin} className="mt-6">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="mb-5 form-input"
                        type="email"
                        name="email"
                        id="email"
                        required
                        ref={emailRef}
                    />

                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="mb-2 form-input"
                        type="password"
                        name="password"
                        id="password"
                        required
                        ref={passwordRef}
                    />
                    <Link href={"/auth/reset-password"}>
                        <a className="block mb-5 text-right font-medium link">Forget your password?</a>
                    </Link>

                    {error &&
                        <div className="flex items-center mb-5">
                            <ExclamationCircleIcon className="w-5 h-5 mr-2 text-red-500" />
                            <p className="font-medium text-red-500">{error}</p>
                        </div>
                    }

                    <button
                        type="submit"
                        className="w-full btn-lg"
                    >
                        Sign in
                    </button>
                </form>
                <SignInGoogleBtn />
                <p className="mt-6 font-medium text-center text-gray-800">
                    Don&apos;t have an account?
                    <Link href="/auth/signup">
                        <a className="ml-1 link">Sign up</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}