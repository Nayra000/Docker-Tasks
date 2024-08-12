const express = require('express');
const redis = require('redis');




const app = express();

const redisClient =  redis.createClient(
    {
        legacyMode: true ,
        host: 'redis',
        port: 6379
    }
);




app.get('/' ,(req , res) => {
    redisClient.get('numVisits' ,(err ,numVisits) => {
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        numVisits =parseInt(numVisits) || 0 ;
        const message = `Number of visits: ${++numVisits}`;
        redisClient.set('numVisits' ,numVisits);
        console.log(message);
        res.send(message);
    })
}) 


app.listen(5000 ,()=>{
    console.log('Server is running on port 5000');  // Server is listening on port 5000
})