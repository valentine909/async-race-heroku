import { createHTMLElement } from '../util/createElements';
import Pagination from './Pagination';
import './Winners.css';
import { CarProperties, SortVariants, WinnerProperties } from '../types/types';
import Car from './Car';
import { MyCustomEvent } from '../presenter/CustomEvents';

class Winners {
  private readonly winners: HTMLElement;

  private readonly pagination: Pagination;

  private readonly winnersNumber: HTMLElement;

  private readonly pageNumber: HTMLElement;

  private readonly tbody: HTMLElement;

  private readonly winnersPerPage: number;

  private readonly sortableHeaders: HTMLElement[];

  constructor() {
    this.winners = createHTMLElement('section', 'winners');
    this.pagination = new Pagination('winners');
    this.winnersNumber = createHTMLElement('h2', 'winners__counter', 'Winners (0)');
    this.pageNumber = createHTMLElement('h3', 'winners__page-number', `Page #${1}`);
    this.winnersPerPage = 10;
    this.tbody = createHTMLElement('tbody', 'winners__table_body');
    this.sortableHeaders = [];
    this.winners.append(
      this.winnersNumber,
      this.pageNumber,
      this.createTable(),
      this.pagination.render(),
    );
  }

  createTable() {
    const table = createHTMLElement('table', 'winners__table');
    ['10%', '30%', '30%', '15%', '15%'].forEach((width) => {
      const col = createHTMLElement('col');
      col.setAttribute('width', width);
      table.append(col);
    });
    const header = this.createTableHeader();
    table.append(header, this.tbody);
    return table;
  }

  createTableHeader() {
    const headerProperties = {
      id: { name: 'ID', sortable: true },
      car: { name: 'Car', sortable: false },
      name: { name: 'Name', sortable: false },
      wins: { name: 'Wins', sortable: true },
      time: { name: 'Best Time', sortable: true },
    };
    const header = createHTMLElement('thead', 'winners__table_header');
    const row = createHTMLElement('tr');
    Object.entries(headerProperties).forEach(([key, value]) => {
      let className = `header-${key}`;
      if (value.sortable) {
        className += ' sortable';
      }
      if (key === 'id') {
        className += ' active-sort';
      }
      const th = createHTMLElement('th', className, value.name);
      if (value.sortable) {
        Winners.addSortListener(th, key as SortVariants);
        this.sortableHeaders.push(th);
      }
      row.append(th);
    });
    header.append(row);
    return header;
  }

  static addSortListener(element: HTMLElement, variant: SortVariants) {
    element.addEventListener('click', () => {
      element.dispatchEvent(MyCustomEvent('sort', {
        variant,
      }));
    });
  }

  toggleDescending(name: SortVariants) {
    this.sortableHeaders.forEach((element) => {
      if (element.classList.contains(`header-${name}`)) {
        element.classList.toggle('descending');
      }
    });
  }

  changeSort(name: SortVariants) {
    this.sortableHeaders.forEach((element) => {
      if (element.classList.contains('active-sort')) {
        element.classList.remove('active-sort');
      }
      if (element.classList.contains('descending')) {
        element.classList.remove('descending');
      }
    });
    this.sortableHeaders.forEach((element) => {
      if (element.classList.contains(`header-${name}`)) {
        element.classList.add('active-sort');
      }
    });
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
