async function loadStudents() {
    const res = await fetch("/students");
    const students = await res.json();

    const pendingRes = await fetch("/attendance/pending");
    const pending = await pendingRes.json();

    const div = document.getElementById("students");
    div.innerHTML = "";

    students.forEach(s => {
        const wait = pending.includes(s.id);

        div.innerHTML += `
        <div class="row">
            ${s.name}
            ${
                wait
                ? `<button onclick="confirmStudent(${s.id})">✔ Подтвердить</button>`
                : `<button onclick="markPresent(${s.id})">Я пришел</button>`
            }
        </div>`;
    });
}

async function markPresent(id) {
    await fetch("/attendance/mark/" + id, {method:"POST"});
    loadStudents();
}

async function confirmStudent(id) {
    await fetch("/attendance/confirm/" + id, {method:"POST"});
    loadStudents();
}

loadStudents();
