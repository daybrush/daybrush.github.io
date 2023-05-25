<script lang="ts">
  import { onMount } from "svelte";
  import type { SvelteSceneResult } from "svelte-scenejs";

  export let component: ConstructorOfATypedSvelteComponent;
  export let href: string;
  export let title: string;

  let scene: SvelteSceneResult;

  function onFinish() {
    if (scene) {
      scene.finish();
      scene.setTime(scene.getDuration() - 0.00001);
    }
  }

  onMount(() => {
    onFinish();
  });
</script>

<div
  class="project"
  on:mouseenter={() => {
    scene.setTime(0);
    scene.play();
  }}
  on:mouseleave={() => {
    onFinish();
  }}
>
  <a {href} class="title" target="_blank">
    <div class="thumbnail">
      <svelte:component this={component} bind:scene />
    </div>
    <strong>{title}</strong>
  </a>
</div>

<style>
  .project {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .thumbnail {
    width: var(--project-width);
    height: var(--project-width);
  }
  a {
    display: block;
    text-decoration: none;
    width: 100%;
    height: 100%;
  }
  a:hover {
    text-decoration: underline;
  }
  a strong {
    display: block;
    width: 100%;
    height: 20px;
    text-align: center;
    color: #333;
    font-weight: bold;
    font-size: 14px;
  }
</style>
