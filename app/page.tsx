import { Header } from "@/components/layout/header"
import { NewSidebar } from "@/components/layout/NewSidebar"
import { NewDashboard } from "@/components/dashboard/NewDashboard"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background-main">
      <aside className="hidden md:block w-[280px]">
        <NewSidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <NewDashboard />
        </main>
      </div>
    </div>
  )
}
