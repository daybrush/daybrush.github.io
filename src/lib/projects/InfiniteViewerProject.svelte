<script lang="ts">
  import { useScene, EASE_IN_OUT, selectorAll, LINEAR, EASE_OUT } from "svelte-scenejs";

  export const scene = useScene(
    {
      ".infinite-viewer-project": {
      },
      ".infinite-viewer-project .viewport": {
        0: `transform: translate(-50%, -50%) translate2(0px, 0px);`,
        0.5: `transform: translate(-50%, -50%) translate2(-100px, -100px);`,
        1: `transform: translate(-50%, -50%) translate2(0px, 0px);`,
        1.5: `transform: translate(-50%, -50%) translate2(100px, 100px);`,
        2: `transform: translate(-50%, -50%) translate2(0px, 0px);`,
      },
      ".infinite-viewer-project .scroll-bar.horizontal": {
        0: "width:150px;transform: translate(-75px);",
        0.5: "width:100px;",
        1: "width:150px;transform: translate(-75px);",
        1.5: "width:100px;transform: translate(-25px);",
        2: "width:150px;transform: translate(-75px);",
      },
      ".infinite-viewer-project .scroll-bar.vertical": {
        0: "height:150px;transform: translateY(-75px);",
        0.5: "height:100px;",
        1: "height:150px;transform: translateY(-75px);",
        1.5: "height:100px;transform: translateY(-25px);",
        2: "height:150px;transform: translateY(-75px);",
      },
    },
    {
      easing: EASE_OUT,
      selector: true,
    }
  );
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="figur-project" aria-hidden="true">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="infinite-viewer-project">
      <div class="viewport"></div>
      <div class="scroll-bar horizontal"></div>
      <div class="scroll-bar vertical"></div>
    </div>
  </foreignObject>
</svg>

<style>
  .infinite-viewer-project {
    position: absolute;
    left: 50px;
    top: 50px;
    display: flex;
    width: 200px;
    height: 200px;
    background: #eee;
    border: 1px solid #ddd;
    overflow: hidden;
  }
  .viewport {
    position: relative;
    width: 80px;
    height: 110px;
    background: #fff;
    border: 1px solid #f5f5f5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .scroll-bar {
    position: absolute;
    background: #333;
    border-radius: 3px;
  }
  .scroll-bar.horizontal {
    width: 150px;
    height: 6px;
    bottom: 6px;
    left: 50%;
    transform: translate(-75px);
  }
  .scroll-bar.vertical {
    height: 150px;
    width: 6px;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
