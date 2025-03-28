import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { MdMenu, MdCarRepair } from "react-icons/md";

export default function Navbar() {
    return (
        <nav className="grid grid-cols-6 gap-4 justify-items-center p-2">
            <div className="flex items-center col-span-1">
                {/* <MdMenu size={'1.5em'} /> */}
                <SidebarTrigger/>
            </div>
            <h1 className="col-span-4 col-start-2">
                <div className="flex items-center gap-2">
                    {/* <MdCarRepair size={'1.5em'} /> */}
                    <img className="w-16" src="/logo/auto2000-logo.png" alt="auto2000-logo" />
                </div>
            </h1>
        </nav>
    );
}