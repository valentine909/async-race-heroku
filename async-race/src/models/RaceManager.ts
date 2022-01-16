import APIManager from "./APIManager";
import { EngineStatus, RaceProperties, StatusCode } from "../types/types";

class RaceManager extends APIManager {
  constructor() {
    super();
    this.endpoint += 'engine';
  }

  startOrStop(customId:number, status: EngineStatus): Promise<RaceProperties> {
    const endpointModifier = `?id=${customId}&status=${status}`;
    return fetch(this.endpoint + endpointModifier, {method: 'PATCH'})
      .then(res => res.json())
      .then(data => data[0])
      .catch(error => console.log(error));
  }

  drive(customId:number): Promise<boolean | void>{
    const endpointModifier = `?id=${customId}&status=drive`;
    return fetch(this.endpoint + endpointModifier, {method: 'PATCH'})
      .then(res => {
        if (res.status === StatusCode.OK) {
          return true;
        } else if (res.status === StatusCode.InternalServerError) {
          return false;
        } else {
          console.log(res.status);
          return false;
        }
      })
      .catch(error => console.log(error));
  }
}

export default RaceManager;