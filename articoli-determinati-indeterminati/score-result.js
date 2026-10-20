(function(){
  const results = {};
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('next') || document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prev') || document.getElementById('prevBtn');
  if (!nextBtn || !feedback) return;

  function currentIndex(){
    const el = document.getElementById('progressText') || document.getElementById('progressLabel');
    if (!el) return 0;
    const m = (el.textContent || '').match(/\d+/);
    return m ? Number(m[0]) - 1 : 0;
  }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('button.answer, button.option, button.word-chip');
    if (!btn) return;
    setTimeout(function(){
      const ok = feedback.classList.contains('good');
      const bad = feedback.classList.contains('bad');
      if (ok || bad) results[currentIndex()] = ok;
    }, 0);
  }, true);

  const originalNext = nextBtn.onclick;
  let finished = false;

  nextBtn.onclick = function(e){
    if (finished) return;
    const isLast = /(?:Fine|15\s*\/\s*15)/i.test(nextBtn.textContent || '');
    if (!isLast) {
      if (typeof originalNext === 'function') originalNext.call(nextBtn, e);
      return;
    }
    finished = true;
    showResult();
  };

  function showResult(){
    const isFlashcardPage = /flashcard\.html$/i.test(location.pathname);
    const evaluated = Object.keys(results).length;
    const correct = Object.values(results).filter(Boolean).length;
    const wrong = evaluated - correct;
    const total = 15;
    const root = document.querySelector('main') || document.body;

    if (isFlashcardPage || evaluated === 0) {
      root.innerHTML = `
        <section class="score-result">
          <div class="score-result-badge">Sessione completata</div>
          <h2>Hai completato le 15 flashcard!</h2>
          <p class="score-result-main">15 / 15</p>
          <p class="score-result-detail">Le flashcard non hanno risposte giuste o sbagliate da valutare.</p>
          <div class="score-result-actions">
            <a href="index.html">Torna al tema</a>
          </div>
        </section>`;
      return;
    }

    root.innerHTML = `
      <section class="score-result">
        <div class="score-result-badge">Risultato</div>
        <h2>Sessione completata!</h2>
        <div class="score-result-number">${correct} / ${evaluated}</div>
        <p class="score-result-detail">Risposte corrette</p>
        <div class="score-result-stats">
          <div><strong>${correct}</strong><span>Corrette</span></div>
          <div><strong>${wrong}</strong><span>Sbagliate</span></div>
        </div>
        ${evaluated < total ? `<p class="score-result-note">Hai risposto a ${evaluated} / ${total} domande.</p>` : ''}
        <div class="score-result-actions">
          <a href="index.html">Torna al tema</a>
        </div>
      </section>`;
  }

  const style = document.createElement('style');
  style.textContent = `
    .score-result{max-width:760px;margin:90px auto;padding:64px 40px;background:#fff;border:1px solid #dfe3e8;border-radius:32px;box-shadow:0 18px 45px rgba(24,32,43,.08);text-align:center;color:#18202b;font-family:"Bricolage Grotesque",system-ui,sans-serif}
    .score-result-badge{display:inline-flex;background:#fff4bf;border:1px solid #f0d76b;border-radius:999px;padding:9px 14px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
    .score-result h2{font-size:clamp(36px,6vw,58px);line-height:.98;letter-spacing:-.055em;margin:24px 0 18px}
    .score-result-number,.score-result-main{font-size:clamp(52px,8vw,78px);font-weight:800;letter-spacing:-.06em;margin:8px 0 0}
    .score-result-detail{margin:2px 0 30px;color:#687180;font-size:17px}
    .score-result-stats{display:flex;justify-content:center;gap:14px;margin:0 auto 24px;max-width:420px}
    .score-result-stats>div{flex:1;padding:18px;border:1px solid #dfe3e8;border-radius:20px;background:#fbfbfc}
    .score-result-stats strong{display:block;font-size:30px;line-height:1}
    .score-result-stats span{display:block;margin-top:6px;color:#687180;font-size:13px;font-weight:700}
    .score-result-note{color:#687180;font-size:14px;margin:0 0 26px}
    .score-result-actions{margin-top:28px}
    .score-result-actions a{display:inline-flex;align-items:center;justify-content:center;padding:14px 20px;border-radius:14px;background:#18202b;color:#fff;font-weight:800;text-decoration:none}
    @media(max-width:600px){.score-result{margin:45px 15px;padding:45px 20px}.score-result-stats{gap:8px}}
  `;
  document.head.appendChild(style);
})();
