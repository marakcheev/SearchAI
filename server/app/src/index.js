const DatabaseService = require('./utils/databaseService');
const GptService = require('./utils/gptService');

const express = require('express');

const cors = require('cors');

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

const db = new DatabaseService();

app.post('/gpt', async(request, response)=>{
    const bodyData = request.body;
    
    try {
        const gptResult = await GptService.callGpt(bodyData);
        
        response.status(200).json(gptResult);
    } catch (e){
        response.status(500).json(`brick tebe 8==D :| ${e}`);
    }

});

// app.post('/gpt/more', async(request, response)=>{
//     const bodyData = request.body;
    
//     try {
//         const gptResult = await GptService.callGpt(bodyData);
//         response.status(200).json(gptResult);
//     } catch (e){
//         response.status(500).json(`brick tebe 8==D :| ${e}`);
//     }

// });

async function startServer() {
    try {
        await db.connect();

        // Handle server shutdown gracefuly.
        process.on("SIGINT", () => {
            console.log("[server]: Shutting down gracefully.");
            db.close();
        });

        app.listen(port, () => {
            console.log(`[server]: running on port ${port}`);
        });
    }
    catch (err) {
        console.error(`[server]: ${err}`)
        process.exit(1);
    }
}

startServer();