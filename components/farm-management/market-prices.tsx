import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MarketPrices() {
  const prices = [
    { name: "Black Pepper", price: "₹450 - ₹480 / kg" },
    { name: "Cardamom", price: "₹1200 - ₹1500 / kg" },
    { name: "Coconut (Dry)", price: "₹120 - ₹140 / kg" },
    { name: "Rubber (RSS-4)", price: "₹160 - ₹170 / kg" },
    { name: "Arecanut", price: "₹300 - ₹350 / kg" },
    { name: "Banana (Nendran)", price: "₹40 - ₹50 / kg" },
    { name: "Ginger", price: "₹60 - ₹80 / kg" },
    { name: "Turmeric", price: "₹70 - ₹90 / kg" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Prices (Kerala)</CardTitle>
      </CardHeader>
      <CardContent>
         <div className="grid gap-4">
             {prices.map(p => (
                 <div key={p.name} className="flex justify-between items-center border-b pb-2 last:border-0">
                     <span className="font-medium text-lg">{p.name}</span>
                     <span className="font-semibold text-green-600">{p.price}</span>
                 </div>
             ))}
         </div>
         <p className="text-xs text-muted-foreground mt-4">* Prices are indicative and subject to market fluctuations.</p>
      </CardContent>
    </Card>
  )
}
