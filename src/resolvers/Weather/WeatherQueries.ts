import axios, { AxiosResponse } from "axios";
import { createWeatherQueryURL } from "../../utils/utilFunctions";

type Places = {
    [key: number]: string;
}

export const getWeatherByPlaceId = async (parent: any, {id}: any, context: any, info: any) => {
    try {
        const places: Places  ={
            1: "London",
            2: "Paris",
            3: "Berlin",
            4: "New York",
            5: "Los Angeles",
            6: "Tokyo",
            7: "Sydney",
            8: "Mexico City",
            9: "Lima",
            10: "Buenos Aires",
            22: "Queretaro",
        }
    
        const requestUrl = createWeatherQueryURL(places[id]);
    
        const response:AxiosResponse = await axios.get(requestUrl);
        console.log(response.data.days);

        const currentWeather = {
            location: response.data.resolvedAddress,
            currentDesc: response.data.description,
            currentConditions: response.data.currentConditions,
            maxTemp: response.data.days[0].tempmax,
            minTemp: response.data.days[0].tempmin,
        }
       
    
        return  currentWeather;
        
    } catch (error) {
        console.error(error);
        throw new Error("Error getting weather data");
        
    }
};

export const getWeatherByPlaceName = async (parent: any, {name}: any, context: any, info: any) => {
    try {
        const requestUrl = createWeatherQueryURL(name);
    
        const response:AxiosResponse = await axios.get(requestUrl);
        console.log(response.data.days);

        const currentWeather = {
            location: response.data.resolvedAddress,
            currentDesc: response.data.description,
            currentConditions: response.data.currentConditions,
            maxTemp: response.data.days[0].tempmax,
            minTemp: response.data.days[0].tempmin,
        }
       
    
        return  currentWeather;
        
    } catch (error) {
        console.error(error);
        throw new Error("Error getting weather data from place name");
    }
};