import express, { Express, Request, Response} from 'express'

import mongoose from 'mongoose';


import filmRoutes from './routes/filmRoutes'
import realisateurRoutes from './routes/realisateurRoutes'
import seanceRoutes from './routes/seanceRoutes'
 
const app: Express = express()
 
const PORT = 3001

const uri = "mongodb+srv://exemple:1234@cluster0.el9u4wr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 
async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log(error)
    }
}
run().catch(console.dir);

 
app.use(express.json())
app.use('/api/films', filmRoutes)
app.use('/api/realisateurs', realisateurRoutes)
app.use('/api/seances', seanceRoutes)
 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
