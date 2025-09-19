"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ArrowDown, ArrowUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type KpiCardProps = {
  title: string;
  value: string;
  comparison: string;
  comparisonChange: number;
  data: { name: string; value: number }[];
};

export function KpiCard({ title, value, comparison, comparisonChange, data }: KpiCardProps) {
  const isPositive = comparisonChange > 0;

  return (
    <Card className="shadow-sm border-border-light">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-heading text-text-secondary">{title}</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Settings className="h-4 w-4 text-text-muted" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-kpi-large text-text-primary">{value}</div>
        <div className="flex items-center text-small text-text-muted">
          <span>{comparison}</span>
          <span className={`flex items-center ml-2 ${isPositive ? "text-success" : "text-danger"}`}>
            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(comparisonChange)}%
          </span>
        </div>
        <div className="h-20 w-full mt-md">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4299e1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4299e1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#4299e1" fill="url(#chart-gradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
