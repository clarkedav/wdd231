const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Frontend Development I", credits: 3, completed: false },
    { code: "CSE110", name: "Programming Principles", credits: 4, completed: true },
    { code: "CSE210", name: "Programming with Classes", credits: 4, completed: false },
    { code: "WDD330", name: "Frontend Development II", credits: 3, completed: false }
];

const courseContainer = document.getElementById("courses-container");
const totalCredits = document.getElementById("total-credits");

function renderCourses(courseList) {
    courseContainer.innerHTML = "";
    let credits = 0;
    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course");
        if (course.completed) card.classList.add("completed");
        card.innerHTML = `<strong>${course.code}</strong>: ${course.name} (${course.credits} credits)`;
        courseContainer.appendChild(card);
        credits += course.credits;
    });
    totalCredits.textContent = credits;
}

document.getElementById("all-btn").addEventListener("click", () => renderCourses(courses));
document.getElementById("wdd-btn").addEventListener("click", () =>
    renderCourses(courses.filter(c => c.code.startsWith("WDD")))
);
document.getElementById("cse-btn").addEventListener("click", () =>
    renderCourses(courses.filter(c => c.code.startsWith("CSE")))
);

renderCourses(courses); // initial render
