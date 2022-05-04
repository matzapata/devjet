import Link from 'next/link'
import { useRef, useState } from "react"
import { useRouter } from "next/router"
import useFirebaseAuth from '../../utils/useFirebaseAuth'
import { BrandFavicon } from "../../components/Brand"
import SignInGoogleBtn from "../../components/SignInGoogleBtn"
import { firebaseAuthErrorList } from '../../utils/firebase'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const router = useRouter()
    const [error, setError] = useState(undefined)
    const { createUserWithEmailAndPassword } = useFirebaseAuth()

    function handleSignUp(e) {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        createUserWithEmailAndPassword(email, password)
            .then(() => {
                router.push('/')
            })
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
                    Join our community
                </h1>
                <form onSubmit={handleSignUp} className="mt-6">
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
                        className="mb-5 form-input"
                        type="password"
                        name="password"
                        id="password"
                        required
                        ref={passwordRef}
                    />

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
                        Sign up
                    </button>
                </form>
                <SignInGoogleBtn />
                <p className="mt-6 font-medium text-center text-gray-800">
                    Already have an account?
                    <Link href="/auth/login">
                        <a className="ml-1 link">Sign in</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}