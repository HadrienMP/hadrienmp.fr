const checkbox = document.getElementById("theme-toggle");
const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const theme = window.localStorage.getItem('theme') || preferedTheme
checkbox.checked = theme == 'dark';
document.documentElement.setAttribute('data-theme', theme);

checkbox.addEventListener('change', (cb) => {
    const theme = cb.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem("theme", theme);
});