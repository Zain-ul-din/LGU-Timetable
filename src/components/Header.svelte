<!-- Header Component -->

<script>

    const navBarOptions = [
        { title: 'TimeTable', route: '/'},
        { title: 'Free Class Rooms', route: 'timetable'},
        { title: 'About Us', route: 'about'}
    ]

    let currIdx = 0
    export let url
</script>

<div class="fixed top-0 left-0 h-screen w-56 m-0 flex flex-col shadow-lg rounded-r-lg text-dark bg-gray-100 dark:bg-gray-900 dark:text-white">
    
    <div class= "mt-3 p-5 text-sm text-style-bold self-start font-medium">LGU TIME TABLE</div>
    <div>
        {#each navBarOptions as option, i}
            <li 
                class={`${currIdx == i ? 'bg-white border-r-green-400  dark:border-r-white border-r-4 dark:bg-slate-700' : ''} ml-2 rounded-l-lg mt-4 list-none p-3 pl-6 cursor-pointer transition-all duration-300 ease-linear`}
                on:click={()=> {
                    currIdx = i
                    url = option.route
                }}
                on:keydown = {()=> currIdx = i}
            >
                {option.title} 
            </li>
        {/each}
    </div>
</div>


