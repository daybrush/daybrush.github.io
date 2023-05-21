<script lang="ts">
  import { onMount } from "svelte";
  import InfiniteViewer from "svelte-infinite-viewer";
  import Scenejs from "$lib/projects/scenejs.svelte";

  let viewer: InfiniteViewer;

  onMount(() => {
    requestAnimationFrame(() => {
      viewer.scrollCenter({
        duration: 1000,
      });
    });
  });
</script>

<InfiniteViewer
  className={"infinite-viewer"}
  zoom={1}
  useWheelScroll={true}
  useResizeObserver={true}
  rangeY={[0, Infinity]}
  bind:this={viewer}
>
  <div class="viewport">
    <div class="project"><Scenejs /></div>
    <div class="project">2</div>
  </div>
</InfiniteViewer>

<style>
  :global(.infinite-viewer) {
    width: 100%;
    height: 100%;
  }
  .viewport {
    width: 50%;
    height: 50%;
    --project-width: min(200px, calc(100vw * 0.2));
    display: flex;
  }
  .project {
    width: var(--project-width);
    height: var(--project-width);
  }
</style>
