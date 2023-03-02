<script>
  // import Counter from './lib/Counter.svelte'
  import Selector from './lib/Selector.svelte'
  import Event from './lib/Event.svelte'
</script>


<main>
  <div id="sticky"> <Event /></div>
  <Selector />
  
</main>

<style>
#sticky {
  position: sticky!important;
  top: 1rem;
  z-index: 3
}

</style>
