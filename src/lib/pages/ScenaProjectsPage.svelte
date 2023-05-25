<script lang="ts">
  import { onMount } from "svelte";
  import SceneProject from "$lib/projects/SceneProject.svelte";
  import Project from "$lib/projects/Project.svelte";
  import FigurProject from "$lib/projects/FigurProject.svelte";
  import MoveableProject from "$lib/projects/MoveableProject.svelte";
  import SelectoProject from "$lib/projects/SelectoProject.svelte";
  import InfiniteViewerProject from "$lib/projects/InfiniteViewerProject.svelte";
  import RulerProject from "$lib/projects/RulerProject.svelte";
  import ScenaProject from "$lib/projects/ScenaProject.svelte";
  import GuidesProject from "$lib/projects/GuidesProject.svelte";
  import OverlapAreaProject from "$lib/projects/OverlapAreaProject.svelte";
  import GestoProject from "$lib/projects/GestoProject.svelte";

  // let viewer: InfiniteViewer;

  // onMount(() => {
  //   requestAnimationFrame(() => {
  //     viewer.scrollCenter({
  //       duration: 1000,
  //     });
  //   });
  // });
</script>

<div class="page">
  <h2>Scena Project</h2>
  <p>The Scena Project is an editor open source project.</p>
  <p>All components required for the editor are released as open sources.</p>
  <p>I try to support all frameworks: React, Angular, Svelte, Vue, Lit.</p>

  <div class="viewport">
    <Project component={ScenaProject} href="https://github.com/daybrush/scenejs" title="Scena" />
    <Project component={SceneProject} href="https://github.com/daybrush/scenejs" title="Scene.js" />
    <Project component={MoveableProject} href="https://github.com/daybrush/moveable" title="Moveable" />
    <Project component={SelectoProject} href="https://github.com/daybrush/selecto" title="Selecto" />
    <Project
      component={InfiniteViewerProject}
      href="https://github.com/daybrush/infinite-viewer"
      title="InfiniteViewer"
    />
    <Project component={RulerProject} href="https://github.com/daybrush/ruler" title="Ruler" />
    <Project component={GuidesProject} href="https://github.com/daybrush/guides" title="Guides" />
    <Project component={OverlapAreaProject} href="https://github.com/daybrush/overlap-area" title="OverlapArea" />
    <Project component={GestoProject} href="https://github.com/daybrush/gesto" title="Gesto" />
    <Project component={FigurProject} href="https://github.com/daybrush/figur" title="Figur" />
    <Project component={FigurProject} href="https://github.com/daybrush/scenejs-timeline" title="Scene.js Timeline" />
    <Project component={FigurProject} href="https://github.com/daybrush/scenejs-render" title="Scene.js Recorder" />
  </div>
  <div class="more-area">
    <a href="https://github.com/daybrush/scena" class="more">More works</a>
  </div>
</div>

<!-- </InfiniteViewer> -->

<style>
  :global(.infinite-viewer) {
    width: 100%;
    height: 100%;
  }
  .viewport {
    --project-width: min(300px, calc(100vw * 0.4));
    max-width: 1800px;
    width: 100%;
    margin: 0px auto;
    display: block;
    font-size: 0;
    text-align: center;
  }
  .more-area {
    text-align: center;
    padding: 40px 0px;
  }
  .more {
    display: inline-block;
    padding: 10px 30px;
    border: 2px solid #333;
    background: transparent;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    color: #333;
  }
</style>
