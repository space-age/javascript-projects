'use strict';

/********************
 *
 *
 *
 *
 *********************/

class SearchView {
  _parentEl = document.querySelector('.input-form');

  /*
    Gets the query by grabbing the value entered by the user in the input search field
    returns that value
  */
  getQuery() {
    const query = this._parentEl.querySelector('.search-field').value;
    this._clearInput();
    return query;
  }

  /*
    Clears the Search field
  */
  _clearInput() {
    this._parentEl.querySelector('.search-field').value = '';
  }

  /*
    Executes controlSearchResults in the controller.js after
    user submits the input enterd in the search bar
  */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
