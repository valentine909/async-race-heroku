export type CarProperties = {
  color: string;
  id?: number;
  name: string;
}

export type RaceProperties = {
  velocity: number;
  distance: number;
}

export type WinnerProperties = {
  id: number,
  wins: number,
  time: number,
}

export type AllCars = {
  totalCars: string;
  cars: Promise<CarProperties[]>;
}

export type AllWinners = {
  totalWinners: string;
  winners: Promise<WinnerProperties[]>;
}

export enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export enum EngineStatus {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

export enum SortVariants {
  id = 'id',
  wins = 'wins',
  time = 'time',
}