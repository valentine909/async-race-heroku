import { Route } from '../types/types';
import Default404 from './404';

class Router {
  private readonly routes: Route[];

  private readonly root: HTMLElement;

  constructor() {
    this.root = document.querySelector('#app') as HTMLElement;
    this.routes = [{ path: '404', content: new Default404().render() }];
  }

  addPath(path: string, page: HTMLElement) {
    this.routes.push({ path, content: page });
  }

  parseRoute() {
    const url = window.location.hash.slice(1);
    const route = this.routes.find((r) => r.path === url) as Route;
    return route || this.routes[0];
  }

  renderRoute() {
    const route = this.parseRoute();
    this.root.innerHTML = '';
    this.root.append(route.content);
  }

  init(startPath: string) {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    window.location.hash = startPath;
    this.renderRoute();
  }
}

export default Router;
