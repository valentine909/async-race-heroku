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

export type Detail = Details | PageDetail | WinnerDetail;

export function MyCustomEvent(name: string, details?: Detail): CustomEvent<Detail> {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: details,
  });
}
