import './style.css';
import Garage from "./views/Garage";
import GarageManager from "./models/GarageManager";
import Controller from "./controller/Controller";

(async ()=> {
  const root = document.querySelector('#app') as HTMLElement;
  const garageManager = new GarageManager();
  const garage = new Garage();
  const controller = new Controller(root, garageManager, garage);
  await controller.init();
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
