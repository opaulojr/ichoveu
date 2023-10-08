import './style.css';

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('#theme-toggle .material-symbols-outlined.theme');

const { body } = document;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const isDarkTheme = body.classList.contains('dark-theme');
  themeIcon.textContent = isDarkTheme ? 'light_mode' : 'dark_mode';
});
