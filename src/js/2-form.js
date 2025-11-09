const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

function saveFormData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

window.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email?.trim() || '';
    formData.message = parsedData.message?.trim() || '';

    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    saveFormData();
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });

  form.reset();
  formData.email = '';
  formData.message = '';
  localStorage.removeItem(STORAGE_KEY);
});
