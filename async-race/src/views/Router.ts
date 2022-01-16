import { Rout } from "../types/types";

class Router {
  routes: Rout[];
  private root: HTMLElement;
  private nav: HTMLElement;
  constructor(firstPage: HTMLElement, secondPage: HTMLElement, default404: HTMLElement) {
    this.root = document.querySelector('.main') as HTMLElement;
    this.nav = document.querySelector('.header__nav') as HTMLElement;
    this.routes = [
      { path: 'garage', content: firstPage },
      { path: 'winners', content: secondPage },
      { path: '404', content: default404 },
    ];
  }
  getURL() {
    return window.location.hash.slice(1);
  }

  renderRoute() {
    function isUndefined(z: Rout) {
      return typeof z === 'undefined';
    }
    const url = this.getURL();
    let route = this.routes.find((r) => r.path === url) as Rout;
    if (isUndefined(route)) {
      route = this.routes.find((r) => r.path === '404') as Rout;
    }
    this.root.innerHTML = '';
    this.root.append(route.content);
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }
}

export default Router;