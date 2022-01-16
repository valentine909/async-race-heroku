import APIManager from "./APIManager";
import { AllWinners, SortVariants, WinnerProperties } from "../types/types";

class WinnerManager extends APIManager{
  constructor() {
    super();
    this.endpoint += 'winner';
  }

  getWinner(customId: number): Promise<WinnerProperties> {
    const endpointModifier = `?id=${customId}`;
    return fetch(this.endpoint + endpointModifier, { method: "GET" })
      .then(res => res.json())
      .then(json => json[0])
      .catch(error => console.log(error));
  }

  async getWinners(page: number, limit = 10, sort: SortVariants = SortVariants.id, order = 'ASC'): Promise<AllWinners | void> {
    const endpointModifier = `?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    return fetch(this.endpoint + endpointModifier, { method: "GET" })
      .then(res => {
        return {
          totalWinners: res.headers.get("X-Total-Count") || "",
          winners: res.json() as Promise<WinnerProperties[]>,
        } as AllWinners;
      })
      .catch(error => console.log(error));
  }

  createWinner(winner: WinnerProperties): Promise<void> {
    const endpointModifier = '';
    return fetch(this.endpoint + endpointModifier, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: winner.id, wins: winner.wins, time: winner.time})})
      .then(res => console.log(res.status, res.json()))
      .catch(error => console.log(error));
  }

  deleteWinner(customId: number): Promise<void> {
    const endpointModifier = `/${customId}`;
    return fetch(this.endpoint + endpointModifier, { method: "DELETE" })
      .then(res => {
        console.log(res.status);
      })
      .catch(error => console.log(error));
  }

  updateWinner(winner: WinnerProperties): Promise<void> {
    const endpointModifier = `/${winner.id}`;
    return fetch(this.endpoint + endpointModifier, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: winner.id, wins: winner.wins, time: winner.time})})
      .then(res => console.log(res.status, res.json()))
      .catch(error => console.log(error));
  }
}

export default WinnerManager;