<script>
    import { Button } from "carbon-components-svelte";
    import { navigate } from 'svelte-routing';
    import { username } from '../store.js'

</script>

<main>
    <div class="wrapper">
        <div class="inputContainer">
            Thanks, {$username}! Schedule successfully inputted.
        <Button kind="secondary" on:click={() => navigate('/landing')}>Restart</Button>
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
        height: 90px;
        font-size: 20px;
    }
</style>