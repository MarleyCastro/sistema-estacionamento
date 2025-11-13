// PROTEÇÃO: Verificar se é administrador
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

// Lista de emails administradores (você pode adicionar mais)
const ADMINS = ['admin@estacionamento.com', 'gerente@estacionamento.com'];


if (!usuarioLogado || !ADMINS.includes(usuarioLogado.email)) {
    alert('❌ ACESSO NEGADO! Você não tem permissão para acessar esta área.');
    return ;
}

// Configurações
const TOTAL_VAGAS = 50;
const SETORES = ['A', 'B', 'C', 'D', 'E'];

// Função para gerar todas as vagas possíveis
function gerarTodasVagas() {
    const vagas = [];
    SETORES.forEach(setor => {
        for (let i = 1; i <= 20; i++) {
            vagas.push(`${setor}-${i.toString().padStart(2, '0')}`);
        }
    });
    return vagas.slice(0, TOTAL_VAGAS);
}

// Carregar dados
function carregarDados() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const todasVagas = gerarTodasVagas();

    // Atualizar estatísticas
    const vagasOcupadas = veiculos.length;
    const vagasLivres = TOTAL_VAGAS - vagasOcupadas;
    const percentual = Math.round((vagasOcupadas / TOTAL_VAGAS) * 100);

    document.getElementById('adminTotalVagas').textContent = TOTAL_VAGAS;
    document.getElementById('adminVagasOcupadas').textContent = vagasOcupadas;
    document.getElementById('adminVagasLivres').textContent = vagasLivres;
    document.getElementById('adminPercentual').textContent = percentual + '%';

    // Criar mapa de vagas
    criarMapaVagas(todasVagas, veiculos);

    // Agrupar por modelo
    agruparPorModelo(veiculos);

    // Preencher tabela detalhada
    preencherTabela(veiculos);
}

// Criar mapa visual de vagas
function criarMapaVagas(todasVagas, veiculos) {
    const mapaVagas = document.getElementById('mapaVagas');
    const vagasOcupadas = veiculos.map(v => v.vaga);

    mapaVagas.innerHTML = todasVagas.map(vaga => {
        const ocupada = vagasOcupadas.includes(vaga);
        const classe = ocupada ? 'ocupada' : 'livre';
        return `
      <div class="vaga-box ${classe}" onclick="mostrarDetalhes('${vaga}')">
        ${vaga}
      </div>
    `;
    }).join('');
}

// Mostrar detalhes de uma vaga
function mostrarDetalhes(vaga) {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const veiculo = veiculos.find(v => v.vaga === vaga);

    document.getElementById('vagaSelecionada').textContent = vaga;
    const detalhesDiv = document.getElementById('detalhesVaga');

    if (veiculo) {
        detalhesDiv.innerHTML = `
      <div class="text-center">
        <img src="${veiculo.foto}" class="img-fluid" style="max-height: 200px; border-radius: 10px;" alt="Veículo">
      </div>
      <div class="mt-3">
        <p><strong>Placa:</strong> ${veiculo.placaFormatada}</p>
        <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
        <p><strong>Data de Entrada:</strong> ${veiculo.dataEntrada}</p>
        <p><strong>Horário:</strong> ${veiculo.horarioEntrada}</p>
        <p><strong>Cadastrado por:</strong> ${veiculo.usuario}</p>
      </div>
    `;
    } else {
        detalhesDiv.innerHTML = `
      <div class="alert alert-success">
        <strong>✅ Vaga Livre</strong>
        <p>Esta vaga está disponível para uso.</p>
      </div>
    `;
    }

    const modal = new bootstrap.Modal(document.getElementById('modalDetalhes'));
    modal.show();
}

// Agrupar veículos por modelo
function agruparPorModelo(veiculos) {
    const listaModelos = document.getElementById('listaModelos');

    if (veiculos.length === 0) {
        listaModelos.innerHTML = '<p class="text-muted">Nenhum veículo no estacionamento.</p>';
        return;
    }

    // Contar por modelo
    const modelosContagem = {};
    veiculos.forEach(v => {
        const modelo = v.modelo.toUpperCase();
        if (!modelosContagem[modelo]) {
            modelosContagem[modelo] = {
                quantidade: 0,
                veiculos: []
            };
        }
        modelosContagem[modelo].quantidade++;
        modelosContagem[modelo].veiculos.push(v);
    });

    // Ordenar por quantidade
    const modelosOrdenados = Object.entries(modelosContagem)
        .sort((a, b) => b[1].quantidade - a[1].quantidade);

    listaModelos.innerHTML = modelosOrdenados.map(([modelo, dados]) => `
    <div class="modelo-item">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h5 class="mb-0">${modelo}</h5>
        </div>
        <div class="col-md-3">
          <span class="badge bg-primary fs-6">${dados.quantidade} ${dados.quantidade === 1 ? 'veículo' : 'veículos'}</span>
        </div>
        <div class="col-md-3">
          <button class="btn btn-sm btn-info" onclick="mostrarVeiculosModelo('${modelo}')">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Mostrar veículos de um modelo específico
function mostrarVeiculosModelo(modelo) {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const veiculosModelo = veiculos.filter(v => v.modelo.toUpperCase() === modelo);

    const detalhes = veiculosModelo.map(v => `
    <div class="mb-3 p-3" style="background: #f5f5f5; border-radius: 8px;">
      <div class="row align-items-center">
        <div class="col-3">
          <img src="${v.foto}" class="foto-admin" alt="Veículo">
        </div>
        <div class="col-9">
          <p class="mb-1"><strong>Placa:</strong> ${v.placaFormatada}</p>
          <p class="mb-1"><strong>Vaga:</strong> ${v.vaga}</p>
          <p class="mb-0"><strong>Entrada:</strong> ${v.dataEntrada} às ${v.horarioEntrada}</p>
        </div>
      </div>
    </div>
  `).join('');

    document.getElementById('vagaSelecionada').textContent = modelo;
    document.getElementById('detalhesVaga').innerHTML = `
    <h6 class="mb-3">Veículos do modelo ${modelo}:</h6>
    ${detalhes}
  `;

    const modal = new bootstrap.Modal(document.getElementById('modalDetalhes'));
    modal.show();
}

// Preencher tabela detalhada
function preencherTabela(veiculos) {
    const tabela = document.getElementById('tabelaVeiculos');

    if (veiculos.length === 0) {
        tabela.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Nenhum veículo cadastrado</td></tr>';
        return;
    }

    // Ordenar por vaga
    veiculos.sort((a, b) => a.vaga.localeCompare(b.vaga));

    tabela.innerHTML = veiculos.map(v => `
    <tr>
      <td><img src="${v.foto}" class="foto-admin" alt="Veículo"></td>
      <td><strong class="text-danger">${v.vaga}</strong></td>
      <td>${v.placaFormatada}</td>
      <td>${v.modelo}</td>
      <td>${v.dataEntrada}</td>
      <td>${v.horarioEntrada}</td>
      <td>${v.usuario}</td>
    </tr>
  `).join('');
}

// Função de logout
function logout() {
  if (confirm('Deseja realmente sair?')) {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
  }
}
// Atualizar dados a cada 5 segundos
setInterval(carregarDados, 5000);

// Carregar dados iniciais
carregarDados();