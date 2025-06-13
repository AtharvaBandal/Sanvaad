// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import authRouter from './routes/authRouter.js';
// import messageRouter from './routes/messageRouter.js';
// import userRouter from './routes/userRouter.js';
// import connectToMongoDB from './db/connect.js';
// import { app, server } from './sockets/sockets.js';

// // Load environment variables
// dotenv.config();

// const __dirname = path.resolve();
// const PORT = process.env.PORT || 3001;

// // CORS configuration
// app.use(cors({
//     origin: 'http://localhost:3000', // Replace with your frontend's URL
//     credentials: true, // Allow cookies to be sent
// }));

// app.use(express.json());
// app.use(cookieParser());


// // API routes
// app.use('/api/auth', authRouter);
// app.use('/api/messages', messageRouter);
// app.use('/api/users', userRouter);

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });

// // Start server
// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server running on port ${PORT}`);
// });
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import messageRouter from './routes/messageRouter.js';
import userRouter from './routes/userRouter.js';
import connectToMongoDB from './db/connect.js';
import { app, server } from './sockets/sockets.js';

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3001;

// CORS config
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

// Serve React frontend
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// ✅ Wait for DB before starting server
const startServer = async () => {
  try {
    await connectToMongoDB();
    console.log('✅ MongoDB connected');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1); // Optional: Stop the server if DB is down
  }
};

startServer();

