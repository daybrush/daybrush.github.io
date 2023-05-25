<script lang="ts">
  import { useScene, EASE_IN_OUT, selectorAll, type SvelteSceneResult } from "svelte-scenejs";
  import { Poly } from "svelte-figur";
  import { zoomIn } from "@scenejs/effects";

  export const scene = useScene(
    {},
    {
      easing: EASE_IN_OUT,
      selector: true,
    }
  );
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="false">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="scena-project">
      <div class="stick up"></div>
      <div class="stick center">
        <div class="films">
          <div class="film"></div>
          <div class="film"></div>
          <div class="film"></div>
        </div>
      </div>
      <div class="stick down"></div>
    </div>
  </foreignObject>
</svg>
<style>
  .scena-project {
    position: absolute;
    width: 200px;
    height: 160px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .stick {
    position: relative;
    width: 100%;
    height: 40px;
    background: #333;
    border-radius: 20px;
    transform: rotate(-10deg);
  }
  .stick.center {
    transform: rotate(-10deg);
    background: transparent;
    white-space: nowrap;
    overflow: hidden;
  }
  .stick .films {
    position: relative;
    display: inline-flex;
    white-space: nowrap;
    height: 100%;
    left: 50%;
    gap: 20px;
    transform: translateX(-50%);
  }
  .stick .film {
    display: inline-block;
    width: 60px;
    height: 100%;
    border-radius: 10px;
    transform: skew(-15deg);
    background: #333;
  }
  .stick.down {
    bottom: 0;
  }
</style>
