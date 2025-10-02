// Simple questionnaire logic: requires user logged in, stores results in localStorage
(function(){
  function el(id){return document.getElementById(id)}
  document.addEventListener('DOMContentLoaded', () => {
    const userRaw = localStorage.getItem('aem_user');
    const authWarning = el('auth-warning');
    const quizContainer = el('quiz-container');

    if(!userRaw){
      if(authWarning) authWarning.style.display = 'block';
      if(quizContainer) quizContainer.style.display = 'none';
      return;
    } else {
      if(authWarning) authWarning.style.display = 'none';
      if(quizContainer) quizContainer.style.display = 'block';
    }

    const form = el('quiz-form');
    const resultCard = el('result');
    const clearBtn = el('clear-results');

    function computeScore(formData){
      let sum = 0;
      for(const [k,v] of formData.entries()){
        if(k.startsWith('q')) sum += Number(v);
      }
      return sum;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const score = computeScore(fd);
      // Interpret results (score range: -5 .. 10)
      let message = '';
      if(score >= 8) {
        message = 'Strongly positive: You are highly responsive to art + meditation practices.';
      } else if(score >= 4) {
        message = 'Positive: These practices likely help you — try regular short sessions.';
      } else if(score >= 0) {
        message = 'Mixed: Some benefit — consider guided sessions to deepen impact.';
      } else {
        message = 'Less responsive: Art/meditation might not be your preferred route right now — consider other supports or different formats.';
      }

      // Save result with timestamp
      const user = JSON.parse(localStorage.getItem('aem_user'));
      const all = JSON.parse(localStorage.getItem('aem_results') || "[]");
      const entry = {
        user: user.email,
        name: user.name,
        score,
        message,
        timestamp: new Date().toISOString()
      };
      all.push(entry);
      localStorage.setItem('aem_results', JSON.stringify(all));

      // show
      resultCard.style.display = 'block';
      resultCard.innerHTML = `
        <h3>Your result</h3>
        <p><strong>Score:</strong> ${score}</p>
        <p>${message}</p>
        <p class="small">Saved to your browser. You can clear it anytime.</p>
      `;
      window.scrollTo({top: resultCard.offsetTop-20, behavior: 'smooth'});
    });

    clearBtn.addEventListener('click', () => {
      // remove user's previous results
      const user = JSON.parse(localStorage.getItem('aem_user'));
      let all = JSON.parse(localStorage.getItem('aem_results') || "[]");
      all = all.filter(r => r.user !== user.email);
      localStorage.setItem('aem_results', JSON.stringify(all));
      resultCard.style.display = 'none';
      alert('Your previous results were cleared.');
    });
  });
})();
