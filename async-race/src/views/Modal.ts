import './Modal.css';
import { createHTMLElement } from '../util/createElements';

class Modal {
  private readonly modal: HTMLElement;

  private readonly p: HTMLElement;

  constructor(parent: HTMLElement) {
    this.modal = createHTMLElement('div', 'modal');
    this.p = createHTMLElement('p', 'modal__text');
    const ok = createHTMLElement('button', 'modal__ok', 'OK');
    this.modal.append(this.p, ok);
    ok.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    parent.append(this.modal);
    this.modal.style.display = 'none';
  }

  setText(winner: string) {
    this.p.innerText = winner;
  }

  show() {
    this.modal.style.display = 'flex';
  }
}

export default Modal;
