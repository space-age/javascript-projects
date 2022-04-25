'use strict';

import * as model from './model.js';
import countryView from './views/countryView.js';
import searchView from './views/searchView.js';
import allCountriesView from './views/allCountriesView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

/********************
 *
 * Bridge between model and views
 * Handles UI events and dispatches tasks to model and view
 *
 *********************/

/*
  Controls the Countries
*/
const controlCountries = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    countryView.renderSpinner();

    // 1) loading recipe
    await model.loadCountry(id);

    // 2)rendering the recipe
    countryView.render(model.state.country);
  } catch (err) {
    console.log(err);
    countryView.renderError();
  }
};

/*
 Uses searchView to search for query and load the results
*/
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = `name/${searchView.getQuery()}`;
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
};

/*

*/
const controlAllCountries = async function (newQuery) {
  try {
    resultsView.renderSpinner();

    const query = newQuery;
    console.log(query);

    // 1) Load All countries
    await model.loadSearchResults(query);

    // 2) Render Results
    resultsView.render(model.getSearchResultsPage(1));

    // 3) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
};

/*

*/
const controlPagination = function (goToPage) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW Pagination buttons
  paginationView.render(model.state.search);
  window.scroll(0, 0); //pushes window to the top
};

/***************************************************************************************************/

/*
  Main Function
*/
const init = function () {
  //Listens for windows(haschange and load)
  countryView.addHandlerRender(controlCountries);

  // Listens for All countries button clicked
  allCountriesView.addHandlerRender(controlAllCountries);

  //Listens for submit in the search input field, then executes controlSearchResults
  searchView.addHandlerSearch(controlSearchResults);

  // Listens for pagination changes
  paginationView.addHandlerClick(controlPagination);
};

// Initializes the Program
init();
