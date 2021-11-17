import dotenv from 'dotenv';
import fetch from 'node-fetch';
import commentDD from '../../db/comment.js';

// load environment variables
dotenv.config('.evn');

export default () => async (id) => {
  try {
    const url = `${process.env.API_URL}/films/${id}`;

    // get all the star wars films
    const response = await fetch(url);
    const data = await response.json();
    const result = {
      name: data.title,
      opening_crawl: data.opening_crawl,
      comment_count: +(await commentDD.getCommentsCount(id)),
      release_date: data.release_date,
    };
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
