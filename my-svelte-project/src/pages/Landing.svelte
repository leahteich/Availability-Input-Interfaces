<script>
    import { Button, TextInput } from "carbon-components-svelte";
    import { navigate } from 'svelte-routing'

    let userName;
    let error = false
    const validateInput = () => {
        if (!userName) {
            error = true
        } else {
            navigate('/selection')
        }
    }
</script>

<main>
    <div class="wrapper">
        <div class="inputContainer">
            <div class="text">Event: 53rd Week Bonanza</div>
            <div class="text">Welcome! Enter your name below:</div>
            <TextInput invalid={error} invalidText="Please enter a name" bind:value={userName} placeholder="Your name here..." />
            <Button kind="secondary" on:click={() => validateInput()}>Submit</Button>
        </div>
    </div>
</main>

<style>
    .wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-bottom: 200px;
    }
    .inputContainer {
        display: inherit;
        justify-content: space-between;
        /* align-items: inherit; */
        flex-direction: inherit;
        width: 500px;
        height: 180px;
    }
    .text {
        margin-bottom: 15px;
        font-size: 20px;
    }
</style>