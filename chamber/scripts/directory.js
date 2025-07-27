document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");

    toggleButton.addEventListener("click", () => {
        nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });
});

const url = 'data/members.json';
const directory = document.getElementById('directory');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

// Fetch and display members
async function fetchMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    directory.innerHTML = ''; // Clear existing content
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
  <div class="card-content">
    <img src="images/${member.image}" alt="${member.name} logo" class="member-image">
    <div class="card-info">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
     <p><strong>Membership Level:</strong> ${getMembershipLevel(Number(member.membership))}</p> 
    </div>
  </div>
`;

        directory.appendChild(card);
    });
}

function getMembershipLevel(level) {
    const levels = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };
    return levels[level] || "Unknown";

}

// View Toggle
gridBtn.addEventListener('click', () => {
    directory.classList.add('grid');
    directory.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    directory.classList.add('list');
    directory.classList.remove('grid');
});


// Footer year and last modified
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Run
fetchMembers();


