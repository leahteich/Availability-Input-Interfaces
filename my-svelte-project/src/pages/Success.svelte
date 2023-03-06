<script>
    import { Button } from "carbon-components-svelte";
    import { navigate } from 'svelte-routing';
    import { name } from '../store.js'

</script>

<main>
    <div class="wrapper">
        <div class="inputContainer">
            Thanks, {$name}! Schedule successfully inputted.<br/> 
            Please click Restart for the next person!
        <Button kind="secondary" on:click={() => navigate('/')}>Restart</Button>
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
        height: 125px;
        font-size: 20px;
        line-height: 30px;
    }
</style>