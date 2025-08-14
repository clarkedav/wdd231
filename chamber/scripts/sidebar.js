// Select the element where the message will appear
const visitMessage = document.querySelector("#visit-message");

// Get the current timestamp
const now = Date.now();

// Retrieve the last visit time from localStorage
const lastVisit = localStorage.getItem("lastVisit");

// Function to format the visit message
function getVisitMessage(lastTime) {
    if (!lastTime) {
        return "welcome! Let us know if you have any questions.";
    }

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - lastTime) / millisecondsInDay);

    if (daysBetween < 1) {
        return "back so soon! awesome!";
    } else if (daysBetween === 1) {
        return `You last visited ${daysBetween} day ago.`;
    } else {
        return `You last visited ${daysBetween} days ago.`;
    }
}

// Set the message in the sidebar
visitMessage.textContent = getVisitMessage(lastVisit ? Number(lastVisit) : null);

// Store the current visit time in localStorage
localStorage.setItem("lastVisit", now);
