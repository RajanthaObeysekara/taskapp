import { cleanEnv } from "envalid";
import { str, port } from 'envalid/dist/validators'

const env = cleanEnv(process.env, {
    MONGO_CONNECTION_URL: str(),
    PORT: port()
})

export default env