import './Car.css';
import path from "./car_svg_path";
import {createNSElement, setAttributes} from "../util/createElements";

class Car {
  private readonly carSVG: SVGElement;
  private readonly id: number;
  private name: string;
  constructor(color: string, name: string, id: number) {
    this.name = name;
    this.id = id;
    this.carSVG = this.createCar();
    this.changeColor(color);
  }

  private createCar() {
    const svgAttributes = {
      class: 'carSVG',
      id: this.id,
      width: "1280.000000pt",
      height: "640.000000pt",
      viewBox: "0 0 1280.000000 540.000000",
    }
    const gAttributes = {
      transform: "translate(0.000000,640.000000) scale(0.1000,-0.1000)",
      fill: "#000000",
      stroke: "black",
      'stroke-width': "50",
      'stroke-linecap': "square",
    }
    const svg = createNSElement("svg");
    setAttributes(svg, svgAttributes);
    const g = createNSElement("g");
    setAttributes(g, gAttributes);
    path.forEach(path => {
      const p = createNSElement("path");
      p.setAttribute('d', path);
      g.append(p);
    })
    svg.append(g);
    return svg;
  }

  changeColor(color: string) {
    const path = this.carSVG.querySelector('path') as SVGPathElement;
    path.setAttribute('fill', color);
  }

  changeName(name: string) {
    this.name = name;
  }

  renderCar() {
    return this.carSVG;
  }

  moveCar(offset: string) {
    this.carSVG.style.left = `${offset}%`;
  }

  resetCarPosition() {
    this.carSVG.style.left = '0';
  }
}

export default Car;
