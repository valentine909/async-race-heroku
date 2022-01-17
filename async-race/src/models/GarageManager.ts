import APIManager from "./APIManager";
import { AllCars, CarProperties } from "../types/types";

class GarageManager extends APIManager{
  constructor() {
    super();
    this.endpoint += 'garage';
  }

  async getCar(customId: number): Promise<void | CarProperties> {
    const endpointModifier = `?id=${customId}`;
    try {
      const res = await fetch(this.endpoint + endpointModifier, { method: "GET" });
      const json = await res.json();
      return json[0] as CarProperties;
    } catch (error) {
      console.log(error);
    }
  }

  getCars(page: number, limit = 7): Promise<void | AllCars> {
    const endpointModifier = `?_page=${page}&_limit=${limit}`;
    return fetch(this.endpoint + endpointModifier, { method: "GET" })
      .then(res => {
        return {
          totalCars: res.headers.get("X-Total-Count") || "",
          cars: res.json() as Promise<CarProperties[]>,
        } as AllCars;
      })
      .catch(error => console.log(error));
  }

  createCar(name: string, color: string): Promise<void> {
    const endpointModifier = '';
    return fetch(this.endpoint + endpointModifier, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: name, color: color})})
      .then(res => console.log(res.status, res.json()))
      .catch(error => console.log(error));
  }

  deleteCar(customId: number): Promise<void> {
    const endpointModifier = `/${customId}`;
    return fetch(this.endpoint + endpointModifier, { method: "DELETE" })
      .then(res => {
        console.log(res.status);
      })
      .catch(error => console.log(error));
  }

  updateCar(name: string, color: string, id: number): Promise<void> {
    const endpointModifier = `/${id}`;
    return fetch(this.endpoint + endpointModifier, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: name, color: color})})
      .then(res => console.log(res.status, res.json()))
      .catch(error => console.log(error));
  }
}

export default GarageManager;
