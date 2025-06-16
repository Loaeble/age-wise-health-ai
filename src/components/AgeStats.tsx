
import { Heart, Calendar, Clock } from "lucide-react";
import { UserData } from "@/pages/Index";
import { getAgeFacts } from "@/utils/healthRecommendations";

interface AgeStatsProps {
  userData: UserData;
}

const AgeStats = ({ userData }: AgeStatsProps) => {
  const facts = getAgeFacts(userData.age);

  return (
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
  );
};

export default AgeStats;
