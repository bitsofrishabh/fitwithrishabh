import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRequireAuth } from "../lib/auth";
import {
  ArrowLeft,
  Calendar,
  Scale,
  TrendingDown,
  Target,
  User,
  MapPin,
  Phone,
  Mail,
  Activity,
  Heart,
  Zap,
  Award,
  Edit,
  X,
} from "lucide-react";
import { MONTHS, getDaysInMonth } from "../lib/months";
import { motion } from "framer-motion";

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  age?: number;
  city?: string;
  startDate: string;
  startWeight: number;
  goalWeight?: number;
  currentWeight?: number;
  notes: string;
  status: "active" | "inactive" | "yet-to-start" | "completed";
  weights: Record<string, Record<string, number>>;
  createdAt: any;
}

export default function ClientProfile() {
  useRequireAuth();
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]);
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      if (!id) return null;
      const docRef = doc(db, "clients", id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
        weights: data.weights || {},
      } as Client;
    },
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Client Not Found
            </h2>
            <Link
              to="/admin/clients"
              className="text-teal-600 hover:text-teal-800 font-semibold"
            >
              ← Back to Clients
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate health metrics
  const allWeights = Object.values(client.weights)
    .flatMap((monthWeights) => Object.values(monthWeights))
    .filter((weight) => weight > 0)
    .sort((a, b) => a - b);

  const currentWeight =
    allWeights.length > 0
      ? allWeights[allWeights.length - 1]
      : client.startWeight;
  const weightLoss = client.startWeight - currentWeight;
  const weightLossPercentage = (weightLoss / client.startWeight) * 100;
  const goalProgress = client.goalWeight
    ? ((client.startWeight - currentWeight) /
        (client.startWeight - client.goalWeight)) *
      100
    : 0;

  // Get status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Generate weight chart data
  const generateChartData = () => {
    const monthWeights = client.weights[selectedMonth] || {};
    const days = getDaysInMonth(selectedMonth);
    const data = [];

    for (let day = 1; day <= days; day++) {
      const weight = monthWeights[day.toString()];
      if (weight) {
        data.push({ day, weight });
      }
    }

    return data;
  };

  const chartData = generateChartData();

  // Create SVG chart
  const createWeightChart = () => {
    if (chartData.length === 0) return null;

    const width = 600;
    const height = 300;
    const padding = 40;

    const minWeight = Math.min(...chartData.map((d) => d.weight)) - 1;
    const maxWeight = Math.max(...chartData.map((d) => d.weight)) + 1;
    const minDay = 1;
    const maxDay = getDaysInMonth(selectedMonth);

    const xScale = (day: number) =>
      padding + ((day - minDay) * (width - padding * 2)) / (maxDay - minDay);

    const yScale = (weight: number) =>
      height -
      padding -
      ((weight - minWeight) * (height - padding * 2)) / (maxWeight - minWeight);

    const pathData = chartData
      .map(
        (d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.day)} ${yScale(d.weight)}`
      )
      .join(" ");

    return (
      <svg width={width} height={height} className="w-full h-auto">
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Chart area */}
        <rect
          x={padding}
          y={padding}
          width={width - padding * 2}
          height={height - padding * 2}
          fill="rgba(20, 184, 166, 0.05)"
          stroke="#e5e7eb"
        />

        {/* Weight line */}
        <path
          d={pathData}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {chartData.map((d, i) => (
          <g key={i}>
            <circle
              cx={xScale(d.day)}
              cy={yScale(d.weight)}
              r="6"
              fill="#14b8a6"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={xScale(d.day)}
              y={yScale(d.weight) - 15}
              textAnchor="middle"
              className="text-xs fill-gray-600 font-medium"
            >
              {d.weight}kg
            </text>
          </g>
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#6b7280"
          strokeWidth="2"
        />

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-sm fill-gray-600 font-medium"
        >
          Days in {selectedMonth}
        </text>
        <text
          x={20}
          y={height / 2}
          textAnchor="middle"
          transform={`rotate(-90 20 ${height / 2})`}
          className="text-sm fill-gray-600 font-medium"
        >
          Weight (kg)
        </text>
      </svg>
    );
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/clients"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Clients
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {client.name}
              </h1>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyle(
                    client.status
                  )}`}
                >
                  {client.status.charAt(0).toUpperCase() +
                    client.status.slice(1).replace("-", " ")}
                </span>
                <span className="text-gray-600">
                  Member since {new Date(client.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              {isEditing ? (
                <X className="w-4 h-4" />
              ) : (
                <Edit className="w-4 h-4" />
              )}
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Weight
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentWeight.toFixed(1)} kg
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Scale className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weight Loss</p>
                <p className="text-2xl font-bold text-gray-900">
                  {weightLoss.toFixed(1)} kg
                </p>
                <p className="text-sm text-green-600">
                  {weightLossPercentage.toFixed(1)}% reduction
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Goal Progress
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {goalProgress.toFixed(0)}%
                </p>
                {client.goalWeight && (
                  <p className="text-sm text-gray-600">
                    Target: {client.goalWeight} kg
                  </p>
                )}
              </div>

              <div className="p-3 bg-primary/10 rounded-full">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(client.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Client Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold">{client.name}</p>
                  </div>
                </div>

                {client.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{client.email}</p>
                    </div>
                  </div>
                )}

                {client.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold">{client.phone}</p>
                    </div>
                  </div>
                )}

                {client.age && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Age</p>
                      <p className="font-semibold">{client.age} years</p>
                    </div>
                  </div>
                )}

                {client.city && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">City</p>
                      <p className="font-semibold">{client.city}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Starting Weight</p>
                    <p className="font-semibold">{client.startWeight} kg</p>
                  </div>
                </div>

                {client.goalWeight && (
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Goal Weight</p>
                      <p className="font-semibold">{client.goalWeight} kg</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Health Insights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Health Insights
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-green-600" />
                    <span className="font-medium">BMI Status</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    {currentWeight < 25
                      ? "Healthy"
                      : currentWeight < 30
                      ? "Overweight"
                      : "Obese"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Progress Rate</span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {weightLoss > 0 ? "Excellent" : "Needs Attention"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">Motivation</span>
                  </div>

                  <span className="text-primary font-semibold">
                    {client.status === 'active' ? 'High' : 'Moderate'}

                  </span>
                </div>

                {goalProgress >= 50 && (
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">Achievement</span>
                    </div>
                    <span className="text-yellow-600 font-semibold">
                      Halfway There!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Weight Progress Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">
                  Weight Progress
                </h2>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  {MONTHS.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                {chartData.length > 0 ? (
                  <div className="overflow-x-auto">{createWeightChart()}</div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Scale className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No weight data available for {selectedMonth}</p>
                  </div>
                )}
              </div>

              {/* Weight Data Table */}
              {chartData.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">
                    Daily Weights - {selectedMonth}
                  </h3>
                  <div className="grid grid-cols-7 gap-2 text-sm">
                    {Array.from(
                      { length: getDaysInMonth(selectedMonth) },
                      (_, i) => i + 1
                    ).map((day) => {
                      const weight =
                        client.weights[selectedMonth]?.[day.toString()];
                      return (
                        <div
                          key={day}
                          className={`p-2 text-center rounded ${
                            weight
                              ? "bg-teal-50 text-teal-800 font-semibold"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          <div className="text-xs mb-1">Day {day}</div>
                          <div>{weight ? `${weight}kg` : "-"}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Notes & Observations
              </h2>
              {client.notes ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {client.notes}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No notes available for this client</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
