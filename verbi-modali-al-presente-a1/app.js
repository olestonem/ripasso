const SUBJECTS=[
 {s:'Io',p:0,forms:['posso','voglio','devo'],label:'io'}, {s:'Tu',p:1,forms:['puoi','vuoi','devi'],label:'tu'}, {s:'Lui',p:2,forms:['può','vuole','deve'],label:'lui'}, {s:'Lei',p:2,forms:['può','vuole','deve'],label:'lei'}, {s:'Noi',p:3,forms:['possiamo','vogliamo','dobbiamo'],label:'noi'}, {s:'Voi',p:4,forms:['potete','volete','dovete'],label:'voi'}, {s:'Loro',p:5,forms:['possono','vogliono','devono'],label:'loro'}
];
const VERBS=[{name:'potere',forms:['posso','puoi','può','possiamo','potete','possono'],meaning:'мати можливість або дозвіл',why:'Potere виражає можливість або дозвіл.'},{name:'volere',forms:['voglio','vuoi','vuole','vogliamo','volete','vogliono'],meaning:'хотіти',why:'Volere виражає бажання або намір.'},{name:'dovere',forms:['devo','devi','deve','dobbiamo','dovete','devono'],meaning:'мусити, бути зобов’язаним',why:'Dovere виражає обов’язок або необхідність.'}];
const ACTIONS=[['studiare','вчитися'],['lavorare','працювати'],['entrare','увійти'],['uscire','вийти'],['partire','вирушити'],['comprare il pane','купити хліб'],['parlare italiano','говорити італійською'],['finire i compiti','закінчити домашнє завдання'],['prendere l’autobus','сісти на автобус'],['andare dal medico','піти до лікаря'],['aprire la finestra','відчинити вікно'],['chiamare Maria','подзвонити Марії'],['bere acqua','пити воду'],['aspettare qui','чекати тут'],['pagare il conto','оплатити рахунок'],['fare una pausa','зробити перерву'],['leggere il testo','прочитати текст'],['dormire','спати'],['venire con noi','піти з нами'],['prenotare un tavolo','забронювати столик']];
const BANKS={potere:[],volere:[],dovere:[],conjugation:[],infinitive:[],negative:[],context:[],mixed:[]};
function add(type,q,a,wrong,why){BANKS[type].push([q,a,wrong.filter(x=>x!==a),why]);}
VERBS.forEach((v,vi)=>{
 SUBJECTS.forEach((sub,si)=>{
  add(v.name,`${sub.s} ___ ${ACTIONS[(si+vi*3)%ACTIONS.length][0]}.`,v.forms[si],VERBS.filter(x=>x.name!==v.name).map(x=>x.forms[si]).concat([v.forms[(si+1)%6]]),`${v.name[0].toUpperCase()+v.name.slice(1)}: ${sub.s.toLowerCase()} → ${v.forms[si]}. ${v.why}`);
  add('conjugation',`${sub.s} + ${v.name}: обери правильну форму.`,v.forms[si],VERBS.map(x=>x.forms[si]).filter(x=>x!==v.forms[si]).concat([v.forms[(si+2)%6]]),`${sub.s} вимагає форми ${v.forms[si]} дієслова ${v.name}.`);
 });
 ACTIONS.forEach((act,ai)=>{
  const si=ai%6, sub=SUBJECTS[si], form=v.forms[si];
  const prompts=[`${sub.s} ___ ${act[0]}.`,`${sub.s} ___ ${act[0]} oggi.`,`${sub.s} ___ ${act[0]} domani.`];
  add(v.name,prompts[ai%3],form,VERBS.filter(x=>x.name!==v.name).map(x=>x.forms[si]).concat([v.forms[(si+1)%6]]),`${v.name[0].toUpperCase()+v.name.slice(1)}: ${sub.s.toLowerCase()} → ${form}. Після модального дієслова вживаємо інфінітив.`);
  add('infinitive',`${sub.s} ${form} ___ .`,act[0],[ACTIONS[(ai+1)%ACTIONS.length][0],ACTIONS[(ai+2)%ACTIONS.length][0],ACTIONS[(ai+3)%ACTIONS.length][0]],`Після ${form} інше дієслово залишається в інфінітиві: ${form} ${act[0]}.`);
 });
});
const contextItems=[
 ['Non sto bene. ___ andare dal medico.','devo','voglio','posso','Є необхідність: devo andare dal medico.'],
 ['Ho tempo libero e ___ guardare un film.','voglio','devo','posso','Це бажання: voglio guardare un film.'],
 ['La porta è aperta. ___ entrare?','Posso','Devo','Voglio','Для прохання про дозвіл: Posso entrare?'],
 ['Domani ho un esame. ___ studiare stasera.','devo','voglio','posso','Підготовка до іспиту — необхідність: devo studiare.'],
 ['Ho fame. ___ mangiare qualcosa.','voglio','devo','posso','У цьому контексті висловлюємо бажання: voglio mangiare.'],
 ['È vietato fumare qui. Non ___ fumare.','posso','voglio','devo','Заборона означає, що не можна: non posso fumare.'],
 ['Sono libero oggi: ___ venire con voi.','posso','devo','voglio','Є можливість: posso venire.'],
 ['È tardi e domani lavoro. ___ andare a dormire.','devo','voglio','posso','Є необхідність: devo andare a dormire.'],
 ['Mi piace questo libro. Lo ___ leggere.','voglio','devo','posso','Висловлюємо бажання: voglio leggere.'],
 ['Per entrare, ___ mostrare il biglietto.','devi','vuoi','puoi','Це вимога: devi mostrare il biglietto.'],
 ['Se vuoi, ___ aiutarti.','posso','devo','voglio','Пропоную можливість допомогти: posso aiutarti.'],
 ['Non ho soldi, non ___ comprare questo telefono.','posso','voglio','devo','Немає грошей, отже немає можливості: non posso.'],
 ['___ un caffè, per favore. (desiderio: io)','Voglio','Devo','Posso','Для вираження бажання: voglio un caffè.'],
 ['Per arrivare in orario, ___ prendere il treno delle otto. (noi)','dobbiamo','vogliamo','possiamo','Необхідність: dobbiamo prendere il treno.'],
 ['___ aprire la finestra? Fa caldo. (tu, richiesta)','Puoi','Devi','Vuoi','Запит на послугу: Puoi aprire la finestra?']
];
contextItems.forEach((x,i)=>{add('context',x[0],x[1],[x[2],x[3]],x[4]);add('mixed',x[0],x[1],[x[2],x[3]],x[4]);});
// Negative forms are built around clear, natural contrasts.
const negs=[['Io ___ uscire: sono stanco.','non voglio','non posso','non devo','Висловлюємо небажання: non voglio uscire.'],['Oggi ___ lavorare: è festa.','non devo','non voglio','non posso','Немає обов’язку працювати: non devo lavorare.'],['Senza biglietto ___ entrare.','non posso','non voglio','non devo','Без квитка немає дозволу/можливості: non posso entrare.'],['Lei ___ mangiare carne: è vegetariana.','non vuole','non deve','non può','Висловлюємо її бажання: non vuole mangiare carne.'],['Noi ___ fare rumore: il bambino dorme.','non dobbiamo','non vogliamo','non possiamo','Це правило/необхідність: non dobbiamo fare rumore.'],['Tu ___ venire se sei occupato.','non devi','non vuoi','non puoi','Тут значення: не мусиш приходити — non devi.'],['Loro ___ partire oggi: il volo è cancellato.','non possono','non vogliono','non devono','Через скасований рейс немає можливості: non possono partire.']];
negs.forEach((x,i)=>{add('negative',x[0],x[1],[x[2],x[3]],x[4]);add('mixed',x[0],x[1],[x[2],x[3]],x[4]);});
// Add varied conjugation and infinitive prompts so each activity draws from a substantial pool.
for(let round=0;round<5;round++){
 SUBJECTS.forEach((sub,si)=>VERBS.forEach((v,vi)=>{
  const form=v.forms[si%6], act=ACTIONS[(round*7+si*3+vi)%ACTIONS.length][0];
  add('conjugation',`${sub.s} ___ ${act}. (${v.name})`,form,VERBS.filter(x=>x.name!==v.name).map(x=>x.forms[si%6]).concat([v.forms[(si+1)%6]]),`${v.name[0].toUpperCase()+v.name.slice(1)}: ${sub.s.toLowerCase()} → ${form}.`);
  add('infinitive',`${sub.s} ${form} ___ .`,act,[ACTIONS[(round+si+1)%ACTIONS.length][0],ACTIONS[(round+si+2)%ACTIONS.length][0],ACTIONS[(round+si+3)%ACTIONS.length][0]],`Після модального дієслова вживаємо інфінітив: ${form} ${act}.`);
  add('mixed',`${sub.s} ___ ${act}. (${v.name})`,form,VERBS.filter(x=>x.name!==v.name).map(x=>x.forms[si%6]).concat([v.forms[(si+1)%6]]),`${v.name[0].toUpperCase()+v.name.slice(1)}: ${sub.s.toLowerCase()} → ${form}.`);
 }));
}
// Expand each modal-specific bank to a large question pool; each session still selects only 15.
for(let round=0;round<5;round++){
 SUBJECTS.forEach((sub,si)=>VERBS.forEach((v,vi)=>{
  const form=v.forms[si%6], act=ACTIONS[(round*5+si*2+vi*3)%ACTIONS.length][0];
  add(v.name,`${sub.s} ___ ${act}. (${v.name})`,form,VERBS.filter(x=>x.name!==v.name).map(x=>x.forms[si%6]).concat([v.forms[(si+1)%6]]),`${v.name[0].toUpperCase()+v.name.slice(1)}: ${sub.s.toLowerCase()} → ${form}.`);
 }));
}
const LABELS={potere:['Potere','Обери правильну форму potere: можливість або дозвіл.'],volere:['Volere','Обери правильну форму volere: бажання та наміри.'],dovere:['Dovere','Обери правильну форму dovere: обов’язок і необхідність.'],conjugation:['Le forme verbali','Звертай увагу на особу та форму дієслова.'],infinitive:['Modale + infinito','Після модального дієслова інше дієслово стоїть в інфінітиві.'],negative:['La forma negativa','Non ставимо перед модальним дієсловом.'],context:['Completa la frase','Визнач значення ситуації: можливість, бажання чи обов’язок.'],mixed:['Ripasso finale','Змішані вправи на potere, volere та dovere.']};
const $=id=>document.getElementById(id);const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};const params=new URLSearchParams(location.search);const type=params.get('type')||'mixed';const bank=type==='mixed'?[...BANKS.mixed,...BANKS.conjugation,...BANKS.potere,...BANKS.volere,...BANKS.dovere,...BANKS.context]:BANKS[type]||BANKS.mixed;const TOTAL=15;let questions=shuffle(bank).slice(0,TOTAL).map(([prompt,correct,wrong,why])=>({prompt,correct,options:shuffle([correct,...shuffle(wrong.filter(x=>x!==correct)).slice(0,3)]),why}));let index=0,score=0,answered=false;const label=LABELS[type]||LABELS.mixed;$('eyebrow').textContent='Presente indicativo · A1';$('title').textContent=label[0];$('subtitle').textContent=label[1];$('typeLabel').textContent=label[0];function escapeHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}function render(){answered=false;$('feedback').className='feedback';$('feedback').innerHTML='';$('progressText').textContent=`${index+1} / ${TOTAL}`;$('fill').style.width=`${(index+1)/TOTAL*100}%`;const item=questions[index];$('prev').disabled=index===0;$('next').textContent=index===TOTAL-1?'Завершити':'Avanti →';$('content').innerHTML=`<div class="question">${item.prompt}</div><div class="answers">${item.options.map(o=>`<button class="answer" type="button" data-answer="${escapeHTML(o)}">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(btn=>btn.addEventListener('click',()=>answer(item,btn)));}function answer(item,btn){if(answered)return;answered=true;const chosen=btn.dataset.answer;const ok=chosen===item.correct;if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');$('feedback').className=`feedback show ${ok?'good':'bad'}`;$('feedback').innerHTML=`<strong>${ok?'✓ Правильно!':'✕ Неправильно'}</strong><div>${item.why}</div>`;}$('prev').addEventListener('click',()=>{if(index>0){index--;render()}});$('next').addEventListener('click',()=>{if(!answered){$('feedback').className='feedback show bad';$('feedback').innerHTML='<strong>Спочатку обери відповідь.</strong>';return}if(index<TOTAL-1){index++;render()}else finish()});function finish(){$('card').style.display='none';$('end').classList.add('show');$('score').textContent=`Правильних відповідей: ${score} із ${TOTAL}.`;$('summary').innerHTML=`<p>${score>=12?'Чудово! Продовжуй так само.':score>=8?'Добре! Повтори пояснення до помилок.':'Перечитай правило та спробуй ще раз.'}</p><button class="retry" id="retry">Спробувати ще раз</button>`;$('retry').addEventListener('click',()=>location.reload())}render();
