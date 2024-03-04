document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;


        if (email === "usuario@gmail.com" && password === "123456") {
    
            window.location.href = "https://llauragouveia.github.io/llauragouveia/pages/index.html";
        } else {
            alert("Credenciais inválidas. Por favor, tente novamente.");
        }
    });
});

