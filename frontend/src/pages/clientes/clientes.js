import { FormMode } from '../../assets/js/form.helper';
import { message } from '../../assets/js/messages';
import { createTabulator } from '../../assets/js/tabulator';
import { editClient, insertClient, removeClient } from './client.service';

const formMode = new FormMode('insert', 'listagem', 'insert');

const btnSalvar = document.getElementById('btnSave');
const btnAdd = document.getElementById('btnAdd');
const btnCancel = document.getElementById('btnCancel');

formMode.list();

btnAdd.onclick = btnAddOnClick;
btnCancel.onclick = btnCancelOnClick;

function btnAddOnClick() {
  formMode.insert(frmClient, formModeInsert);
}

function btnCancelOnClick(event) {
  event.preventDefault();
  formMode.list();
}

const table = createTabulator('/clients', deleteClient, editClientOnClick, [
  { title: 'ID', field: '_id', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Nome do Cliente', field: 'nome', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'email', field: 'email', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Apelido', field: 'apelido', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Telefone', field: 'telefone' },
  { title: 'Data Cadastro', field: 'createdAt' },
  { title: 'Última Atualização', field: 'updatedAt' }
]);

async function deleteClient(e, cell) {
  const data = cell.getRow().getData();
  if (await message.question(`Confirma a exclusão do cliente : ${data.nome}`)) {
    removeClient(data._id).then(resp => {
      console.log(resp);
      cell.getRow().delete();
      message.toastSuccess('cliente exluído com sucesso !');
    });
  }
}

function formModeInsert() {
  btnSalvar.onclick = btnSalvarInserirOnClick;
}

function btnSalvarInserirOnClick(event) {
  event.preventDefault();

  if (!frmClient.checkValidity()) {
    message.toastError('formulário inválido!');
    return;
  }

  const data = Object.fromEntries(new FormData(frmClient));

  insertClient(data)
    .then(resp => {
      if (resp.status !== 201) {
        message.toastError(resp.message);
        return;
      }

      console.log(resp.data);
      table.addRow(resp.data.data);
      formMode.list();
      message.toastSuccess('Cliente inserido com sucesso !');
    })
    .catch(err => {
      console.log(err);
      message.toastError(err.message);
    });
}

function editClientOnClick(event, cell) {
  formMode.edit(cell.getRow().getData(), () => {
    btnSalvar.onclick = evt => {
      evt.preventDefault();
      if (!frmClient.checkValidity()) {
        message.toastError('formulário inválido!');
        return;
      }

      const data = Object.fromEntries(new FormData(frmClient));
      data._id = cell.getRow().getData()._id;

      editClient(data._id, data).then(resp => {
        console.log(resp);
        message.toastSuccess('Cliente alterado com sucesso!');
        cell.getRow().update(resp.data.data);
        formMode.list();
      });
    };
  });
}

function btnSalvarEditOnClick(event) {}
