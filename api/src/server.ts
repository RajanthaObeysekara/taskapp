
import app from './app'
import mongoose from 'mongoose';
import env from "./util/validateEnv"

// starting database connection
mongoose.connect(env.MONGO_CONNECTION_URL).then(() => {
    console.log('server has connected to the database')
})

// starting server 
app.listen(env.PORT, () => {
    console.log(`server is working on PORT ${env.PORT}`);
})