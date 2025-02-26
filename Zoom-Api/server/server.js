const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

let zoomAccessToken = null;

app.get('/', (req, res) => {
    res.send('Zoom Video Call App');
});

// Step 1: Generate Zoom OAuth URL to authorize and get the code
app.get('/oauth', (req, res) => {
    const authUrl = `https://zoom.us/oauth/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: process.env.ZOOM_CLIENT_ID,
        redirect_uri: 'http://localhost:5000/oauth/callback',
    })}`;
    res.send(authUrl);
});

// Step 2: OAuth callback, exchange code for access token
app.get('/oauth/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://zoom.us/oauth/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:5000/oauth/callback',
        }), {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log('Received access token:', response.data.access_token);
        zoomAccessToken = response.data.access_token;
        res.json({ zoomAccessToken }).json({ message: 'Access token received successfully.' });
    } catch (error) {
        console.log('Error exchanging code for access token:', error.response ? error.response.data : error.message);
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
