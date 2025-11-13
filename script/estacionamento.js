// Verificar se usuário está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado) {
    window.location.href = 'login.html';
}

// Exibir nome do usuário
document.getElementById('nomeUsuario').textContent = `Olá, ${usuarioLogado.nome}`;

// Configurações do estacionamento
const TOTAL_VAGAS = 50;
const SETORES = ['A', 'B', 'C', 'D', 'E'];

// Função para gerar vaga aleatória
function gerarVagaAleatoria() {
    const setor = SETORES[Math.floor(Math.random() * SETORES.length)];
    const numero = Math.floor(Math.random() * 20) + 1;
    return `${setor}-${numero.toString().padStart(2, '0')}`;
}

// Função para validar placa
function validarPlaca(placa) {
    const placaLimpa = placa.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    // Formato antigo: AAA0000 ou AAA-0000
    const regexAntigo = /^[A-Z]{3}[0-9]{4}$/;

    // Formato Mercosul: AAA0A00 ou AAA-0A00
    const regexMercosul = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;

    if (regexAntigo.test(placaLimpa) || regexMercosul.test(placaLimpa)) {
        return placaLimpa;
    }

    return null;
}

// Função para formatar placa com hífen
function formatarPlaca(placa) {
    if (placa.length === 7) {
        return placa.substring(0, 3) + '-' + placa.substring(3);
    }
    return placa;
}

// Preview da foto
document.getElementById('fotoVeiculo').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('previewFoto');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Formatar placa automaticamente
document.getElementById('placaVeiculo').addEventListener('input', function (e) {
    let valor = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (valor.length > 3) {
        valor = valor.substring(0, 3) + '-' + valor.substring(3);
    }

    e.target.value = valor;
});

// Definir horário atual automaticamente
const agora = new Date();
document.getElementById('horarioEntrada').value = agora.toTimeString().substring(0, 5);

// Cadastrar veículo
document.getElementById('formCadastroVeiculo').addEventListener('submit', function (e) {
    e.preventDefault();

    const fotoInput = document.getElementById('fotoVeiculo');
    const modelo = document.getElementById('modeloVeiculo').value.trim();
    const placa = document.getElementById('placaVeiculo').value.trim();
    const horario = document.getElementById('horarioEntrada').value;

    // Validações
    if (!fotoInput.files[0]) {
        alert('❌ Por favor, selecione uma foto do veículo!');
        return;
    }

    if (modelo.length < 2) {
        alert('❌ O modelo deve ter pelo menos 2 caracteres!');
        return;
    }

    const placaValidada = validarPlaca(placa);
    if (!placaValidada) {
        alert('❌ Placa inválida! Use o formato ABC-1234 ou ABC-1D23 (Mercosul)');
        return;
    }

    // Verificar se a placa já existe
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const placaExiste = veiculos.some(v => v.placa === placaValidada);

    if (placaExiste) {
        alert('❌ Já existe um veículo com esta placa cadastrado!');
        return;
    }

    // Verificar vagas disponíveis
    if (veiculos.length >= TOTAL_VAGAS) {
        alert('❌ Estacionamento lotado! Não há vagas disponíveis.');
        return;
    }

    // Gerar vaga única
    let vaga;
    let vagaExiste = true;

    while (vagaExiste) {
        vaga = gerarVagaAleatoria();
        vagaExiste = veiculos.some(v => v.vaga === vaga);
    }

    // Converter foto para base64
    const reader = new FileReader();
    reader.onload = function (e) {
        const novoVeiculo = {
            id: Date.now(),
            foto: e.target.result,
            modelo: modelo,
            placa: placaValidada,
            placaFormatada: formatarPlaca(placaValidada),
            vaga: vaga,
            horarioEntrada: horario,
            dataEntrada: new Date().toLocaleDateString('pt-BR'),
            usuario: usuarioLogado.nome
        };

        veiculos.push(novoVeiculo);
        localStorage.setItem('veiculos', JSON.stringify(veiculos));

        // Mostrar modal com a vaga
        document.getElementById('vagaAtribuida').textContent = vaga;
        const modal = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
        modal.show();

        // Limpar formulário
        document.getElementById('formCadastroVeiculo').reset();
        document.getElementById('previewFoto').style.display = 'none';
        document.getElementById('horarioEntrada').value = agora.toTimeString().substring(0, 5);

        // Atualizar lista
        carregarVeiculos();
    };

    reader.readAsDataURL(fotoInput.files[0]);
});

// Função para remover veículo
function removerVeiculo(id) {
    if (confirm('🚗 Deseja realmente remover este veículo do estacionamento?')) {
        let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
        veiculos = veiculos.filter(v => v.id !== id);
        localStorage.setItem('veiculos', JSON.stringify(veiculos));
        carregarVeiculos();
    }
}

// Carregar veículos
function carregarVeiculos() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const listaVeiculos = document.getElementById('listaVeiculos');
    const mensagemVazio = document.getElementById('mensagemVazio');

    if (veiculos.length === 0) {
        listaVeiculos.innerHTML = '';
        mensagemVazio.style.display = 'block';
    } else {
        mensagemVazio.style.display = 'none';

        listaVeiculos.innerHTML = veiculos.map(veiculo => `
      <div class="vaga-card vaga-ocupada">
        <div class="row align-items-center">
          <div class="col-md-2">
            <img src="${veiculo.foto}" class="foto-carro" alt="Foto do veículo">
          </div>
          <div class="col-md-2">
            <strong>Vaga:</strong><br>
            <span class="fs-4 text-danger">${veiculo.vaga}</span>
          </div>
          <div class="col-md-2">
            <strong>Placa:</strong><br>
            ${veiculo.placaFormatada}
          </div>
          <div class="col-md-2">
            <strong>Modelo:</strong><br>
            ${veiculo.modelo}
          </div>
          <div class="col-md-2">
            <strong>Entrada:</strong><br>
            ${veiculo.dataEntrada}<br>
            ${veiculo.horarioEntrada}
          </div>
          <div class="col-md-2">
            <button class="btn btn-danger btn-sm" onclick="removerVeiculo(${veiculo.id})">
              🚗 Remover
            </button>
          </div>
        </div>
      </div>
    `).join('');
    }

    atualizarEstatisticas();
}

// Atualizar estatísticas
function atualizarEstatisticas() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const vagasOcupadas = veiculos.length;
    const vagasLivres = TOTAL_VAGAS - vagasOcupadas;
    const percentual = Math.round((vagasOcupadas / TOTAL_VAGAS) * 100);

    document.getElementById('totalVagas').textContent = TOTAL_VAGAS;
    document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
    document.getElementById('vagasLivres').textContent = vagasLivres;
    document.getElementById('percentualOcupacao').textContent = percentual + '%';
}

// Função de logout
function logout() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
    }
}

// Carregar veículos ao iniciar
carregarVeiculos();