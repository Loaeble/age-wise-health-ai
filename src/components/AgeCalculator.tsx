
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { calculateAge } from "@/utils/ageCalculations";
import { UserData } from "@/pages/Index";

interface AgeCalculatorProps {
  onAgeCalculated: (data: UserData) => void;
}

const AgeCalculator = ({ onAgeCalculated }: AgeCalculatorProps) => {
  const [birthDate, setBirthDate] = useState<Date>();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved data
    const saved = localStorage.getItem('ageCalculatorData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBirthDate(new Date(data.birthDate));
        setName(data.name || "");
      } catch (error) {
        console.log("Error loading saved data:", error);
      }
    }
  }, []);

  const handleCalculate = () => {
    if (!birthDate) return;

    const age = calculateAge(birthDate);
    const userData: UserData = {
      birthDate,
      age,
      name: name.trim() || undefined
    };

    onAgeCalculated(userData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's Get Started</h2>
        <p className="text-gray-600">Enter your details to receive personalized health insights</p>
      </div>

      <div className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Your Name (Optional)
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Birth Date Picker */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Date of Birth *
          </Label>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !birthDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate ? format(birthDate, "PPP") : <span>Pick your birth date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={(date) => {
                  setBirthDate(date);
                  setIsOpen(false);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          disabled={!birthDate}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Calculate My Age & Get Health Tips
        </Button>
      </div>
    </div>
  );
};

export default AgeCalculator;
