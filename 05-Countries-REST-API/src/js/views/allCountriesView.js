'use strict';

import View from './View.js';

/********************
 *
 *
 *
 *
 *********************/

class AllCountriesView extends View {
  _parentEl = [
    document.querySelector('#all-countries'),
    document.querySelector('#africa'),
    document.querySelector('#americas'),
    document.querySelector('#asia'),
    document.querySelector('#europe'),
    document.querySelector('#oceania'),
    document.querySelector('#South-America'),
    document.querySelector('#North-America'),
    document.querySelector('#Central-America'),
    document.querySelector('#Southern-Europe'),
    document.querySelector('#Eastern-Asia'),
    document.querySelector('#english'),
    document.querySelector('#mandarin'),
    document.querySelector('#spanish'),
    document.querySelector('#french'),
    document.querySelector('#arabic'),
    document.querySelector('#dollar'),
    document.querySelector('#european-euro'),
    document.querySelector('#japanese-yen'),
    document.querySelector('#british-pound'),
    document.querySelector('#swiss-france'),
  ];
  state;

  addHandlerRender(handler) {
    this._parentEl.map((el) =>
      el.addEventListener('click', function (e) {
        e.preventDefault();
        handler(el.value);
      })
    );
  }
}

export default new AllCountriesView();
