
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, Edit2 } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { calculateAge } from "@/utils/ageCalculations";
import { UserData } from "@/pages/Index";

interface AgeCalculatorProps {
  onAgeCalculated: (data: UserData) => void;
  userData?: UserData | null;
  onEdit?: () => void;
}

const AgeCalculator = ({ onAgeCalculated, userData, onEdit }: AgeCalculatorProps) => {
  const [birthDate, setBirthDate] = useState<Date>();
  const [dateText, setDateText] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(!userData);

  useEffect(() => {
    if (userData) {
      setBirthDate(userData.birthDate);
      setDateText(format(userData.birthDate, "yyyy-MM-dd"));
      setName(userData.name || "");
      setIsEditing(false);
    } else {
      // Load saved data
      const saved = localStorage.getItem('ageCalculatorData');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          const savedDate = new Date(data.birthDate);
          setBirthDate(savedDate);
          setDateText(format(savedDate, "yyyy-MM-dd"));
          setName(data.name || "");
        } catch (error) {
          console.log("Error loading saved data:", error);
        }
      }
    }
  }, [userData]);

  const handleDateTextChange = (value: string) => {
    setDateText(value);
    
    // Try to parse the date from text input
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate) && parsedDate <= new Date()) {
        setBirthDate(parsedDate);
      }
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setBirthDate(date);
      setDateText(format(date, "yyyy-MM-dd"));
      setIsOpen(false);
    }
  };

  const handleCalculate = () => {
    if (!birthDate) return;

    const age = calculateAge(birthDate);
    const userData: UserData = {
      birthDate,
      age,
      name: name.trim() || undefined
    };

    onAgeCalculated(userData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (onEdit) onEdit();
  };

  if (userData && !isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Your Information</h3>
            <p className="text-sm text-gray-600">
              {userData.name && `Name: ${userData.name} • `}
              Born: {format(userData.birthDate, "PPP")}
            </p>
          </div>
          <Button
            onClick={handleEdit}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {userData ? "Edit Your Information" : "Let's Get Started"}
        </h2>
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

        {/* Birth Date Input - Text Field */}
        <div className="space-y-2">
          <Label htmlFor="birthdate-text" className="text-sm font-medium text-gray-700">
            Date of Birth * (Type or Select)
          </Label>
          <Input
            id="birthdate-text"
            type="date"
            value={dateText}
            onChange={(e) => handleDateTextChange(e.target.value)}
            max={format(new Date(), "yyyy-MM-dd")}
            min="1900-01-01"
            className="w-full h-12"
          />
        </div>

        {/* Birth Date Picker - Calendar */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Or Select from Calendar
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
                onSelect={handleCalendarSelect}
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
        <div className="flex gap-3">
          <Button
            onClick={handleCalculate}
            disabled={!birthDate}
            className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {userData ? "Update Information" : "Calculate My Age & Get Health Tips"}
          </Button>
          {userData && (
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="h-12 px-6"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
