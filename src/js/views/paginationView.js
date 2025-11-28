import { _ } from "core-js";
import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(direction, curPage) {
    return `
      <button class="btn--inline pagination__btn--${direction}" data-goto="${
      direction === "prev" ? curPage - 1 : curPage + 1
    }">
        ${
          direction === "prev"
            ? `<svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>`
            : `<span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>`
        }
      </button>
    `;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupButton("next", curPage);

    // last page
    if (curPage === numPages && numPages > 1)
      return this._generateMarkupButton("prev", curPage);

    // other page
    if (curPage < numPages)
      return (
        this._generateMarkupButton("prev", curPage) +
        this._generateMarkupButton("next", curPage)
      );

    // page 1, and there are NO other pages
    return "";
  }
}
export default new PaginationView();
