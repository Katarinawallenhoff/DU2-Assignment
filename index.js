"use strict";

// Hämta referenser till HTML-element
const divContainer = document.getElementById("cities");
let userInput = prompt("Skriv in en stad");
let h2Element = document.querySelector("h2");

// Funktion för att visa stad och hitta närmaste/fjärraste städer
function showCity(cityName) {
    // Hitta den stad som användaren skrev
    const city = cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
    
    if (city) {
        h2Element.textContent = `${city.name} (${city.country})`;
        document.title = city.name;
        highlightCity(city.id); // Markera staden i listan
        findClosestAndFurthest(city.id); // Hitta närmaste och fjärraste städer
    } else {
        h2Element.textContent = `${cityName} finns inte i databasen.`;
        document.title = "not found";
    }
}

// Funktion för att markera den valda staden i listan
function highlightCity(cityId) {
    const allCityBoxes = divContainer.getElementsByClassName("cityBox");
    for (let cityBox of allCityBoxes) {
        const cityName = cityBox.textContent;
        const city = cities.find(c => c.name === cityName);
        cityBox.classList.toggle("target", city.id === cityId); // Markera vald stad
    }
}

// Funktion för att hitta närmaste och fjärraste städer
function findClosestAndFurthest(cityId) {
    let closestCity = null;
    let furthestCity = null;
    let closestDistance = Infinity;
    let furthestDistance = 0;

    distances.forEach(dist => {
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
    });

    markCities(closestCity, furthestCity);
    displayDistances(closestCity, furthestCity, closestDistance, furthestDistance);

    // Uppdatera texten i <span> för närmaste och fjärraste städer
    updateDistanceText(closestCity, furthestCity);
}

// Funktion för att markera den närmaste och fjärraste staden med klasser
function markCities(closestCity, furthestCity) {
    const allCityBoxes = divContainer.getElementsByClassName("cityBox");
    for (let cityBox of allCityBoxes) {
        const cityName = cityBox.textContent;
        const city = cities.find(c => c.name === cityName);

        cityBox.classList.remove("closest", "furthest"); // Ta bort tidigare markeringar

        // Markera den närmaste och fjärraste staden
        if (city.id === closestCity) {
            cityBox.classList.add("closest");
        }
        if (city.id === furthestCity) {
            cityBox.classList.add("furthest");
        }
    }
}

// Funktion för att visa avstånden i svenska mil (för närmaste och fjärraste städer)
function displayDistances(closestCity, furthestCity, closestDistance, furthestDistance) {
    const closestDistanceMiles = (closestDistance / 10).toFixed(0); // Omvandlar till svenska mil (och tar bort decimaler)
    const furthestDistanceMiles = (furthestDistance / 10).toFixed(0); // Omvandlar till svenska mil (och tar bort decimaler)

    const closestBox = divContainer.querySelector(".closest");
    const furthestBox = divContainer.querySelector(".furthest");

    if (closestBox) {
        const closestCityName = cities.find(city => city.id === closestCity)?.name || "Okänd";
        closestBox.innerHTML = `${closestCityName} ligger ${closestDistanceMiles} mil bort`;
    }

    if (furthestBox) {
        const furthestCityName = cities.find(city => city.id === furthestCity)?.name || "Okänd";
        furthestBox.innerHTML = `${furthestCityName} ligger ${furthestDistanceMiles} mil bort`;
    }
}

// Funktion för att uppdatera texten i <span id="closest"> och <span id="furthest">
function updateDistanceText(closestCity, furthestCity) {
    const closestCityName = cities.find(city => city.id === closestCity)?.name || "Okänd";
    const furthestCityName = cities.find(city => city.id === furthestCity)?.name || "Okänd";

    const closestSpan = document.getElementById("closest");
    const furthestSpan = document.getElementById("furthest");

    if (closestSpan) {
        closestSpan.textContent = `${closestCityName}`;
    }
    if (furthestSpan) {
        furthestSpan.textContent = `${furthestCityName}`;
    }
}

// Skapa en lista med alla städer
for (const city of cities) {
    const newDiv = document.createElement("div");
    newDiv.textContent = city.name;
    newDiv.classList.add("cityBox");
    divContainer.appendChild(newDiv);
}

// Kör funktionen när användaren skriver in en stad
showCity(userInput);




// Recommended: constants with references to existing HTML-elements




// Recommended: Ask for the city name and then the rest of the code







