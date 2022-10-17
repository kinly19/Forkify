import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  _errorrMessage = "No recipes found for your query! Please try again";
  _messsage = "";

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    // Store data
    this._data = data;
    // Remove inital markup
    this._clearMarkup();
    // Render markup to DOM
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}.svg#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errMsg = this._errorrMessage) {  // If no error message is passed in, use default
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}.svg#icon-alert-triangle"></use>
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
            <use href="${icons}.svg#icon-smile"></use>
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