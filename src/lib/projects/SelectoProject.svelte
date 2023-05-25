<script lang="ts">
  import { useScene, EASE_IN_OUT, selectorAll } from "svelte-scenejs";

  export const scene = useScene(
    {
      ".selecto-project .selection": {
        0: {
          width: "0px",
          height: "0px",
        },
        1: {
          width: "145px",
          height: "145px",
        },
      },
      ".selecto-project .cursor": {
        0: {
          transform: "translate(-140px, -140px)",
        },
        1: {
          transform: "translate(0px, 0px)",
        },
      },
      ".selecto-project .cell.selected": selectorAll(i => {
        // 0
        // 1, 2
        // 3
        const time = Math.floor((i + 1) / 2);

        return {
          [time * 0.3]: {
            background: "#ddd",
          },
          [time * 0.3 + 0.4]: {
            background: "#4af",
          },
        };
      }, 4),
    },
    {
      easing: EASE_IN_OUT,
      selector: true,
    }
  );
</script>

<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="figur-project" aria-hidden="true">
  <foreignObject x="0" y="0" width="300" height="300">
    <div class="selecto-project">
      <div class="selection"></div>
      <div class="row">
        <div class="cell selected" />
        <div class="cell selected" />
        <div class="cell" />
      </div>
      <div class="row">
        <div class="cell selected" />
        <div class="cell selected" />
        <div class="cell" />
      </div>
      <div class="row">
        <div class="cell" />
        <div class="cell" />
        <svg
          class="cursor"
          viewBox="0 0 473 473"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M421.686,172.374l-386.705,-138.661l138.662,386.705l83.253,-144.762l163.072,163.072l20.028,-20.028l-163.071,-163.072l144.761,-83.254Z"
            style="fill:#555;stroke:#555;stroke-width:33.33px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
          />
        </svg>
      </div>
    </div>
  </foreignObject>
</svg>

<style>
  .selecto-project {
    position: absolute;
    left: 50px;
    top: 50px;
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: space-between;
  }
  .selection {
    position: absolute;
    top: -8px;
    left: -8px;
    border: 1px solid #4af;
    width: 145px;
    height: 145px;
    background: rgba(68, 170, 255, 0.5);
    box-sizing: border-box;
    z-index: 2;
  }
  .row {
    gap: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
  }
  .cell {
    width: 58px;
    height: 58px;
    background: #dddddd;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .cell.selected {
    background: #4af;
  }
  .cursor {
    width: 60px;
    height: 60px;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
