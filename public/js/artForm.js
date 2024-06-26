document.addEventListener('DOMContentLoaded', function () {
    const artForm = document.getElementById('art-form');
    
    if (artForm) {
        artForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(artForm);
            formData.append('user_id', '<%= userId %>'); 
            fetch('/post-art', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()
                .then(data => {
                    if (response.ok) {
                        alert(data.mensagem);
                        artForm.reset();
                    } else {
                        alert(data.mensagem);
                    }
                })
            )
            .catch(error => {
                console.error(error);
                alert('Erro ao postar arte');
            });
        });
    }
});
