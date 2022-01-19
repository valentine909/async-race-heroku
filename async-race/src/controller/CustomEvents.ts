export interface Details {
  name?: string;
  color?: string;
  id?: number;
}

export interface PageDetail {
  currentPage: number;
}

export type detail = Details | PageDetail;

export function MyCustomEvent(name: string, details?: detail): CustomEvent<detail> {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: details,
  });
}
