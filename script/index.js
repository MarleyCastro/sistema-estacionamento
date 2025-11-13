      const modal = document.querySelector('.modal-container');
      const tbody = document.querySelector('#tbody');
      const sNome = document.querySelector('#m-nome');
      const sFuncao = document.querySelector('#m-funcao');
      const sSalario = document.querySelector('#m-salario');
      const btnSalvar = document.querySelector('#btnSalvar');

      let itens = [];
      let id;

      function openModal(edit = false, index = 0) {
        const modalElement = new bootstrap.Modal(document.getElementById('modalUsuario'));
        modalElement.show();

        if (edit) {
          sNome.value = itens[index].nome;
          sFuncao.value = itens[index].funcao;
          sSalario.value = itens[index].salario;
          id = index;
        } else {
          sNome.value = '';
          sFuncao.value = '';
          sSalario.value = '';
        }
      }

      function editItem(index) {
        openModal(true, index);
      }

      function deleteItem(index) {
        itens.splice(index, 1);
        setItensBD();
        loadItens();
      }

      function insertItem(item, index) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.funcao}</td>
          <td>R$ ${item.salario}</td>
          <td><button class="btn btn-sm btn-warning" onclick="editItem(${index})">Editar</button></td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Excluir</button></td>
        `;
        tbody.appendChild(tr);
      }

      btnSalvar.onclick = e => {
        e.preventDefault();
        if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') return;

        if (id !== undefined) {
          itens[id].nome = sNome.value;
          itens[id].funcao = sFuncao.value;
          itens[id].salario = sSalario.value;
        } else {
          itens.push({
            nome: sNome.value,
            funcao: sFuncao.value,
            salario: sSalario.value
          });
        }

        setItensBD();
        loadItens();
        id = undefined;
        bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide();
      }

      function loadItens() {
        itens = getItensBD();
        tbody.innerHTML = '';
        itens.forEach((item, index) => insertItem(item, index));
      }

      const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
      const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

      loadItens();