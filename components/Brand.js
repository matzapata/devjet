import Link from "next/link"

export function BrandFavicon({ height, width, className = "" }) {
    return (
        <Link href={'/'}>
            <img className={`${className} cursor-pointer`} src="/brand-favicon.svg" alt="devjet favicon" />
        </Link>
    )
}

export function BrandLogo({ className = "" }) {
    return (
        <Link href={'/'}>
            <img className={`${className} cursor-pointer`} src="/brand-logo.svg" alt="devjet logo" />
        </Link>
    )
}

export function BrandLogoWhite({ className = "" }) {
    return (
        <Link href={'/'}>
            <img className={`${className} cursor-pointer`} src="/brand-logo-white.svg" alt="devjet logo" />
        </Link>
    )
}