import View from "./view.js";
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _messsage = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  // Open/Closing modal
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor () {
    // Contructor will run handler below on render
    super();
    this._addHandlerToggleWindow();
    // this._addHandlerShowWindow();
    // this._addHandlerHideWindow();
  }

  toggleWindow () {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  // _addHandlerShowWindow() {
  //   this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  // }

  // _addHandlerHideWindow() {
  //   const elements = [this._btnClose, this._overlay];
  //   elements.forEach(el => el.addEventListener('click', this.toggleWindow.bind(this)));
  // }

  _addHandlerToggleWindow () {
    const elements = [this._btnOpen, this._btnClose, this._overlay];
    elements.forEach(el => el.addEventListener('click', this.toggleWindow.bind(this)));
  }

  addHandlerUpload (handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log(this)
      const dataArr = [...new FormData(this)] // this points to _parentElement
      
      // Remove white space
      dataArr.forEach(item => {
        item.splice(1, 1, item[1].trim());
        // item[1] = item[1].trim();
      })

      const data = Object.fromEntries(dataArr);
      handler(data);
      console.log("Upload handler");
    })
  }
}

export default new addRecipeView();