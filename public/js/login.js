document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const loginData = {
                email: formData.get('email'),
                senha: formData.get('senha')
            };

            fetch('/login', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    alert(body.mensagem);
                    window.location.href = body.redirectUrl; // Redireciona para a URL retornada
                } else {
                    alert(body.mensagem);
                }
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao autenticar usuário');
            });
        });
    }
});
