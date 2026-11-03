export function calculateSavings({currentCost,sharedCost,tripsPerDay,daysPerWeek,weeksPerMonth=4}) {
  const values=[currentCost,sharedCost,tripsPerDay,daysPerWeek,weeksPerMonth];
  if(values.some(v=>!Number.isFinite(v)||v<0)) throw new Error('Ingresa valores válidos y no negativos.');
  if(currentCost>1000||sharedCost>1000||!Number.isInteger(tripsPerDay)||tripsPerDay<1||tripsPerDay>4||!Number.isInteger(daysPerWeek)||daysPerWeek<1||daysPerWeek>7||weeksPerMonth<1||weeksPerMonth>5) throw new Error('Revisa los límites de tu estimación.');
  const trips=tripsPerDay*daysPerWeek*weeksPerMonth;
  const currentMonthly=Math.round(currentCost*trips*100)/100;
  const sharedMonthly=Math.round(sharedCost*trips*100)/100;
  const difference=Math.round((currentMonthly-sharedMonthly)*100)/100;
  return {trips,currentMonthly,sharedMonthly,difference,percent:currentMonthly>0?Math.round(difference/currentMonthly*100):0};
}
export const money=n=>new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN',maximumFractionDigits:2}).format(n);
export const institutionalEmail=email=>/^[^\s@]+@(?:[a-z0-9-]+\.)*(?:[a-z0-9-]+\.edu\.pe|upn\.pe|usil\.pe)$/i.test(email.trim());
