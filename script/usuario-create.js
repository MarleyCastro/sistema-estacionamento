const form = document.getElementById('formUsuario');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const salario = document.getElementById('salario').value;
  const senha = document.getElementById('senha').value;

  const novoUsuario = {
    nome: nome,
    funcao: email,
    salario: salario // só para adaptar à estrutura existente no index
  };

  const usuarios = JSON.parse(localStorage.getItem('dbfunc')) ?? [];
  usuarios.push(novoUsuario);
  localStorage.setItem('dbfunc', JSON.stringify(usuarios));

  window.location.href = 'index.html';

});

const fileInput = document.getElementById('fileInput');
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', async () => {
  const file = fileInput.files[0]; // Pega o primeiro arquivo selecionado

  if (!file) {
    console.log('Nenhum arquivo selecionado.');
    return;
  }

  const formData = new FormData();
  formData.append('image', file); // O nome 'image' deve corresponder ao campo esperado pelo servidor

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Sucesso:', result);
    } else {
      console.error('Falha ao enviar arquivo:', response.statusText);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
});