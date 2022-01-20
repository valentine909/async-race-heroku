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
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

export function setAttributes(element: HTMLElement | SVGElement, attributes: object) {
  Object.entries(attributes).forEach((keyValuePair) => {
    element.setAttribute(keyValuePair[0], keyValuePair[1]);
  });
}
