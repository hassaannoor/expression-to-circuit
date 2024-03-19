<script lang="ts">
  //   import { getLogicGateDiagram } from "$lib/canvas-drawing";
  import DownloadBtn from "$lib/components/DownloadBtn.svelte";
  import {
    createBinaryOperationTree,
    treeIntoArray,
  } from "$lib/expression-parsing";
  import { onMount } from "svelte";

  let inBrowser = false;
  onMount(async () => {
    inBrowser = true;
    genCircuit(expressionInput);
  });

  async function genCircuit(expression) {
    updating = true;
    
    const { getLogicGateDiagram } = await import("$lib/canvas-drawing.js");
    let tree = createBinaryOperationTree(expression);
    let nodesArr = [];
    treeIntoArray(tree, null, nodesArr);
    
    canvas = getLogicGateDiagram(nodesArr);
    canvasContainer.replaceChildren(canvas);

    setTimeout(() => (updating = false), 500);
  }
  function downloadCanvasImg(canvas) {
    var link = document.createElement("a");
    link.download = "circuit.png";
    link.href = canvas.toDataURL();
    link.click();
  }
  function handleDownloadBtn(ev) {
    downloadCanvasImg(canvas);
  }

  $: inBrowser && genCircuit(expressionInput);

  let expressionInput = "A!BC+ABC+AC+!ABC";
  let canvasContainer: HTMLElement;
  let canvas: HTMLElement;
  let updateNotification: HTMLElement;
  let updating = false;
</script>

<div class="bg-gray-900 py-10 min-h-screen">
  <div class="container mx-auto ">
    <h1 class="text-2xl mb-2 font-bold text-white px-4">Boolean to Proteus Circuit</h1>

    <div class="py-8 bg-white/10 rounded px-4 mb-4">
        
    <div class="relative my-4 w-60">
        <input
          type="text"
          name="expression-input"
          id="expression-input"
          bind:value={expressionInput}
          class="peer block w-full appearance-none rounded-lg border border-gray-500 bg-transparent px-2.5 pr-3 pb-2.5 pt-4 text-sm text-gray-100 bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder=" "
        />
        <label
          for="expression-input"
          class="absolute -top-2 left-1 z-10 origin-[0] -translate-y-4 transform cursor-text select-none px-2 text-sm text-gray-400 duration-300 "
        >
          Expression
        </label>
      </div>

      <div class="flex w-40 mt-4" on:click={handleDownloadBtn}>
        <DownloadBtn />
      </div>
    </div>

    <div bind:this={canvasContainer} class="px-4 flex"/>
  </div>

  <span class="bg-white/20 opacity-0 fixed top-0 right-0 m-4 text-white/80 text-sm px-2 py-1 rounded transition duration-700 {updating ? "opacity-100" : ""}"> Updating... </span>

</div>

<style lang="postcss">
    :global(canvas) {
        @apply w-full ring-2 ring-blue-600 sm:w-auto;
    }
</style>