import Link from "next/link"
import { useState } from "react"
import { ExclamationCircleIcon, ArrowLeftIcon } from "@heroicons/react/solid"
import { BrandFavicon } from '../../components/Brand'
import useFirebaseAuth from "../../utils/useFirebaseAuth" 
import { firebaseAuthErrorList } from '../../utils/firebase'

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { sendPasswordResetEmail } = useFirebaseAuth()

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        sendPasswordResetEmail(email)
            .then(() => { 
                setLoading(false)
                setEmailSent(true)
            })
            .catch((e) => {
                setLoading(false)
                const ErrorMessage = firebaseAuthErrorList[e.code] ? firebaseAuthErrorList[e.code] : "Ups, there's been an error, please try again."
                setError(ErrorMessage)
            })
    }

    return (
        <div>
            {!emailSent ? 
                <div className="max-w-md px-4 mx-auto my-12">
                    <BrandFavicon className="mx-auto mb-6" />
                    <h1 className="mb-4 text-3xl font-bold text-center text-gray-900">
                        Forgot password?
                    </h1>
                    <p className="text-lg font-medium text-center text-gray-500">
                        No worries, we&apos;ll send you reset instructions.
                    </p>

                    <form className='flex flex-col mt-8 mb-4' onSubmit={handleSubmit}>
                        <input className='mb-5 form-input ' id="input-email" type="email" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} required />

                        {error &&
                            <div className="flex items-center mb-5">
                                <ExclamationCircleIcon className="w-5 h-5 mr-2 text-red-500" />
                                <p className="font-medium text-red-500">{error}</p>
                            </div>
                        }

                        <button className='w-full btn-lg' type="submit" disabled={loading}>
                            Reset password
                        </button>
                    </form>

                    <Link href="/auth/login">
                        <a className="flex items-center justify-center font-medium text-gray-500 hover:text-blue-600 hover:underline">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            <span>Back to login</span>
                        </a>
                    </Link>
                </div>
                :
                <div className="max-w-md px-4 mx-auto my-12">
                    <BrandFavicon className="mx-auto mb-6" />
                    <h1 className="mb-4 text-3xl font-bold text-center text-gray-900">
                        Check your email
                    </h1>
                    <p className="text-lg font-medium text-center text-gray-500">We sent a password reset link to:</p>
                    <p className="text-lg font-medium text-center text-gray-500">{email}</p>
                    <Link href="/auth/login">
                        <a className='block w-full py-3 mt-8 btn-lg text-center'>
                            Back to login
                        </a>
                    </Link>
                </div>
            }
        </div >
    )
}