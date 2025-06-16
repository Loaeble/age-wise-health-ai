
import { Apple, Dumbbell, Stethoscope } from "lucide-react";
import { UserData } from "@/pages/Index";
import { getHealthRecommendations } from "@/utils/healthRecommendations";

interface HealthRecommendationsProps {
  userData: UserData;
}

const HealthRecommendations = ({ userData }: HealthRecommendationsProps) => {
  const recommendations = getHealthRecommendations(userData.age.years);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Your Personalized Health Plan
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diet Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Diet Plan</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 font-medium">{recommendations.diet.category}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{recommendations.diet.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Foods:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendations.diet.keyFoods.map((food, index) => (
                  <span 
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Exercise Plan</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">{recommendations.exercise.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Recommended Activities:</h4>
              <ul className="space-y-2">
                {recommendations.exercise.activities.map((activity, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Health Screenings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Health Checkups</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">{recommendations.screenings.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Recommended Screenings:</h4>
              <ul className="space-y-2">
                {recommendations.screenings.tests.map((test, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    {test}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecommendations;
