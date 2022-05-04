import { BrandFavicon } from "./Brand"

export default function Footer() {
    return (
        <footer className="px-4 py-5 border-t 6xl:px-0 bg-gray-50 border-t-gray-200">
            <div className="flex items-center max-w-6xl mx-auto">
                <BrandFavicon className="h-6 mr-4 "/>
                <p className="font-medium text-gray-500">@2022 Devjet, Inc. All rights reserved</p>
            </div>
        </footer>
    )
}