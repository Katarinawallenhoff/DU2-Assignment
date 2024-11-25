"use strict";

// Variables
const divContainer = document.getElementById("cities");
const userInput = prompt("Skriv in en stad");
const h2Element = document.querySelector("h2");

let currentCity = 0;
let closestCity = 0;
let furthestCity = 0;
let closestDistance = 99999;
let furthestDistance = 0;

// function for finding closest and furthest city, if the city is found
//the highlightCityfunction will be called and the find Closest and furthest. 
function showCity() {
    currentCity = cities.find(city => city.name.toLowerCase() === userInput.toLowerCase());
    
    if (currentCity) {
        h2Element.textContent = `${currentCity.name} (${currentCity.country})`;
        document.title = currentCity.name;
        highlightCity();
        findClosestAndFurthest();
    } else {
        h2Element.textContent = `${userInput} finns inte i databasen.`;
        document.title = "not found";
    }
}

function highlightCity() {
    const allCityBoxes = divContainer.getElementsByClassName("cityBox");
    for (let cityBox of allCityBoxes) {
        const city = cities.find(c => c.name === cityBox.textContent);
        if (city && currentCity && city.id === currentCity.id) {
            cityBox.classList.add("target");
        } else {
            cityBox.classList.remove("target");
        }
    }
}

function findClosestAndFurthest() {
    // Loop through each distance record in the 'distances' array
    for (let i = 0; i < distances.length; i++) {
        const currentDistance = distances[i]; // Get the current distance record

        // Check if the current city is the first city in the distance pair
        if (currentCity && currentDistance.city1 === currentCity.id) {
            // Compare the distance with the closest and furthest distances
            if (currentDistance.distance < closestDistance) {
                closestDistance = currentDistance.distance;
                closestCity = currentDistance.city2;
            }
            if (currentDistance.distance > furthestDistance) {
                furthestDistance = currentDistance.distance;
                furthestCity = currentDistance.city2;
            }
        }
        // Check if the current city is the second city in the distance pair
        else if (currentCity && currentDistance.city2 === currentCity.id) {
            // Compare the distance with the closest and furthest distances
            if (currentDistance.distance < closestDistance) {
                closestDistance = currentDistance.distance;
                closestCity = currentDistance.city1;
            }
            if (currentDistance.distance > furthestDistance) {
                furthestDistance = currentDistance.distance;
                furthestCity = currentDistance.city1;
            }
        }
    }

    // After finding the closest and furthest cities, call other functions to update the UI
    markCities();
    displayDistances();
    updateDistanceText();
}


function markCities() {
    const allCityBoxes = divContainer.getElementsByClassName("cityBox");
    for (let cityBox of allCityBoxes) {
        const city = cities.find(c => c.name === cityBox.textContent);

        cityBox.classList.remove("closest", "furthest");

        if (city && closestCity && city.id === closestCity) {
            cityBox.classList.add("closest");
        }
        if (city && furthestCity && city.id === furthestCity) {
            cityBox.classList.add("furthest");
        }
    }
}

function displayDistances() {
    const closestBox = divContainer.querySelector(".closest");
    const furthestBox = divContainer.querySelector(".furthest");

    if (closestBox) {
        const closestCityName = cities.find(city => city.id === closestCity)?.name;
        closestBox.textContent = `${closestCityName} ligger ${(closestDistance / 10).toFixed(0)} mil bort`;
        console.log(closestCityName);
    }

    if (furthestBox) {
        const furthestCityName = cities.find(city => city.id === furthestCity)?.name;
        furthestBox.textContent = `${furthestCityName} ligger ${(furthestDistance / 10).toFixed(0)} mil bort`;
    }
}

function updateDistanceText() {
    const closestSpan = document.getElementById("closest");
    const furthestSpan = document.getElementById("furthest");

    const closestCityName = cities.find(city => city.id === closestCity)?.name;
    const furthestCityName = cities.find(city => city.id === furthestCity)?.name;

    if (closestSpan) {
        closestSpan.textContent = closestCityName;
    }
    if (furthestSpan) {
        furthestSpan.textContent = furthestCityName;
    }
}

function createCityBoxes() {
    for (const city of cities) {
        const newDiv = document.createElement("div");
        newDiv.textContent = city.name;
        newDiv.classList.add("cityBox");
        divContainer.appendChild(newDiv);
    }
}

function displayCityDistances() {
    const container = document.getElementById("table");
    let headerRow = "<div class='cell'></div>"; // Empty top-left cell

    // Create the header row (city IDs across the top)
    for (let i = 0; i < cities.length; i++) {
        headerRow += `<div class='cell head_column'>${i}</div>`;
    }

    container.innerHTML = headerRow;

    // Create rows for each city
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        let row = `<div class='cell head_row'>${city.id} - ${city.name}</div>`; // Left header cell

        for (let j = 0; j < cities.length; j++) {
            const otherCity = cities[j];

            // Find the distance between the two cities
            const dist = distances.find(d => 
                (d.city1 === city.id && d.city2 === otherCity.id) || 
                (d.city1 === otherCity.id && d.city2 === city.id)
            );

            // Add cell with the distance value or blank if not found
            const cellClass = (i % 2 === 0 ? 'even_row' : '') + ' ' + (j % 2 === 0 ? 'even_col' : '');
            row += `<div class='cell ${cellClass}'>${dist ? (dist.distance / 10).toFixed(0) : ""}</div>`;
        }

        container.innerHTML += row; // Append the row to the table
    }
}

// Example initialization to call the function
// Assuming cities and distances arrays are defined elsewhere in your code
// cities = [{ id: 1, name: "City A" }, { id: 2, name: "City B" }, ...];
// distances = [{ city1: 1, city2: 2, distance: 100 }, ...];

createCityBoxes();
showCity();
displayCityDistances();



/*Here’s a supershort list of which functions are connected:

createCityBoxes() → No dependencies, creates city boxes.
showCity() → Calls:
highlightCity()
findClosestAndFurthest()
highlightCity() → Uses currentCity to highlight the correct city box.
findClosestAndFurthest() → Calls:
markCities()
displayDistances()
updateDistanceText()
markCities() → Marks closest and furthest cities in the UI.
displayDistances() → Displays distances for closest and furthest cities.
updateDistanceText() → Updates text for closest and furthest cities.
displayCityDistances() → Creates and displays the table of distances between all cities.
Dependencies:
showCity() → Depends on highlightCity(), findClosestAndFurthest().
findClosestAndFurthest() → Depends on markCities(), displayDistances(), updateDistanceText(). */