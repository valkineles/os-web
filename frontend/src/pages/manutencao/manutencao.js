import * as materialize from 'materialize-css';

import { createAutoComplete } from '../../assets/js/autocomplete';
import { FormMode } from '../../assets/js/form.helper';
import { message } from '../../assets/js/messages';
import { createTabulator } from '../../assets/js/tabulator';
import { editMaintenance, insertMaintenance, removeMaintenance } from './maintenance.service';

const formMode = new FormMode('insert', 'listagem', 'insert');

const btnSalvar = document.getElementById('btnSave');
const btnAdd = document.getElementById('btnAdd');
const btnCancel = document.getElementById('btnCancel');

materialize.Tabs.init(document.querySelectorAll('.tabs'), {});

formMode.list();

btnAdd.onclick = btnAddOnClick;
btnCancel.onclick = btnCancelOnClick;

function btnAddOnClick() {
  formMode.insert(frmMaintenance, formModeInsert);
}

function btnCancelOnClick(event) {
  event.preventDefault();
  formMode.list();
}

const table = createTabulator('/maintenance', deleteMaintenance, editMaintenanceOnClick, [
  { title: 'ID', field: '_id', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Data Emissão', field: 'dtemissao', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Status', field: 'status', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Total', field: 'total' }
]);

async function deleteMaintenance(e, cell) {
  const data = cell.getRow().getData();
  if (await message.question(`Confirma a exclusão da ordem de serviço : ${data.nome}`)) {
    removeMaintenance(data._id).then(resp => {
      cell.getRow().delete();
      message.toastSuccess('Ordem de serviço exluído com sucesso !');
    });
  }
}

function formModeInsert() {
  btnSalvar.onclick = btnSalvarInserirOnClick;
}

function btnSalvarInserirOnClick(event) {
  event.preventDefault();

  if (!frmMaintenance.checkValidity()) {
    message.toastError('formulário inválido!');
    return;
  }

  const data = Object.fromEntries(new FormData(frmMaintenance));

  insertMaintenance(data)
    .then(resp => {
      if (resp.status !== 201) {
        message.toastError(resp.message);
        return;
      }

      table.addRow(resp.data.data);
      formMode.list();
      message.toastSuccess('Ordem de serviço inserida com sucesso !');
    })
    .catch(err => {
      message.toastError(err.message);
    });
}

function editMaintenanceOnClick(event, cell) {
  formMode.edit(cell.getRow().getData(), () => {
    btnSalvar.onclick = evt => {
      evt.preventDefault();
      if (!frmMaintenance.checkValidity()) {
        message.toastError('formulário inválido!');
        return;
      }

      const data = Object.fromEntries(new FormData(frmMaintenance));
      data._id = cell.getRow().getData()._id;

      editMaintenance(data._id, data).then(resp => {
        message.toastSuccess('Ordem de Serviço alterada com sucesso!');
        cell.getRow().update(resp.data.data);
        formMode.list();
      });
    };
  });
}
const autoCompletejscliente = createAutoComplete('/clients', '#autoCompleteClientes', 'nome');

const autoCompletejsproduto = createAutoComplete('/products', '#autoCompleteProdutos', 'descricao');
/*
const tableProdutos = createTabulator(
  '',
  deleteProduct,
  editProductOnClick,
  [
    { title: 'ID', field: '_id', headerFilter: 'input', headerFilterLiveFilter: false },
    { title: 'Nome Produto', field: 'descricao', headerFilter: 'input', headerFilterLiveFilter: false },
    { title: 'Preço', field: 'preco' }
  ],
  '#datatableprodutos'
);

async function deleteProduct(e, cell) {
  const data = cell.getRow().getData();
  if (await message.question(`Confirma a exclusão do produto : ${data.nome}`)) {
    removeProduct(data._id).then(resp => {
      console.log(resp);
      cell.getRow().delete();
      message.toastSuccess('Produto exluído com sucesso !');
    });
  }
}
function editProductOnClick(event, cell) {
  formMode.edit(cell.getRow().getData(), () => {
    btnSalvar.onclick = evt => {
      evt.preventDefault();
      if (!frmProduct.checkValidity()) {
        message.toastError('formulário inválido!');
        return;
      }

      const data = Object.fromEntries(new FormData(frmProduct));
      data._id = cell.getRow().getData()._id;

      editProduct(data._id, data).then(resp => {
        console.log(resp);
        message.toastSuccess('Produto alterado com sucesso!');
        cell.getRow().update(resp.data.data);
        formMode.list();
      });
    };
  });
}
*/
