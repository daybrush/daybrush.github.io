import Scene from "scenejs";

// new Scene({
//   ".dot.left": {
//      0: {
//        transform: "translate(-50%, -50%) rotate(0deg) translate2(0px, 30px) rotate2(0deg) translate3(0px, -30px)",
//      },
//      2: {
//        transform: "translate(-50%, -50%) rotate(360deg) translate2(0px, 30px) rotate2(360deg) translate3(0px, -30px)",
//      },
//   },
//   ".dot.right": {
//      0: {
//        transform: "translate(-50%, -50%) rotate(0deg) translate2(0px, -30px) rotate2(0deg) translate3(0px, 30px)",
//      },
//      2: {
//        transform: "translate(-50%, -50%) rotate(360deg) translate2(0px, -30px) rotate2(360deg) translate3(0px, 30px)",
//      },
//     2.5: {},
//   },
// }, {
//   selector: true,
//   easing: "ease-out",
//   iterationCount: "infinite",
// }).play();

const xs = [];
for (let i = 0; i < 20; ++i) {
  xs.push(`<div class="x"style="left: ${(i % 5 * 15 + 20)}%;top: ${Math.floor(i / 5) * 20 + 20}%"></div>`);
}
document.querySelector("#scene1").innerHTML = xs.join("");

// new Scene({
//   ".x": i => {
//     const startTime = Math.floor(i / 5) * 0.1 + (i % 5) * 0.1;

//     return {
//       [startTime]: {
//         transform: "translate(-50%, -50%) translateX(0px) rotate(0deg)",
//         opacity: 1,
//       },
//       [startTime + 0.7]: {
//         transform: "translate(-50%, -50%) translateX(20px) rotate(180deg)",
//         opacity: 0,
//       },
//       2: {},
//     };
//   },
// }, {
//   iterationCount: "infinite",
//   easing: "ease-in-out",
//   selector: true,
// }).play();




new Scene({
  "#scene2 .vertical.line": i => {
    const startTime = i * 0.2;

    return {
      [startTime]: {
        transform: "translate(-50%) translateY(-110%)",
      },
      [startTime + 1.2]: {
        transform: "translate(-50%) translateY(0%)",
      },
      2: {},
    };
  },
    "#scene2 .horizontal.line": i => {
    const startTime = i * 0.2;

    return {
      [startTime]: {
        transform: "translateY(-50%) translateX(-110%)",
      },
      [startTime + 2]: {
        transform: "translateY(-50%) translateX(0%)",
      },
    };
  },
  "#scene2 .column .background": i => {
    const startTime = i * 0.4 + 0.4;

    return {
      [startTime]: {
        transform: "translate(-100%)",
      },
      [startTime + 1]: {
        transform: "translate(-0%)",
      },
    };
  },
}, {
  iterationCount: "infinite",
  easing: "ease-in-out",
  selector: true,
}).play();
