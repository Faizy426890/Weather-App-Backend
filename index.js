import express from 'express'; 
import dotenv from 'dotenv';  
import { clerkWebhook } from './src/routes/userRoute.js';  
import bodyParser from 'body-parser';     
import { registerCoach } from './src/routes/coach.js';
import {setRole} from './src/routes/setRole.js' 
import { tournament } from './src/routes/tournaments.js';  
import { deepseek } from './src/routes/games.js'; 
import { session } from './src/routes/session.js';

import connectDB from './src/Connection/DBconnect.js';   
import cors from 'cors'
dotenv.config();
const corsOptions = {
  origin: '*'
};

const app = express();   
app.use(cors(corsOptions)); 
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use('/api/webhook/clerk', bodyParser.raw({ type: '*/*' }));
app.get('/', (req, res) => {
  res.send('Server is running!');
});  
app.use('/api',setRole)  
app.use('/api',tournament) 
app.use('/api',registerCoach)
app.use('/api',deepseek) 
app.use('/api',session)



app.use('/api', clerkWebhook);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`) 
});    


