
"use strict";

const divContainer = document.getElementById("cities");

let userInput = prompt("Skriv in en stad");
let h2Element = document.querySelector("h2");


for (const city of cities) {
    const newDiv = document.createElement("div");
    newDiv.textContent = city.name; 
    newDiv.classList.add("cityBox");
    divContainer.appendChild(newDiv);
}

//Function for the first step: The text is updated and says if the text is true or not.

function f1() {
    let found = false;  

    for (let city of cities) {
        if (city.name.toLowerCase() === userInput.toLowerCase()) {
            h2Element.textContent = city.name + " (" + city.country + ")";
            document.title = city.name;
            found = true; 
            break; 
        }
    }

    if (!found) {
        h2Element.textContent = userInput + " finns inte i databasen.";
        document.title = "Not found";
    }
}

f1();  

// Function to find the ID of the input city, then find closest and furthest cities
function findClosestAndFurthest(cityName) {
    let cityId = null;
    let closestCity = null;
    let furthestCity = null;
    let closestDistance = Infinity;  // Start with a very large distance
    let furthestDistance = 0;  // Start with the smallest possible distance

    // Find the ID of the city based on user input
    for (let city of cities) {
        if (city.name.toLowerCase() === cityName.toLowerCase()) {
            cityId = city.id;
            break;
        }
    }

    if (cityId === null) {
        alert("City not found in the database.");
        return;
    }

    // Loop through the distances array to find closest and furthest cities
    for (let dist of distances) {
        if (dist.city1 === cityId) {
            if (dist.distance < closestDistance) {
                closestDistance = dist.distance;
                closestCity = dist.city2;
            }
            if (dist.distance > furthestDistance) {
                furthestDistance = dist.distance;
                furthestCity = dist.city2;
            }
        } else if (dist.city2 === cityId) {
            if (dist.distance < closestDistance) {
                closestDistance = dist.distance;
                closestCity = dist.city1;
            }
            if (dist.distance > furthestDistance) {
                furthestDistance = dist.distance;
                furthestCity = dist.city1;
            }
        }
    }

    // Mark the cities accordingly
    markCities(cityId, closestCity, furthestCity);
}

// Function to mark the cities (selected, closest, furthest) with CSS classes
function markCities(selectedId, closestId, furthestId) {
    const allCityBoxes = divContainer.getElementsByClassName("cityBox");
    
    // Reset the previous city markings
    for (let cityBox of allCityBoxes) {
        cityBox.classList.remove("target", "closest", "furthest");
    }

    // Find and mark the selected, closest, and furthest cities
    for (let cityBox of allCityBoxes) {
        const cityName = cityBox.textContent;
        const city = cities.find(c => c.name === cityName);

        if (city.id === selectedId) {
            cityBox.classList.add("target");  // Mark the target city (user input)
        }
        if (city.id === closestId) {
            cityBox.classList.add("closest");  // Mark the closest city
        }
        if (city.id === furthestId) {
            cityBox.classList.add("furthest");  // Mark the furthest city
        }
    }
}

// Call the function to process the user's input and find closest/furthest cities
findClosestAndFurthest(userInput);






    



// Recommended: constants with references to existing HTML-elements




// Recommended: Ask for the city name and then the rest of the code







