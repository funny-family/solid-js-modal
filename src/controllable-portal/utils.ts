const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export var createElement = (
  tagName: string,
  isSVG = false,
  is = undefined,
): HTMLElement | SVGElement => {
  return isSVG
    ? document.createElementNS(SVG_NAMESPACE, tagName)
    : document.createElement(tagName, { is });
};
