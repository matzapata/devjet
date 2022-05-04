import { useRouter } from "next/router"
import useFirebaseAuth from "../utils/useFirebaseAuth"

export default function SignOutBtn({ children, className = "" }) {
    const { signOut } = useFirebaseAuth()
    const router = useRouter()
    function handleSignOut() {
        signOut()
        router.push('/')
    }
    return <button className={className} onClick={handleSignOut}>{children}</button>
}