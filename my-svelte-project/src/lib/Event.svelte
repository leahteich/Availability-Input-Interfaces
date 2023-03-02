<script>
    let name = ""
    let notes = ""
    import { Button } from "carbon-components-svelte";

</script>

<main>
    <div id="eventbox"> 
        [Date] from [startTime] to [endTime]<br>
        {name} 
        <div class="grid-container">
            <div class="grid-child purple">
                location @ <input bind:value={name}>

            </div>
            <div class="grid-child green">
                notes? <input bind:value={notes}>
            </div>
            <div class="grid-child green">
                <Button>delete</Button>
            </div>
        </div>
    </div>
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
