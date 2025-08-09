document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("joinForm");

    document.querySelector("[name='timestamp']").value = new Date().toLocaleString();

    form.addEventListener("submit", () => {
        localStorage.setItem("firstName", document.querySelector("[name='firstName']").value);
        localStorage.setItem("lastName", document.querySelector("[name='lastName']").value);
        localStorage.setItem("email", document.querySelector("[name='email']").value);
        localStorage.setItem("phone", document.querySelector("[name='phone']").value);
        localStorage.setItem("businessName", document.querySelector("[name='organization']").value);
        localStorage.setItem("timestamp", document.querySelector("[name='timestamp']").value);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".membership-card");
    setTimeout(() => {
        cards.forEach(card => card.classList.add("animate"));
    }, 100); 
});


