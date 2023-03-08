<script>
    import { allusers } from "../store.js"
    let myusers = $allusers
    console.log(myusers)
    const db = window.indexedDB.open('_pouch_db');



</script>

<main>
    <div class="wrapper">
        <div class="inputContainer">
            Admin Tools <br/>
            Best time: [Time] <br/>
            Data   
            {#each $allusers as { nameval, start, end, times }, i}
            <li>
                {i + 1}: {nameval} took {start - end} to submit {times} 
            </li>
            {/each}
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