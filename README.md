# 🚗 SISTEMA DE ESTACIONAMENTO - DOCUMENTAÇÃO

## 📌 VISÃO GERAL
Sistema completo de gerenciamento de estacionamento com cadastro de usuários, 
registro de veículos e painel administrativo.

---

## 📂 ESTRUTURA DE ARQUIVOS

```
/projeto-estacionamento/
│
├── login.html                    # Página de cadastro/login
├── Home.html                     # Sistema principal (usuários)
├── admin.html                    # Painel administrativo (restrito)
│
├── css/
│   └── login.css                 # Estilos da página de login
│
└── script/
    ├── estacionamento.js         # Lógica do sistema de estacionamento
    └── admin.js                  # Lógica do painel administrativo
```

---

## 🚀 COMO USAR

### 1️⃣ PRIMEIRO ACESSO
1. Abra o arquivo `login.html` no navegador
2. Preencha todos os campos obrigatórios:
   - Nome completo
   - CPF (formato: 000.000.000-00)
   - Data de nascimento (mínimo 18 anos)
   - Telefone (10 ou 11 dígitos)
   - E-mail válido
3. Clique em "Criar Conta e Acessar Sistema"
4. Será redirecionado automaticamente para Home.html

### 2️⃣ CADASTRAR VEÍCULO
1. No Home.html, localize o formulário "Cadastrar Novo Veículo"
2. Preencha os dados:
   - **Foto**: Selecione uma imagem do veículo
   - **Modelo**: Ex: Honda Civic, Toyota Corolla
   - **Placa**: Formato ABC-1234 ou ABC-1D23 (Mercosul)
   - **Horário**: Preenchido automaticamente
3. Clique em "Cadastrar Veículo"
4. O sistema irá:
   - Validar todos os dados
   - Atribuir uma vaga ALEATÓRIA (ex: A-05, B-12, C-18)
   - Mostrar a vaga em um modal de confirmação

### 3️⃣ GERENCIAR VEÍCULOS
- Visualize todos os veículos na lista
- Veja foto, placa, modelo, vaga e horário de entrada
- Remova veículos ao clicar no botão "Remover"
- Acompanhe estatísticas em tempo real no topo da página

### 4️⃣ ACESSAR PAINEL ADMINISTRATIVO
1. Crie uma conta com e-mail de administrador:
   - admin@estacionamento.com
   - gerente@estacionamento.com
2. Acesse diretamente `admin.html`
3. Usuários comuns serão BLOQUEADOS automaticamente

---

## 👨‍💼 PAINEL ADMINISTRATIVO

### FUNCIONALIDADES
- ✅ Dashboard com estatísticas gerais
- ✅ Mapa visual de 50 vagas (verde = livre / vermelho = ocupado)
- ✅ Agrupamento de veículos por modelo
- ✅ Tabela detalhada com todos os registros
- ✅ Atualização automática a cada 5 segundos
- ✅ Clique nas vagas para ver detalhes

### PROTEÇÃO DE ACESSO
**IMPORTANTE:** Apenas usuários com e-mail cadastrado como administrador 
podem acessar o admin.html. Qualquer tentativa de acesso não autorizado 
será bloqueada.

---

## ⚙️ CONFIGURAÇÕES DO SISTEMA

### Capacidade do Estacionamento
- **Total de vagas:** 50
- **Setores:** A, B, C, D, E
- **Vagas por setor:** 20 (limitado a 10 por setor para completar 50)

### Formato de Placas Aceitas
- **Antigo:** ABC-1234 (3 letras + 4 números)
- **Mercosul:** ABC-1D23 (3 letras + 1 número + 1 letra + 2 números)

### Validações Automáticas
- CPF válido (com dígitos verificadores)
- Idade mínima: 18 anos
- Telefone: 10 ou 11 dígitos
- E-mail: formato válido
- Placa: não pode ser duplicada
- Foto: obrigatória para cadastro

---

## 💾 ARMAZENAMENTO DE DADOS

O sistema utiliza **localStorage** do navegador para persistência:

### Dados Armazenados
1. **usuarioLogado**: Informações do usuário atual
   ```javascript
   {
     nome, cpf, dataNascimento, telefone, email, dataCadastro
   }
   ```

2. **veiculos**: Array com todos os veículos
   ```javascript
   {
     id, foto, modelo, placa, vaga, horarioEntrada, dataEntrada, usuario
   }
   ```

### Observações
- Dados são salvos localmente no navegador
- Limpar cache/cookies apagará todos os registros
- Não há sincronização entre diferentes navegadores/dispositivos

---

## 🔐 ADMINISTRADORES

### E-mails com Acesso Admin
- admin@estacionamento.com
- gerente@estacionamento.com

### Adicionar Novos Administradores
Edite o arquivo `script/admin.js`, linha 5:
```javascript
const ADMINS = ['admin@estacionamento.com', 'seuemail@exemplo.com'];
```

---

## ⚠️ REQUISITOS TÉCNICOS

### Navegadores Compatíveis
- Google Chrome (recomendado)
- Mozilla Firefox
- Microsoft Edge
- Safari

### Dependências Externas
- Bootstrap 5.3.7 (CDN)
- JavaScript ES6+

### Não Requer
- ❌ Servidor web (funciona localmente)
- ❌ Banco de dados
- ❌ Node.js ou PHP

---

## 🎯 FLUXO DE USO COMPLETO

1. **Usuário** abre login.html → Cadastra-se
2. **Sistema** redireciona para Home.html
3. **Usuário** cadastra veículo com foto
4. **Sistema** atribui vaga aleatória (ex: C-07)
5. **Usuário** visualiza veículo na lista
6. **Admin** acessa admin.html para visão geral
7. **Admin** monitora ocupação em tempo real

---

## 📊 ESTATÍSTICAS DISPONÍVEIS

### Para Usuários (Home.html)
- Total de vagas
- Vagas ocupadas
- Vagas livres
- Taxa de ocupação (%)

### Para Administradores (admin.html)
- Todas as estatísticas acima
- Mapa visual completo de vagas
- Quantidade por modelo de veículo
- Detalhes de cada veículo/vaga
- Histórico de entradas

---

## 📄 LICENÇA

Sistema desenvolvido para fins educacionais e demonstrativos.
Livre para uso e modificação.

---

**Versão:** 1.0  
**Data:** Novembro 2025  
**Desenvolvido com:** HTML5, CSS3, JavaScript ES6, Bootstrap 5

---

🚗 **SISTEMA DE ESTACIONAMENTO** - Gestão Inteligente de Vagas
