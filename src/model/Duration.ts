export const WEEKS_PER_MONTH: number = +(365 / 7 / 12).toFixed(1);

export enum DurationUnit {
    SECONDS = "seconds",
    MINUTES = "minutes",
    HOURS = "hours",
    DAYS = "days",
    MONTHS = "months",
    YEARS = "years"
}

export class Duration {

    value: number;
    unit: DurationUnit;
    valid: boolean;

    constructor(hours: number, workHoursPerDay: number) {
        let value: number;
        let unit: DurationUnit;
    
        // Seconds or minutes
        if(hours <= 1) {
    
            const minutes: number = hours * 60;
    
            if(+(minutes.toFixed(0)) > 0) {
                value = Math.ceil(minutes);
                unit = DurationUnit.MINUTES;
            } else {
                value = Math.ceil(minutes * 60);
                unit = DurationUnit.SECONDS;
            }
        }
        // Hours
        else if (hours < workHoursPerDay) {
            value = +(hours).toFixed(1)
            unit = DurationUnit.HOURS;
        }
        // Days, months or years
        else {
    
            const days = +(hours / workHoursPerDay).toFixed(1);
            const months = +(days / 30).toFixed(2);
    
            // Days
            if(days <= 30) {
    
                value = days;
                unit = DurationUnit.DAYS;
            } 
            // Months
            else if (months < 12) {
    
                value = months;
                unit = DurationUnit.MONTHS;
            } 
            // Years
            else {
                
                value = +(months / 12).toFixed(1);
                unit = DurationUnit.YEARS;
            }
        }
    
        return {
            value: value,
            unit: unit,
            valid: value > 0 && value != Infinity
        };
    }
}