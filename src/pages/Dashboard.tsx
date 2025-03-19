
import React from "react";
import { 
  Building2, 
  DoorOpen, 
  Users, 
  Receipt, 
  TrendingUp,
  BarChart3,
  Calendar
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Sample data
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

const occupancyData = [
  { name: "Property A", occupied: 25, vacant: 5 },
  { name: "Property B", occupied: 18, vacant: 7 },
  { name: "Property C", occupied: 12, vacant: 3 },
];

const recentTenants = [
  { id: 1, name: "Alex Johnson", room: "A-101", property: "Sunrise Residence", date: "2023-08-25" },
  { id: 2, name: "Maria Garcia", room: "B-205", property: "Blue Mountain Lodge", date: "2023-08-22" },
  { id: 3, name: "Sam Wilson", room: "C-310", property: "Green Valley Apartments", date: "2023-08-20" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-3xl">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your properties and performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Properties"
          value="8"
          icon={Building2}
          trend={12}
        />
        <StatCard
          title="Total Rooms"
          value="64"
          icon={DoorOpen}
          trend={8}
        />
        <StatCard
          title="Active Tenants"
          value="52"
          icon={Users}
          trend={4}
        />
        <StatCard
          title="Monthly Revenue"
          value="$14,280"
          icon={Receipt}
          trend={16}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue for the past 6 months</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, "Revenue"]} 
                    contentStyle={{ borderRadius: "0.5rem", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Occupancy Rates
                </CardTitle>
                <CardDescription>Current occupancy by property</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={occupancyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "0.5rem", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }} 
                  />
                  <Legend />
                  <Bar dataKey="occupied" name="Occupied" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="vacant" name="Vacant" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <DashboardCard>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Recent Tenant Move-ins
            </h3>
            <p className="text-sm text-muted-foreground">New tenants from the past 7 days</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Name</th>
                <th className="text-left py-3 px-2 font-medium">Room</th>
                <th className="text-left py-3 px-2 font-medium">Property</th>
                <th className="text-left py-3 px-2 font-medium">Move-in Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-dashed hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-2">{tenant.name}</td>
                  <td className="py-3 px-2">{tenant.room}</td>
                  <td className="py-3 px-2">{tenant.property}</td>
                  <td className="py-3 px-2">{new Date(tenant.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default Dashboard;
