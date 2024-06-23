


const form = document.getElementById('cadastro-form')

// const log = document.getElementById('login-form')
console.log(form)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    console.log(event)
    const nome = event.target.nome.value
    const email = event.target.email.value
    const senha = event.target.senha.value

    
    const dados ={
        nome,
        senha,
        email
    }

  
    console.log(dados)
    
    // const {mensagem} = dados
    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => { return response.json().then(data => {
        if(response.status === 201){
            alert(data.mensagem)
        } else {
            alert(data.mensagem)
        }
    })})
    .catch(error => {
        console.error(error)
        alert('Erro ao cadastrar usuário')
        })
})



//Rota de autenticação de login
fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(dados)
})
.then(response => {
    return response.json().then(data => {
        if(response.status === 201){
            alert(data.mensagem);
        }else{
            alert(data.mensagem);
        }
    })
}).catch(error => {console.error(error)
alert('Erro ao cadastrar usr') })

