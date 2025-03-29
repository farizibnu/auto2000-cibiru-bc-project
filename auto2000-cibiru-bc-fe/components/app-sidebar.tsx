import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MdBookOnline, MdPriceChange, MdOutlineModeOfTravel } from "react-icons/md";


// Menu items.
const items = [
    {
        title: "Beranda",
        url: "/",
        icon: MdBookOnline,
    },
    {
        title: "Estimasi Harga",
        url: "/estimation",
        icon: MdPriceChange,
    },
    {
        title: "B&P Salon",
        url: "/estimation",
        icon: MdOutlineModeOfTravel,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas">
            <SidebarContent>
                <SidebarGroup>
                    <div className="w-24 h-auto py-10 mx-auto flex items-center justify-center">
                        <img src="/logo/auto2000-logo.png" alt="auto2000-logo" />
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="font-semibold">
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}