export function $(selector: string, isMulti: true): NodeListOf<HTMLElement>;
export function $(selector: string): HTMLElement;
export function $(selector, isMulti: boolean = false) {
  return isMulti ? document.querySelectorAll(selector) : document.querySelector(selector);
}
