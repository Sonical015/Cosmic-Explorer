
// small random helpers

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function makeName() {
    let parts = ["Aru", "Zel", "Nex", "Vora", "Kry", "Eli", "Tha", "Or", "Lumi", "Xa"];
    let endings = ["on", "ia", "us", "ara", "ex", "ora", "ium"];

    return pickRandom(parts) + pickRandom(parts) + pickRandom(endings);
}


// star types

const starTypes = [
    { type: "Blue star", color: "#8dbdff", min: 10000, max: 30000, mass: 2.5, age: 2 },
    { type: "White star", color: "#e6eaff", min: 7500, max: 10000, mass: 1.5, age: 4 },
    { type: "Yellow star", color: "#ffe28a", min: 5200, max: 6000, mass: 1, age: 8 },
    { type: "Orange star", color: "#ffad65", min: 3700, max: 5200, mass: 0.8, age: 10 },
    { type: "Red dwarf", color: "#ff6868", min: 2400, max: 3700, mass: 0.4, age: 12 }
];


// planet types based on their distance from the star

const planetTypes = {
    inner: ["rocky", "volcanic", "desert"],
    middle: ["rocky", "ocean", "temperate"],
    outer: ["gas", "ice"]
};


// generate one star

function createStar() {
    let star = pickRandom(starTypes);

    return {
        name: makeName(),
        type: star.type,
        color: star.color,
        temperature: randomNumber(star.min, star.max),
        mass: (star.mass + Math.random() * 0.5).toFixed(2),
        age: randomNumber(1, star.age)
    };
}


// generate a planet

function createPlanet(position) {

    let zone;

    if (position < 0.35) {
        zone = "inner";
    } else if (position < 0.7) {
        zone = "middle";
    } else {
        zone = "outer";
    }

    let type = pickRandom(planetTypes[zone]);

    let gravity = randomNumber(3, 20) / 10;
    let temperature;

    if (zone === "inner") {
        temperature = randomNumber(250, 700);
    } else if (zone === "middle") {
        temperature = randomNumber(180, 330);
    } else {
        temperature = randomNumber(30, 180);
    }

    let atmospheres = {
        rocky: ["Thin carbon dioxide", "Nitrogen-rich", "Very thin atmosphere"],
        volcanic: ["Sulphur-rich", "Carbon dioxide", "Toxic volcanic gases"],
        desert: ["Dry nitrogen", "Carbon dioxide", "Thin dusty atmosphere"],
        ocean: ["Nitrogen and oxygen", "Water vapour-rich"],
        temperate: ["Nitrogen and oxygen", "Oxygen-rich"],
        gas: ["Hydrogen and helium", "Hydrogen-rich"],
        ice: ["Methane and nitrogen", "Thin nitrogen atmosphere"]
    };

    let water = "No known liquid water";
    let life = "No signs of life detected";

    if (type === "ocean") {
        water = "Large liquid oceans";
    } else if (type === "temperate") {
        water = pickRandom(["Liquid water possible", "Large liquid oceans"]);
        life = pickRandom(["Possible microbial life", "No signs of life detected"]);
    } else if (type === "ice") {
        water = "Frozen water deposits";
    }

    let planet = {
        name: makeName(),
        type: type,
        gravity: gravity,
        temperature: temperature,
        atmosphere: pickRandom(atmospheres[type]),
        moons: randomNumber(0, type === "gas" ? 20 : 4),
        water: water,
        life: life
    };

    planet.description = describePlanet(planet);

    return planet;
}


// build a description from the planet's characteristics

