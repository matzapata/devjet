import useFirebaseAuth from "../utils/useFirebaseAuth"
import { useRouter } from "next/router"

export default function SignInGoogleBtn() {
    const { signInWithGoogle } = useFirebaseAuth()
    const router = useRouter()

    function handleOnClick() {
        signInWithGoogle()
            .then(() => { router.push('/') })
            .catch((e) => { console.log(e) })
    }

    return (
        <button onClick={() => { handleOnClick() }} className="w-full py-3 mt-4 text-gray-500 border border-gray-200 rounded-md shadow-sm hover:shadow hover:text-gray-800">
            <img className="inline-block" src="/icons/google-icon.svg" alt="" />
            <span className="ml-2 font-medium ">
                Sign in with Google
            </span>
        </button>
    )
}