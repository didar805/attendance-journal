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
        btn.innerText = "Удалить";
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

window.onload = loadStudents;
async function deleteStudent(id) {
    await fetch("/students/" + id, {
        method: "DELETE"
    });

    loadStudents();
}