function describePlanet(planet) {

    let text = "";

    if (planet.type === "volcanic") {
        text = "This is an extremely active volcanic world with a harsh surface.";
    } else if (planet.type === "desert") {
        text = "A dry and dusty planet with a mostly barren landscape.";
    } else if (planet.type === "ocean") {
        text = "A water-rich world covered by vast oceans.";
    } else if (planet.type === "temperate") {
        text = "A relatively mild world with conditions that may support life.";
    } else if (planet.type === "gas") {
        text = "A massive gas planet with no ordinary solid surface.";
    } else if (planet.type === "ice") {
        text = "A frozen world located in the colder regions of its solar system.";
    } else {
        text = "A rocky world with a solid surface and a relatively thin atmosphere.";
    }

    text += " Its surface temperature is around " + planet.temperature + " K.";
    text += " It has " + planet.moons + " moon(s) and gravity of " + planet.gravity + " Earth g.";
    text += " Its atmosphere is " + planet.atmosphere.toLowerCase() + ".";
    text += " " + planet.water + ".";
    text += " " + planet.life + ".";

    return text;
}


// generate a complete solar system

function createSolarSystem() {

    let star = createStar();
    let numberOfPlanets = randomNumber(3, 8);
    let planets = [];

    for (let i = 0; i < numberOfPlanets; i++) {

        let position = (i + 1) / numberOfPlanets;

        planets.push(createPlanet(position));
    }

    return {
        name: star.name + " System",
        star: star,
        planets: planets
    };
}


// generate the whole universe

let currentUniverse = [];

function generateUniverse() {

    currentUniverse = [];

    let numberOfSystems = randomNumber(3, 5);

    for (let i = 0; i < numberOfSystems; i++) {
        currentUniverse.push(createSolarSystem());
    }

    showUniverse();
}


// display all generated systems

function showUniverse() {

    let container = document.getElementById("systems-container");

    container.innerHTML = "";

    currentUniverse.forEach(function(system, systemIndex) {

        let planetsHTML = "";

        system.planets.forEach(function(planet, planetIndex) {

            planetsHTML += `
                <button class="generated-planet"
                    data-system="${systemIndex}"
                    data-planet="${planetIndex}">

                    <div class="planet-orb ${planet.type}"></div>

                    <h4>${planet.name}</h4>
                    <p>${planet.type.toUpperCase()} WORLD</p>

                </button>
            `;
        });

        container.innerHTML += `
            <div class="solar-system">

                <div class="system-heading">

                    <div class="star-orb"
                        style="--star-color: ${system.star.color}">
                    </div>

                    <div>
                        <h3>${system.name}</h3>
                        <p>${system.star.type} · ${system.star.temperature} K</p>
                        <p>Mass: ${system.star.mass} solar masses</p>
                        <p>Age: ${system.star.age} billion years</p>
                    </div>

                </div>

                <div class="system-planets">
                    ${planetsHTML}
                </div>

            </div>
        `;
    });
}


// open the planet information popup

document.getElementById("systems-container").addEventListener("click", function(event) {

    let button = event.target.closest(".generated-planet");

    if (!button) return;

    let systemIndex = Number(button.dataset.system);
    let planetIndex = Number(button.dataset.planet);

    let planet = currentUniverse[systemIndex].planets[planetIndex];

    document.getElementById("planet-name").textContent = planet.name;
    document.getElementById("planet-description").textContent = planet.description;

    document.getElementById("planet-stats").innerHTML = `
        <p><strong>Type:</strong> ${planet.type}</p>
        <p><strong>Temperature:</strong> ${planet.temperature} K</p>
        <p><strong>Gravity:</strong> ${planet.gravity} Earth g</p>
        <p><strong>Atmosphere:</strong> ${planet.atmosphere}</p>
        <p><strong>Moons:</strong> ${planet.moons}</p>
        <p><strong>Water:</strong> ${planet.water}</p>
        <p><strong>Life:</strong> ${planet.life}</p>
    `;

    document.getElementById("planet-modal").classList.remove("hidden");
});


// close popup

document.getElementById("close-modal").addEventListener("click", function() {
    document.getElementById("planet-modal").classList.add("hidden");
});

document.getElementById("planet-modal").addEventListener("click", function(event) {
    if (event.target.id === "planet-modal") {
        this.classList.add("hidden");
    }
});


// generate a new universe when the button is clicked

document.getElementById("generate-universe").addEventListener("click", generateUniverse);


// create the first universe when the page opens

generateUniverse();
