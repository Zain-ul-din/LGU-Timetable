import { useEffect } from "react";
// write code which make snow fall from the top of my webpage

function random(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create a function to generate a snowflake
function generateSnowflake(): void {
    console.log ("snow flake")
  // Create a new div element for the snowflake
  var snowflake = document.createElement('div');
  // Set the class name and initial position
  snowflake.className = 'snowflake';
  snowflake.style.left = random(0, window.innerWidth) + 'px';
  // Add the snowflake to the container
  document.getElementById('snowflake-container')?.appendChild(snowflake);
  // Animate the snowflake falling
  snowflake.style.animation = 'fall ' + random(5, 15) + 's linear infinite';
}


export function useSnowFall (): void {
    return useEffect (()=>{
        const snowInterval = setInterval(generateSnowflake, 500);
        return ()=> {    clearInterval (snowInterval)    }
    }, [])
}


