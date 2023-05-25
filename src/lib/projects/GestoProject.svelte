<script lang="ts">
  import { useScene, EASE_IN_OUT, selectorAll } from "svelte-scenejs";

  export const scene = useScene(
    {
      ".gesto-project .line": {
        0.2: `width: 0px`,
        1: `width: 56px`,
      },
      ".gesto-project .gesto2": {
        0: `transform: translate(-50%, -50%) translateX(-60px);`,
        1: `transform: translate(-50%, -50%) translateX(60px);`,
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
    <div class="gesto-project">
      <div class="gesto gesto1">
        <svg class="cursor" viewBox="0 0 473 473" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M421.686,172.374l-386.705,-138.661l138.662,386.705l83.253,-144.762l163.072,163.072l20.028,-20.028l-163.071,-163.072l144.761,-83.254Z"
          />
        </svg>
      </div>
      <div class="line"></div>
      <div class="gesto gesto2">
        <svg class="cursor" viewBox="0 0 473 473" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M421.686,172.374l-386.705,-138.661l138.662,386.705l83.253,-144.762l163.072,163.072l20.028,-20.028l-163.071,-163.072l144.761,-83.254Z"
          />
        </svg>
      </div>
    </div>
  </foreignObject>
</svg>

<style>
  .gesto-project {
    position: absolute;
    left: 50px;
    top: 50px;
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: space-between;
  }
  .gesto {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
  }
  .gesto1 {
    transform: translate(-50%, -50%) translate(-60px);
  }
  .gesto2 {
    transform: translate(-50%, -50%) translate(60px);
  }
  .line {
    position: absolute;
    width: 56px;
    height: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-28px, -50%);
    overflow: hidden;
  }
  .line:before {
    content: "";
    position: absolute;
    width: 48px;
    border-top: 3px dashed #333;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .line:after {
    content: "";
    position: absolute;
    border-left: 10px solid transparent;
    border-bottom: 10px solid #333;
    border-right: 0;
    left: 42px;
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
  }
  .gesto svg {
    width: 100%;
    fill: #666;
    stroke: #666;
    stroke-width: 33.33px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 1.5;
  }
  .gesto2 svg {
    fill: #333;
    stroke: #333;
  }
</style>
