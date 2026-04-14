import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from "recharts";
import { Card, CardHeader, CardBody } from "../ui/Card";
import { TrendingUp, PieChart as PieIcon, BarChart3 } from "lucide-react";
const fundingData = [
  { name: "Jan", amount: 4e3, projects: 2 },
  { name: "Feb", amount: 3e3, projects: 1 },
  { name: "Mar", amount: 2e3, projects: 3 },
  { name: "Apr", amount: 2780, projects: 2 },
  { name: "May", amount: 1890, projects: 1 },
  { name: "Jun", amount: 2390, projects: 4 },
  { name: "Jul", amount: 3490, projects: 2 }
];
const sectorData = [
  { name: "FinTech", value: 400 },
  { name: "HealthTech", value: 300 },
  { name: "SaaS", value: 300 },
  { name: "CleanTech", value: 200 }
];
const COLORS = ["#3B82F6", "#2DD4BF", "#F59E0B", "#EF4444"];
const PortfolioAnalytics = () => {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in mb-8">{
    /* Sector Distribution */
  }<Card className="border-none shadow-sm bg-white overflow-hidden group"><CardHeader className="flex justify-between items-center bg-gray-50/50 p-6 border-b border-gray-100"><div className="flex items-center gap-3"><div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:rotate-12 transition-transform"><PieIcon size={20} /></div><h3 className="font-bold text-gray-900">Sector Distribution</h3></div><span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">Overall Portfolio</span></CardHeader><CardBody className="h-80 p-4"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie
    data={sectorData}
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={80}
    paddingAngle={5}
    dataKey="value"
    animationDuration={1500}
    animationBegin={200}
  >{sectorData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip
    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
  /><Legend verticalAlign="bottom" height={36} /></PieChart></ResponsiveContainer></CardBody></Card>{
    /* Funding History */
  }<Card className="border-none shadow-sm bg-white overflow-hidden group"><CardHeader className="flex justify-between items-center bg-gray-50/50 p-6 border-b border-gray-100"><div className="flex items-center gap-3"><div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:scale-110 transition-transform"><BarChart3 size={20} /></div><h3 className="font-bold text-gray-900">Funding Overview</h3></div><div className="flex items-center gap-1 text-[11px] font-bold text-green-600"><TrendingUp size={14} /><span>+12.4%</span></div></CardHeader><CardBody className="h-80 p-4"><ResponsiveContainer width="100%" height="100%"><AreaChart data={fundingData}><defs><linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} /><Tooltip
    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
  /><Area
    type="monotone"
    dataKey="amount"
    stroke="#2563EB"
    strokeWidth={3}
    fillOpacity={1}
    fill="url(#colorAmt)"
    animationDuration={2e3}
  /></AreaChart></ResponsiveContainer></CardBody></Card></div>;
};
export {
  PortfolioAnalytics
};
