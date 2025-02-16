import axios, { AxiosResponse } from "axios";
import { createWeatherQueryURL } from "../../utils/utilFunctions";
import redisClient from "../../redisClient";

type Places = {
    [key: number]: string;
}

// Create the cache expiration time (in seconds)
const CACHE_EXPIRATION_TIME = 60; // 1 minute

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

        // First, check if the weather data is in Redis cache
        const cachedWeather = await redisClient.get(name);
        
        if (cachedWeather) {
            console.log("Returning cached data.");
            return JSON.parse(cachedWeather); // Return cached data
        }

        // If not cached, make the API call
        console.log("Fetching data from the API.");
        const requestUrl = createWeatherQueryURL(name);
    
        const response:AxiosResponse = await axios.get(requestUrl);

        const currentWeather = {
            location: response.data.resolvedAddress,
            currentDesc: response.data.description,
            currentConditions: response.data.currentConditions,
            maxTemp: response.data.days[0].tempmax,
            minTemp: response.data.days[0].tempmin,
        }

        // Cache the fetched data in Redis for future requests
        await redisClient.set(name, JSON.stringify(currentWeather), CACHE_EXPIRATION_TIME);
       
    
        return  currentWeather;
        
    } catch (error) {
        console.error(error);
        throw new Error("Error getting weather data from place name");
    }
};