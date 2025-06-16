
export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

export const calculateAge = (birthDate: Date): AgeBreakdown => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  // Calculate total days
  const timeDiff = today.getTime() - birth.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // Calculate years, months, days
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  // Adjust if current date is before birthday this year
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  
  // Adjust days if negative
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust months if negative after day adjustment
  if (months < 0) {
    months += 12;
  }
  
  return {
    years,
    months,
    days,
    totalDays
  };
};

export const getDaysToNextBirthday = (birthDate: Date): number => {
  const today = new Date();
  const thisYear = today.getFullYear();
  let nextBirthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate());
  
  // If birthday has passed this year, calculate for next year
  if (nextBirthday < today) {
    nextBirthday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate());
  }
  
  const timeDiff = nextBirthday.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
