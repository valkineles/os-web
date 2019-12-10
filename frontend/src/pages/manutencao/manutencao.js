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
/*
const tableProdutos = createTabulator(
  '',
  deleteMaintenance,
  editMaintenanceOnClick,
  [
    { title: 'ID', field: '_id', headerFilter: 'input', headerFilterLiveFilter: false },
    { title: 'Data Emissão', field: 'dtemissao', headerFilter: 'input', headerFilterLiveFilter: false },
    { title: 'Status', field: 'status', headerFilter: 'input', headerFilterLiveFilter: false },
    { title: 'Total', field: 'total' }
  ],
  '#datatableprodutos'
);
*/
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
const selectorCliente = document.querySelector('#autoCompletecliente');
console.log(selectorCliente);
const autoCompletejscliente = createAutoComplete('lblcliente.nome', '/clients', selectorCliente, 'nome');
const selectorProduto = document.querySelector('#autoCompleteproduto');
console.log(selectorProduto);

const autoCompletejsproduto = createAutoComplete('lblproduto.descricao', '/products', selectorProduto, 'descricao');
console.log('produto: ' + autoCompletejsproduto);
