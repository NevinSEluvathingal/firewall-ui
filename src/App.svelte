<script>
  import { Router, Route } from "svelte-routing";

  import SignIn from "./signIn.svelte";
  import SignUp from "./signUp.svelte";
  import bar from "./user.svelte";
  import Admin from "./admin.svelte"
</script>

<Router>
    <Route path="/" component={SignIn} />
    <Route path="/admin" component={Admin} />
  <Route path="/sign-in" component={SignIn} />
  <Route path="/sign-up" component={SignUp} />
  <Route path="/Bar" component={bar} />
</Router>
