document.addEventListener("DOMContentLoaded", async () => {
    const nav = document.createElement("div");
    nav.innerHTML = `
        <div id="lesson-nav">
            <div class="lesson-info">
                <span id="lesson-path"></span>
                <span id="lesson-index"></span>
            </div>
            <div class="lesson-navbar">
                <div class="tabs">
                    <button class="tab active" data-tab="notes">Notes</button>
                    <button class="tab" data-tab="problems">Problems</button>
                </div>
            </div>
        </div>
    `;

    const author = document.querySelector(".quarto-title-meta");
    if (author) {
        author.after(nav);
    } else {
        const title = document.querySelector(".quarto-title-block");
        if (title) title.appendChild(nav);
    }

    const notes = document.querySelector(".notes");
    const problems = document.querySelector(".problems");
    const tabs = document.querySelectorAll(".tab");

    if (notes && problems) {
        problems.style.display = "none";
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                if (tab.dataset.tab === "notes") {
                    notes.style.display = "";
                    problems.style.display = "none";
                } else {
                    notes.style.display = "none";
                    problems.style.display = "";
                }
            });
        });
    }
    else{
        const p = document.querySelector('[data-tab="problems"]');
        if(p) p.style.display = "none";
    }


    let course;
    try {
        const response = await fetch("/course.json");
        course = await response.json();
        console.log(course);

const currentPath = window.location.pathname
    .replace(/^\/+/, "")
    .replace(/\.html$/, "");

console.log("Current:", currentPath);

    } catch (err) {

        console.error("Cannot load course.json", err);
        return;

    }

const currentPath = window.location.pathname
    .replace(/^\/+/, "")
    .replace(/\.html$/, "");

let chapter = "";
let lessons = [];
let index = -1;

for (const [name, list] of Object.entries(course)) {
    const i = list.findIndex(item => item.path === currentPath);
    if (i !== -1) {
        chapter = name;
        lessons = list;
        index = i;
        break;
    }
}

console.log("Index =", index);
console.log("Lessons =", lessons);
console.log(currentPath);
console.log(chapter);
console.log(index);


document.getElementById("lesson-path").textContent = chapter;
document.getElementById("lesson-index").textContent =
    `Lesson ${index + 1} / ${lessons.length}`;

const repoBase = window.location.pathname.split("/")[1];
const prev = document.getElementById("prev-btn");

if (index > 0) {
    prev.href = `/${repoBase}/${lessons[index - 1].path}.html`;
} else {
    prev.style.visibility = "hidden";
}

const next = document.getElementById("next-btn");
if (index < lessons.length - 1) {
    next.href = `/${repoBase}/${lessons[index + 1].path}.html`;
} else {
    next.style.visibility = "hidden";
}
});