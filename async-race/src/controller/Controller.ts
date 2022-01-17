import GarageManager from "../models/GarageManager";
import Garage from "../views/Garage";

class Controller {
  private model: GarageManager;
  private view: Garage;
  private root: HTMLElement;
  constructor(root: HTMLElement, garageManager: GarageManager, garage: Garage) {
    this.root = root;
    this.model = garageManager;
    this.view = garage;
    this.createHandler();
  }

   createHandler() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener('create-car', async (event: CustomEvent) => {
      await this.model.createCar(event.detail.name, event.detail.color);
      this.root.innerHTML = '';
      this.root.append(this.view.render());
    })
  }
}

export default Controller;
