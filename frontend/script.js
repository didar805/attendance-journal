async function loadStudents() {
    const response = await fetch("/students");
    const students = await response.json();

    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach(s => {
        const div = document.createElement("div");

        const btn = document.createElement("button");
        btn.innerText = "Удалить";
        btn.onclick = () => deleteStudent(s.id);

        div.innerText = s.name + " (" + s.role + ") ";
        div.appendChild(btn);

        container.appendChild(div);
    });
}
async function deleteStudent(id) {
    await fetch("/students/" + id, { method: "DELETE" });
    loadStudents();
}
