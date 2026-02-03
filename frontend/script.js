async function loadStudents() {
    const response = await fetch("/students");
    const students = await response.json();

    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach(s => {
    const div = document.createElement("div");
    div.innerHTML =
        s.name + " (" + s.role + ") " +
        <button onclick="deleteStudent(${s.id})">X</button>;
    container.appendChild(div);
});

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

window.onload = loadStudents;
async function deleteStudent(id) {
    await fetch("/students/" + id, {
        method: "DELETE"
    });

    loadStudents();
}
