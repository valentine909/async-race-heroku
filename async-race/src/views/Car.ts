import './Car.css';
import path from './car_svg_path';
import { createNSElement, setAttributes } from '../util/createElements';
import { MyCustomEvent } from '../presenter/CustomEvents';

class Car {
  private readonly carSVG: SVGElement;

  readonly id: number;

  private color: string;

  private animation: Animation;

  private listener: EventListener;

  private isOnRace: boolean;

  constructor(color: string, id: number) {
    this.id = id;
    this.color = color;
    this.carSVG = this.createCar();
    this.changeColor(color);
    this.animation = undefined as unknown as Animation;
    this.listener = undefined as unknown as EventListener;
    this.isOnRace = false;
  }

  private createCar() {
    const svgAttributes = {
      class: 'carSVG',
      id: this.id,
      width: '1280.000000pt',
      height: '640.000000pt',
      viewBox: '0 0 1280.000000 540.000000',
    };
    const gAttributes = {
      transform: 'translate(0.000000,640.000000) scale(0.1000,-0.1000)',
      fill: '#000000',
      stroke: 'black',
      'stroke-width': '50',
      'stroke-linecap': 'square',
    };
    const svg = createNSElement('svg');
    setAttributes(svg, svgAttributes);
    const g = createNSElement('g');
    setAttributes(g, gAttributes);
    path.forEach((pathString) => {
      const p = createNSElement('path');
      p.setAttribute('d', pathString);
      g.append(p);
    });
    svg.append(g);
    return svg;
  }

  changeColor(color: string) {
    const pathElement = this.carSVG.querySelector('path') as SVGPathElement;
    pathElement.setAttribute('fill', color);
  }

  renderCar() {
    return this.carSVG;
  }

  move(time: number) {
    this.animation = this.carSVG.animate([
      { left: '0' },
      { left: 'calc(100% - 160px' }], { duration: time, fill: 'forwards' });
    if (this.isOnRace) {
      this.addListener(time);
      this.isOnRace = false;
    }
  }

  prepareToRace() {
    this.isOnRace = true;
  }

  stop() {
    if (this.animation) {
      this.animation.pause();
    }
  }

  reset() {
    if (this.animation) {
      this.animation.cancel();
    }
  }

  addListener(time: number) {
    this.createEventListener(time);
    this.animation.addEventListener('finish', this.listener, { once: true });
  }

  createEventListener(time: number) {
    this.listener = () => {
      this.carSVG.dispatchEvent(MyCustomEvent('winner', {
        id: this.id,
        time,
      }));
    };
  }

  removeEventListener() {
    if (this.listener) {
      this.animation.removeEventListener('finish', this.listener);
    }
  }
}

export default Car;
