<script lang="ts">
  import { counter } from "@daybrush/utils";
  import { useScene, EASE_IN_OUT } from "svelte-scenejs";

  export const scene = useScene(
    {
      ".guides-project .guides": {
        0: "transform: translate(0%)",
        1.5: "transform: translate(-100%)",
      },
      ".guides-project .guideline1": {
        1.5: "opacity: 0; transform: translateY(-30px)",
        2: "opacity: 1; transform: translateY(0px)",
      },
      ".guides-project .guideline2": {
        2: "opacity: 0; transform: translateY(-50px)",
        2.5: "opacity: 1; transform: translateY(0px)",
      },
    },
    {
      easing: EASE_IN_OUT,
      selector: true,
    }
  );

  const guidesList = [1, 2];
  const guidesLines = counter(10);
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="figur-project" aria-hidden="true">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="guides-project">
      {#each guidesList as guides}
        <div class={`guides guides${guides}`}>
          <div class="title">Guides</div>
          <div class="line long-line" />
          {#each guidesLines as line}
            <div class="line" />
          {/each}
        </div>
      {/each}
      <div class="guideline guideline1"></div>
      <div class="guideline guideline2"></div>
    </div>
  </foreignObject>
</svg>

<style>
  .guides-project {
    position: absolute;
    left: 50px;
    top: 50px;
    width: 200px;
    height: 200px;
    overflow: hidden;
    --guides-width: calc(30px * 11);
  }
  .guides {
    position: absolute;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 16px;
    z-index: 1;
    background: #333;
    height: 110px;
    width: var(--guides-width);
    top: 40px;
    left: 0;
  }
  .guides2 {
    left: var(--guides-width);
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
  .guideline {
    position: absolute;
    z-index: 1;
    background: #f55;
    width: 100%;
    height: 2px;
    top: 165px;
  }
  .guideline.guideline2 {
    top: 190px;
  }
</style>
