"use client"

import React from 'react';
import { KpiCard } from './KpiCard';

const kpiData = [
  {
    title: "Air Pollution Level",
    value: "35.05 µg/m³",
    comparison: "vs. last month",
    comparisonChange: -2.3,
    data: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 500 },
      { name: 'Apr', value: 280 },
      { name: 'May', value: 450 },
      { name: 'Jun', value: 350 },
    ],
  },
  {
    title: "Environmental Quality Index",
    value: "75.50/100%",
    comparison: "vs. last month",
    comparisonChange: 5.8,
    data: [
      { name: 'Jan', value: 200 },
      { name: 'Feb', value: 350 },
      { name: 'Mar', value: 300 },
      { name: 'Apr', value: 480 },
      { name: 'May', value: 400 },
      { name: 'Jun', value: 500 },
    ],
  },
  {
    title: "Investments in Clean Technologies",
    value: "$967,570",
    comparison: "vs. last month",
    comparisonChange: 12.1,
    data: [
      { name: 'Jan', value: 300 },
      { name: 'Feb', value: 400 },
      { name: 'Mar', value: 350 },
      { name: 'Apr', value: 500 },
      { name: 'May', value: 480 },
      { name: 'Jun', value: 600 },
    ],
  },
];

export function NewDashboard() {
  return (
    <div className="bg-background-main p-lg">
      <div className="grid grid-cols-12 gap-lg">
        {/* Top Row: Primary KPI Cards */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {kpiData.map((kpi, index) => (
              <KpiCard key={index} {...kpi} />
            ))}
          </div>
        </div>

        {/* Middle Row: Placeholder for Secondary Data Widgets */}
        <div className="col-span-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              {/*
                Placeholder for future widgets as specified in the prompt (Phase 2).
                e.g., Gauge/Progress, Categorical Breakdowns, Geographic Visualizations.
              */}
              <div className="bg-primary-light rounded-lg p-md shadow h-64 flex items-center justify-center text-text-muted">Secondary Widget Placeholder</div>
              <div className="bg-primary-light rounded-lg p-md shadow h-64 flex items-center justify-center text-text-muted">Secondary Widget Placeholder</div>
           </div>
        </div>

        {/* Bottom Row: Placeholder for Tertiary Information */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {/*
              Placeholder for future widgets as specified in the prompt (Phase 2).
              e.g., Status indicators, Quick metrics, System alerts.
            */}
            <div className="bg-primary-light rounded-lg p-md shadow h-48 flex items-center justify-center text-text-muted">Tertiary Card Placeholder</div>
            <div className="bg-primary-light rounded-lg p-md shadow h-48 flex items-center justify-center text-text-muted">Tertiary Card Placeholder</div>
            <div className="bg-primary-light rounded-lg p-md shadow h-48 flex items-center justify-center text-text-muted">Tertiary Card Placeholder</div>
            <div className="bg-primary-light rounded-lg p-md shadow h-48 flex items-center justify-center text-text-muted">Tertiary Card Placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}
