import { Montserrat } from 'next/font/google'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
    className={montserrat.className}
    >
      <body className='font-sans'>
        <SidebarProvider>
          <AppSidebar />
          <main>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}