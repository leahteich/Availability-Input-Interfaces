<script>
    let name = ""
    let notes = ""
    import { Button } from "carbon-components-svelte";

    export let eventObj
    export let addEvent
    let startTime = eventObj.start.toTimeString()
    let endTime = eventObj.end.toTimeString()
    let date = eventObj.start.getDate()
    let show = true

</script>

<main>
    {#if show}
    <div id="eventbox"> 
        {date} from {startTime} to {endTime}<br>
        {name} 
        <div class="grid-container">
            <div class="grid-child purple">
                location @ <input bind:value={name}>

            </div>
            <div class="grid-child green">
                notes? <input bind:value={notes}>
            </div>
            <div class="grid-child green">
                <Button on:click={() => {addEvent(eventObj); show = false}}>Done</Button>
                <Button>Delete</Button>
            </div>
        </div>
    </div>
    {/if}
</main>

<style>
    #eventbox {
        background: grey;
        color: black;
        padding: 0.25rem
    }
    .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    }

</style>
