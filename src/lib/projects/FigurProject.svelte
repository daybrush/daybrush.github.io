<script lang="ts">
  import { useScene, EASE_IN_OUT, selectorAll, type SvelteSceneResult } from "svelte-scenejs";
  import { Oval, Poly, Star, getPath, getRect } from "svelte-figur";
  import { zoomIn } from "@scenejs/effects";

  const tri = getRect({
    side: 3,
    split: 2,
    strokeWidth: 12,
  });
  const triToStar = getRect({
    innerRadius: 20,
    side: 3,
    split: 1,
    strokeWidth: 12,
  });

  const star = getRect({
    side: 5,
    split: 1,
    innerRadius: 40,
    strokeWidth: 12,
  });
  const starToPentagon = getRect({
    side: 5,
    split: 2,
    strokeWidth: 12,
  });


  const square = getRect({
    side: 4,
    split: 3,
    strokeWidth: 12,
  });
  const squareToHexagon = getRect({
    side: 6,
    split: 2,
    strokeWidth: 12,
  });

  export const scene = useScene(
    {
      ".figur-project .triangle": {
        0: `transform: rotate(0deg)`,
        1: `transform: rotate(180deg)`,
        2: `transform: rotate(0deg)`,
      },
      ".figur-project .triangle path": {
        0: {
          attribute: {
            d: getPath(tri.points),
          },
        },
        1: {
          attribute: {
            d: getPath(triToStar.points),
          },
        },
        2: {
          attribute: {
            d: getPath(tri.points),
          },
        },
      },
      ".figur-project .square path": {
        0: {
          attribute: {
            d: getPath(square.points),
          },
        },
        1: {
          attribute: {
            d: getPath(squareToHexagon.points),
          },
        },
        2: {
          attribute: {
            d: getPath(square.points),
          },
        },
      },
      ".figur-project .star, .figur-project .square": {
        0: `transform: rotate(0deg)`,
        1: `transform: rotate(-180deg)`,
        2: `transform: rotate(0deg)`,
      },
      ".figur-project .star path": {
        0: {
          attribute: {
            d: getPath(star.points),
          },
        },
        1: {
          attribute: {
            d: getPath(starToPentagon.points),
          },
        },
        2: {
          attribute: {
            d: getPath(star.points),
          },
        },
      },
      ".figur-project .oval ellipse": {
        0: {
          attribute: {
            rx: 50,
            ry: 50,
          },
        },
        1: {
          attribute: {
            rx: 40,
            ry: 30,
          },
        },
        2: {
          attribute: {
            rx: 50,
            ry: 50,
          },
        },
      },
    },
    {
      easing: EASE_IN_OUT,
      selector: true,
    }
  );
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="figur-project" aria-hidden="true">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="table">
      <div class="row">
        <Poly side={3} strokeWidth={12} stroke="#f55" width={100} className="svg triangle" />
        <Poly side={4} strokeWidth={12} stroke="#5e5" width={100} className="svg square" />
      </div>
      <div class="row">
        <Oval strokeWidth={12} r={50} stroke="#55e" width={100} className="svg oval" />
        <Star side={5} innerRadius={40} strokeWidth={12} stroke="#5ee" width={100} className="svg star" />
      </div>
    </div>
  </foreignObject>
</svg>

<style>
  .table {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: column;
  }
  .row {
    position: relative;
    display: flex;
    height: 50%;
    align-items: center;
    justify-content: space-between;
  }
  .figur-project :global(.svg) {
    width: 45%;
  }
  .figur-project :global(.triangle) {
    transform-origin: 50% 60%;
  }
</style>
