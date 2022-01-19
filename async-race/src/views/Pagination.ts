import {createHTMLElement} from "../util/createElements";
import {MyCustomEvent} from "../controller/CustomEvents";
import './Pagination.css';

class Pagination {
  private readonly prevButton: HTMLElement;
  private readonly nextButton: HTMLElement;
  private readonly pageName: string;
  constructor(pageName: string) {
    this.pageName = pageName;
    this.prevButton = this.getPrevButton();
    this.nextButton = this.getNextButton();
  }

  render() {
    const pagination = createHTMLElement('div', 'nav pagination');
    pagination.append(this.prevButton, this.nextButton);
    return pagination;
  }

  getPrevButton() {
    const prevButton = createHTMLElement('button', 'pagination__previous', 'Prev');
    prevButton.addEventListener('click', () => {
      prevButton.dispatchEvent(MyCustomEvent(`${this.pageName}-pagination`, {
        currentPage: -1,
      }))
    })
    return prevButton;
  }

  getNextButton() {
    const nextButton = createHTMLElement('button', 'pagination__next', 'Next');
    nextButton.addEventListener('click', () => {
      nextButton.dispatchEvent(MyCustomEvent(`${this.pageName}-pagination`, {
        currentPage: +1,
      }))
    })
    return nextButton;
  }

  disablePrev(disable = true) {
    if (disable && !this.prevButton.classList.contains('disabled')) {
      this.prevButton.classList.add('disabled');
    }
    if (!disable) {
      this.prevButton.classList.remove('disabled');
    }
  }

  disableNext(disable = true) {
    if (disable && !this.nextButton.classList.contains('disabled')) {
      this.nextButton.classList.add('disabled');
    }
    if (!disable) {
      this.nextButton.classList.remove('disabled');
    }
  }
}

export default Pagination;
