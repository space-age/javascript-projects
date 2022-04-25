'use strict';

import { async } from 'regenerator-runtime';
import { API_URL_NAME, API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

/********************
 *
 *  model.js loads the country by receiving an id
 *
 *
 *********************/

export const state = {
  country: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

/*
  Will not return anything
  Fetches data from API
  Updates state.country to the new data collected from API
*/
export const loadCountry = async function (id) {
  try {
    const newData = await getJSON(`${API_URL_NAME}/${id}`);
    const data = newData[0];

    state.country = {
      flag: data.flags.png,
      name: data.name.common,
      capital: data.capital,
      population: data.population,
      languages: Object.values(data.languages)[0],
      currencies: data.currencies[Object.keys(data.currencies)[0]].name,
      maps: data.maps.googleMaps,
    };
    console.log(state.country);
  } catch (err) {
    throw err;
  }
};

/*
  Gets a query then loads the data from the API,
  stores the results into the object state and array search.results
*/
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    console.log(`${API_URL}/${query}`);
    const data = await getJSON(`${API_URL}/${query}`);
    console.log(data);
    state.search.results = data.map((rec) => {
      return {
        flag: rec.flags.png,
        name: rec.name.common,
        capital: typeof rec.capital !== 'undefined' ? rec.capital : null,
        population: rec.population,
        languages:
          typeof rec.languages !== 'undefined'
            ? Object.values(rec.languages)[0]
            : null,
        currencies:
          typeof rec.currencies !== 'undefined'
            ? rec.currencies[Object.keys(rec.currencies)[0]].name
            : null,
        maps: rec.maps.googleMaps,
      };
    });
  } catch (err) {
    throw err;
  }
};

/*

*/
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  console.log(page);
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
