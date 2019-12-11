import * as materialize from 'materialize-css';

export class FormMode {
  constructor(editElement, listElement, insertElement) {
    this.editDom = document.getElementById(editElement);
    this.listDom = document.getElementById(listElement);
    this.insertDom = document.getElementById(insertElement);

    this.setAllElementsInvisible();
    this.mode = 'list';
  }

  setAllElementsInvisible() {
    this.editDom.style.display = 'none';
    this.listDom.style.display = 'none';
    this.insertDom.style.display = 'none';
  }

  insert(form, functionRunOnInsert) {
    form.reset();
    this.editDom.style.display = 'none';
    this.listDom.style.display = 'none';
    this.insertDom.style.display = 'block';

    this.mode = 'insert';

    if (functionRunOnInsert && typeof functionRunOnInsert === 'function') {
      functionRunOnInsert();
    }
  }

  edit(data, functionRunOnEdit, mimenonic = '') {
    Object.keys(data).forEach(item => {
      if (typeof data[item] === 'object') {
        this.edit(data[item], '', item);
      }

      let nameSelector = '';
      if (mimenonic === '') {
        nameSelector = `[name="${item}"]`;
      } else {
        nameSelector = `[name="${mimenonic}.${item}"]`;
      }
      const el = document.querySelector(nameSelector);
      if (el) {
        el.value = data[item];
      }
    });
    materialize.updateTextFields();

    this.listDom.style.display = 'none';
    this.insertDom.style.display = 'none';
    this.editDom.style.display = 'block';

    this.mode = 'edit';

    if (functionRunOnEdit && typeof functionRunOnEdit === 'function') {
      functionRunOnEdit();
    }
  }

  list(functionRunOnList) {
    this.editDom.style.display = 'none';
    this.insertDom.style.display = 'none';
    this.listDom.style.display = 'block';

    this.mode = 'list';

    if (functionRunOnList && typeof functionRunOnList === 'function') {
      functionRunOnList();
    }
  }

  getState() {
    return this.mode;
  }
}
