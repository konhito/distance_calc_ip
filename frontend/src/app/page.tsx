"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const Page = () => {
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/distance");
        setCity(response.data.locationData.city);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCityData();
  }, []);

  return <div>City: {city || "Loading..."}</div>;
};

export default Page;
