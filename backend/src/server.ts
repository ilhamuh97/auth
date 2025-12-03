import config from './config/config'; // Config first
import app from './app';
import { connectDB } from './db/db';

app.listen(config.port, () => {
    connectDB();
    console.log(`Server running on port ${config.port}`);
});