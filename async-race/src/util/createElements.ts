export function createHTMLElement(tag = '', className = '', text = ''): HTMLElement {
  const element = document.createElement(`${tag}`);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.innerText = text;
  }
  return element;
}

export function createNSElement(name: string): SVGElement {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

export function setAttributes(element: HTMLElement | SVGElement, attributes: object) {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}
