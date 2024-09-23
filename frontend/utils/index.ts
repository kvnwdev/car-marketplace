import { CarProps } from "@/types";

/**
 * calculateCarRent
 * Calculate the rental rate per day for a car based on its MPG in the city and manufacturing year
 * @param city_mpg Car MPG in the city
 * @param year Car manufacturing year
 * @returns number
 */
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export async function fetchCars() {
  const BASE_ENDPOINT = process.env.APIENDPOINT_CARS;
  const headers: Record<string, string> = {
    "X-RapidAPI-Key": process.env.APIKEY_CARS || "",
    "X-RapidAPI-Host": process.env.APIHOST_CARS || "",
  };

  const REQUEST_URL = `${BASE_ENDPOINT}/cars?model=&make=Porsche&year=2023&fuel_type=&limit=`;

  const response = await fetch(REQUEST_URL, { headers: headers });

  const result = await response.json();

  return result;
}

export const generateCarImageUrl = (angle?: string) => {
  // We do not have access to an API that gives access to car images, so instead
  // we will be using public/porsche-{thumb,back,front,top}.webp images for all cars

  const imageAngle = angle ? angle : "thumb";
  var imageUrl = "/porsche-";
  switch (imageAngle) {
    case "thumb":
      imageUrl += "thumb.webp";
      break;
    case "back":
      imageUrl += "back.webp";
      break;
    case "front":
      imageUrl += "front.webp";
      break;
    case "top":
      imageUrl += "top.webp";
      break;
    default:
      imageUrl += "thumb.webp";
      break;
  }

  return imageUrl;
};
