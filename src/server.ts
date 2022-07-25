import app from "./index.js";
import dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log('server on');
});