const N=100,S=15;const $=s=>document.querySelector(s);const esc=s=>String(s).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const words=[
['vacanza','відпустка','Un periodo in cui non lavori o studi e viaggi o riposi.','Durante le vacanze sono andata al mare.'],['viaggio','подорож','Spostamento verso un altro luogo, spesso per vacanza.','Il viaggio è durato cinque ore.'],['ricordo','спогад','Qualcosa che conservi nella memoria dal passato.','Ho un bellissimo ricordo di quel giorno.'],['incontro','зустріч','Momento in cui conosci o vedi una persona.','Durante il viaggio ho avuto un incontro interessante.'],['esperienza','досвід / пережитий досвід','Qualcosa che hai vissuto e che ti ha lasciato un ricordo.','È stata un’esperienza indimenticabile.'],['avventura','пригода','Esperienza insolita, spesso piena di imprevisti.','La nostra escursione è stata una vera avventura.'],['sorpresa','сюрприз','Qualcosa che non ti aspettavi.','La festa è stata una bellissima sorpresa.'],['episodio','епізод / випадок','Un fatto particolare avvenuto in una situazione più ampia.','Ti racconto un episodio divertente.'],['giornata','день','L’insieme delle attività e degli eventi di un giorno.','È stata una giornata molto intensa.'],['prima volta','перший раз','La prima occasione in cui fai o vivi qualcosa.','Era la prima volta che visitavo Roma.'],['partire','вирушати','Andare via da un luogo per iniziare un viaggio.','Siamo partiti alle sei.'],['arrivare','прибути','Raggiungere il luogo di destinazione.','Siamo arrivati tardi in albergo.'],['conoscere','познайомитися / знати','Incontrare una persona per la prima volta.','Ho conosciuto una ragazza italiana.'],['perdersi','заблукати','Non sapere più dove ci si trova.','Ci siamo persi nel centro storico.'],['divertirsi','розважатися','Passare un momento piacevole e divertirsi.','Ci siamo divertiti moltissimo.'],['rilassarsi','розслабитися','Stare tranquilli e riposarsi.','In vacanza mi sono rilassata molto.'],['succedere','статися','Accadere, verificarsi.','Che cosa è successo ieri?'],['scoprire','відкрити / дізнатися','Conoscere qualcosa di nuovo o inatteso.','Abbiamo scoperto un piccolo paese.'],['ricordarsi','пам’ятати','Avere nella memoria una persona o un fatto.','Mi ricordo ancora quella sera.'],['raccontare','розповідати','Descrivere a qualcuno qualcosa che è successo.','Ti racconto cosa è successo.']];
const pp=[['Ieri ___ al museo con mia sorella.','sono andata','andavo','sono andato','andavo'],['Quando ero piccolo, ogni estate ___ al mare.','andavo','sono andato','sono andata','andai'],['Mentre ___ la cena, mi ha telefonato Luca.','preparavo','ho preparato','preparai','sono preparato'],['Sabato scorso ___ un vecchio amico.','ho incontrato','incontravo','incontrai','sono incontravo'],['Da bambino ___ spesso dai nonni.','andavo','sono andato','sono andata','andai'],['A un certo punto ___ a piovere.','ha iniziato','iniziava','aveva iniziato','iniziò'],['Mentre ___ per strada, ho visto una persona conosciuta.','camminavo','ho camminato','camminai','sono camminato'],['L’anno scorso ___ a Napoli per la prima volta.','sono stato','ero','stavo','andavo'],['Quando siamo arrivati, la festa ___.','era già iniziata','è già iniziata','iniziava già','ha iniziato già'],['Ieri sera ___ molto stanco, quindi sono andato a letto presto.','ero','sono stato','stavo stato','avevo']];

