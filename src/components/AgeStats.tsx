
import { Heart, Calendar, Clock, Activity } from "lucide-react";
import { UserData } from "@/pages/Index";
import { getAgeFacts } from "@/utils/healthRecommendations";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AgeStatsProps {
  userData: UserData;
}

const AgeStats = ({ userData }: AgeStatsProps) => {
  const facts = getAgeFacts(userData.age);

  // Create pie chart data based on life stages
  const totalExpectedYears = 80; // Average life expectancy
  const yearsLived = userData.age.years;
  const yearsRemaining = Math.max(0, totalExpectedYears - yearsLived);

  const pieData = [
    {
      name: "Years Lived",
      value: yearsLived,
      fill: "#22c55e",
      icon: "heart"
    },
    {
      name: "Years Ahead",
      value: yearsRemaining,
      fill: "#3b82f6",
      icon: "calendar"
    }
  ];

  const chartConfig = {
    "Years Lived": {
      label: "Years Lived",
      color: "#22c55e",
    },
    "Years Ahead": {
      label: "Years Ahead", 
      color: "#3b82f6",
    },
  };

  return (
    <div className="space-y-6">
      {/* Life Progress Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Life Journey Progress
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-64 h-64">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Years Lived: {yearsLived}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Years Ahead: {yearsRemaining}</span>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              You've completed {Math.round((yearsLived / totalExpectedYears) * 100)}% of your expected life journey. 
              Make every moment count! 🌟
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Days */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Days Lived</h3>
              <p className="text-2xl font-bold text-pink-600">{userData.age.totalDays.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Every day is a gift! 🎁</p>
        </div>

        {/* Next Birthday */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Next Birthday</h3>
              <p className="text-2xl font-bold text-purple-600">{facts.daysToNextBirthday}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">days to go! 🎂</p>
        </div>

        {/* Life Stage */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Life Stage</h3>
              <p className="text-2xl font-bold text-teal-600">{facts.lifeStage}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{facts.stageMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default AgeStats;
