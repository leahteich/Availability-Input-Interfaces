<script>
    // import Counter from './lib/Counter.svelte'
    import Selector from '../lib/Selector.svelte'
    import Event from '../lib/Event.svelte'
    import { Button, UnorderedList, ListItem } from 'carbon-components-svelte'
    import { navigate } from 'svelte-routing';
    import { username } from '../store.js'

    let selectorComponent
    let selectedEvent = null
    const changeEvent = (obj) => {
      selectedEvent = obj.event
    }
  </script>
  
  
  <main>
    <h1>
      { $username }'s 53rd Week

    </h1>
    {#key selectedEvent}
      {#if selectedEvent}
        <div id="sticky"> 
          <Event 
            handleCancel={selectorComponent.handleCancel} 
            deleteEvent={selectorComponent.deleteEvent} 
            editEvent={selectorComponent.editEvent} 
            addEvent={selectorComponent.addEvent} 
            eventObj={selectedEvent}
          />
        </div>
      {/if}
    {/key}
    <h3>53rd Week Bonanza</h3>
    <h4>Proposed Location: Smith Center Collaborative Commons</h4>
    <hr/>
    <UnorderedList nested>
      <ListItem>
        Click and drag on the calendar to select your available times.
      </ListItem>
      <ListItem>
        Click an existing time range to edit it.
      </ListItem>
      <ListItem>
        Click and drag an existing time range to move it earlier/later, or to a different day.
      </ListItem>
      <ListItem>
        Click and drag near the bottom of an existing time range to resize it.
      </ListItem>
    </UnorderedList>
    <br/>
    
    <Selector bind:this={selectorComponent} summonToolbar={changeEvent}/><br/>
    <Button kind="secondary" on:click={() => navigate('/success')}>Submit</Button>
    
  </main>
  
  <style>
    main {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      /* text-align: center; */
    }
    #sticky {
      position: sticky!important;
      top: 1rem;
      z-index: 20
    }
    h3 {
      font-weight: bold;
    }
  
  </style>
  