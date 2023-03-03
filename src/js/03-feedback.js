import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextInput, 500));
populateTextArea();

function onFormSubmit(e) {
  e.preventDefault();

  const formElements = e.currentTarget.elements;
  const user = {
    email: formElements.email.value,
    message: formElements.message.value,
  };

  if (user.email === '' || user.message === '') {
    alert('All form fields must be completed!');
  } else {
    e.currentTarget.reset();
    console.log(user);
  }
  localStorage.removeItem(STORAGE_KEY);
}

function onTextInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function populateTextArea() {
  const parsedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (parsedForm.email) {
    refs.email.value = parsedForm.email;
  }

  if (parsedForm.message) {
    refs.message.value = parsedForm.message;
  }
}
