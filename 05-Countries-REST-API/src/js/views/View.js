'use strict';

import icons from 'url:../../img/icons.svg';

/********************
 *
 * DEFAULT CLASS View
 *
 *
 *********************/

export default class View {
  _data;

  /*
    renders the data
  */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /*
    Private Method
    Clears the inner HTML for the #parentElement
  */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /*
  Render Spinner
  */
  renderSpinner = function () {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
       </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  /*
    Renders Error <p>${message}</p>
  */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href=${icons}#icon-alert-triangle></use>
          </svg>
        </div>
          <p>Country not found, please try again!</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /*
    Renders message
  */
  Message(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href=${icons}#icon-smile></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
