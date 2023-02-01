import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'; 


import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js"; 


import connectDB from "./mongodb/connect.js";
import mongodb_url from "./mongo.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/post', postRoutes); 
app.use('/api/v1/dalle', dalleRoutes);


app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})

const startServer = async () => {
    try {
        connectDB(mongodb_url)
        app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`));

    } catch (error) {
        console.log(error); 
    }
}

startServer();