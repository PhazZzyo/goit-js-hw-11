export class Pagination {
  #currentPage = 1;

  constructor({ initialPage = 1, total, onChange }) {
    this.#currentPage = initialPage;
    this.total = total;
    this.onChange = onChange;
  }

  //   get currentPage() {
  //     return this.#currentPage;
  //   }

  //   set currentPage(value) {
  //     this.#currentPage = value;
  //     // опциональный вызов функции
  //     // if (this.onChange) {
  //     //   this.onChange(value);
  //     // }

  //     onChange?.(value);
  //   }

  nextPage() {
    if (this.currentPage === this.total) {
      return;
    }

    this.currentPage += 1;
  }
}
