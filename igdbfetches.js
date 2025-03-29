import express from "express";
import axios from "axios";
import cors from "cors";


const app = express();
const PORT = 5000;
const TWITCH_CLOUD_ID = '6vtspaf98lx532egnt6r1r5zy99ii7';
const TWITCH_SECRET = 'bhch53q25kdq1w61d8fd2prt20ajhl';
const CLIENT_ID = TWITCH_CLOUD_ID;
const CLIENT_SECRET = TWITCH_SECRET;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const getAccessToken = async () => {
  const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  try {
    const response = await axios.post(tokenUrl);
    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
};
const fetchGenresFromIGDB = async (genresList = []) => {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;
  
    const headers = {
        'Accept': 'application/json',
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
   
    };
    const IGDB_API_URL = "https://api.igdb.com/v4/genres";
    let query = `
    fields name, slug;

    `;
}
const accessToken = await getAccessToken();

    
    fetch(
        "https://api.igdb.com/v4/genres",
        { method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Client-ID': CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`,
          },
          body: "fields checksum,created_at,name,slug,updated_at,url;"
      })
        .then(response => {
            console.log(response.json());
        })
        .catch(err => {
            console.error(err);
        });