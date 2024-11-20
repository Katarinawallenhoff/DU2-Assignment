"use strict";

const cityContainer = document.querySelector("#cities");

// En for loop som bara skriver ut alla städer i en array. 
for (let i = 0; i < cities.length; i++) {
  const boxOfCity = document.createElement("div");
  boxOfCity.textContent = cities[i].name;
  boxOfCity.className = "cityBox";
  cityContainer.appendChild(boxOfCity);
}

// Recommended: All functions declared here


// Recommended: constants with references to existing HTML-elements



// Recommended: Ask for the city name and then the rest of the code







