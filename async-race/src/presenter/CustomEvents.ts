export interface Details {
  name?: string;
  color?: string;
  id?: number;
}

export interface PageDetail {
  currentPage: number;
}

export type Detail = Details | PageDetail;

export function MyCustomEvent(name: string, details?: Detail): CustomEvent<Detail> {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: details,
  });
}
