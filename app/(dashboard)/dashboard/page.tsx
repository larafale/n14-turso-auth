import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Commandes",
}

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Commandes" text="Gerez vos commandes">
      </DashboardHeader>
      <div>
      </div>
    </DashboardShell>
  )
}
