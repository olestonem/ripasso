const $=id=>document.getElementById(id);
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
const repeat100=(items)=>Array.from({length:100},(_,i)=>({...items[i%items.length],id:i}));
const typeInfo={
  mixed:['🎯 Quiz misto','Lessico e significati nel contesto.'],
  maps:['🗺️ Mappe stradali','Segui il percorso e scegli l’indicazione corretta.'],
  intruso:['🕵️ Trova l’intruso','Quale parola non appartiene al gruppo?'],
  complete:['✏️ Completa la frase','Scegli la parola che completa la frase.'],
  situations:['💬 Situazioni reali','Scegli la risposta più adatta.'],
  flashcard:['🗂️ Flashcard','Italiano → ucraino → spiegazione.']
};
function feedback(why,example){return {why,example}}
function choiceOptions(correct,pool){return shuffle([correct,...shuffle(pool.filter(x=>x!==correct)).slice(0,3)])}

const flashBase=[
['destra','праворуч','Indica il lato opposto alla sinistra.','La farmacia è a destra del supermercato.'],
['sinistra','ліворуч','Indica il lato opposto alla destra.','Al semaforo gira a sinistra.'],
['dritto','прямо','Indica una direzione senza girare.','Continua dritto fino alla piazza.'],
['vicino','близько, поруч','Indica una distanza breve.','La stazione è vicino al centro.'],
['lontano','далеко','Indica una distanza grande.','Il museo è abbastanza lontano da qui.'],
['davanti a','перед','Indica una posizione nella parte anteriore rispetto a un luogo o oggetto.','Il taxi è davanti all’hotel.'],
['dietro','позаду','Indica una posizione nella parte posteriore.','Il parcheggio è dietro la chiesa.'],
['accanto a','поруч із','Indica una posizione molto vicina, di fianco.','La banca è accanto alla posta.'],
['tra / fra','між','Indica una posizione compresa tra due luoghi o elementi.','Il bar è tra la farmacia e il ristorante.'],
['attraversare','перейти, перетнути','Significa passare da un lato all’altro di una strada, piazza o ponte.','Per arrivare al museo devi attraversare la strada.'],
['girare','повернути','Significa cambiare direzione.','Dopo il semaforo gira a destra.'],
['continuare','продовжувати','Significa andare avanti senza fermarsi.','Continua fino alla seconda strada.'],
['semaforo','світлофор','Regola il traffico con luci colorate.','Ci vediamo davanti al semaforo.'],
['incrocio','перехрестя','È il punto in cui due o più strade si incontrano.','All’incrocio prendi la strada a sinistra.'],
['ponte','міст','Permette di attraversare un fiume o un’altra area.','Il ponte è dopo la piazza.'],
['piazza','площа','È uno spazio aperto, spesso al centro di una città.','Il museo si trova nella piazza principale.'],
['angolo','ріг, кут','È il punto in cui due strade si incontrano lateralmente.','Il bar è all’angolo della strada.'],
['prima strada','перша вулиця','Indica la prima strada che si incontra lungo il percorso.','Prendi la prima strada a destra.'],
['seconda strada','друга вулиця','Indica la seconda strada che si incontra lungo il percorso.','Gira nella seconda strada a sinistra.'],
['passare davanti a','проходити повз, перед','Significa andare davanti a un luogo durante il percorso.','Per arrivare in centro devi passare davanti al teatro.']
];
function buildFlash(){return repeat100(flashBase.map(x=>({kind:'flash',word:x[0],uk:x[1],definition:x[2],example:x[3]})))}

