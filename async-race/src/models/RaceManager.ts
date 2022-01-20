import APIManager from './APIManager';
import { EngineStatus, RaceProperties, StatusCode } from '../types/types';

class RaceManager extends APIManager {
  constructor() {
    super();
    this.endpoint += 'engine';
  }

  startOrStop(customId:number, status: EngineStatus): Promise<RaceProperties> {
    const endpointModifier = `?id=${customId}&status=${status}`;
    return fetch(this.endpoint + endpointModifier, { method: 'PATCH' })
      .then((res) => res.json())
      .catch((error) => console.error(error));
  }

  drive(customId:number): Promise<boolean | void> {
    const endpointModifier = `?id=${customId}&status=drive`;
    return fetch(this.endpoint + endpointModifier, { method: 'PATCH' })
      .then((res) => {
        if (res.status === StatusCode.OK) {
          return true;
        } if (res.status === StatusCode.InternalServerError) {
          return false;
        }
        return false;
      })
      .catch((error) => error.log(error));
  }
}

export default RaceManager;
