import express from 'express';
import dotenv from 'dotenv';
import filmRoutes from './routers/films.js';
import characterRoutes from './routers/characters.js';
import commentRoutes from './routers/comments.js';

// load environment variables
dotenv.config('.evn');

const app = express();

// add express json middleware
app.use(express.json());

// routes
app.use('/films', filmRoutes);
app.use('/characters', characterRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
