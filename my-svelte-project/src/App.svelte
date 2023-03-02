<script>
  // import Counter from './lib/Counter.svelte'
  import Selector from './lib/Selector.svelte'
</script>


<main>
  <!-- Make component for toolbar -->
  <div> toolbar to place event options here 
    <ul> 
      <li> [Date] [Time Range]
      <li> Location: [dropdown]
      <li> Notes: [text box]
      <li> Delete 
    </ul>
  </div>

  <Selector />
</main>

<style>
</style>