pp.push(['Quando sono arrivato, tutti ___ già a cena.','erano','sono stati','sono','hanno avuto']);
pp.push(['Ieri mattina ___ presto perché avevo un appuntamento.','mi sono alzato','mi alzavo','mi alzai','ero alzato']);
pp.push(['Mentre ___ il centro, ho trovato un piccolo ristorante.','visitavo','ho visitato','visitai','sono visitato']);
pp.push(['Ogni volta che andavo in quella città, ___ lo stesso bar.','visitavo','ho visitato','visitai','sono visitato']);
pp.push(['A un certo punto ___ un rumore fortissimo.','ho sentito','sentivo','sentii sempre','ero sentito']);
pp.push(['Da ragazza ___ molte lettere ai miei amici.','scrivevo','ho scritto','scrissi una volta','sono scritto']);
pp.push(['La settimana scorsa ___ una foto che non vedevo da anni.','ho trovato','trovavo','trovai sempre','ero trovato']);
pp.push(['Quando vivevo a Roma, ___ spesso a piedi.','andavo','sono andato','andai ieri','ho andato']);
pp.push(['Ieri sera ___ una cena speciale per il mio compleanno.','abbiamo organizzato','organizzavamo','organizzavamo ieri ogni sera','eravamo organizzato']);
pp.push(['Mentre gli altri parlavano, io ___ appunti.','prendevo','ho preso sempre','presi ogni giorno','sono preso']);
const contexts=[['Durante il viaggio abbiamo sbagliato strada e non sapevamo più dove eravamo.','ci siamo persi'],['Quando ero piccolo passavo ogni estate una settimana al mare.','passavo'],['Appena siamo arrivati in hotel, abbiamo lasciato le valigie.','siamo arrivati'],['Mentre visitavo il museo, ho incontrato una mia ex compagna di scuola.','visitavo'],['All’improvviso ha iniziato a piovere e siamo tornati in albergo.','ha iniziato'],['Era la prima volta che prendevo un aereo.','era'],['Ieri ho conosciuto una persona molto interessante durante la cena.','ho conosciuto'],['Ogni domenica andavamo a pranzo dai nonni.','andavamo'],['Quella sera eravamo stanchi ma molto felici.','eravamo'],['Dopo il viaggio ho raccontato tutto ai miei amici.','ho raccontato']];
const roles=[['Un amico ti chiede com’è stata la tua ultima vacanza.','Racconta dove sei andato, con chi eri e una cosa speciale che è successa.'],['Conosci una persona nuova e vuoi raccontarle il tuo primo giorno in Italia.','Descrivi come ti sentivi, cosa facevi e cosa è successo.'],['Un collega ti chiede di raccontare un viaggio andato male.','Racconta almeno un imprevisto e come lo hai risolto.'],['Un amico vuole sapere qual è stato un incontro indimenticabile.','Racconta chi hai incontrato e cosa è successo.'],['Parli con qualcuno dei tuoi ricordi d’infanzia.','Descrivi una tua abitudine e racconta un episodio preciso.'],['Hai visitato una città per la prima volta.','Racconta cosa ti aspettavi, cosa hai visto e cosa ti ha sorpreso.'],['Devi raccontare una giornata particolarmente divertente.','Descrivi il contesto e poi racconta gli eventi principali.'],['Hai avuto una brutta esperienza durante una vacanza.','Racconta cosa stava succedendo quando è comparso il problema.']];
const situations=[['Un amico ti chiede: “Com’era la città quando sei arrivato?” Quale risposta funziona meglio?',['Era molto tranquilla e faceva caldo.','È stata molto tranquilla e ha fatto caldo.','Sono molto tranquillo e faceva caldo.','Era molto tranquilla e ho fatto caldo.'],'Era molto tranquilla e faceva caldo.'],['Vuoi raccontare un evento preciso successo ieri.',['Ieri ho perso il treno.','Ieri perdevo il treno ogni volta.','Ieri ero perso il treno.','Ieri perdevo il treno una volta.'],'Ieri ho perso il treno.'],['Racconti un’abitudine durante le vacanze da bambino.',['Ogni estate andavamo al mare.','Ogni estate siamo andati al mare una volta.','Ogni estate siamo andati al mare ieri.','Ogni estate andremo al mare.'],'Ogni estate andavamo al mare.'],['Racconti cosa stava succedendo quando è arrivata una telefonata.',['Mentre cenavo, mi ha telefonato Anna.','Mentre ho cenato, mi telefonavo Anna.','Mentre cenavo, telefonavo Anna.','Mentre ho cenato, mi ha telefonato Anna ogni giorno.'],'Mentre cenavo, mi ha telefonato Anna.'],['Vuoi raccontare il tuo primo giorno in una nuova città.',['Il primo giorno ero molto emozionato e ho conosciuto due persone.','Il primo giorno sono molto emozionato e conosco due persone.','Il primo giorno ero molto emozionato e conoscevo due persone ieri.','Il primo giorno sarò molto emozionato.'],'Il primo giorno ero molto emozionato e ho conosciuto due persone.']];
function opts(correct,pool){return shuffle([correct,...shuffle(pool.filter(x=>x!==correct)).slice(0,3)])}
function make(type){let arr=[];for(let i=0;i<N;i++){if(type==='guess'){let w=words[i%words.length];arr.push({q:w[2],a:w[0],o:opts(w[0],words.map(x=>x[0])) ,ex:w[3]});}else if(type==='passato'){let x=pp[i%pp.length];arr.push({q:x[0],a:x[1],o:opts(x[1],x.slice(2)),ex:`La scelta dipende dal contesto: ${x[1]} indica l’azione o la situazione corretta.`});}else if(type==='situations'){let x=situations[i%situations.length];arr.push({q:x[0],a:x[2],o:opts(x[2],x[1]),ex:x[2]});}else if(type==='complete'){let x=pp[i%pp.length];arr.push({q:x[0].replace('___','_____'),a:x[1],o:opts(x[1],x.slice(2)),ex:x[0].replace('___',x[1])});}else if(type==='intruso'){let sets=[['partire','arrivare','conoscere','valigia'],['ricordo','esperienza','avventura','biglietto'],['mare','museo','montagna','ritardo'],['incontro','sorpresa','episodio','prenotazione'],['raccontare','ricordarsi','scoprire','stazione']];let s=sets[i%sets.length];let bad=s[s.length-1];arr.push({q:'Quale parola è l’intrusa?',a:bad,o:shuffle(s),ex:`“${bad}” appartiene a un altro campo semantico.`});}else if(type==='role'){let x=roles[i%roles.length];let roleOpts=['Racconta il luogo, il momento e cosa è successo.','Parla solo del futuro e dei tuoi programmi.','Descrivi una persona senza raccontare eventi.','Dai una definizione grammaticale del passato.'];arr.push({q:x[0]+' '+x[1],a:roleOpts[0],o:shuffle(roleOpts),ex:'Per raccontare un’esperienza, combina descrizione del contesto e azioni/eventi.'});}else if(type==='situations2'){let x=situations[i%situations.length];arr.push({q:x[0],a:x[2],o:opts(x[2],x[1]),ex:x[2]});}else{let w=words[i%words.length];arr.push({q:w[0],a:w[2],o:[w[2]],ex:w[3]});}}return shuffle(arr).slice(0,N)}
let type=new URLSearchParams(location.search).get('type')||'mixed',bank=[];
const titles={mixed:'Quiz misto',guess:'Indovina la parola',intruso:'Trova l’intruso',complete:'Completa la frase',role:'Giochi di ruolo',situations:'Situazioni da risolvere',passato:'Passato prossimo o imperfetto?',flash:'Flashcard'};
const labels={mixed:'QUIZ MISTO',guess:'INDOVINA LA PAROLA',intruso:'TROVA L’INTRUSO',complete:'COMPLETA LA FRASE',role:'GIOCHI DI RUOLO',situations:'SITUAZIONI DA RISOLVERE',passato:'PASSATO PROSSIMO O IMPERFETTO?',flash:'FLASHCARD'};
let title=titles[type]||'Quiz misto';
let mode=type==='flash'?'flash':type;
bank=make(mode==='mixed'?'passato':mode);
if(type==='mixed') bank=shuffle([...make('guess').slice(0,35),...make('passato').slice(0,35),...make('situations').slice(0,30)]).slice(0,N);
let i=0,score=0,answered=false;
function setBase(){
  $('#activityBadge').textContent=title;
  $('#activityTitle').textContent=title;
  $('#activityIntro').textContent=type==='flash'?'Clicca sulla carta per girarla.':'Una domanda alla volta.';
  $('#panelLabel').textContent=labels[type]||'ATTIVITÀ';
}
function render(){
  setBase();
  if(i>=S){
    $('#prompt').textContent='Attività completata.';
    $('#content').innerHTML='';
    $('#feedback').className='feedback show';
    $('#feedback').innerHTML=`<strong>✓ Fine</strong><div>Hai risposto correttamente a ${score} domande su ${S}.</div>`;
    $('#prevBtn').disabled=false;
    $('#nextBtn').textContent='Torna al tema →';
    $('#nextBtn').onclick=()=>location.href='index.html';
    return;
  }
  answered=false;
  const x=bank[i];
  $('#progressLabel').textContent=`${i+1}/15`;
  $('#progressBar').style.width=((i+1)/S*100)+'%';
  $('#feedback').className='feedback';$('#feedback').innerHTML='';
  $('#prevBtn').disabled=i===0;
  $('#nextBtn').textContent='Avanti →';$('#nextBtn').onclick=next;
  if(type==='flash'){
    $('#prompt').textContent='';
    const w=words.find(z=>z[0]===x.q);
    const wrap=document.createElement('div');wrap.className='flashcard';
    const inner=document.createElement('div');inner.className='flash-inner';
    const front=document.createElement('div');front.className='face front';front.innerHTML=`<div class="term">${esc(x.q)}</div>`;
    const back=document.createElement('div');back.className='face back';back.innerHTML=`<div class="ua">${esc(w?.[1]||'')}</div><div class="expl">${esc(w?.[2]||'')}<br><br><b>Esempio:</b> ${esc(x.ex)}</div>`;
    inner.append(front,back);wrap.appendChild(inner);$('#content').appendChild(wrap);wrap.onclick=()=>wrap.classList.toggle('flipped');
    $('#nextBtn').disabled=false;
    return;
  }
  $('#nextBtn').disabled=true;
  $('#prompt').textContent=x.q;
  const box=document.createElement('div');box.className='options';
  shuffle(x.o).forEach(o=>{const b=document.createElement('button');b.className='option';b.textContent=o;b.onclick=()=>answer(b,x);box.appendChild(b)});
  $('#content').appendChild(box);
}
function answer(btn,x){
  if(answered)return; answered=true;
  const correct=btn.textContent===x.a;
  if(correct)score++;
  document.querySelectorAll('#content .option').forEach(b=>{b.disabled=true;if(b.textContent===x.a)b.classList.add('correct');if(b===btn&&!correct)b.classList.add('wrong')});
  $('#feedback').className='feedback show';
  $('#feedback').innerHTML=`<strong>${correct?'✓ Corretto':'✗ Non corretto'}</strong><div>${correct?'La risposta scelta è adatta al contesto.':'La risposta corretta è «'+esc(x.a)+'».'}</div><div class="example"><b>Esempio:</b> ${esc(x.ex)}</div>`;
  $('#nextBtn').disabled=false;
}
function prev(){if(i>0){i--;render()}}
function next(){if(i<S-1){i++;render()}else{ i=S; render(); }}
render();
