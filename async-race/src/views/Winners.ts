import { createHTMLElement } from '../util/createElements';
import Pagination from './Pagination';
import './Winners.css';
import { CarProperties, WinnerProperties } from '../types/types';
import Car from './Car';

class Winners {
  private readonly winners: HTMLElement;

  private readonly pagination: Pagination;

  private readonly winnersNumber: HTMLElement;

  private readonly pageNumber: HTMLElement;

  private readonly tbody: HTMLElement;

  private readonly winnersPerPage: number;

  constructor() {
    this.winners = createHTMLElement('section', 'winners');
    this.pagination = new Pagination('winners');
    this.winnersNumber = createHTMLElement('h2', 'winners__counter', 'Winners (0)');
    this.pageNumber = createHTMLElement('h3', 'winners__page-number', `Page #${1}`);
    this.winnersPerPage = 10;
    this.tbody = createHTMLElement('tbody', 'winners__table_body');
    this.winners.append(
      this.winnersNumber,
      this.pageNumber,
      this.createTable(),
      this.pagination.render(),
    );
  }

  createTable() {
    const table = createHTMLElement('table', 'winners__table');
    const headers = ['ID', 'Car', 'Name', 'Wins', 'Best Time'];
    const header = createHTMLElement('thead', 'winners__table_header');
    const row = createHTMLElement('tr');
    headers.forEach((head) => {
      const th = createHTMLElement('th', `header-${head.split(' ')[0]}`, head);
      row.append(th);
    });
    header.append(row);
    table.append(header, this.tbody);
    return table;
  }

  updateTable(cars: CarProperties[], winners: WinnerProperties[]) {
    this.tbody.innerHTML = '';
    for (let i = 0; i < cars.length; i += 1) {
      const row = createHTMLElement('tr') as HTMLTableRowElement;
      const { id } = winners[i];
      [id, cars[i].name, winners[i].wins, `${(winners[i].time).toFixed(3)} s`].forEach((value) => {
        const td = createHTMLElement('td', '', value.toString());
        row.append(td);
      });
      Winners.insertCarSVG(row, cars[i].color, id);
      this.tbody.append(row);
    }
  }

  static insertCarSVG(row: HTMLTableRowElement, color: string, id: number) {
    const svg = new Car(color, id).renderCar();
    svg.classList.remove('carSVG');
    svg.classList.add('car-model');
    const svgContainer = createHTMLElement('td', 'svg-wrapper');
    svgContainer.append(svg);
    row.insertBefore(svgContainer, (row.firstChild?.nextSibling as HTMLElement));
  }

  getWinnersPerPage() {
    return this.winnersPerPage;
  }

  updateWinnersNumber(num: string) {
    this.winnersNumber.innerHTML = `Winners (${num})`;
  }

  updatePageNumber(num: string) {
    this.pageNumber.innerHTML = `Page #${num}`;
  }

  disablePrevButton(flag: boolean) {
    this.pagination.disablePrev(flag);
  }

  disableNextButton(flag: boolean) {
    this.pagination.disableNext(flag);
  }

  render() {
    return this.winners;
  }
}

export default Winners;
