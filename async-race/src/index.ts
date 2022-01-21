import './style.css';
import Garage from './views/Garage';
import GarageManager from './models/GarageManager';
import GaragePresenter from './presenter/GaragePresenter';
import Router from './router/Router';
import Winners from './views/Winners';
import WinnerPresenter from './presenter/WinnerPresenter';
import RaceManager from './models/RaceManager';
import WinnerManager from './models/WinnerManager';

(async () => {
  const garageManager = new GarageManager();
  const raceManager = new RaceManager();
  const winnerManager = new WinnerManager();

  const garage = new Garage();
  const winners = new Winners();

  const garagePresenter = new GaragePresenter(garageManager, raceManager, garage);
  await garagePresenter.init();
  const winnerPresenter = new WinnerPresenter(garageManager, winnerManager, garage, winners);
  await winnerPresenter.init();

  const router = new Router();
  router.addPath('garage', garage.render());
  router.addPath('winners', winners.render());
  router.init('garage');
})();
