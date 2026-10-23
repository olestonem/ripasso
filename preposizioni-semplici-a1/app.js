const BANKS={di:[],a:[],da:[],in:[],con:[],su:[],per:[],tra:[],mixed:[]};
function add(types,q,a,wrong,why){for(const type of types){const opts=[...new Set(wrong.filter(x=>x!==a))];BANKS[type].push([q,a,opts,why]);}}
const items=[
['di','Sono ___ Lviv.','di',['a','da','in'],'Для походження з міста/місця вживаємо di: Sono di Lviv.'],
['di','Questo è il libro ___ Marco.','di',['a','da','con'],'Di вказує на приналежність: il libro di Marco.'],
['di','La borsa è ___ pelle.','di',['da','per','su'],'Di може вказувати на матеріал: una borsa di pelle.'],
['di','Il fratello ___ Anna si chiama Luca.','di',['a','da','con'],'Для родинного зв’язку вживаємо di: il fratello di Anna.'],
['di','Un bicchiere ___ acqua, per favore.','di',['a','in','su'],'Di може позначати вміст або кількість: un bicchiere di acqua (più comune: d’acqua).'],
['di','La capitale ___ Italia è Roma.','dell’',['di','in','alla'],'Перед Italia вживаємо di + l’ → dell’Italia.'],
['di','La porta ___ casa è aperta.','di',['a','da','per'],'Di пов’язує предмет із тим, до чого він належить: la porta di casa.'],
['di','Sono ___ madrelingua ucraina.','di',['a','da','con'],'У виразі essere di madrelingua… вживаємо di.'],
['a','Domani vado ___ Roma.','a',['in','da','di'],'З містами зазвичай вживаємо a: a Roma.'],
['a','La lezione comincia ___ nove.','alle',['in','da','per'],'З годинами вживаємо a; з артиклем: alle nove.'],
['a','Abito ___ via Verdi, numero 10.','in',['a','da','di'],'Перед назвою вулиці в італійській зазвичай вживаємо in: in via Verdi.'],
['a','Vado ___ scuola ogni mattina.','a',['in','da','su'],'У сталому виразі: andare a scuola.'],
['a','Scrivo ___ mia sorella.','a',['di','da','con'],'Scrivere a qualcuno: пишу комусь.'],
['a','Ci vediamo ___ lunedì.','a',['in','da','per'],'Для днів тижня можна вживати a: a lunedì (у значенні «до понеділка»); для регулярності — il lunedì.'],
['a','Il treno arriva ___ stazione.','in',['a','da','per'],'Для місця прибуття часто вживаємо in stazione; у цьому реченні природно: arriva in stazione.'],
['da','Vengo ___ scuola.','da',['a','di','in'],'Da вказує на вихідну точку: vengo da scuola.'],
['da','Stasera ceno ___ mia nonna.','da',['a','in','con'],'Da + людина може означати «у когось»: ceno da mia nonna.'],
['da','Questo regalo è ___ te.','per',['da','di','a'],'Для адресата подарунка природно вживаємо per: è per te.'],
['da','Devo andare ___ dentista.','dal',['al','nel','sul'],'Da + il = dal: andare dal dentista, тобто до стоматолога.'],
['da','Parto ___ Napoli alle otto.','da',['a','in','di'],'Da вказує на місце відправлення: parto da Napoli.'],
['da','Lavoro qui ___ due anni.','da',['per','tra','di'],'Da + період означає, що дія триває від певного моменту: lavoro qui da due anni.'],
['da','Ho ricevuto una telefonata ___ Luca.','da',['di','a','con'],'Da може позначати джерело: una telefonata da Luca.'],
['in','Abito ___ Italia.','in',['a','da','di'],'З назвами країн зазвичай вживаємо in: in Italia.'],
['in','Quest’estate andiamo ___ Sardegna.','in',['a','da','per'],'З назвами регіонів та островів часто вживаємо in: in Sardegna.'],
['in','Vado al lavoro ___ autobus.','in',['con','a','da'],'Для транспорту без артикля вживаємо in: in autobus.'],
['in','Mia madre lavora ___ banca.','in',['a','da','su'],'Для місця роботи: in banca.'],
['in','Metto le chiavi ___ borsa.','in',['a','su','da'],'In indica, що предмет кладуть усередину: in borsa.'],
['in','Il negozio è ___ centro.','in',['a','da','per'],'У сталому виразі: in centro.'],
['in','Vivo ___ una piccola città.','in',['a','da','di'],'З una piccola città природно: vivo in una piccola città.'],
['con','Esco ___ i miei amici.','con',['di','da','per'],'Con означає «разом із»: con i miei amici.'],
['con','Scrivo ___ una penna blu.','con',['di','da','su'],'Con може позначати інструмент: con una penna.'],
['con','Prendo il tè ___ limone.','con',['di','da','per'],'Con вказує на те, що додають: tè con limone.'],
['con','Parlo ___ la professoressa.','con',['di','da','in'],'Parlare con qualcuno: розмовляти з кимось.'],
['con','Vado al cinema ___ mia sorella.','con',['per','di','a'],'Con позначає супровід: con mia sorella.'],
['su','Il libro è ___ tavolo.','sul',['nel','al','dal'],'Su + il = sul: sul tavolo, на столі.'],
['su','Il gatto dorme ___ divano.','sul',['nel','dal','al'],'Su + il = sul: sul divano.'],
['su','Leggo un articolo ___ musica italiana.','sulla',['della','alla','nella'],'Su означає «про тему»; su + la = sulla.'],
['su','C’è una foto ___ muro.','sul',['nel','dal','al'],'Su + il = sul: sul muro.'],
['su','Il quaderno è ___ scrivania.','sulla',['nella','alla','dalla'],'Su + la = sulla: sulla scrivania.'],
['per','Studio ___ l’esame.','per',['da','di','con'],'Per indica lo scopo: studio per l’esame.'],
['per','Questo messaggio è ___ te.','per',['da','di','a'],'Per indica il destinatario: è per te.'],
['per','Resto a Milano ___ tre giorni.','per',['da','tra','di'],'Per indica una durata delimitata: per tre giorni.'],
['per','Passo ___ il supermercato prima di tornare.','per',['da','di','con'],'Passare per un luogo = attraversare o fare una tappa.'],
['per','Grazie ___ il tuo aiuto.','per',['di','da','con'],'L’espressione è grazie per il tuo aiuto.'],
['per','Partiamo ___ Firenze domani mattina.','per',['da','a','in'],'Per indica la destinazione della partenza: partire per Firenze.'],
['tra','Il treno parte ___ dieci minuti.','tra',['per','da','di'],'Tra/fra + intervallo indica quanto manca: tra dieci minuti.'],
['tra','La farmacia è ___ la banca e il bar.','tra',['per','da','con'],'Tra indica la posizione in mezzo a due luoghi.'],
['tra','Ci vediamo ___ un’ora.','fra',['per','da','su'],'Fra e tra sono intercambiabili: fra un’ora.'],
['tra','___ Paolo e Anna, chi arriva prima?','Tra',['Per','Da','Con'],'Tra può introdurre un gruppo di persone tra cui scegliere.'],
['tra','Il supermercato è ___ casa mia e la scuola.','tra',['per','da','su'],'Tra indica la posizione intermedia fra due luoghi.']
];
for(const [type,q,a,w,why] of items)add([type,'mixed'],q,a,w,why);
// Add more context-rich variations to provide substantial pools for random 15-question sessions.
const variations=[
['di','La macchina ___ mio padre è rossa.','di',['a','da','con'],'Di indica a chi appartiene la macchina.'],['di','Un corso ___ italiano inizia domani.','di',['a','da','per'],'Di specifica il tipo di corso: corso di italiano.'],['a','Alle otto vado ___ lavoro.','al',['nel','dal','sul'],'A + il = al: andare al lavoro.'],['a','Rispondo ___ una domanda.','a',['di','da','con'],'Rispondere a una domanda.'],['da','Esco ___ casa alle sette.','da',['a','in','di'],'Da indica il punto di partenza: da casa.'],['da','Vado ___ Maria a prendere un libro.','da',['a','in','per'],'Da + nome di persona: vado da Maria, cioè a casa sua o nel luogo in cui si trova.'],['in','Lavoro ___ un ufficio.','in',['a','da','su'],'Per un luogo di lavoro: in un ufficio.'],['in','Andiamo al mare ___ macchina.','in',['con','a','da'],'Per il mezzo di trasporto: in macchina.'],['con','Preferisco il caffè ___ zucchero.','con',['di','per','da'],'Con indica un ingrediente aggiunto.'],['su','La borsa è ___ sedia.','sulla',['nella','alla','dalla'],'Su + la = sulla.'],['per','Compro un regalo ___ mia madre.','per',['da','di','a'],'Per indica la persona a cui è destinato il regalo.'],['tra','La lezione comincia ___ cinque minuti.','tra',['per','da','di'],'Tra cinque minuti = dopo cinque minuti.']
]
for(let round=0;round<5;round++){
 for(const [t,q,a,w,why] of variations){
  add([t,'mixed'],q,a,w,why);
 }
}
const LABELS={di:['DI: origine e possesso','Обирай di для походження, приналежності та матеріалу.'],a:['A: città, tempo e destinazione','Звертай увагу на міста, час і сталі вирази з a.'],da:['DA: provenienza e persone','Da часто вказує на вихідну точку або місце/людину, до якої йдемо.'],in:['IN: luoghi e mezzi','In вживається з країнами, багатьма місцями та деякими видами транспорту.'],con:['CON: compagnia e strumenti','Con означає «разом із» або вказує на інструмент.'],su:['SU: posizione e argomento','Su означає «на поверхні» або «про певну тему».'],per:['PER: scopo e durata','Per може позначати мету, адресата, маршрут або тривалість.'],tra:['TRA / FRA: spazio e tempo','Tra і fra взаємозамінні: між місцями або через певний час.'],mixed:['Ripasso finale','Визнач значення фрази й обери відповідний прийменник.']};
const $=id=>document.getElementById(id);const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};const params=new URLSearchParams(location.search);const type=params.get('type')||'mixed';const bank=BANKS[type]||BANKS.mixed;const TOTAL=15;let questions=shuffle(bank).slice(0,TOTAL).map(([prompt,correct,wrong,why])=>({prompt,correct,options:shuffle([correct,...shuffle(wrong.filter(x=>x!==correct)).slice(0,3)]),why}));let index=0,score=0,answered=false;const label=LABELS[type]||LABELS.mixed;$('eyebrow').textContent='Preposizioni semplici · A1';$('title').textContent=label[0];$('subtitle').textContent=label[1];$('typeLabel').textContent=label[0];function escapeHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}function render(){answered=false;$('feedback').className='feedback';$('feedback').innerHTML='';$('progressText').textContent=`${index+1} / ${TOTAL}`;$('fill').style.width=`${(index+1)/TOTAL*100}%`;const item=questions[index];$('prev').disabled=index===0;$('next').textContent=index===TOTAL-1?'Завершити':'Avanti →';$('content').innerHTML=`<div class="question">${item.prompt}</div><div class="answers">${item.options.map(o=>`<button class="answer" type="button" data-answer="${escapeHTML(o)}">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(btn=>btn.addEventListener('click',()=>answer(item,btn)));}function answer(item,btn){if(answered)return;answered=true;const chosen=btn.dataset.answer;const ok=chosen===item.correct;if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');$('feedback').className=`feedback show ${ok?'good':'bad'}`;$('feedback').innerHTML=`<strong>${ok?'✓ Правильно!':'✕ Неправильно'}</strong><div>${item.why}</div>`;}$('prev').addEventListener('click',()=>{if(index>0){index--;render()}});$('next').addEventListener('click',()=>{if(!answered){$('feedback').className='feedback show bad';$('feedback').innerHTML='<strong>Спочатку обери відповідь.</strong>';return}if(index<TOTAL-1){index++;render()}else finish()});function finish(){$('card').style.display='none';$('end').classList.add('show');$('score').textContent=`Правильних відповідей: ${score} із ${TOTAL}.`;$('summary').innerHTML=`<p>${score>=12?'Чудово! Продовжуй так само.':score>=8?'Добре! Повтори пояснення до помилок.':'Перечитай правило та спробуй ще раз.'}</p><button class="retry" id="retry">Спробувати ще раз</button>`;$('retry').addEventListener('click',()=>location.reload())}render();