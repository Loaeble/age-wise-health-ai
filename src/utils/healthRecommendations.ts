
import { AgeBreakdown, getDaysToNextBirthday } from "./ageCalculations";

export interface HealthRecommendation {
  diet: {
    category: string;
    description: string;
    keyFoods: string[];
  };
  exercise: {
    description: string;
    activities: string[];
  };
  screenings: {
    description: string;
    tests: string[];
  };
}

export interface AgeFacts {
  daysToNextBirthday: number;
  lifeStage: string;
  stageMessage: string;
}

export const getHealthRecommendations = (age: number): HealthRecommendation => {
  if (age <= 12) {
    return {
      diet: {
        category: "Growing Child Nutrition",
        description: "Focus on calcium and protein-rich foods to support rapid growth and bone development.",
        keyFoods: ["Milk", "Cheese", "Lean meats", "Eggs", "Fruits", "Vegetables", "Whole grains"]
      },
      exercise: {
        description: "Encourage active play and sports to develop motor skills and build healthy habits.",
        activities: [
          "60+ minutes of active play daily",
          "Swimming lessons",
          "Bike riding",
          "Team sports",
          "Dancing or gymnastics"
        ]
      },
      screenings: {
        description: "Regular pediatric checkups to monitor growth and development.",
        tests: [
          "Annual wellness visits",
          "Vision and hearing tests",
          "Dental checkups every 6 months",
          "Immunization updates"
        ]
      }
    };
  } else if (age <= 19) {
    return {
      diet: {
        category: "Teen Growth & Development",
        description: "High iron and vitamin D intake to support growth spurts and hormonal changes.",
        keyFoods: ["Leafy greens", "Red meat", "Fish", "Dairy", "Nuts", "Fortified cereals", "Citrus fruits"]
      },
      exercise: {
        description: "Build strength and endurance while establishing lifelong fitness habits.",
        activities: [
          "60 minutes of activity daily",
          "Strength training 2-3x/week",
          "Team or individual sports",
          "Cardio activities",
          "Flexibility exercises"
        ]
      },
      screenings: {
        description: "Monitor development and establish baseline health metrics.",
        tests: [
          "Annual physical exams",
          "Blood pressure monitoring",
          "Cholesterol screening",
          "Mental health assessments",
          "Skin cancer awareness"
        ]
      }
    };
  } else if (age <= 39) {
    return {
      diet: {
        category: "Young Adult Optimization",
        description: "Balanced macronutrients with focus on establishing healthy eating patterns for life.",
        keyFoods: ["Lean proteins", "Complex carbs", "Healthy fats", "Colorful vegetables", "Berries", "Nuts", "Fish"]
      },
      exercise: {
        description: "Build and maintain peak physical fitness with varied training approaches.",
        activities: [
          "150+ minutes moderate cardio/week",
          "Strength training 2-3x/week",
          "High-intensity interval training",
          "Flexibility and mobility work",
          "Recreational sports"
        ]
      },
      screenings: {
        description: "Establish baseline health metrics and screen for emerging risk factors.",
        tests: [
          "Annual physical exams",
          "Blood pressure and cholesterol",
          "Diabetes screening",
          "Cancer screenings (based on family history)",
          "Mental health checkups"
        ]
      }
    };
  } else if (age <= 59) {
    return {
      diet: {
        category: "Midlife Wellness & Prevention",
        description: "Focus on heart health, metabolism support, and disease prevention through nutrition.",
        keyFoods: ["Salmon", "Avocados", "Berries", "Leafy greens", "Whole grains", "Legumes", "Olive oil"]
      },
      exercise: {
        description: "Maintain strength and flexibility while adapting to changing metabolism.",
        activities: [
          "150+ minutes moderate exercise/week",
          "Strength training for bone health",
          "Low-impact cardio",
          "Balance and flexibility work",
          "Stress-reducing activities like yoga"
        ]
      },
      screenings: {
        description: "Comprehensive preventive care to catch issues early and maintain quality of life.",
        tests: [
          "Annual comprehensive physicals",
          "Colonoscopy screening",
          "Mammograms/prostate exams",
          "Bone density tests",
          "Cardiovascular assessments"
        ]
      }
    };
  } else {
    return {
      diet: {
        category: "Senior Health & Vitality",
        description: "Low-sodium, heart-healthy foods with focus on maintaining muscle mass and cognitive function.",
        keyFoods: ["Fish", "Berries", "Nuts", "Leafy greens", "Low-fat dairy", "Whole grains", "Lean proteins"]
      },
      exercise: {
        description: "Gentle, consistent movement to maintain independence and prevent falls.",
        activities: [
          "30+ minutes daily gentle exercise",
          "Balance and fall prevention exercises",
          "Swimming or water aerobics",
          "Walking programs",
          "Chair exercises and stretching"
        ]
      },
      screenings: {
        description: "Regular monitoring for age-related conditions and medication management.",
        tests: [
          "Comprehensive geriatric assessments",
          "Cognitive function tests",
          "Fall risk evaluations",
          "Medication reviews",
          "Regular specialist consultations"
        ]
      }
    };
  }
};

export const getAgeFacts = (age: AgeBreakdown): AgeFacts => {
  const daysToNextBirthday = getDaysToNextBirthday(new Date()); // This would need the actual birth date
  
  let lifeStage = "";
  let stageMessage = "";
  
  if (age.years <= 12) {
    lifeStage = "Childhood";
    stageMessage = "Growing and learning! 🌱";
  } else if (age.years <= 19) {
    lifeStage = "Teenager";
    stageMessage = "Building your identity! 🚀";
  } else if (age.years <= 39) {
    lifeStage = "Young Adult";
    stageMessage = "Prime time for adventures! ✨";
  } else if (age.years <= 59) {
    lifeStage = "Midlife";
    stageMessage = "Wisdom meets experience! 🎯";
  } else {
    lifeStage = "Golden Years";
    stageMessage = "Living life to the fullest! 🌟";
  }
  
  return {
    daysToNextBirthday: Math.ceil(Math.random() * 365), // Placeholder - would calculate actual
    lifeStage,
    stageMessage
  };
};
