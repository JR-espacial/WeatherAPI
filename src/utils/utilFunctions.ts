

export function createWeatherQueryURL(location: string, date1?:Date, date2?:Date) {
    const API_KEY = process.env.WEATHER_API_KEY;
    const BASE_URL = process.env.WEATHER_API_URL;

    if(!API_KEY){
        throw new Error("Weather API key not found");
    }

    if(!BASE_URL){
        throw new Error("Weather API URL not found");
    }

    let url = '';

    //format the dates to yyyy-MM-dd
    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    if(date1 || date2){
        if(!date1 || !date2){
            throw new Error("Both dates must be provided");
        }
        const date1Str = formatDate(date1);
        const date2Str = formatDate(date2);
        // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

        url = `${BASE_URL}${location}/${date1Str}/${date2Str}?key=${API_KEY}`;
    }else{
        url = `${BASE_URL}${location}?key=${API_KEY}`;
    }

    return url;
}