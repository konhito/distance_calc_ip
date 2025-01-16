import express from "express";
import fetch from "node-fetch";
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors());

const myLocation = { lat: 31.326, lon: 75.5762 };

app.post("/distance", async (req, res) => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log(data);
    const userIp = data.ip;

    const locationResponse = await fetch(`http://ip-api.com/json/${userIp}`);
    const locationData = await locationResponse.json();
    console.log(locationData);
    const userLocation = {
      lat: locationData.lat,
      lon: locationData.lon,
    };

    const distance = calculateDistance(myLocation, userLocation);

    res.json({ distance: distance, locationData, myLocation, data });
  } catch (error) {
    res.status(500).json({ error: "Error fetching IP or geolocation" });
  }
});

app.post("");

function calculateDistance(coord1, coord2) {
  const R = 6371;
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLon = (coord2.lon - coord1.lon) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

app.listen(port, () => {
  console.log("Server started on port", port);
});
