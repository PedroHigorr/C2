document.addEventListener('DOMContentLoaded', function() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        console.error('ID não fornecido na URL');
        return;
    }

    fetch(`/art/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da obra');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById('title').textContent = data.nome_obra;
            document.getElementById('style').textContent = data.estilo;
            document.getElementById('dimension').textContent = `${data.dimensao} cm`;

            // Formatação da data
            const creationDateInput = document.getElementById('creationDate');
            const creationDate = new Date(data.data_criacao);
            if (!isNaN(creationDate.getTime())) {
                const formattedDate = creationDate.toISOString().split('T')[0];
                creationDateInput.value = formattedDate;
            } else {
                console.warn('Data de criação inválida:', data.data_criacao);
            }

            const preco = parseFloat(data.preco);
            if (!isNaN(preco)) {
                document.getElementById('price').textContent = `R$ ${preco.toFixed(2)}`;
            } else {
                console.warn('O campo preço não é um número válido:', data.preco);
            }

            document.getElementById('desc').textContent = data.descricao;
            document.getElementById('artImage').src = data.caminho_imagem;
            document.getElementById('artistName').textContent = data.artist_name;
        })
        .catch(error => {
            console.error('Erro ao carregar dados da obra:', error);
        });
});
