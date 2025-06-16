
import { useState } from "react";
import AgeCalculator from "@/components/AgeCalculator";
import HealthRecommendations from "@/components/HealthRecommendations";
import AgeStats from "@/components/AgeStats";
import ShareResults from "@/components/ShareResults";

export interface UserData {
  birthDate: Date;
  age: {
    years: number;
    months: number;
    days: number;
    totalDays: number;
  };
  name?: string;
}

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAgeCalculated = (data: UserData) => {
    setUserData(data);
    setIsEditing(false);
    // Save to localStorage
    localStorage.setItem('ageCalculatorData', JSON.stringify(data));
  };

  const handleReset = () => {
    setUserData(null);
    setIsEditing(false);
    localStorage.removeItem('ageCalculatorData');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Smart Age Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your exact age and get personalized health & diet recommendations tailored to your life stage
          </p>
        </div>

        {(!userData || isEditing) ? (
          <AgeCalculator 
            onAgeCalculated={handleAgeCalculated} 
            userData={userData}
            onEdit={handleEdit}
          />
        ) : (
          <div className="space-y-8">
            {/* Editable Age Calculator Summary */}
            <AgeCalculator 
              onAgeCalculated={handleAgeCalculated} 
              userData={userData}
              onEdit={handleEdit}
            />

            {/* Age Display */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-blue-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                You are {userData.age.years} years old!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                That's exactly {userData.age.years} years, {userData.age.months} months, and {userData.age.days} days
              </p>
              <button 
                onClick={handleReset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Start Over
              </button>
            </div>

            {/* Age Stats with Chart */}
            <AgeStats userData={userData} />

            {/* Health Recommendations */}
            <HealthRecommendations userData={userData} />

            {/* Share Results */}
            <ShareResults userData={userData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
