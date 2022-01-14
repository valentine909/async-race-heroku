import './style.css';
import Car from "./views/Car";

const car = new Car('red', 'Tesla');
const root = document.querySelector('body') as HTMLElement;
root.append(car.renderCar());
let offset = 0;
const move = setInterval(() => {
  if (offset < 100) {
    offset += 0.25;
    car.moveCar(`${offset}`);
  } else {
    clearInterval(move);
  }
}, 25)
