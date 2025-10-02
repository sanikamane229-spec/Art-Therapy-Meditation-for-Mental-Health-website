// Simple client-side auth using localStorage (demo only).
// Users stored as: localStorage['aem_users'] = JSON.stringify({email: {name,pass}})
(function(){
  function $(id){return document.getElementById(id)}
  function saveUsers(users){localStorage.setItem('aem_users', JSON.stringify(users))}
  function loadUsers(){ return JSON.parse(localStorage.getItem('aem_users') || "{}") }

  document.addEventListener('DOMContentLoaded', () => {
    const signupForm = $('signup-form');
    const loginForm = $('login-form');

    if(signupForm){
      signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = $('signup-name').value.trim();
        const email = $('signup-email').value.trim().toLowerCase();
        const pass = $('signup-pass').value;

        if(!name || !email || !pass){ alert('Fill all fields'); return; }
        const users = loadUsers();
        if(users[email]){ alert('Email already registered. Please login.'); return; }
        users[email] = { name, pass };
        saveUsers(users);
        localStorage.setItem('aem_user', JSON.stringify({email, name}));
        alert('Account created. You are now logged in.');
        window.location.href = 'quiz.html';
      });
    }

    if(loginForm){
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = $('login-email').value.trim().toLowerCase();
        const pass = $('login-pass').value;
        const users = loadUsers();
        if(!users[email] || users[email].pass !== pass){
          alert('Invalid login. Please check email/password or sign up.');
          return;
        }
        localStorage.setItem('aem_user', JSON.stringify({email, name: users[email].name}));
        alert('Login successful.');
        window.location.href = 'quiz.html';
      });
    }
  });

  // expose a simple logout for debugging
  window.aemAuth = {
    logout: function(){
      localStorage.removeItem('aem_user');
      alert('Logged out');
      location.href = 'index.html';
    }
  }
})();
