let width = 0;
let height = 0;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
}

window.addEventListener("resize", resize);

resize();

export {width, height};