const completeBase=[
['Per arrivare alla stazione devi andare ___ fino al semaforo.','dritto',['a destra','dritto','indietro','tra'],'Continua dritto fino alla stazione.','“Dritto” indica che non devi cambiare direzione.'],
['Al prossimo incrocio devi girare ___.','a sinistra',['vicino','davanti','a sinistra','lontano'],'Al prossimo incrocio gira a sinistra.','La preposizione e la direzione formano l’indicazione naturale “a sinistra”.'],
['La farmacia è ___ al supermercato.','accanto',['dritto','accanto','dietro','tra'],'La farmacia è accanto alla banca.','“Accanto” indica una posizione molto vicina e laterale.'],
['Il museo è ___ alla piazza.','davanti',['davanti','dritto','tra','lontano'],'Il teatro è davanti alla piazza.','“Davanti a” indica la posizione nella parte anteriore.'],
['Per arrivare al parco devi ___ il ponte.','attraversare',['girare','attraversare','continuare','passare dietro'],'Per arrivare dall’altra parte devi attraversare il ponte.','“Attraversare” significa passare da un lato all’altro.'],
['Il ristorante è ___ la farmacia e il bar.','tra',['davanti a','tra','dritto','lontano'],'Il cinema è tra la scuola e il museo.','“Tra/fra” indica una posizione compresa fra due luoghi.'],
['Prendi la ___ strada a destra.','prima',['seconda','prima','lontana','davanti'],'Prendi la prima strada a destra dopo il ponte.','“Prima strada” indica il primo ingresso che incontri.'],
['La banca è ___ la posta.','dietro',['dritto','dietro','a sinistra','tra'],'Il parcheggio è dietro la chiesa.','“Dietro” indica una posizione posteriore rispetto a un luogo.'],
['Dopo il semaforo, ___ sempre dritto.','continua',['gira','continua','attraversa','torna'],'Dopo il ponte continua fino alla piazza.','“Continuare” indica che mantieni la stessa direzione.'],
['La stazione è ___ da qui: ci vogliono venti minuti a piedi.','lontana',['vicina','lontana','davanti','accanto'],'Il centro non è lontano da qui.','“Lontano” indica una distanza significativa.'],
['Il bar è ___ della strada, vicino al semaforo.','all’angolo',['dritto','all’angolo','tra','dietro'],'C’è una farmacia all’angolo.','“All’angolo” indica il punto in cui si incontrano due strade.'],
['Per andare al teatro devi ___ davanti alla scuola.','passare',['girare','passare','fermarti','attraversare'],'Per arrivare al cinema devi passare davanti al museo.','“Passare davanti a” descrive un punto che incontri durante il percorso.']
];
function buildComplete(){return repeat100(completeBase.map(x=>({kind:'mc',prompt:x[0],correct:x[1],options:x[2],feedback:feedback(x[4],x[3])})).map(q=>({...q,options:shuffle(q.options)})))}

const intrusoBase=[
[['destra','sinistra','dritto','farmacia'],'farmacia','Le prime tre parole indicano direzioni.','Gira a destra e continua dritto fino alla piazza.'],
[['ponte','semaforo','incrocio','camicia'],'camicia','Le prime tre parole indicano elementi della strada.','Dopo l’incrocio trovi un semaforo.'],
[['stazione','museo','teatro','destra'],'destra','Le prime tre sono luoghi della città.','Il museo è vicino al teatro.'],
[['girare','continuare','attraversare','piazza'],'piazza','Le prime tre sono verbi usati per dare indicazioni.','Attraversa il ponte e continua dritto.'],
[['vicino','lontano','davanti','ristorante'],'ristorante','Le prime tre indicano posizione o distanza.','Il ristorante è vicino alla stazione.'],
[['prima strada','seconda strada','incrocio','maglietta'],'maglietta','Le prime tre riguardano il percorso stradale.','Alla seconda strada gira a sinistra.'],
[['farmacia','supermercato','banca','girare'],'girare','Le prime tre sono luoghi della città.','Dopo il semaforo devi girare a destra.'],
[['accanto a','dietro','tra','ponte'],'ponte','Le prime tre esprimono rapporti di posizione.','Il bar è tra la banca e la posta.'],
[['a destra','a sinistra','dritto','ospedale'],'ospedale','Le prime tre sono indicazioni di direzione.','Vai dritto e poi gira a sinistra.'],
[['piazza','parcheggio','chiesa','continuare'],'continuare','Le prime tre sono luoghi della città.','Continua fino al parcheggio.']
];
function buildIntruso(){return repeat100(intrusoBase.map(x=>({kind:'mc',prompt:'Quale parola non appartiene allo stesso gruppo?',correct:x[1],options:shuffle(x[0]),feedback:feedback(x[2],x[3])})))}

