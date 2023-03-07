'use restrict';

import app from './app.js';
import runSRV from './config/srv.js';
import connectDB from './config/db.js';

connectDB();

runSRV();
