import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cmToFtInches from '../../utils/cm-to-ft-inches.js';

// load environment variables
dotenv.config('.evn');
let url = `${process.env.API_URL}/people`;

export default () => async (query) => {
  try {
    const acceptableField = ['name', 'height', 'gender'];

    // prevent sorting with other fields
    if (query?.sort && !acceptableField.includes(query?.sort))
      throw new Error(`Sorting with ${query.sort} is not allow`);

    if (query?.page) {
      url = `${process.env.API_URL}/people/?page=${query.page}`;
    }
    // get all the star wars films
    const response = await fetch(url);
    const data = await response.json();
    let newData =
      query?.sort && acceptableField.includes(query?.sort)
        ? {
            ...data,
            results: data.results
              .map((res) => ({
                ...res,
                height: {
                  cm: res.height,
                  ft_inches: cmToFtInches(res.height),
                },
              }))
              .sort((a, b) => {
                let value_a = a[query.sort],
                  value_b = b[query.sort];
                if (query?.sort === 'height') {
                  value_a = +value_a;
                  value_b = +value_b;
                } else {
                  value_a = a[query.sort].toLowerCase();
                  value_b = b[query.sort].toLowerCase();
                }

                if (value_a > value_b) {
                  return query?.order === 'desc' ? -1 : 1;
                }
                if (value_a < value_b) {
                  return query?.order === 'desc' ? 1 : -1;
                }
                return 0;
              }),
          }
        : data;
    return newData;
  } catch (err) {
    throw new Error(err.message);
  }
};
