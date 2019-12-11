import { apiClient } from './axios.factory';

const autoComplete = require('@tarekraafat/autocomplete.js/dist/js/autoComplete');

// The autoComplete.js Engine instance creator
export function createAutoComplete(endpoint, selector, key) {
  const autoCompletejs = new autoComplete({
    data: {
      src: async () => {
        // Loading placeholder text
        document.querySelector(selector).setAttribute('placeholder', 'Pesquisando...');
        // Fetch External Data Source
        const source = await apiClient().get(`${endpoint}?page=1&limit=200`);
        const data = await source.data.response.docs;
        // Post loading placeholder text
        // document.querySelector('#autoComplete').setAttribute('placeholder', 'Food & Drinks');
        // Returns Fetched data
        return data;
      },
      key: [key],
      cache: false
    },
    searchEngine: 'strict',
    highlight: true,
    maxResults: 5,
    selector: selector,
    threshold: 0,
    debounce: 0,
    resultsList: {
      render: true
      // container: source => {
      //   source.setAttribute('id', 'autoComplete_list');
      // },
      // destination: document.querySelector(selector),
      // position: 'beforeend',
      // element: 'ul'
    },
    noResults: () => {
      // Action script on noResults      | (Optional)
      const result = document.createElement('li');
      result.setAttribute('class', 'autoComplete_result ');
      result.setAttribute('tabindex', '1');
      result.innerHTML = 'Nenhum registro encontrado!';
      document.querySelector('#autoComplete_list').appendChild(result);
      document.querySelector(selector).value = '';
    },
    resultItem: {
      content: (data, source) => {
        source.innerHTML = data.match;
      },
      element: 'li'
    },
    onSelection: feedback => {
      document.querySelector(selector).blur();
      const selection = feedback.selection;
      // document.querySelector('#txtTeste').value = selection.value._id;
      // Clear Input

      document.querySelector(selector).setAttribute('data_id', selection.value._id);
      // Change placeholder with the selected value
      document.querySelector(selector).setAttribute('placeholder', selection.value.nome);
      if (selector === '#autoCompleteClientes') {
        document.querySelector(selector).value = selection.value.nome;
      } else {
        document.querySelector(selector).value = selection.value.descricao;
      }
    }
  });

  ['focus', 'blur'].forEach(function(eventType) {
    const resultsList = document.querySelector('#autoComplete_list');

    document.querySelector(selector).addEventListener(eventType, function() {
      // Hide results list & show other elemennts
      if (eventType === 'blur') {
        resultsList.style.display = 'none';
      } else if (eventType === 'focus') {
        // Show results list & hide other elemennts
        resultsList.style.display = 'block';
      }
    });
  });
  return autoCompletejs;
}
