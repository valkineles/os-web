import * as materialize from 'materialize-css';

import { apiClient } from '../../assets/js/axios.factory';
import { FormMode } from '../../assets/js/form.helper';
import { message } from '../../assets/js/messages';
import { createTabulator } from '../../assets/js/tabulator';
import { editMaintenance, insertMaintenance, removeMaintenance } from './maintenance.service';

const formMode = new FormMode('insert', 'listagem', 'insert');

const btnSalvar = document.getElementById('btnSave');
const btnAdd = document.getElementById('btnAdd');
const btnCancel = document.getElementById('btnCancel');
const autoComplete = require('@tarekraafat/autocomplete.js/dist/js/autoComplete');

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

async function deleteMaintenance(e, cell) {
  const data = cell.getRow().getData();
  if (await message.question(`Confirma a exclusão da ordem de serviço : ${data.nome}`)) {
    removeMaintenance(data._id).then(resp => {
      console.log(resp);
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

      console.log(resp.data);
      table.addRow(resp.data.data);
      formMode.list();
      message.toastSuccess('Ordem de serviço inserida com sucesso !');
    })
    .catch(err => {
      console.log(err);
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
        console.log(resp);
        message.toastSuccess('Ordem de Serviço alterada com sucesso!');
        cell.getRow().update(resp.data.data);
        formMode.list();
      });
    };
  });
}
// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
  data: {
    src: async () => {
      // Loading placeholder text
      document.querySelector('#autoComplete').setAttribute('placeholder', 'Pesquisando...');
      // Fetch External Data Source
      const source = await apiClient().get('/clients?page=1&limit=200');
      console.log(source);
      const data = await source.data.response.docs;
      // Post loading placeholder text
      // document.querySelector('#autoComplete').setAttribute('placeholder', 'Food & Drinks');
      // Returns Fetched data
      return data;
    },
    key: ['nome'],
    cache: false
  },
  placeHolder: 'Informe o nome do Cliente...',
  selector: '#autoComplete',
  threshold: 0,
  debounce: 0,
  searchEngine: 'strict',
  highlight: true,
  maxResults: 5,
  resultsList: {
    render: true,
    container: source => {
      source.setAttribute('id', 'autoComplete_list');
    },
    destination: document.querySelector('#autoComplete'),
    position: 'afterend',
    element: 'ul'
  },
  resultItem: {
    content: (data, source) => {
      console.log('content - data', data);
      source.innerHTML = data.match;
    },
    element: 'li'
  },
  onSelection: feedback => {
    const selection = feedback.selection;
    // Render selected choice to selection div
    // document.querySelector('#txtTeste').value = selection.value._id;
    // Clear Input
    document.querySelector('#autoComplete').setAttribute('data_id', selection.value._id);
    // Change placeholder with the selected value
    document.querySelector('#autoComplete').setAttribute('placeholder', selection.value.nome);
    // Concole log autoComplete data feedback
    console.log(feedback);
    const nomeClient = document.getElementById('lblNome');
    console.log(nomeClient);
    console.log(selection);
    nomeClient.innerHTML = selection.value.nome;
  }
});
