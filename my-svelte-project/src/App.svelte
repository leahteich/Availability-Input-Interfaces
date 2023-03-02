<script>
  // import Counter from './lib/Counter.svelte'
  import Selector from './lib/Selector.svelte'
  import Event from './lib/Event.svelte'

  let selectorComponent
  let selectedEvent = null
  const changeEvent = (obj) => {
    selectedEvent = obj.event
  }
</script>


<main>
  {#key selectedEvent}
    {#if selectedEvent}
      <div id="sticky"> <Event addEvent={selectorComponent.addEvent} eventObj={selectedEvent}/></div>
    {/if}
  {/key}
  <Selector bind:this={selectorComponent} summonToolbar={changeEvent}/>
  
</main>

<style>
#sticky {
  position: sticky!important;
  top: 1rem;
  z-index: 20
}

</style>
