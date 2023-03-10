<script>
    // Software Concept: Reusable components from Carbon Components
    import { Button, RadioButton, RadioButtonGroup } from "carbon-components-svelte";
    import { besttimes } from '../store.js'

    export let eventObj
    export let addEvent
    export let editEvent
    export let handleCancel
    export let deleteEvent

    /* 
        Only events that already exist will have extended props (for availability types),
        so we can use it to tell if this is a new or existing event. 

        Software concept: Event blocks
    */
    let editing = !!eventObj.extendedProps
    let startTime = eventObj.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    let endTime = eventObj.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    let startdate = eventObj.start.toLocaleString('default', { month: 'long' }) + ' ' + eventObj.start.getDate()
    let enddate = eventObj.end.toLocaleString('default', { month: 'long' }) + ' ' + eventObj.end.getDate()
    let show = true
    let location = eventObj.title || null
    let availabilityType = (eventObj.extendedProps && eventObj.extendedProps.availabilityType) || null
    let err = ''


    /** Dispatch event on click outside of node */
    function clickOutside(node) {

    
    // Software Concept: Svelte Reactivity 
    const handleClick = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
            new CustomEvent('click_outside', node)
        )
        }
    }
        document.addEventListener('click', handleClick, true);
    
    return {
        destroy() {
        document.removeEventListener('click', handleClick, true);
        }
        }
    }
    const handleSubmit = () => {
        if (editing){
            editEvent({
                ...eventObj, title: location, 
                backgroundColor: availabilityType == 'definite' ? '#3d8c40' : '#ed820e',
                extendedProps: {
                    availabilityType
                }})
            show = false
        } else {
            if (location && availabilityType && (enddate == startdate)) {
                // Software Concept: Modular, reusable components
                // Availability Concept: Spatial rendering of times
                addEvent({
                    ...eventObj, 
                    title: location, 
                    backgroundColor: availabilityType == 'definite' ? '#3d8c40' : '#ed820e',
                    extendedProps: {
                        availabilityType
                    }
                })
                $besttimes.push((startTime+"-" + endTime +"_" + startdate).toString())
                show = false
            }
            if (!location && !availabilityType) {
                err = "Please select an availability and location."
            }
            else if (!location) {
                err = "Please select a location."
            } 
            else if (!availabilityType) {
                err = "Please select an availability type."
            }
            else if (enddate != startdate) {
                err = "Event cannot be multi-day"
            }
        }
    }
    function handleClickOutside(event) {
		handleSubmit();
	}

</script>

<main>
    {#if show}
    <div id="eventbox" use:clickOutside on:click_outside={handleClickOutside}>
        {startdate} from {startTime} to {endTime}<br>
        <br/>
        <!-- Availability Concept: Preferences, helping users find the most optimal time and place -->
        <div class="grid-container">
            <div class="grid-child purple">
                <RadioButtonGroup bind:selected={location} legendText="Location">
                    <RadioButton value='Virtually' labelText="Virtual"/>
                    <RadioButton value='In person' labelText="In person"/>
                    <RadioButton value='Virtual or in person' labelText="Both"/>
                </RadioButtonGroup>
            </div>
            <div class="grid-child green">
                <RadioButtonGroup bind:selected={availabilityType} legendText="Availability">
                    <RadioButton value='definite' labelText="Definitely!"/>
                    <RadioButton value='ifNeeded' labelText="If needed"/>
                </RadioButtonGroup>
            </div>
            <div>
                <!-- Availability Concept: Event Modification -->
                <Button kind="primary" on:click={() => handleSubmit()}>Add Event</Button>
                <Button kind="secondary" on:click={() => {if (!editing) {handleCancel()}; show = false}}>Cancel</Button>
                {#if editing}
                <Button kind="danger" on:click={() => {deleteEvent(eventObj.id); show = false}}>Delete</Button>
                {/if}
            </div>
        </div>
        <div class="error">{err}</div>
    </div>
    {/if}
</main>

<style>
    #eventbox {
        background: lightgray;
        color: black;
        padding: 0.25rem;
        text-align: center;
        margin-bottom: 20px;
        padding-top: 10px;
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
    .error {
        color: #BA0001;
        margin-bottom: 10px;
    }
</style>
