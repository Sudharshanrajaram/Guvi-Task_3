const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const querystring = require('querystring');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const zoomClientId = process.env.ZOOM_CLIENT_ID;
const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET;
const zoomRedirectUri = process.env.ZOOM_REDIRECT_URI;

let zoomAccessToken = null;

app.get('/', (req, res) => {
    res.send('Zoom Video Call App');
});

// Step 1: Generate Zoom OAuth URL to authorize and get the code
app.get('/oauth', (req, res) => {
    const authUrl = `https://zoom.us/oauth/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: zoomClientId,
        redirect_uri: zoomRedirectUri,
    })}`;
    res.send(authUrl);
});

// Step 2: OAuth callback, exchange code for access token
app.get('/oauth/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://zoom.us/oauth/token', querystring.stringify({
            
            code,
            redirect_uri: zoomRedirectUri,
        }, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
          }));
        zoomAccessToken = response.data.access_token;
        res.send('Zoom OAuth access token obtained successfully.');
    } catch (error) {
        console.error('Error exchanging code for access token:', error);
        res.status(500).send('Error exchanging code for access token.');
    }
});

// Step 3: Create a Zoom meeting
app.post('/create-meeting', async (req, res) => {
    if (!zoomAccessToken) {
        return res.status(400).send('Zoom OAuth access token is required.');
    }

    try {
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic: req.body.topic || 'Zoom Meeting',
            type: 2, // Scheduled meeting
            start_time: req.body.startTime, // format: 'yyyy-MM-ddTHH:mm:ssZ'
            duration: req.body.duration || 30, // duration in minutes
            timezone: 'America/New_York',
            agenda: req.body.agenda || 'Zoom Meeting Agenda',
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                audio: 'voip',
            },
        }, {
            headers: {
                Authorization: `Bearer ${zoomAccessToken}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Zoom meeting');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
