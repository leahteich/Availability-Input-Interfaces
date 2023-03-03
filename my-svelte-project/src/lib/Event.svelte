<script>
    let name = ""
    let notes = ""
    import { Button } from "carbon-components-svelte";

    export let eventObj
    export let addEvent
    export let editEvent

    /* 
        Only events that already exist will have extended props (for availability types),
        so we can use it to tell if this is a new or existing event. 
    */
    let editing = !!eventObj.extendedProps
    let startTime = eventObj.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    let endTime = eventObj.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    let date = eventObj.start.toLocaleString('default', { month: 'long' }) + ' ' + eventObj.start.getDate()
    let show = true
    let location = eventObj.title || null
    let availabilityType = (eventObj.extendedProps && eventObj.extendedProps.availabilityType) || null
    let err = ''

    const handleSubmit = () => {
        if (editing){
            console.log(availabilityType)
            editEvent({
                ...eventObj, title: location, 
                backgroundColor: availabilityType == 'definite' ? '#3d8c40' : '#ed820e',
                extendedProps: {
                    availabilityType
                }})
            show = false
        } else {
            if (location && availabilityType) {
                addEvent({
                    ...eventObj, 
                    title: location, 
                    backgroundColor: availabilityType == 'definite' ? '#3d8c40' : '#ed820e',
                    extendedProps: {
                        availabilityType
                    }
                })
                show = false
            } 
            if (!location) {
                err = "Please select a location."
            } 
            if (!availabilityType) {
                err = "Please select an availability type."
            }
        }
        
    }
</script>

<main>
    {#if show}
    <div id="eventbox"> 
        {date} from {startTime} to {endTime}<br>
        <!-- {name} -->
        <br/>
        <div class="grid-container">
            <div class="grid-child purple">
                Location:
                <Button on:click={() => {location = "Virtual"}}>Virtually</Button>
                <Button on:click={() => {location = "In person"}}> In person</Button>
                <Button on:click={() => {location = "Virtual or in person"}}>Both</Button>
            </div>
            <div class="grid-child green">
                Availability:
                <Button on:click={() => {availabilityType = "definite"}}>Definitely!</Button>
                <Button on:click={() => {availabilityType = "ifNeeded"}}>If needed</Button>
            </div>
            <div class="grid-child green">
                <Button on:click={() => handleSubmit()}>
                    Done
                </Button>
                <Button sx={{margin: 20}}>Delete</Button>
            </div>
        </div>
        {err}
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
