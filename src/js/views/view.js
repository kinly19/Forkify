import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  _errorMessage = "No recipes found for your query! Please try again";
  _messsage = "";

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @param {Boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @param {string} Markup Markup used to render into DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Kly
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError(); // This is where the controlSearchResults error comes from
    // Store data
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    
    // Render markup to DOM/clear inital markup
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update DOM with updated content
   * @param {Object} data Data to be updated into DOM
  */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert string markup into actual DOM Node object allowing us to compare changes (virtual DOM)
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log("%cCurrent DOM elements","color: orange")
    // console.log(curElements);
    // console.log("%cNew DOM elements","color: green")
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
        // console.log("????" , newEl.firstChild.nodeValue.trim())
      }

      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errMsg = this._errorMessage) {  // If no error message is passed in, use default
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errMsg}</p>
      </div>
    `;

    this._clearMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._messsage) {  // If no error message is passed in, use default
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clearMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  
  _clearMarkup() {
    this._parentElement.innerHTML = "";
  }
}