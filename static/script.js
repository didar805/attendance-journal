async function loadStudents() {
    const response = await fetch("/students");
    const students = await response.json();

    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach(s => {
        const div = document.createElement("div");
        div.className = "student-row";

        const text = document.createElement("span");
        text.innerText = s.name + " (" + s.role + ")";

        const btn = document.createElement("button");
        btn.className = "icon-btn";

        const img = document.createElement("img");
        img.src = "/static/delete.svg";
        img.width = 18;

        btn.appendChild(img);
        btn.onclick = () => deleteStudent(s.id);

        div.appendChild(text);
        div.appendChild(btn);

        container.appendChild(div);
    });
}

async function addStudent() {
    const nameInput = document.getElementById("newStudent");
    const name = nameInput.value.trim();

    if (!name) {
        alert("Введите имя");
        return;
    }

    await fetch("/students/add?name=" + encodeURIComponent(name), {
        method: "POST"
    });

    nameInput.value = "";
    loadStudents();
}

async function deleteStudent(id) {
    if (!confirm("Удалить студента?")) return;

    await fetch("/students/" + id, {
        method: "DELETE"
    });
<div id="students"></div>

<script>
async function loadStudents() {
    const res = await fetch("/students");
    const students = await res.json();

    const div = document.getElementById("students");
    div.innerHTML = "";

    students.forEach(s => {
        div.innerHTML += 
            <div>
                ${s.name}
                <button onclick="markPresent(${s.id})">
                    Men geldim
                </button>
            </div>
        ;
    });
}

async function markPresent(id) {
    await fetch("/attendance/mark/" + id, { method: "POST" });
    alert("Bellik goýuldy!");
}

loadStudents();
</script>
    loadStudents();
}

window.onload = loadStudents;
