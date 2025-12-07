import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GovernmentSchemes() {
    const schemes = [
        {
            name: "PM-KISAN",
            description: "Income support of ₹6000/year for farmers in three equal installments.",
            link: "https://pmkisan.gov.in"
        },
        {
            name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Crop insurance scheme integrating multiple stakeholders on a single platform.",
            link: "https://pmfby.gov.in"
        },
        {
            name: "eNAM (National Agriculture Market)",
            description: "Pan-India electronic trading portal which networks the existing APMC mandis.",
            link: "https://enam.gov.in"
        },
        {
            name: "Soil Health Card Scheme",
            description: "Crop-wise recommendations of nutrients and fertilizers required for the individual farms.",
            link: "https://soilhealth.dac.gov.in"
        },
        {
            name: "Subhiksha Keralam",
            description: "Kerala state initiative to enhance food security and promote self-sufficiency in agriculture.",
            link: "#"
        },
        {
            name: "Kera Gramam",
            description: "Comprehensive coconut development programme implemented in selected Grama Panchayats.",
            link: "#"
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Government Schemes</CardTitle>
                <CardDescription>Major agricultural schemes for Kerala farmers</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    {schemes.map(s => (
                        <div key={s.name} className="border p-4 rounded-lg flex flex-col justify-between hover:bg-muted/50 transition-colors">
                            <div>
                                <h3 className="font-bold text-primary mb-2">{s.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                            </div>
                            <Button variant="outline" className="w-full mt-auto" asChild>
                                <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    View Details <ExternalLink className="h-3 w-3" />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
