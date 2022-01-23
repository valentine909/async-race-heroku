import { SortVariants } from '../types/types';

export interface Details {
  name?: string;
  color?: string;
  id?: number;
}

export interface PageDetail {
  currentPage: number;
}

export interface WinnerDetail {
  id: number;
  time: number;
}

export interface SortDetail {
  variant: SortVariants;
}

export type Detail = Details | PageDetail | WinnerDetail | SortDetail;

export function MyCustomEvent(name: string, details?: Detail): CustomEvent<Detail> {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: details,
  });
}
