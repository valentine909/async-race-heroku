import { Route } from "../types/types";
import Default404 from "./404";

class Router {
  private readonly routes: Route[];
  private readonly root: HTMLElement;
  constructor() {
    this.root = document.querySelector('#app') as HTMLElement;
    this.routes = [{path: '404', content: new Default404().render()}];
  }

  addPath(path: string, page: HTMLElement) {
    this.routes.push({path: path, content: page})
  }

  getURL() {
    return window.location.hash.slice(1);
  }

  setURL(path: string) {
    window.location.hash = path;
  }

  parseRoute() {
    const url = this.getURL();
    const route = this.routes.find((r) => r.path === url) as Route;
    return route ? route : this.routes[0];
  }

  renderRoute() {
    const route = this.parseRoute();
    this.root.innerHTML = '';
    this.root.append(route.content);
  }

  init(startPath: string) {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.setURL(startPath);
    this.renderRoute();
  }
}

export default Router;
