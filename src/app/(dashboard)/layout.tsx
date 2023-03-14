import '@/styles/global.css'
import GlassPane from '@/components/GlassPane'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <html lang='en'>
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          <Sidebar/>
          {children}
        </GlassPane>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Dashboard | Fullstack App'
}

