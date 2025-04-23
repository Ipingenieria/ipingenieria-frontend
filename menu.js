
document.addEventListener('DOMContentLoaded', function () {
  const toggles = document.querySelectorAll('.submenu-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const submenu = this.nextElementSibling;
      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
      } else {
        submenu.style.display = 'block';
      }
    });
  });
});
