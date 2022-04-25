'use strict';

import View from './View.js';

import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import { runInThisContext } from 'vm';

/********************
 *
 *
 *
 *
 *********************/

class CountryView extends View {
  _parentElement = document.querySelector('.main-container');
  _errorMessage = 'We could not find that country. Please try another one!';
  _message = '';

  /*
    Handles the haschange and load Event listeners
  */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  /*
    Private Method
    returns the HTML that is generated with the data from model.state.country
  */
  _generateMarkup() {
    return `
    <div class="countries">
      <article class="country">
      <img class="country__img" src="${this._data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${this._data.name}</h3>
          <h4 class="country__region">${
            typeof this._data.capital !== 'undefined' ? this._data.capital : ' '
          }</h4>
          <p class="country__row"><span>👫</span>${
            this._data.population > 999999
              ? (+this._data.population / 1000000).toFixed(1) + ' Million'
              : (+this._data.population / 1000).toFixed(1) + ' Thousand'
          }</p>
          <p class="country__row"><span>🗣️</span>${
            typeof this._data.languages !== 'undefined'
              ? this._data.languages
              : 'Not Found'
          }</p>
          <p class="country__row"><span>💰</span>${
            typeof this._data.currencies !== 'undefined'
              ? this._data.currencies
              : 'Not Found'
          }</p>
          <p class="country__row">
            <a href="${this._data.maps}" target="_blank"><span>🌎</span>Map</a>
          </p>        
        </div>
      </article>
    </div>
  `;
  }
}

export default new CountryView();
