"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "A", votes: 230 },
  { name: "B", votes: 310 },
  { name: "C", votes: 270 },
  { name: "D", votes: 150 },
];

export function CountingVisualization() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="votes" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