const situationsBase=[
['Sei in una città che non conosci e vuoi sapere dove si trova la stazione. Cosa dici?','Scusi, dov’è la stazione?',['La stazione è dritto.','Scusi, dov’è la stazione?','Vado alla stazione ieri.','La stazione gira a destra.'],'È una richiesta naturale e cortese per chiedere informazioni.','Scusi, sa dirmi dov’è il museo?'],
['Una persona ti chiede come arrivare al museo. Quale risposta è più utile?','Vai dritto fino alla piazza e poi gira a destra.',['Il museo è bello.','Vai dritto fino alla piazza e poi gira a destra.','Io sono al museo ieri.','Il museo costa dieci euro.'],'Una buona indicazione contiene azioni e punti di riferimento.','Per arrivare alla farmacia continua dritto e gira a sinistra al semaforo.'],
['Non hai capito l’indicazione. Cosa puoi chiedere?','Può ripetere, per favore?',['È molto lontano?','Può ripetere, per favore?','Dov’è il mio biglietto?','Mi piace questa strada.'],'Quando non hai capito, chiedere di ripetere è una strategia comunicativa naturale.','Scusi, può parlare un po’ più lentamente?'],
['Vuoi sapere se sei sulla strada giusta per il teatro. Cosa dici?','Sono sulla strada giusta per il teatro?',['Il teatro è elegante?','Sono sulla strada giusta per il teatro?','Il teatro è aperto ieri?','Giro il teatro?'],'La domanda verifica se il percorso che stai seguendo è corretto.','Scusi, per andare alla stazione sto andando nella direzione giusta?'],
['Una turista ti chiede dove si trova la farmacia. La farmacia è accanto alla banca. Cosa dici?','È accanto alla banca.',['È lontana ieri.','È accanto alla banca.','Gira la farmacia.','La banca attraversa la farmacia.'],'La frase comunica in modo semplice la posizione del luogo.','La posta è davanti al supermercato.'],
['Vuoi sapere quanto tempo serve per arrivare a piedi al centro. Cosa chiedi?','Quanto ci vuole a piedi?',['Quanto gira il centro?','Quanto ci vuole a piedi?','Dov’è il piede?','Il centro cammina?'],'È una domanda comune per chiedere la durata di un percorso a piedi.','Quanto ci vuole per arrivare alla stazione?'],
['Devi spiegare che il museo è dall’altra parte del ponte. Cosa dici?','Il museo è dall’altra parte del ponte.',['Il museo gira sul ponte.','Il museo è dall’altra parte del ponte.','Il ponte è nel museo.','Attraversa il museo.'],'La frase indica chiaramente la posizione rispetto al ponte.','La chiesa è dall’altra parte della piazza.'],
['Qualcuno ti chiede di indicare la strada per il supermercato. Il supermercato è sulla sinistra.','Devi andare a sinistra.',['Devi andare a sinistra.','Devi comprare a sinistra.','Il supermercato cammina.','Vai ieri al supermercato.'],'La risposta dà una direzione concreta.','Dopo il semaforo devi girare a destra.'],
['Vuoi chiedere se il luogo è vicino. Cosa dici?','È lontano da qui?',['È lontano da qui?','Dove cammina?','Gira vicino?','È una strada?'],'La domanda serve per capire la distanza del luogo.','La stazione è vicina da qui?'],
['Una persona ti dà troppe indicazioni e vuoi sapere qual è la prima strada da prendere.','Qual è la prima strada che devo prendere?',['Qual è la prima strada che devo prendere?','Dove è la seconda città?','Quale strada mangio?','La strada è davanti ieri.'],'La domanda permette di chiarire il primo passaggio del percorso.','Qual è la seconda strada a destra?']
];
function buildSituations(){return repeat100(situationsBase.map(x=>({kind:'mc',prompt:x[0],correct:x[1],options:shuffle(x[2]),feedback:feedback(x[3],x[4])})))}

