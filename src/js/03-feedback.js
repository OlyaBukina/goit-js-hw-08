import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

let formData;
function loadFormData() {
  formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  refs.email.value = formData?.email ?? '';
  refs.message.value = formData?.message ?? '';
}
loadFormData();
function onTextInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
refs.form.addEventListener('input', throttle(onTextInput, 500));

function onFormSubmit(e) {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('All form fields must be completed!');
  } else {
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    loadFormData();
  }
}
refs.form.addEventListener('submit', onFormSubmit);
