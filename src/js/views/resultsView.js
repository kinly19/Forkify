import View from "./view.js";
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class resultsView extends View {
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join("");
  }
}

export default new resultsView();