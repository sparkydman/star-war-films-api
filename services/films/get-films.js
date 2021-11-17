import dotenv from 'dotenv';
import fetch from 'node-fetch';
import commentDD from '../../db/comment.js';

// load environment variables
dotenv.config('.evn');
const key = `${process.env.API_URL}/films`;

export default () => async () => {
  try {
    // get all the star wars films
    const response = await fetch(key);
    const data = await response.json();
    const getResults = data.results.map(async (res, i) => ({
      name: res.title,
      opening_crawl: res.opening_crawl,
      comment_count: +(await commentDD.getCommentsCount(i + 1)),
      release_date: res.release_date,
    }));

    const results = await Promise.all(getResults);

    return {
      ...data,
      results,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
