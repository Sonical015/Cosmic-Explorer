// info for each planet
var planets = {
    aurelia: {
        name: "Aurelia",
        description: "A golden world with deserts of glittering sand and a sun that never fully sets.",
        stats: ["Distance: 4.2 light years", "Temperature: 85°C", "Moons: 2"]
    },
    nyx: {
        name: "Nyx",
        description: "A dark planet that has never seen daylight. Strange lights glow across its surface.",
        stats: ["Distance: 9.8 light years", "Temperature: -120°C", "Moons: 0"]
    },
    zephyria: {
        name: "Zephyria",
        description: "A gas giant covered in storms that are larger than whole planets.",
        stats: ["Distance: 6.5 light years", "Temperature: 20°C", "Moons: 11"]
    },
    cryon: {
        name: "Cryon",
        description: "A frozen world of ice plains and glaciers at the edge of the known galaxy.",
        stats: ["Distance: 12.1 light years", "Temperature: -200°C", "Moons: 1"]
    }
};

var modal = document.getElementById("planet-modal");
var cards = document.querySelectorAll(".planet-card");
var closeBtn = document.getElementById("close-modal");

// open the popup when a card is clicked
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        var key = this.getAttribute("data-planet");
        var planet = planets[key];

        document.getElementById("planet-name").textContent = planet.name;
        document.getElementById("planet-description").textContent = planet.description;

        var statsHtml = "";
        for (var j = 0; j < planet.stats.length; j++) {
            statsHtml += "<div>" + planet.stats[j] + "</div>";
        }
        document.getElementById("planet-stats").innerHTML = statsHtml;

        modal.classList.remove("hidden");
    });
}

function closeModal() {
    modal.classList.add("hidden");
}

closeBtn.addEventListener("click", closeModal);

// clicking the dark background also closes it
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// escape key closes it too
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
});