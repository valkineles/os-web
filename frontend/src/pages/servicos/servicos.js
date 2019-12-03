import { FormMode } from '../../assets/js/form.helper';
import { message } from '../../assets/js/messages';
import { createTabulator } from '../../assets/js/tabulator';
import { editService, insertService, removeService } from './services.service';

const formMode = new FormMode('insert', 'listagem', 'insert');

const btnSalvar = document.getElementById('btnSave');
const btnAdd = document.getElementById('btnAdd');
const btnCancel = document.getElementById('btnCancel');

formMode.list();

btnAdd.onclick = btnAddOnClick;
btnCancel.onclick = btnCancelOnClick;

function btnAddOnClick() {
  formMode.insert(frmService, formModeInsert);
}

function btnCancelOnClick(event) {
  event.preventDefault();
  formMode.list();
}

const table = createTabulator('/services', deleteServices, editServicesOnClick, [
  { title: 'ID', field: '_id', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Nome Serviço', field: 'descricao', headerFilter: 'input', headerFilterLiveFilter: false },
  { title: 'Preço', field: 'preco' }
]);

async function deleteServices(e, cell) {
  const data = cell.getRow().getData();
  if (await message.question(`Confirma a exclusão do serviço : ${data.nome}`)) {
    removeService(data._id).then(resp => {
      console.log(resp);
      cell.getRow().delete();
      message.toastSuccess('Serviço exluído com sucesso !');
    });
  }
}

function formModeInsert() {
  btnSalvar.onclick = btnSalvarInserirOnClick;
}

function btnSalvarInserirOnClick(event) {
  event.preventDefault();

  if (!frmService.checkValidity()) {
    message.toastError('formulário inválido!');
    return;
  }

  const data = Object.fromEntries(new FormData(frmService));

  insertService(data)
    .then(resp => {
      if (resp.status !== 201) {
        message.toastError(resp.message);
        return;
      }

      console.log(resp.data);
      table.addRow(resp.data.data);
      formMode.list();
      message.toastSuccess('Serviço inserido com sucesso !');
    })
    .catch(err => {
      console.log(err);
      message.toastError(err.message);
    });
}

function editServicesOnClick(event, cell) {
  formMode.edit(cell.getRow().getData(), () => {
    btnSalvar.onclick = evt => {
      evt.preventDefault();
      if (!frmService.checkValidity()) {
        message.toastError('formulário inválido!');
        return;
      }

      const data = Object.fromEntries(new FormData(frmService));
      data._id = cell.getRow().getData()._id;

      editService(data._id, data).then(resp => {
        console.log(resp);
        message.toastSuccess('Produto alterado com sucesso!');
        cell.getRow().update(resp.data.data);
        formMode.list();
      });
    };
  });
}
