<script lang="ts">
  import { counter } from "@daybrush/utils";
  import { useScene, EASE_IN_OUT } from "svelte-scenejs";

  export const scene = useScene(
    {
      ".ruler-project .ruler": {
        0: "transform: translate(0%)",
        1.5: "transform: translate(-100%)",
      },
    },
    {
      easing: EASE_IN_OUT,
      selector: true,
    }
  );

  const rulers = [1, 2];
  const rulerLines = counter(10);
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="figur-project" aria-hidden="true">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="ruler-project">
      {#each rulers as ruler}
        <div class={`ruler ruler${ruler}`}>
          <div class="title">Ruler</div>
          <div class="line long-line" />
          {#each rulerLines as line}
            <div class="line" />
          {/each}
        </div>
      {/each}
    </div>
  </foreignObject>
</svg>

<style>
  .ruler-project {
    position: absolute;
    left: 50px;
    top: 50px;
    width: 200px;
    height: 200px;
    overflow: hidden;
    --ruler-width: calc(30px * 11);
  }
  .ruler {
    position: absolute;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 16px;
    z-index: 1;
    background: #333;
    height: 110px;
    width: var(--ruler-width);
    top: 40px;
    left: 0;
  }
  .ruler2 {
    left: var(--ruler-width);
  }
  .line {
    position: relative;
    width: 16px;
    height: 100%;
  }
  .line:before,
  .line:after {
    position: absolute;
    content: "";
    height: 100%;
    bottom: 0;
    background: #888;
    width: 2px;
  }
  .line:before {
    left: 0;
    height: 40%;
  }
  .line:after {
    left: 100%;
    height: 25%;
  }
  .long-line:before {
    height: 100%;
  }
  .title {
    position: absolute;
    left: 15px;
    top: 0px;
    color: #fff;
    font-size: 45px;
  }
</style>
