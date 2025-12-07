"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FarmProfile } from "./farm-profile"
import { CropTracking } from "./crop-tracking"
import { ExpenseTracking } from "./expense-tracking"
import { HarvestRecords } from "./harvest-records"
import { InventoryManagement } from "./inventory-management"
import { MarketPrices } from "./market-prices"
import { GovernmentSchemes } from "./government-schemes"

export function FarmManagementContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Farm Management</h1>
        <p className="text-muted-foreground">Manage your farm operations, track crops, expenses, and harvest records</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 overflow-x-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="harvest">Harvest</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="market">Market Prices</TabsTrigger>
          <TabsTrigger value="schemes">Schemes</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <FarmProfile />
        </TabsContent>

        <TabsContent value="crops" className="space-y-4">
          <CropTracking />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseTracking />
        </TabsContent>

        <TabsContent value="harvest" className="space-y-4">
          <HarvestRecords />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <InventoryManagement />
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <MarketPrices />
        </TabsContent>

        <TabsContent value="schemes" className="space-y-4">
            <GovernmentSchemes />
        </TabsContent>
      </Tabs>
    </div>
  )
}
