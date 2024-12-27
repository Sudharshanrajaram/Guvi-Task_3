import React, { useState } from 'react';
import axios from 'axios';
import { JitsiMeeting } from '@jitsi/react-sdk';

const CreateMeeting = () => {
  const [topic, setTopic] = useState('');
  const [start_time, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [meetingDetails, setMeetingDetails] = useState(null);

  const createMeeting = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-meeting', {
        topic,
        start_time,
        duration
      });
      setMeetingDetails(response.data);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };
  const YOUR_DOMAIN = 'zoom.us';
  
  return (
    <div>
      <h1>Create Zoom Meeting</h1>
      <input 
        type="text" 
        placeholder="Meeting Topic" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)} 
      />
      <input 
        type="datetime-local" 
        value={start_time} 
        onChange={(e) => setStartTime(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Duration in minutes" 
        value={duration} 
        onChange={(e) => setDuration(e.target.value)} 
      />
      <button onClick={createMeeting}>Create Meeting</button>

      {meetingDetails && (
        <div>
          <p>Meeting Created!</p>
          <p>Join URL: <a href={meetingDetails.join_url}>{meetingDetails.join_url}</a></p>
        </div>
      )}
    </div>
  );
};

export default CreateMeeting;
