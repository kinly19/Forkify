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

  _generateMarkup() { 
    return `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST25" required name="title" type="text" />
        <label>URL</label>
        <input value="TEST25" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TEST25" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value="0.5,kg,Rice"
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="src/img/icons.svg#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `
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