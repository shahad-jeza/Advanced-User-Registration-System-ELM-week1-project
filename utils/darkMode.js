// darkMode.js
export class ThemeManager {
  constructor() {
      this.savedTheme = localStorage.getItem('theme') || 'light';
      this.init();
  }

  init() {
      // Create and append the toggle button
      const themeToggle = document.createElement('button');
      themeToggle.className = 'theme-toggle';
      themeToggle.id = 'themeToggle';
      themeToggle.setAttribute('aria-label', 'Toggle dark mode');
      themeToggle.innerHTML = `
          <div class="theme-toggle-track">
              <div class="theme-toggle-icon">
                  <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2"/>
                      <path d="M12 20v2"/>
                      <path d="m4.93 4.93 1.41 1.41"/>
                      <path d="m17.66 17.66 1.41 1.41"/>
                      <path d="M2 12h2"/>
                      <path d="M20 12h2"/>
                      <path d="m6.34 17.66-1.41 1.41"/>
                      <path d="m19.07 4.93-1.41 1.41"/>
                  </svg>
                  <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                  </svg>
              </div>
          </div>
      `;
  

      document.body.appendChild(themeToggle);

      // Set initial theme
      this.applyTheme(this.savedTheme);

      // Add event listener
      themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      
      // Update Bootstrap classes
      const body = document.body;
      const mainContainer = document.querySelector('.d-flex');
      const navbar = document.querySelector('.navbar');

      if (theme === 'dark') {
          // Change light to dark classes
          body.classList.remove('bg-light');
          body.classList.add('bg-dark');
          mainContainer.classList.remove('bg-light');
          mainContainer.classList.add('bg-dark');
          navbar.classList.remove('navbar-light');
          navbar.classList.add('navbar-dark');
      } else {
          // Change dark to light classes
          body.classList.remove('bg-dark');
          body.classList.add('bg-light');
          mainContainer.classList.remove('bg-dark');
          mainContainer.classList.add('bg-light');
          navbar.classList.remove('navbar-dark');
          navbar.classList.add('navbar-light');
      }
  }

  toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      this.applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
  }
}