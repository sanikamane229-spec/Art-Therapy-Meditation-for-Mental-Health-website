// Common UI utilities and small behavior
document.addEventListener('DOMContentLoaded', () => {
  // set year in multiple pages
  const year = new Date().getFullYear();
  ['year','year2','year3','year4','year5','year6'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  // show login as "Profile" if logged in
  const loginLink = document.getElementById('login-link');
  const user = localStorage.getItem('aem_user');
  if(user && loginLink){
    loginLink.textContent = 'Profile';
    loginLink.href = 'login.html';
  }

  // redirect "Take Questionnaire" to login if not authenticated
  const takeQuiz = document.getElementById('take-quiz');
  if(takeQuiz){
    takeQuiz.addEventListener('click', (e) => {
      const u = localStorage.getItem('aem_user');
      if(!u){
        e.preventDefault();
        window.location.href = 'login.html';
      }
    });
  }
});
