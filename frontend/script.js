async function loadStudents() {
    const response = await fetch("/students");
    const students = await response.json();

    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach(s => {
        const div = document.createElement("div");

        const text = document.createElement("span");
        text.innerText = s.name + " (" + s.role + ") ";

        const btn = document.createElement("button");
        btn.style.border = "none";
        btn.style.background = "none";
        btn.style.cursor = "pointer";
        btn.style.padding = "0";

        const img = document.createElement("img");
        img.src = "/static/delete.png";
        img.width = 16;

        img.onmouseover = () =>
            img.style.filter =
                "brightness(0) saturate(100%) invert(19%) sepia(98%) saturate(7496%) hue-rotate(358deg) brightness(94%) contrast(119%)";

        img.onmouseout = () => img.style.filter = "none";

        btn.appendChild(img);
        btn.onclick = () => deleteStudent(s.id);

        div.appendChild(text);
        div.appendChild(btn);
        container.appendChild(div);
    });
}

async function addStudent() {
    const name = document.getElementById("newStudent").value.trim();

    if (name === "") {
        alert("Введите имя студента");
        return;
    }

    await fetch("/students/add?name=" + name, {
        method: "POST"
    });

    document.getElementById("newStudent").value = "";
    loadStudents();
}

async function deleteStudent(id) {
    if (!confirm("Удалить студента?")) {
        return;
    }

    await fetch("/students/" + id, { method: "DELETE" });
    loadStudents();
}

window.onload = loadStudents;
