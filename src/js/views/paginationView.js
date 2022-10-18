import View from "./view.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // Store value of btn dataset
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    // Amount of results items / by the amount of items to show per pagination (eg. 45/10 = 4.5 pages)
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page 1, and no other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupNext(currentPage);
    }

    // Other pages
    if (currentPage < numPages) {
      return `
        ${this._generateMarkupNext(currentPage)}
        ${this._generateMarkupPrev(currentPage)}
      `;
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPrev(currentPage);
    }

    return '';
  }

  _generateMarkupNext(page) {
    return `
      <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span> Page ${page + 1}</span>
      </button>
    `;
  }

  _generateMarkupPrev(page) {
    return `
      <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span> Page ${page - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
