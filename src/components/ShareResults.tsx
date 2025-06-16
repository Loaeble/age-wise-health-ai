
import { useState } from "react";
import { Share, Copy, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserData } from "@/pages/Index";
import { getHealthRecommendations } from "@/utils/healthRecommendations";
import { toast } from "@/hooks/use-toast";

interface ShareResultsProps {
  userData: UserData;
}

const ShareResults = ({ userData }: ShareResultsProps) => {
  const [copied, setCopied] = useState(false);
  const recommendations = getHealthRecommendations(userData.age.years);

  const generateShareText = () => {
    const name = userData.name ? `${userData.name} is` : "I'm";
    return `🎂 ${name} ${userData.age.years} years old (${userData.age.totalDays.toLocaleString()} days lived)!\n\n💪 My AI-recommended health plan:\n🥗 Diet: ${recommendations.diet.keyFoods.slice(0, 3).join(", ")}\n🏃‍♀️ Exercise: ${recommendations.exercise.activities[0]}\n\nCalculate your age & get personalized health tips! 🌟`;
  };

  const copyToClipboard = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Share your results with friends and family.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Copy failed",
        description: "Please try again or select the text manually.",
        variant: "destructive",
      });
    }
  };

  const shareNative = async () => {
    const text = generateShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Age & Health Recommendations",
          text: text,
        });
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-8 text-white text-center">
      <div className="flex items-center justify-center mb-4">
        <Heart className="w-8 h-8 text-white mr-2" />
        <h2 className="text-2xl font-bold">Share Your Health Journey</h2>
      </div>
      
      <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
        Inspire others to take charge of their health! Share your personalized recommendations and age insights.
      </p>

      <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-6 text-left max-w-2xl mx-auto">
        <p className="text-sm text-purple-100 whitespace-pre-line">
          {generateShareText()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={shareNative}
          className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Results
        </Button>
        
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? "Copied!" : "Copy Text"}
        </Button>
      </div>
    </div>
  );
};

export default ShareResults;
