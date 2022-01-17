import './style.css';
import Garage from "./views/Garage";
import GarageManager from "./models/GarageManager";
import {AllCars} from "./types/types";
import Controller from "./controller/Controller";

(async ()=> {
  const root = document.querySelector('#app') as HTMLElement;
  const garageManager = new GarageManager();
  const allCars =  await garageManager.getCars(1) as AllCars;
  const garage = new Garage();
  const controller = new Controller(root, garageManager, garage);
  garage.updateRaceTrack(await allCars.cars);
  garage.updateCarsNumber(allCars.totalCars);
  garage.updatePageNumber('1');
  root.append(garage.render());
})();

// let offset = 0;
// const move = setInterval(() => {
//   if (offset < 100) {
//     offset += 0.25;
//     car.moveCar(`${offset}`);
//   } else {
//     clearInterval(move);
//   }
// }, 25)
