import app from "./server.js"
import mongodb, { MongoClient } from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
dotenv.config()

const mongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        useNewUrlParser: true,  
        useUnifiedTopology: true, 
        wtimeout: 2500
    }
)
.catch(err =>{
    console.error(err.stack)
    process.exit(1)
})
.then(async client =>{
    await RestaurantsDAO.injectDB(client)
    app.listen(port , ()=>{
        console.log(`listening on port ${port}`)
    })
})

