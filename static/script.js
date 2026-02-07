async function login() {
    const r = await fetch("/login", {method:"POST"});
    const d = await r.json();
    alert("Server jogaby: " + d.status);
}
