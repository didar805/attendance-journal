async function loadStudents() {
    const response = await fetch("/students");
    const students = await response.json();

    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach(s => {
        const div = document.createElement("div");
        div.innerText = s.name + " (" + s.role + ")";
        container.appendChild(div);
    });
}

window.onload = loadStudents;
async function addStudent() {
    const name = document.getElementById("newStudent").value.trim();

    if (name === "") {
        alert("Введите имя студента");
        return;
    }

    await fetch("/students/add?name=" + name, { method: "POST" });
    document.getElementById("newStudent").value = "";
    loadStudents();
}
