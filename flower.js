// ==========================
// Sakura Flowers
// ==========================

const flowers = document.getElementById("flowers");

if (flowers) {

    for (let i = 0; i < 7; i++) {

        const flower = document.createElement("div");

        flower.className = "flower";
        flower.innerHTML = "🌸";

        flower.style.left = Math.random() * 100 + "vw";
        flower.style.fontSize = (18 + Math.random() * 18) + "px";

        flower.style.animationDuration =
            (8 + Math.random() * 8) + "s";

        flower.style.animationDelay =
            Math.random() * 8 + "s";

        flowers.appendChild(flower);

    }

}
