import APIManager from './APIManager';
import { AllCars, CarProperties } from '../types/types';

class GarageManager extends APIManager {
  constructor() {
    super();
    this.endpoint += 'garage';
  }

  getCars(page: number, limit = 7): Promise<void | AllCars> {
    const endpointModifier = `?_page=${page}&_limit=${limit}`;
    return fetch(this.endpoint + endpointModifier, { method: 'GET' })
      .then((res) => ({
        totalCars: res.headers.get('X-Total-Count') || '',
        cars: res.json() as Promise<CarProperties[]>,
      } as AllCars))
      .catch((error) => console.error(error));
  }

  createCar(name: string, color: string): Promise<void | number> {
    const endpointModifier = '';
    return fetch(this.endpoint + endpointModifier, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    })
      .then((res) => res.status)
      .catch((error) => console.error(error));
  }

  deleteCar(customId: number): Promise<void> {
    const endpointModifier = `/${customId}`;
    return fetch(this.endpoint + endpointModifier, { method: 'DELETE' })
      .then((res) => res.json())
      .catch((error) => console.error(error));
  }

  updateCar(name: string, color: string, id: number): Promise<void> {
    const endpointModifier = `/${id}`;
    return fetch(this.endpoint + endpointModifier, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    })
      .then((res) => res.json())
      .catch((error) => console.error(error));
  }
}

export default GarageManager;
