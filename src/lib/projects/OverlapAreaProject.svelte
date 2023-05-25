<script lang="ts">
  import { useScene, LINEAR, selectorAll } from "svelte-scenejs";


  const size = 175;
  const ellipsis = [
    [280 - size, 280 - size],
    [20 + size, 280 - size],
    [20 + size, 20 + size],
    [280 - size, 20 + size],
  ];
  // 5개의 점이 한 곳
  const d1 = `M${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}Z`;
  // 1, 2 => 오른쪽
  // 3, 4 => 아래쪽
  const d2 = `M${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[1][0]},${ellipsis[1][1]}`
  + ` L${ellipsis[1][0]},${ellipsis[1][1]}`
  + ` L${ellipsis[3][0]},${ellipsis[3][1]}`
  + ` L${ellipsis[3][0]},${ellipsis[3][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}Z`;
  // 3 => 아래쪽
  // 4 => 오른쪽
  const d3 = `M${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[1][0]},${ellipsis[1][1]}`
  + ` L${ellipsis[2][0]},${ellipsis[2][1]}`
  + ` L${ellipsis[2][0]},${ellipsis[2][1]}`
  + ` L${ellipsis[3][0]},${ellipsis[3][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}Z`;


  export const scene = useScene(
    {
      ".overlap-area-project .left, .overlap-area-project .right": {
        0: {
          "stroke-dasharray": "0 1000",
        },
        1: {
          "stroke-dasharray": "700 1000",
        },
      },
      ".overlap-area-project .dot": selectorAll(i => ({
        [0.9 + i * 0.2]: `opacity: 0`,
        [1.3 + i * 0.2]: `opacity: 0.9`,
      }), 4),
      ".overlap-area-project .overlap": {
        1.8: {
          attribute: {
            d: d1,
          },
        },
        2.2: {
          attribute: {
            d: d2,
          },
        },
        2.6: {
          attribute: {
            d: d3,
          },
        }
      },
    },
    {
      easing: LINEAR,
      selector: true,
    }
  );



  const overlapD = `M${ellipsis[0][0]},${ellipsis[0][1]}`
  + ` L${ellipsis[1][0]},${ellipsis[1][1]}`
  + ` L${ellipsis[2][0]},${ellipsis[2][1]}`
  + ` L${ellipsis[3][0]},${ellipsis[3][1]}`
  + ` L${ellipsis[0][0]},${ellipsis[0][1]}Z`;
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="figur-project" aria-hidden="true">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="overlap-area-project">
      <svg width="300" height="300" viewBox="0 0 300 300">
        <path class="overlap" d={overlapD} />
        <path class="area left" d={`M20,20 L${20 + size},20 L${20 + size},${20 + size} L20,${20 + size} L20,20Z`} />
        <path
          class="area right"
          d={`M280,280 L${280 - size},280 L${280 - size},${280 - size} L280,${280 - size} L280,280Z`}
        />
        {#each ellipsis as ellipse}
          <ellipse class="dot" cx={ellipse[0]} cy={ellipse[1]} rx="8" ry="8" />
        {/each}
      </svg>
    </div>
  </foreignObject>
</svg>

<style>
  .overlap-area-project {
    position: absolute;
    left: 50px;
    top: 50px;
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: space-between;
  }
  .overlap-area-project svg {
    width: 100%;
  }
  .overlap-area-project {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 1.5;
  }
  .area {
    stroke-width: 6px;
  }
  .left {
    fill: transparent;
    stroke: #f55;
    stroke-dasharray: 1000;
  }
  .right {
    fill: transparent;
    stroke: #4af;
    stroke-dasharray: 1000;
  }
  .dot {
    fill: #333;
    opacity: 0.7;
  }
  .overlap {
    fill: #89D288;
    opacity: 0.5;
  }
</style>
