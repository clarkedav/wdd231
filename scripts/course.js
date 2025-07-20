const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "WDD231", name: "Frontend Development I", credits: 2, completed: false },
    { code: "CSE110", name: "Introduction to Programming", credits: 2, completed: true },
    { code: "CSE210", name: "Programming with Classes", credits: 2, completed: false },
    { code: "WDD131", name: "Dynamic Wed Fundamentals", credits: 2, completed: true },
    { code: "CSE111", name: "Programming with Functions", credits: 2, completed: true }
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
        card.innerHTML = `<strong>${course.code}</strong>`;
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

