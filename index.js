"use strict";

// Variables
let divContainer = document.getElementById("cities");
let userInput = prompt("Skriv in en stad");
let h2Element = document.querySelector("h2");
let currentCity = 0;
let closestCity = 0;
let furthestCity = 0;
let closestDistance = 100000;
let furthestDistance = 0;


function showCity() {
    currentCity = findCity(userInput);

    if (currentCity) {
        h2Element.textContent = currentCity.name + " (" + currentCity.country + ")";
        document.title = currentCity.name;
        highlightCity();
        findClosestAndFurthest();
    } else {
        h2Element.textContent = userInput + " finns inte i databasen.";
        document.title = "not found";
    }
}

function findCity(cityName) {
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase() === cityName.toLowerCase()) {
            return cities[i];
        }
    }
    return undefined;
}


function highlightCity() {
    let allCityBoxes = divContainer.getElementsByClassName("cityBox");
    for (let i = 0; i < allCityBoxes.length; i++) {
        let cityBox = allCityBoxes[i];
        let city = findCity(cityBox.textContent);
        
        if (city && currentCity && city.id === currentCity.id) {
            cityBox.classList.add("target");
        } else {
            cityBox.classList.remove("target");
        }
    }
}

function findClosestAndFurthest() {
    for (let i = 0; i < distances.length; i++) {
        let currentDistance = distances[i];

        if (currentCity && currentDistance.city1 === currentCity.id) {
            if (currentDistance.distance < closestDistance) {
                closestDistance = currentDistance.distance;
                closestCity = currentDistance.city2;
            }
            if (currentDistance.distance > furthestDistance) {
                furthestDistance = currentDistance.distance;
                furthestCity = currentDistance.city2;
            }
        } else if (currentCity && currentDistance.city2 === currentCity.id) {
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
    markCities();
    displayDistances();
    updateDistanceText();
}


function markCities() {
    let allCityBoxes = divContainer.getElementsByClassName("cityBox");
    for (let i = 0; i < allCityBoxes.length; i++) {
        let cityBox = allCityBoxes[i];
        let city = findCity(cityBox.textContent);

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
    let closestBox = divContainer.querySelector(".closest");
    let furthestBox = divContainer.querySelector(".furthest");

    if (closestBox) {
        let closestCityName = findCityById(closestCity);
        closestBox.textContent = closestCityName + " ligger " + (closestDistance / 10).toFixed(0) + " mil bort";
    }

    if (furthestBox) {
        let furthestCityName = findCityById(furthestCity);
        furthestBox.textContent = furthestCityName + " ligger " + (furthestDistance / 10).toFixed(0) + " mil bort";
    }
}


function findCityById(cityId) {
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].id === cityId) {
            return cities[i].name;
        }
    }
    return ""; 
}


function updateDistanceText() {
    let closestSpan = document.getElementById("closest");
    let furthestSpan = document.getElementById("furthest");

    let closestCityName = findCityById(closestCity);
    let furthestCityName = findCityById(furthestCity);

    if (closestSpan) {
        closestSpan.textContent = closestCityName;
    }
    if (furthestSpan) {
        furthestSpan.textContent = furthestCityName;
    }
}


function createCityBoxes() {
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let newDiv = document.createElement("div");
        newDiv.textContent = city.name;
        newDiv.classList.add("cityBox");
        divContainer.appendChild(newDiv);
    }
}


function displayCityDistances() {
    let container = document.getElementById("table");
    let headerRow = "<div class='cell'></div>";
    for (let i = 0; i < cities.length; i++) {
        headerRow += "<div class='cell head_column'>" + i + "</div>";
    }

    container.innerHTML = headerRow;
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let row = "<div class='cell head_row'>" + city.id + " - " + city.name + "</div>";

        for (let j = 0; j < cities.length; j++) {
            let otherCity = cities[j];
            let dist = findDistance(city.id, otherCity.id);

            let cellClass = (i % 2 === 0 ? 'even_row' : '') + ' ' + (j % 2 === 0 ? 'even_col' : '');
            row += "<div class='cell " + cellClass + "'>" + (dist ? (dist / 10).toFixed(0) : "") + "</div>";
        }

        container.innerHTML += row;
    }
}


function findDistance(city1Id, city2Id) {
    for (let i = 0; i < distances.length; i++) {
        if ((distances[i].city1 === city1Id && distances[i].city2 === city2Id) || 
            (distances[i].city1 === city2Id && distances[i].city2 === city1Id)) {
            return distances[i].distance;
        }
    }
    return undefined; 
}


createCityBoxes();
showCity();
displayCityDistances();

