import * as WindowSize from "./WindowSize";
import { ObjectInterface } from "@daybrush/utils";

const observers: {[key: string]: Observer} = {};

interface Observer {
  el: HTMLElement;
  state: "enter" | "exit";
  rect: {top: number, height: number};
  children: {[key: string]: Observer};
  callbacks: ObserverCallbacks;
  firstEnter: boolean;
  firstExit: boolean;
}
interface ObserverCallbacks {
  firstEnter?: (el: HTMLElement) => void;
  firstExit?: (el: HTMLElement) => void;
  enter?: (el: HTMLElement) => void;
  exit?: (el: HTMLElement) => void;
}
export function observe(selectors: string[], callbacks: ObserverCallbacks = {}) {
  let targets = observers;
  let observer: Observer;
  let el: Document | Element = document;
  selectors.forEach(selector => {
    observer = targets[selector];
    if (!observer) {
      el = el.querySelector(selector);
      observer = {
        el: (el as HTMLElement),
        state: "exit",
        rect: { top: -1, height: -1 },
        children: {},
        callbacks: {},
        firstEnter: false,
        firstExit: false,
      };
      targets[selector] = observer;
    }
    targets = targets[selector].children;
  });
  observer.callbacks = callbacks;
}

function onEnter(observer: Observer) {
  const {firstEnter, enter} = observer.callbacks;
  const el = observer.el;

  if (observer.state === "exit") {
    if (!observer.firstEnter) {
      observer.firstEnter = true;
      firstEnter && firstEnter(el);
    }
    observer.state = "enter";
    enter && enter(el);
  }
  onCheck(observer.children, true);
}
function onExit(observer: Observer) {
  const {firstExit, exit} = observer.callbacks;
  const el = observer.el;

  if (observer.state === "enter") {
    if (!observer.firstExit) {
      observer.firstExit = true;
      firstExit && firstExit(el);
    }
    exit && exit(el);
    observer.state = "exit";
  }
  const children = observer.children;

  for (const selector in children) {
    onExit(children[selector]);
  }
}
function onCheck(targets: {[key: string]: Observer}, isEnter?: boolean) {
  for (const name in targets) {
    const observer = targets[name];
    const rect = observer.el.getBoundingClientRect();
    const top = rect.top;
    const height = rect.height;

    observer.rect = { top, height };
    if (top + height <= 0 || top >= WindowSize.height) {
      !isEnter && onExit(observer);
    } else {
      onEnter(observer);
    }
  }
}

function check() {
  onCheck(observers);
}

export function initialize() {
  function scroll() {
    check();
  }
  window.addEventListener("scroll", scroll);

  scroll();
}
