import Link from "next/link"
import SignOutBtn from './SignOutBtn'
import { BrandLogoWhite } from "./Brand"
import { SearchIcon } from '@heroicons/react/solid'
import useFirebaseAuth from "../utils/useFirebaseAuth"

export default function NavBar() {
    const { authUser } = useFirebaseAuth()

    return (
        <nav className="flex items-center justify-between ">
            <BrandLogoWhite className="h-8 my-0" />
            <ul className="flex items-center">
                <Link href={'/#search'}>
                    <a className="hidden p-2 text-gray-300 md:block hover:text-white"><SearchIcon className="w-5 h-5" /></a>
                </Link>
                <Link href={'/'}>
                    <a className="hidden px-2 ml-2 font-medium text-gray-300 md:block hover:text-white ">Explore</a>
                </Link>
                {!authUser &&
                    <Link href={'/auth/login'}>
                        <a className="hidden px-2 ml-2 font-medium text-gray-300 md:block hover:text-white">Log In</a>
                    </Link>
                }
                {!authUser &&
                    <Link href={'/auth/signup'}>
                        <a className="px-4 py-2 ml-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-700">Get Started</a>
                    </Link>
                }
                {authUser &&
                    <SignOutBtn className="px-4 py-2 ml-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-700">
                        Logout
                    </SignOutBtn>
                }
            </ul>
        </nav>
    )
}