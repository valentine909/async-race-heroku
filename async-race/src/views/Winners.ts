import { createHTMLElement } from '../util/createElements';

class Winners {
  private readonly page: HTMLElement;

  constructor() {
    this.page = createHTMLElement('div', 'stub', 'Winner\'s Page');
  }

  render() {
    return this.page;
  }
}

export default Winners;
