document.addEventListener("DOMContentLoaded", () => {
    fetch("data/discover.json")
        .then(res => res.json())
        .then(items => {
            const grid = document.getElementById("discover-grid");
            items.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("discover-card");
                card.style.gridArea = `card${index + 1}`;

                card.innerHTML = `
                    <h2>${item.title}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.title}" loading="lazy" />
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button>Learn More</button>
                `;

                grid.appendChild(card);
            });
        });
});
