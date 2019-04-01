import { poly, getRect, getPath } from "shape-svg";
import { $ } from "./utils";
import Scene, { EASE_IN_OUT, zoomIn, bezier, LINEAR } from "scenejs";
import setDrag from "./setDrag";
import { ANIMATION } from "@daybrush/utils";

$(".page.works .play").appendChild(poly({
  strokeWidth: 10, left: 5, top: 5, right: 5, bottom: 5, width: 50, rotate: 90, fill: "#333", stroke: "#333",
}));

export const clapperScene = new Scene({
  ".clapper": {
    2: {
      transform: "rotate(0deg)",
    },
    2.5: {
      transform: "rotate(-15deg)",
    },
    3: {
      transform: "rotate(0deg)",
    },
    options: {
      easing: EASE_IN_OUT,
    },
  },
  ".clapper-container": {
    0: [zoomIn({ duration: 1 })],
  },
  ".page.works .circle": {
    0.3: zoomIn({ duration: 1 }),
  },
  ".page.works .clapper .play": {
    0.6: zoomIn({ duration: 1 }),
  },
  ".page.works .top .stick1": {
    2: {
      transform: {
        rotate: "0deg",
      },
    },
    2.5: {
      transform: {
        rotate: "-20deg",
      },
    },
    3: {
      transform: {
        rotate: "0deg",
      },
    },
    options: {
      easing: EASE_IN_OUT,
    },
  },
}, {
    easing: bezier(.74, 0, .42, 1.47),
    selector: true,
  });

const keyframes2 = {
  0: {
    transform: {
      scale: 0,
      skew: "-15deg",
    },
  },
  1: {
    transform: {
      scale: 1,
    },
  },
};
for (let i = 0; i < 6; ++i) {
  clapperScene.newItem(".stick1 .rect" + (i + 1), {
    selector: true,
  }).set({
    0: {
      opacity: 0,
    },
    [0.6 + i * 0.1]: {
      opacity: 1,
      transform: {
        scale: 0,
        skew: "15deg",
      },
    },
    [1.3 + i * 0.1]: {
      transform: {
        scale: 1,
      },
    },
  });
  clapperScene.newItem(".stick2 .rect" + (i + 1), {
    selector: true,
  }).set({
    0: {
      opacity: 0,
    },
    [0.8 + i * 0.1]: {
      opacity: 1,
      transform: {
        scale: 0,
        skew: "-15deg",
      },
    },
    [1.5 + i * 0.1]: {
      transform: {
        scale: 1,
      },
    },
  });
}

clapperScene.setDuration(4);

const svg = poly({ left: 10, side: 3, width: 100, split: 20, stroke: "#333", strokeWidth: 5 });

svg.setAttribute("class", "logo");
svg.setAttribute("viewBox", "0 0 120 120");
document.querySelector(".shape-svg").appendChild(svg);

const rect1 = getRect({ left: 10, side: 3, split: 20, strokeWidth: 5 });
const rect2 = getRect({ left: 10, side: 3, innerRadius: 30, split: 10, strokeWidth: 5 });
const rect3 = getRect({ left: 10, side: 5, split: 12, strokeWidth: 5 });
const rect4 = getRect({ left: 10, side: 5, innerRadius: 30, split: 6, strokeWidth: 5 });
export const shapeScene = new Scene({
  ".shape-svg .thumb": {
    0: {
      left: "0%",
    },
    5: {
      left: "100%",
    },
    options: {
      easing: LINEAR,
    },
  },
  ".shape-svg .logo": {
    2: {
      transform: "rotate(0deg)",
    },
    3: {
      transform: "rotate(90deg)",
    },
    4: {
      transform: "rotate(90deg)",
    },
    5: {
      transform: "rotate(0deg)",
    },
  },
  ".shape-svg .logo path": {
    0: {
      attribute: {
        "stroke-dasharray": "0 500",
      },
      easing: LINEAR,
    },
    2: {
      attribute: {
        "stroke-dasharray": "500 500",
        "d": getPath(rect1.points),
      },
      transform: "rotate(0deg)",
      easing: EASE_IN_OUT,
    },
    3: {
      attribute: {
        d: getPath(rect2.points),
      },
      transform: "rotate(90deg)",
    },
    4: {
      attribute: {
        d: getPath(rect3.points),
      },
      transform: "rotate(90deg)",
    },
    5: {
      attribute: {
        d: getPath(rect4.points),
      },
      transform: "rotate(0deg)",
    },
  },
}, {
    duration: 4,
    selector: true,
    easing: EASE_IN_OUT,
  });

$(".page.works .clapper .play").addEventListener("click", () => {
  ANIMATION ? clapperScene.playCSS(false) : clapperScene.play();
});

const thumb = $(".page.works .shape-svg .thumb");

setDrag(thumb, {
  container: document.body,
  dragstart({ datas }) {
    if (shapeScene.getPlayState() === "running") {
      return false;
    }
    datas.time = shapeScene.getTime();
  },
  drag({ deltaX, datas }) {
    shapeScene.setTime(datas.time + deltaX / 50);
  },
});
