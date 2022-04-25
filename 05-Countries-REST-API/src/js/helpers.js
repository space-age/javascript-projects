'use strict';

import { TIMEOUT_SEC } from './config.js';

/********************
 *
 *  Goal of this module is to contain a couple of functions
 *  that we re-use over and over in the project
 *
 *
 *********************/

/*
 Returns a new Promise, 
 which will reject after a  certain number of seconds
*/
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/*
 Gets the JSON data and returns the data
 If timeout() finishes firts, then outputs an error of time out
*/
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url); //fetches the data in the API_URL
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json(); //converts to JSON

    if (!res.ok) throw new Error(`Error! 😥 (res.status)`);

    return data;
  } catch (err) {
    throw err;
  }
};
