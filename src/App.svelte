<!-- Main App Component -->

<script>

  import Home from "./routes/Home.svelte"
  import AboutUs from "./routes/AboutUs.svelte"
  import TimeTable from "./routes/TimeTable.svelte"

  import Header from "./components/Header.svelte";

  let url = '/'

  console.log (url)
</script>

<!-- TODOS: Add class dark to enable dark mode -->

<div class = "light">
 
  
  <Header bind:url = {url}/>
  
  {#if url == '/'}
    <Home/>
  {:else if url == 'timetable'}
    <TimeTable />
  {:else if url == 'about'}
    <AboutUs />
  {:else}
    <div>Page Not Found!!</div>
  {/if}
  
</div>