const mapBase=[
  {start:{left:35,top:25,dir:'→'},destination:'la farmacia',prompt:'Devi arrivare alla farmacia. Quale indicazione devi seguire?',correct:'Vai sempre dritto',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'La farmacia si trova oltre il prossimo incrocio, sulla stessa strada. Per arrivarci devi continuare nella direzione in cui stai andando.',example:'Continua dritto fino alla farmacia.'},
  {start:{left:60,top:25,dir:'←'},destination:'la farmacia',prompt:'Devi arrivare alla farmacia. Quale indicazione devi seguire?',correct:'Vai sempre dritto',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'La farmacia si trova oltre il prossimo incrocio, sulla stessa strada. Non devi cambiare direzione.',example:'Vai sempre dritto fino alla farmacia.'},
  {start:{left:67,top:36,dir:'↓'},destination:'la farmacia',prompt:'Devi arrivare alla farmacia. Quale indicazione devi seguire?',correct:'Vai sempre dritto',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'La farmacia è direttamente sotto la tua posizione, oltre l’incrocio. Devi continuare dritto.',example:'Continua dritto e troverai la farmacia.'},
  {start:{left:67,top:60,dir:'↑'},destination:'l’ospedale',prompt:'Devi arrivare all’ospedale. Quale indicazione devi seguire?',correct:'Vai sempre dritto',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'L’ospedale si trova direttamente davanti a te sulla stessa strada.',example:'Continua dritto fino all’ospedale.'},
  {start:{left:67,top:36,dir:'↓'},destination:'la piazza',prompt:'Devi arrivare alla piazza. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a sinistra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso il basso. La piazza è sul lato destro della mappa; rispetto alla tua direzione, è a sinistra.',example:'Al prossimo incrocio gira a sinistra verso la piazza.'},
  {start:{left:67,top:60,dir:'↑'},destination:'la piazza',prompt:'Devi arrivare alla piazza. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a destra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso l’alto. La piazza è sul lato destro della mappa; rispetto alla tua direzione, è a destra.',example:'Al prossimo incrocio gira a destra verso la piazza.'},
  {start:{left:67,top:36,dir:'↓'},destination:'la posta',prompt:'Devi arrivare alla posta. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a destra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso il basso. La posta è sul lato sinistro della mappa; rispetto alla tua direzione, è a destra.',example:'Al prossimo incrocio gira a destra verso la posta.'},
  {start:{left:67,top:60,dir:'↑'},destination:'la posta',prompt:'Devi arrivare alla posta. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a sinistra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso l’alto. La posta è sul lato sinistro della mappa; rispetto alla tua direzione, è a sinistra.',example:'Al prossimo incrocio gira a sinistra verso la posta.'},
  {start:{left:35,top:49,dir:'→'},destination:'la farmacia',prompt:'Devi arrivare alla farmacia. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a destra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso destra. La farmacia è sulla strada che scende al prossimo incrocio: per te è una svolta a destra.',example:'Al prossimo incrocio gira a destra e continua fino alla farmacia.'},
  {start:{left:60,top:49,dir:'←'},destination:'la farmacia',prompt:'Devi arrivare alla farmacia. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a sinistra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso sinistra. La farmacia è sulla strada che scende al prossimo incrocio: per te è una svolta a sinistra.',example:'Al prossimo incrocio gira a sinistra verso la farmacia.'},

  {start:{left:70,top:49,dir:'→'},destination:'il ponte',prompt:'Devi arrivare al ponte. Quale indicazione devi seguire?',correct:'Vai sempre dritto',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Il ponte si trova più avanti lungo la stessa strada, nella tua direzione di marcia.',example:'Continua dritto fino al ponte.'},
  {start:{left:82,top:49,dir:'←'},destination:'la biblioteca',prompt:'Devi arrivare alla biblioteca. Quale indicazione devi seguire?',correct:'Vai sempre dritto',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'La biblioteca si trova più avanti lungo la strada che stai percorrendo.',example:'Vai sempre dritto fino alla biblioteca.'},
  {start:{left:82,top:58,dir:'↓'},destination:'la chiesa',prompt:'Devi arrivare alla chiesa. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a sinistra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso il basso. La chiesa è a sinistra della strada; quindi, rispetto alla tua direzione, devi girare a sinistra.',example:'Al prossimo incrocio gira a sinistra verso la chiesa.'},
  {start:{left:82,top:80,dir:'↑'},destination:'la chiesa',prompt:'Devi arrivare alla chiesa. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a destra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso l’alto. La chiesa è a sinistra della strada; rispetto alla tua direzione, quindi, devi girare a destra.',example:'Al prossimo incrocio gira a destra verso la chiesa.'},
  {start:{left:82,top:58,dir:'↓'},destination:'il ponte',prompt:'Devi arrivare al ponte. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a sinistra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso il basso. Il ponte è sul lato destro della mappa; rispetto alla tua direzione, devi girare a sinistra.',example:'Al prossimo incrocio gira a sinistra verso il ponte.'},
  {start:{left:82,top:80,dir:'↑'},destination:'il ponte',prompt:'Devi arrivare al ponte. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a destra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso l’alto. Il ponte è sul lato destro della mappa; rispetto alla tua direzione, devi girare a destra.',example:'Al prossimo incrocio gira a destra verso il ponte.'},
  {start:{left:82,top:58,dir:'↓'},destination:'il parcheggio',prompt:'Devi arrivare al parcheggio. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a destra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso il basso. Il parcheggio è sul lato sinistro della mappa; rispetto alla tua direzione, devi girare a destra.',example:'Al prossimo incrocio gira a destra verso il parcheggio.'},
  {start:{left:82,top:80,dir:'↑'},destination:'il parcheggio',prompt:'Devi arrivare al parcheggio. Quale indicazione devi seguire al prossimo incrocio?',correct:'Gira a sinistra',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Stai andando verso l’alto. Il parcheggio è sul lato sinistro della mappa; rispetto alla tua direzione, devi girare a sinistra.',example:'Al prossimo incrocio gira a sinistra verso il parcheggio.'},
  {start:{left:90,top:49,dir:'←'},destination:'il supermercato',prompt:'Devi arrivare al supermercato. Quale indicazione devi seguire?',correct:'Vai sempre dritto',options:['Gira a destra','Vai sempre dritto','Gira a sinistra','Torna indietro'],why:'Il supermercato si trova più avanti sulla stessa strada, nella tua direzione di marcia.',example:'Continua dritto fino al supermercato.'}
];
function buildMaps(){
  return repeat100(mapBase.map(q=>({kind:'map',...q,options:shuffle(q.options),feedback:feedback(q.why,q.example)})));
}
function makeMixed(){
 const sets=[buildMaps(),buildIntruso(),buildComplete(),buildSituations(),buildFlash()];
 return shuffle(sets.flat()).slice(0,100);
}
const builders={mixed:makeMixed,maps:buildMaps,intruso:buildIntruso,complete:buildComplete,situations:buildSituations,flashcard:buildFlash};
const params=new URLSearchParams(location.search);let type=params.get('type')||'mixed';if(!builders[type])type='mixed';
let all=builders[type]();let session=shuffle(all).slice(0,15),pos=0,score=0,answered=Array(15).fill(null);
$('title').textContent=typeInfo[type][0];$('subtitle').textContent=typeInfo[type][1];$('eyebrow').textContent=typeInfo[type][0];
function updateProgress(){$('progressText').textContent=`${pos+1} / 15`;$('fill').style.width=`${((pos+1)/15)*100}%`;$('prev').disabled=pos===0;$('next').textContent=pos===14?'Fine →':'Avanti →'}
function render(){
 const q=session[pos];$('feedback').className='feedback';$('feedback').innerHTML='';$('content').innerHTML='';$('typeLabel').textContent=typeInfo[type][0];updateProgress();
 if(q.kind==='flash'){const card=document.createElement('div');card.className='flashcard';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Gira la flashcard');card.innerHTML=`<div class="flash-inner"><div class="flash-face flash-front"><div>${q.word}<small>Premi per girare la carta</small></div></div><div class="flash-face flash-back"><div class="uk">${q.uk}</div><div class="example">${q.example}</div></div></div>`;const flip=()=>{card.classList.toggle('flipped');answered[pos]={viewed:true}};card.onclick=flip;card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()}};$('content').appendChild(card);const hint=document.createElement('div');hint.className='flash-hint';hint.textContent='Premi la carta per vedere la traduzione e un esempio.';$('content').appendChild(hint);if(answered[pos])card.classList.add('flipped');return}
 if(q.kind==='map'){
   $('content').innerHTML=`<div class="map-wrap"><div class="map-stage"><img src="mappa-indicazioni.png" alt="Mappa illustrata della città."><div class="start-marker" style="left:${q.start.left}%;top:${q.start.top}%;"><span class="start-dot"></span><span class="start-label">SEI QUI</span><span class="start-arrow">${q.start.dir}</span></div></div><div class="map-caption">La freccia indica la tua direzione di marcia: destra e sinistra si riferiscono sempre a quella direzione.</div></div><div class="route-goal"><strong>Destinazione:</strong> ${q.destination}.</div><div class="question">${q.prompt}</div><div class="answers"></div>`;
 }else{
   const displayPrompt=(type==='situations'?'Що ти зробиш у цій ситуації?':q.prompt);const context=type==='situations'?`<div class="context">(${q.prompt})</div>`:'';$('content').innerHTML=`<div class="question">${displayPrompt}</div>${context}<div class="answers"></div>`;
 }
 const answers=$('content').querySelector('.answers');shuffle(q.options).forEach(opt=>{const b=document.createElement('button');b.className='answer';b.textContent=opt;b.onclick=()=>answer(q,opt,b);answers.appendChild(b)});if(answered[pos])restore(q);
}
function showFlash(q,box,restore=false){box.innerHTML=`<div>${q.word}<small>${q.uk}<br><br><strong>${q.definition}</strong><br><br>${q.example}</small></div>`;if(!restore)answered[pos]={viewed:true};$('feedback').className='feedback';$('feedback').innerHTML=''}
function answer(q,opt,btn){if(answered[pos])return;const ok=opt===q.correct;answered[pos]={ok,correct:q.correct,selected:opt};if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.textContent===q.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');const fb=$('feedback');fb.className='feedback '+(ok?'good':'bad')+' show';fb.innerHTML=`<strong>${ok?'✓ Corretto!':'✗ Non proprio.'}</strong>${ok?'Ottima scelta.':'La risposta corretta è <em>'+q.correct+'</em>.'} ${q.feedback?.why||''}<br><strong>Esempio:</strong> ${q.feedback?.example||''}`}
function restore(q){setTimeout(()=>{const a=answered[pos];document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.textContent===q.correct)b.classList.add('correct');if(a.selected===b.textContent&&!a.ok)b.classList.add('wrong')});const fb=$('feedback');fb.className='feedback '+(a.ok?'good':'bad')+' show';fb.innerHTML=`<strong>${a.ok?'✓ Corretto!':'✗ Non proprio.'}</strong>${a.ok?'Ottima scelta.':'La risposta corretta è <em>'+q.correct+'</em>.'} ${q.feedback?.why||''}<br><strong>Esempio:</strong> ${q.feedback?.example||''}`},0)}
$('prev').onclick=()=>{if(pos>0){pos--;render()}};
$('next').onclick=()=>{if(pos<14){pos++;render()}else{const evaluated=answered.filter(a=>a&&!a.viewed).length;const evaluatedScore=answered.filter(a=>a&&a.ok).length;const message=type==='flashcard'?'Hai completato 15 flashcard.':`Hai risposto correttamente a ${evaluatedScore} / ${evaluated} domande valutate.`;document.querySelector('main').innerHTML=`<section class="session-end show"><h2>Sessione completata!</h2><div class="score">${message}</div><a class="home-btn" href="index.html">Torna al tema</a></section>`}};
render();
