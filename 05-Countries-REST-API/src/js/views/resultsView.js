'use strict';

import View from './View.js';
import icons from 'url:../../img/icons.svg';

/********************
 *
 *
 *
 *
 *********************/

class ResultsView extends View {
  _parentElement = document.querySelector('.main-container');
  _errormessage = 'No countries found for your query, please try again! 😁';
  _message = '';

  /*

  */
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  /*

 */
  _generateMarkupPreview(result) {
    return `
    <div class="countries">
      <article class="country">
      <img class="country__img" src="${result.flag}" />
        <div class="country__data">
          <h3 class="country__name">${result.name}</h3>
          <h4 class="country__region">${
            result.capital ? result.capital : ' '
          }</h4>
          <p class="country__row"><span>👫</span>${
            result.population > 999999
              ? (+result.population / 1000000).toFixed(1) + ' Million'
              : (+result.population / 1000).toFixed(1) + ' Thousand'
          }</p>
          <p class="country__row"><span>🗣️</span>${
            result.languages ? result.languages : 'Not Found'
          }</p>
          <p class="country__row"><span>💰</span>${
            result.currencies ? result.currencies : 'Not Found'
          }</p>
          <p class="country__row">
            <a href="${result.maps}" target="_blank"><span>🌎</span>Map</a>
          </p>        
        </div>
      </article>
    </div>
  `;
  }
}

export default new ResultsView();
