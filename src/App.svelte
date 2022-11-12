<!-- Main App Component -->

<script>
  import { Router, Link, Route } from "svelte-routing"

  import Home from "./routes/Home.svelte"
  import AboutUs from "./routes/AboutUs.svelte"
  import TimeTable from "./routes/TimeTable.svelte"

  export let url = ""
</script>

<!-- TODOS: Add class dark to enable dark mode -->

<div>
  <!-- App Routing -->
  <Router url= {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="timetable">Blog</Link>
    </nav>
    <div>
      <Route path = "/" component = {Home} />
      <Route path = "about" component = {AboutUs} />
      <Route path = "timetable" component = {TimeTable} />
    </div>
  </Router>
</div>


