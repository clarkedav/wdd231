document.addEventListener("DOMContentLoaded", () => {
    const spotlightContainer = document.getElementById("spotlight-grid");

    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Filter only Silver (2) or Gold (3) members
            const silverGold = data.filter(member =>
                member.membership === 2 || member.membership === 3
            );

            const selected = [];
            while (selected.length < 3 && silverGold.length > 0) {
                const index = Math.floor(Math.random() * silverGold.length);
                selected.push(silverGold.splice(index, 1)[0]);
            }

            selected.forEach(member => {
                const levelText = member.membership === 3 ? "Gold" : "Silver";

                const card = document.createElement("div");
                card.className = "spotlight-card";
                card.innerHTML = `
                    <div class="card-content">
                        <img src="images/${member.image}" alt="${member.name} logo" class="member-image">
                        <div class="card-info">
                            <h3>${member.name}</h3>
                            <p>${member.address}</p>
                            <p>${member.phone}</p>
                            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                            <p><strong>${levelText} Member</strong></p>
                        </div>
                    </div>
                `;
                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error fetching spotlight data:", error);
        });
});

