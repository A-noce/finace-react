export enum TimeUnit {
    MILLISECOND = 0.001, 
    SECOND = 1,         
    MINUTE = 60,        
    HOUR = 3600,        
    DAY = 86400,        
    WEEK = 604800,      
    MONTH = 2628000,    
    YEAR = 31536000,    
  };
  export interface TimeConverterParams {value: number, unit?: TimeUnit, toUnit: TimeUnit}
  
  export const convertTime = ({ value, unit = 1, toUnit}:TimeConverterParams) => {
    const factor = unit / toUnit
    return factor * value
  }

  export const covertTimeHourDisplay = (value: number, unit?: TimeUnit) => {
    const valueInSeconds = convertTime({ value, unit, toUnit: TimeUnit.SECOND})
    const hour = Math.floor(valueInSeconds / 3600)
    const minutes = Math.floor((valueInSeconds - hour*3600) / 60)
    const seconds = valueInSeconds -hour*3600 -minutes*60
    const f = (n: number) => n.toString().padStart(2, '0')
    console.log(`${f(hour)}:${f(minutes)}:${f(seconds)}`)
  }