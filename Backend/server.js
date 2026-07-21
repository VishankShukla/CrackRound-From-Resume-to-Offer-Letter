require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const invokeGeminiApi = require('./src/services/ai.service');


connectDB();
invokeGeminiApi()


app.listen(3000,()=>{
    console.log("Server Running On Port 3000");
})