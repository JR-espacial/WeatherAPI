import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getWeatherByPlaceId(id: Int!): CurrentWeather!
  }


  type CurrentWeather {
    location: String!
    currentDesc: String!
    currentConditions: WeatherConditions!
    maxTemp: Float!
    minTemp: Float!
  }

  type WeatherConditions {
    datetime: String
    datetimeEpoch: Int
    temp: Float
    feelslike: Float
    humidity: Float
    dew: Float
    precip: Float
    precipprob: Float
    snow: Float
    snowdepth: Float
    preciptype: [String]
    windgust: Float
    windspeed: Float
    winddir: Int
    pressure: Int
    visibility: Float
    cloudcover: Float
    solarradiation: Float
    solarenergy: Float
    uvindex: Int
    conditions: String
    icon: String
    stations: [String]
    source: String
    sunrise: String
    sunriseEpoch: Int
    sunset: String
    sunsetEpoch: Int
    moonphase: Float
  }
`;


