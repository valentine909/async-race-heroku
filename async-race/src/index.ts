import './style.css';
import Garage from "./views/Garage";
import GarageManager from "./models/GarageManager";
import Controller from "./controller/Controller";
import Router from "./router/Router";
import Winners from "./views/Winners";

(async ()=> {
  const garageManager = new GarageManager();
  const garage = new Garage();
  const winners = new Winners();
  const controller = new Controller(garageManager, garage);
  await controller.init();
  const router = new Router();
  router.addPath('garage', garage.render());
  router.addPath('winners', winners.render());
  router.init('garage');
})();
