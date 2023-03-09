<script>
    import Selector from '../lib/Selector.svelte';
    import Event from '../lib/Event.svelte';
    import { Button, UnorderedList, ListItem } from 'carbon-components-svelte';
    import { navigate } from 'svelte-routing';
    import { name, starttime, besttimes, bestoverall } from '../store.js';
    import { onMount } from 'svelte';
    import moment from 'moment'
    import { getBest } from '../besttime.js'

    let db;
    let users = []

    onMount(async function() {
        db = new PouchDB('db');
        await updateUsers();
    });

    let selectorComponent
    let selectedEvent = null
    const changeEvent = (obj) => {
      selectedEvent = obj.event
    }


    async function addUser(event){
      var end = new Date();
      let endtime = end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds();

        const newUser = {
            nameval: $name,
            start: $starttime,
            end: endtime,
            times: $besttimes
        }
        console.log(newUser);
        navigate('/success')
        $besttimes = []
        const sendtoDB = await db.post(newUser);
        await updateUsers();
        
      let allBest = getBest(users)[0]
      let newtimeslots = getBest(users)[1]

      for (const [key, value] of Object.entries(newtimeslots)) {
        for (let i=0; i<value.length; i++) {
          const counts = {}
          for (const num of value) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
          }
          allBest[key] = counts
        }
      }

      let besttime;
      let bestday;
      let bestcount = 0;

      for (const [day, times] of Object.entries(allBest)) {
        for (const [time, instances] of Object.entries(times)) {
          if (instances >= bestcount) {
            besttime = time
            bestcount = instances
            bestday = day
          }
        }
      }
      $bestoverall = " the optimal meeting time is " + bestday + " at " + besttime + "."
    }

    async function updateUsers() {
      const allUsers = await db.allDocs({
        include_docs:true
      });

      users = allUsers.rows.map(row => row.doc).filter(value => Object.keys(value).length !== 0);
    }


      </script>
  
<svelte:head>
    <script src="//cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js"></script>
</svelte:head>

  
  <main>
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
        <h3>Hi, {$name}</h3>
        <h3 id="eventtxt">Event: 53rd Week Bonanza</h3>
        <h4>Proposed Location: Smith Center Collaborative Commons</h4>
        <br/>
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
    

    <hr/>
    <br/>
    
    <Selector bind:this={selectorComponent} summonToolbar={changeEvent}/><br/>
  
    <div id="buttonContainer">
      <Button kind="primary" on:click={() => addUser()}>Submit</Button>
    </div>
  </main>
  
  <style>
    main {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
    }
    #sticky {
      position: sticky!important;
      top: 1rem;
      /* dont ask why */
      z-index: 1001!important;
    }
    #eventtxt {
      font-weight: bold;
    }
    #buttonContainer {
      display: flex;
      align-items: center;
      justify-content: center;
    }


  
  </style>
  