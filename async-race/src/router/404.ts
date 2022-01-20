import { createHTMLElement } from '../util/createElements';

class Default404 {
  private readonly error: HTMLElement;

  constructor() {
    this.error = createHTMLElement('div', 'error', 'No such page found');
  }

  render() {
    return this.error;
  }
}

export default Default404;
