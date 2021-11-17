import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cmToFtInches from '../../utils/cm-to-ft-inches.js';

// load environment variables
dotenv.config('.evn');

export default () => async (id) => {
  try {
    const url = `${process.env.API_URL}/people/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    const result = {
      ...data,
      height: {
        cm: data.height,
        ft_inches: cmToFtInches(data.height),
      },
    };
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
