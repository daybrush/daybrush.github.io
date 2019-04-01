import { observe, initialize } from "./Observer";
import { wheelScene, mainScene } from "./mainPage";
import { aboutScene } from "./aboutPage";
import Scene from "scenejs";
import { addClass, removeClass, ANIMATION} from "@daybrush/utils";
import { clapperScene, shapeScene } from "./workPage";
import "./css/index.css";
import "./css/main.css";
import "./css/about.css";
import "./css/works.css";
import "./css/footer.css";
import "./css/media.css";

function observeScene(selectors, scene: Scene, css?: boolean) {
  observe(selectors, {
    firstEnter: () => {
      ANIMATION && css && scene.exportCSS();
    },
    enter: () => {
      css && ANIMATION ? scene.playCSS(false) : scene.play();
    },
    exit: () => {
      scene.finish();
    },
  });
}
observeScene([".page.main"], wheelScene, true);
observeScene([".page.main", ".motion"], mainScene, true);
observeScene([".page.about", ".header"], aboutScene, false);
observe([".page.about", ".blocks"], {
  enter: el => {
    addClass(el, "show");
  },
  exit: el => {
    removeClass(el, "show");
  },
});
observeScene([".page.works", ".container1 .work"], clapperScene, true);
observeScene([".page.works", ".container2 .work"], shapeScene);
initialize();
