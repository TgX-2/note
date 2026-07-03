document.addEventListener("DOMContentLoaded", async () => {

    /* ============================
       Create Navigation Bar
    ============================ */

    const nav = document.createElement("div");

    nav.innerHTML = `
        <div id="lesson-nav">

            <div class="lesson-info">
                <span id="lesson-path"></span>
                <span id="lesson-index"></span>
            </div>

            <div class="lesson-navbar">

                <a id="prev-btn" href="#">◀ Previous</a>

                <div class="tabs">
                    <button class="tab active" data-tab="notes">📖 Notes</button>
                    <button class="tab" data-tab="problems">📝 Problems</button>
                </div>

                <a id="next-btn" href="#">Next ▶</a>

            </div>

        </div>
    `;

    // Chèn sau Author
    const author = document.querySelector(".quarto-title-meta");

    if (author) {
        author.after(nav);
    } else {
        // fallback
        const title = document.querySelector(".quarto-title-block");
        if (title) title.appendChild(nav);
    }


    /* ============================
       Notes / Problems
    ============================ */

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

        // Nếu không có Problems thì ẩn nút Problems
        const p = document.querySelector('[data-tab="problems"]');
        if(p) p.style.display = "none";

    }


    /* ============================
       Load course.json
    ============================ */

    let course;

    try {

        // Đổi đường dẫn nếu cần
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


    /* ============================
       Current Page
    ============================ */

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


    /* ============================
       Lesson Info
    ============================ */
document.getElementById("lesson-path").textContent = chapter;

document.getElementById("lesson-index").textContent =
    `Lesson ${index + 1} / ${lessons.length}`;


    /* ============================
       Previous
    ============================ */

const prev = document.getElementById("prev-btn");

if (index > 0) {

    prev.href = "/" + lessons[index - 1].path + ".html";

} else {

    prev.style.visibility = "hidden";

}


    /* ============================
       Next
    ============================ */
const next = document.getElementById("next-btn");

if (index < lessons.length - 1) {

    next.href = "/" + lessons[index + 1].path + ".html";

} else {

    next.style.visibility = "hidden";

}

});