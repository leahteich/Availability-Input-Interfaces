<script>
  // import Selector from './lib/Selector.svelte'
  // import Event from './lib/Event.svelte'
  import { Router, Route } from 'svelte-routing'
  import Selection from "./pages/Selection.svelte";
  import Landing from "./pages/Landing.svelte";
  import Success from "./pages/Success.svelte"
  import Admin from "./pages/Admin.svelte"
  import "carbon-components-svelte/css/white.css";

</script>
<main>
  <Router>
    <Route component={Landing} />
    <Route path="/selection">
        <Selection/>
    </Route>
    <Route path="/success">
        <Success/>
    </Route>
    <Route path="/admin">
      <Admin/>
  </Route>
  </Router>
</main>
