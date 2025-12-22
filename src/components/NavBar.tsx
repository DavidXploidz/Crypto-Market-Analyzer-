import { LuChartSpline } from "react-icons/lu";

export default function NavBar() {
  return (
    <header className="bg-primary h-[70px] text-white">
        <div className="container mx-auto px-3 md:px-4 lg:px-6 flex items-center justify-between h-full">
            <span className="font-space text-2xl font-bold"><LuChartSpline className="inline-block size-7 text-accent" /> Crypto Analizer</span>
            <nav className="flex-1" aria-label="Menu principal">
                {/* <ul className="flex items-center gap-x-4 font-inter text-xs">
                    <li className="font-medium">$18.56 MXN</li>
                </ul> */}
            </nav>
        </div>
    </header>
  )
}
