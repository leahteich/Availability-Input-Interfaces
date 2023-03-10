<!-- Availability Concept: Identification/Anonymity: Allowing users to identify themselves 
(or use a pseudonym) so we can track preferences. -->
<script>
    import { Button, TextInput, Dropdown } from "carbon-components-svelte";

    // Software Concept: Routing, enabling us to pass data and switch to other views 
    import { navigate } from 'svelte-routing'

    // Concept: Data storage: Use of a unique, Svelte local miniature database here implemented as a "store"
    import { name, starttime } from '../store.js'

    let userName;
    let error = false
    
    // Ensuring users put in valid usernames
    const validateInput = () => {
        if (!userName) {
            error = true
        } else {
            $name = userName.charAt(0).toUpperCase() + userName.slice(1);
            var today = new Date();
            $starttime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            navigate('/selection')
        }
    }
    let selectedValue = ""
</script>

<main>
    <div class="wrapper">
        <div class="inputContainer">
            <div class="text">Event: 53rd Week Bonanza</div>
            <div class="text">Welcome! Enter your name and timezone below:</div>
            <TextInput invalid={error} invalidText="Please enter a name" bind:value={userName} placeholder="Your name here..." />
            <br/>
            <!-- Availability Concept: Time Zone Compatibility -->
            <Dropdown
                size="sm"
                titleText="Timezone"
                selectedId="0"
                items={[
                    { id: "0", text: "EST" },
                    { id: "1", text: "CST" },
                    { id: "3", text: "MST" },
                    { id: "4", text: "PST" },
                    { id: "5", text: "AKST" },
                    { id: "6", text: "HST" },
                ]}
            />
            <br/>
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