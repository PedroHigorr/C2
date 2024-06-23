document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = event.target.email.value;
            const senha = event.target.senha.value;

            const dados = { email, senha };

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                return response.json().then(data => {
                    if (response.status === 200) {
                        alert(data.mensagem);
                        // Redirect to a different page upon successful login if necessary
                    } else {
                        alert(data.mensagem);
                    }
                });
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao autenticar usuário');
            });
        });
    }
});
