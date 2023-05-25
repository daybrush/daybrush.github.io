<script lang="ts">
  import { useScene, EASE_IN_OUT } from "svelte-scenejs";

  export const scene = useScene(
    {
      ".moveable-project": {
        0: {
          "width": "100px",
          "height": "100px",
        },
        1: {
          "width": "200px",
          "height": "200px",
          "transform": "rotate(0deg)",
        },
        1.5: {
          "transform": "rotate(45deg)",
        },
        2: {
          "transform": "rotate(-45deg)",
        },
        2.5: {
          "transform": "rotate(0deg)",
        },
      }
    },
    {
      easing: EASE_IN_OUT,
      selector: true,
    }
  );
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="figur-project" aria-hidden="true">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="moveable-project">
      <div class="row">
        <div class="rotation">
          <div class="control"></div>
        </div>
        <div class="control"></div>
        <div class="control"></div>
        <div class="control"></div>
      </div>
      <div class="row">
        <div class="control"></div>
        <div class="control"></div>
      </div>
      <div class="row">
        <div class="control"></div>
        <div class="control"></div>
        <div class="control"></div>
      </div>
    </div>
  </foreignObject>
</svg>

<style>
  .moveable-project {
    position: absolute;
    left: 50px;
    top: 50px;
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: space-between;
  }
  .moveable-project:before {
    position: absolute;
    content: "";
    width: calc(100% - 26px);
    height: calc(100% - 26px);
    top: 11px;
    left: 11px;
    border: 2px solid #4af;
  }
  .row {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
  }
  .rotation {
    position: absolute;
    bottom: 50%;
    width: 2px;
    height: 46px;
    left: 50%;
    transform: translate(-50%);
    background: #4af;
  }
  .control {
    width: 24px;
    height: 24px;
    background: #4af;
    border: 2px solid white;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .rotation .control {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
