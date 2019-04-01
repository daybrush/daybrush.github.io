import { $ } from "./utils";
import { star, poly } from "shape-svg";
import Scene, { EASE_IN, EASE_OUT } from "scenejs";

$(".star5").appendChild(star({side: 5, width: 50, stroke: "#ccc", strokeWidth: 2}));
$(".polygon6").appendChild(poly({side: 6, width: 50, stroke: "#ccc", strokeWidth: 2}));
$(".triangle").appendChild(poly({side: 3, width: 50, stroke: "#ccc", strokeWidth: 2}));

const characterKeyframes = {
  0: {
    transform: "translate(-100%)",
  },
  1: {
    transform: "translate(0%)",
  },
};
const mainScene = new Scene({
  ".page.main .line-top": {
    0: {
      transform: "translateY(-100%) scaleY(1)",
    },
    1: {
      transform: "translateY(0%) scaleY(0)",
    },
    options: {
      easing: EASE_IN,
    },
  },
  ".page.main .circle1": {
    0: {
      "border-width": "100px",
      "transform": "scale(0)",
    },
    0.9: {
      opacity: 1,
    },
    1: {
      "border-width": "0px",
      "transform": "scale(1)",
      "opacity": 0,
    },
    options: {
      delay: 1,
    },
  },
  ".page.main .circle2": {
    0: {
      "border-width": "200px",
      "transform": "scale(0)",
    },
    0.3: {
      opacity: 1,
    },
    0.9: {
      "border-width": "0px",
      "transform": "scale(1)",
      "opacity": 0,
    },
    2: 1,
    options: {
      delay: 1.6,
    },
  },
  ".page.main .rectangle": {
    0: {
      opacity: 0,
      transform: "translate(-50%, -50%) rotate(30deg) translate2(0px) scale(0.3)",
    },
    0.1: {
      opacity: 1,
    },
    1: {
      opacity: 1,
    },
    1.5: {
      transform: "rotate(0deg) translate2(-100px) scale(1)",
      opacity: 0,
    },
    options: {
      delay: 2,
    },
  },
  ".page.main .star5": {
    0: {
      opacity: 0,
      transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)",
    },
    0.1: {
      opacity: 1,
    },
    1: {
      opacity: 1,
    },
    1.5: {
      transform: "rotate(150deg) translate2(-5px, -98px) scale(1)",
      opacity: 0,
    },
    options: {
      delay: 2,
    },
  },
  ".page.main .circle3": {
    0: {
      opacity: 0,
      transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)",
    },
    0.1: {
      opacity: 1,
    },
    1: {
      opacity: 1,
    },
    1.5: {
      transform: "rotate(150deg) translate2(95px, -40px) scale(1)",
      opacity: 0,
    },
    options: {
      delay: 2,
    },
  },
  ".page.main .polygon6": {
    0: {
      opacity: 0,
      transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)",
    },
    0.1: {
      opacity: 1,
    },
    1: {
      opacity: 1,
    },
    1.5: {
      transform: "rotate(150deg) translate2(75px, 75px) scale(1)",
      opacity: 0,
    },
    options: {
      delay: 2,
    },
  },
  ".page.main .triangle": {
    0: {
      opacity: 0,
      transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)",
    },
    0.1: {
      opacity: 1,
    },
    1: {
      opacity: 1,
    },
    1.5: {
      transform: "rotate(-150deg) translate2(-40px, 90px) scale(1)",
      opacity: 0,
    },
    options: {
      delay: 2,
    },
  },
  ".page.main .character.d .back1": {
    0: {
      transform: "scaleX(0)",
    },
    1: {
      transform: "scaleX(1)",
    },
    options: {
      delay: 2.8,
    },
  },
  ".page.main .character.d .back2": {
    0: {
      transform: "scaleX(0)",
    },
    1: {
      transform: "scaleX(1)",
    },
    options: {
      delay: 3,
    },
  },
  ".page.main .character.d span": {
    keyframes: characterKeyframes,
    options: {
      delay: 3.1,
    },
  },
  ".page.main .character.a span": {
    keyframes: characterKeyframes,
    options: {
      delay: 3.3,
    },
  },
  ".page.main .character.y span": {
    keyframes: characterKeyframes,
    options: {
      delay: 3.5,
    },
  },
  ".page.main .character.b span": {
    keyframes: characterKeyframes,
    options: {
      delay: 3.7,
    },
  },
  ".page.main .character.r span": {
    keyframes: characterKeyframes,
    options: {
      delay: 3.9,
    },
  },
  ".page.main .character.u span": {
    keyframes: characterKeyframes,
    options: {
      delay: 4.1,
    },
  },
  ".page.main .character.s span": {
    keyframes: characterKeyframes,
    options: {
      delay: 4.3,
    },
  },
  ".page.main .character.h span": {
    keyframes: characterKeyframes,
    options: {
      delay: 4.5,
    },
  },
}, {
  easing: EASE_OUT,
  selector: true,
  iterationCount: 1,
});

for (let i = 1; i <= 8; ++i) {
  mainScene.newItem(".glitter" + i, {selector: true}).set({
    0: {
      width: "0px",
      transform: {
        rotate: (360 / 8 * i) + "deg",
        translate: "0px",
        scaleX: 1,
      },
      opacity: 0,
    },
    0.5: {
      width: "50px",
      opacity: 1,
    },
    1: {
      width: "0px",
      transform: {
        translate: "100px",
        scaleX: 0,
      },
      opacity: 0,
    },
    options: {
      delay: 1,
    },
  });
}

const wheelScene = new Scene({
  ".page.main .scroll-wheel": {
    0: {
      opacity: 0,
      transform: "translateY(0px)",
    },
    0.1: {
      opacity: 1,
    },
    0.9: {
      opacity: 1,
    },
    1: {
      opacity: 0,
      transform: "translateY(30px)",
    },
  },
}, {
  iterationCount: "infinite",
  selector: true,
});

export {mainScene, wheelScene};
