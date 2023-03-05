<script>
    let name = ""
    let notes = ""
    import { Button, RadioButton, RadioButtonGroup } from "carbon-components-svelte";

    export let eventObj
    export let addEvent
    export let editEvent
    export let handleCancel
    export let deleteEvent

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
        <br/>
        <div class="grid-container">
            <div class="grid-child purple">
                <RadioButtonGroup bind:selected={location} on:change={() => console.log(location)} legendText="Location">
                    <RadioButton value='Virtually' labelText="Virtual"/>
                    <RadioButton value='In person' labelText="In person"/>
                    <RadioButton value='Virtual or in person' labelText="Both"/>
                </RadioButtonGroup>
            </div>
            <div class="grid-child green">
                <RadioButtonGroup bind:selected={availabilityType} on:change={() => console.log(availabilityType)} legendText="Availability">
                    <RadioButton value='definite' labelText="Definitely!"/>
                    <RadioButton value='ifNeeded' labelText="If needed"/>
                </RadioButtonGroup>
            </div>
            <div>
                <Button kind="primary" on:click={() => handleSubmit()}>Done</Button>
                <Button kind="secondary" on:click={() => {if (!editing) {handleCancel()}; show = false}}>Cancel</Button>
                {#if editing}
                <Button kind="danger" on:click={() => {deleteEvent(eventObj.id); show = false}}>Delete</Button>
                {/if}
            </div>
        </div>
        {err}
    </div>
    {/if}
</main>

<style>
    #eventbox {
        background: lightgray;
        color: black;
        padding: 0.25rem
    }
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        /* padding-left: 10%; */
        /* padding-right: 10%; */
        padding-bottom: 20px;
    }

    .grid-child {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 25%;
    }
</style>
