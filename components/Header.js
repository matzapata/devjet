import Link from "next/link"
import SignOutBtn from './SignOutBtn'
import { BrandLogoWhite } from "./Brand"
import { SearchIcon } from '@heroicons/react/solid'
import useFirebaseAuth from "../utils/useFirebaseAuth"

export default function Header({ children, className="" }) {
    const { authUser } = useFirebaseAuth()

    return (
        <div className='bg-[#263238] md:m-4 m-1 rounded-lg px-4 md:px-8'>
            <nav className="flex items-center justify-between py-4 md:py-8">
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
                            <a className="ml-4  btn-md">Get Started</a>
                        </Link>
                    }
                    {authUser &&
                        <SignOutBtn className="ml-4  btn-md">
                            Logout
                        </SignOutBtn>
                    }
                </ul>
            </nav>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}