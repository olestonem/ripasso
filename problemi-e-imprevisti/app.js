const S=15;
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
const unique=a=>[...new Set(a)];
const pick=(arr,n=3)=>shuffle(unique(arr)).slice(0,n);
const makeOptions=(correct,pool)=>shuffle([correct,...pick(pool.filter(x=>x!==correct),3)]);
const repeat100=items=>{const out=[];for(let i=0;i<100;i++){const base=items[i%items.length];out.push({...base,id:`${base.id||'q'}-${i}`})}return out};
const fb=(why,example)=>({why,example});

const terms=[
['perdere le chiavi','загубити ключі','Ho perso le chiavi di casa e non posso entrare.','Non avere più con sé le chiavi perché non si sa dove sono.'],
['dimenticare','забути','Ho dimenticato il portafoglio a casa.','Non ricordare di fare o portare qualcosa.'],
['arrivare in ritardo','запізнитися','Scusa, sono arrivato in ritardo.','Arrivare dopo l’orario previsto.'],
['perdere il treno','пропустити поїзд','Sono arrivata tardi e ho perso il treno.','Non riuscire a prendere il treno in tempo.'],
['cancellare un appuntamento','скасувати зустріч / запис','Devo cancellare l’appuntamento di domani.','Annullare un appuntamento già fissato.'],
['spostare un appuntamento','перенести зустріч / запис','Possiamo spostare l’appuntamento a venerdì?','Cambiare giorno o ora di un appuntamento.'],
['avere un problema','мати проблему','Ho un problema con il mio ordine.','Trovarsi in una situazione che richiede una soluzione.'],
['ordine','замовлення','Il mio ordine non è ancora arrivato.','Acquisto richiesto a un negozio o servizio.'],
['consegna','доставка','La consegna è prevista per domani.','Invio di un prodotto all’indirizzo indicato.'],
['ritardo','затримка, запізнення','C’è un ritardo di trenta minuti.','Situazione in cui qualcosa avviene più tardi del previsto.'],
['annullare','скасувати','Vorrei annullare la prenotazione.','Fare in modo che qualcosa non avvenga più.'],
['prenotazione','бронювання','Ho una prenotazione per questa sera.','Richiesta fatta in anticipo per avere un posto o un servizio.'],
['rimandare','відкласти, перенести','Dobbiamo rimandare la riunione.','Spostare qualcosa a un momento successivo.'],
['smarrire','загубити','Ho smarrito il documento.','Perdere qualcosa senza sapere dove si trova.'],
['dimenticarsi di','забути про','Mi sono dimenticata di chiamare Marco.','Non ricordarsi di fare qualcosa.'],
['fare tardi','запізнюватися / затримуватися','Ho fatto tardi e ho perso l’autobus.','Restare oltre il tempo previsto o uscire tardi.'],
['essere in ritardo','запізнюватися','Il treno è in ritardo.','Essere oltre l’orario previsto.'],
['perdere l’autobus','пропустити автобус','Ho perso l’autobus per un minuto.','Non riuscire a prendere l’autobus in tempo.'],
['non trovare','не знайти','Non trovo più il telefono.','Cercare qualcosa senza riuscire a individuarla.'],
['lasciare a casa','залишити вдома','Ho lasciato il documento a casa.','Non portare con sé qualcosa perché è rimasto a casa.'],
['controllare l’ordine','перевірити замовлення','Può controllare il mio ordine?','Verificare lo stato o i dati di un acquisto.'],
['rimborso','повернення коштів','Vorrei chiedere un rimborso.','Somma di denaro restituita dopo un acquisto o un problema.'],
['sostituzione','заміна','Vorrei chiedere la sostituzione del prodotto.','Cambio di un prodotto con un altro.'],
['prodotto danneggiato','пошкоджений товар','Il prodotto è arrivato danneggiato.','Prodotto che ha subito un danno.'],
['ordine incompleto','неповне замовлення','Nel pacco manca un prodotto: l’ordine è incompleto.','Ordine in cui manca uno o più articoli.'],
['indirizzo sbagliato','неправильна адреса','Ho inserito l’indirizzo sbagliato.','Indirizzo non corretto usato per una consegna.'],
['confermare','підтвердити','Può confermare il nuovo appuntamento?','Comunicare che una data, un’informazione o una scelta è corretta.'],
['avvisare','повідомити, попередити','Ti avviso se arrivo in ritardo.','Informare qualcuno di una situazione.'],
['avere fretta','поспішати','Ho fretta: devo prendere il treno.','Avere poco tempo a disposizione.'],
['essere bloccato','бути затриманим / застрягти','Sono bloccato nel traffico.','Non poter proseguire o arrivare come previsto.'],
['chiedere aiuto','попросити допомоги','Ho perso le chiavi e devo chiedere aiuto.','Domandare a qualcuno di aiutare a risolvere un problema.'],
['risolvere un problema','вирішити проблему','Proviamo a risolvere il problema insieme.','Trovare una soluzione a una difficoltà.']
];
const words=terms.map(x=>x[0]);
const uk=terms.map(x=>x[1]);
const termMap=new Map(terms.map(x=>[x[0],x]));

function buildGuess(){
 return repeat100(terms.map((x,i)=>({id:`g${i}`,prompt:x[3],correct:x[0],options:makeOptions(x[0],words),f:fb(`La parola corretta è “${x[0]}”.`,x[2])})));
}
function buildMeaning(){
 return repeat100(terms.map((x,i)=>({id:`m${i}`,prompt:`“${x[0]}”`,correct:x[1],options:makeOptions(x[1],uk),f:fb(`Il significato è “${x[1]}”.`,x[2])})));
}

const complete=[
['Scusa, sono arrivato ___ perché il bus era in ritardo.','in ritardo',['in ritardo','a casa','in anticipo','a piedi']],
['Ho ___ le chiavi e non posso entrare.','perso',['perso','spostato','confermato','annullato']],
['Mi sono ___ di portare il documento.','dimenticata',['dimenticata','arrivata','fermata','annullata']],
['A causa del ritardo ho ___ il treno.','perso',['perso','cancellato','spostato','confermato']],
['Devo ___ l’appuntamento di domani: non posso venire.','cancellare',['cancellare','controllare','consegnare','ricordare']],
['Possiamo ___ l’appuntamento a lunedì?','spostare',['spostare','perdere','lasciare','smarrire']],
['Il mio ___ non è ancora arrivato.','ordine',['ordine','ritardo','rimborso','indirizzo']],
['La ___ è prevista per venerdì.','consegna',['consegna','prenotazione','sostituzione','fretta']],
['Il prodotto è arrivato ___.','danneggiato',['danneggiato','disponibile','puntuale','confermato']],
['Nel pacco manca un articolo: l’ordine è ___.','incompleto',['incompleto','puntuale','urgente','disponibile']],
['Ho inserito l’___ sbagliato durante l’acquisto.','indirizzo',['indirizzo','appuntamento','rimborso','ritardo']],
['Vorrei chiedere un ___ perché il prodotto è difettoso.','rimborso',['rimborso','ritardo','appuntamento','indirizzo']],
['Vorrei chiedere la ___ del prodotto danneggiato.','sostituzione',['sostituzione','consegna','prenotazione','fretta']],
['Può ___ il mio ordine, per favore?','controllare',['controllare','annullare','perdere','dimenticare']],
['Ti ___ se arrivo in ritardo.','avviso',['avviso','sposto','smarrisco','cancello']],
['Ho ___: devo prendere il treno tra cinque minuti.','fretta',['fretta','ritardo','rimborso','consegna']],
['Sono ___ nel traffico e arriverò tardi.','bloccato',['bloccato','confermato','incompleto','danneggiato']],
['Ho perso le chiavi: devo ___ aiuto.','chiedere',['chiedere','cancellare','spostare','consegnare']],
['Proviamo a ___ il problema insieme.','risolvere',['risolvere','perdere','annullare','rimandare']],
['Dobbiamo ___ la riunione a domani.','rimandare',['rimandare','smarrire','controllare','avvisare']]
];
function buildComplete(){return repeat100(complete.map((x,i)=>({id:`c${i}`,prompt:x[0],correct:x[1],options:shuffle(x[2]),f:fb(`La forma corretta è “${x[1]}”.`,`Esempio: ${x[0].replace('___',x[1])}`)})));}

const descriptions=[
['Hai perso le chiavi. Cosa puoi dire?','Non trovo più le chiavi.',['Non trovo più le chiavi.','Ho confermato le chiavi.','La consegna è puntuale.','Il treno è arrivato.']],
['Hai dimenticato il portafoglio a casa.','Ho lasciato il portafoglio a casa.',['Ho lasciato il portafoglio a casa.','Ho perso il treno.','Ho confermato l’ordine.','Ho spostato la consegna.']],
['Sei arrivato dopo l’orario previsto.','Sono arrivato in ritardo.',['Sono arrivato in ritardo.','Sono arrivato in anticipo.','Ho chiesto un rimborso.','Ho annullato il prodotto.']],
['Non hai fatto in tempo a prendere il treno.','Ho perso il treno.',['Ho perso il treno.','Ho controllato il treno.','Ho confermato il treno.','Ho prenotato il ritardo.']],
['Non puoi più andare all’appuntamento fissato.','Devo cancellare l’appuntamento.',['Devo cancellare l’appuntamento.','Devo confermare l’appuntamento.','Devo consegnare l’appuntamento.','Devo controllare l’appuntamento.']],
['Vuoi cambiare il giorno dell’appuntamento.','Vorrei spostare l’appuntamento.',['Vorrei spostare l’appuntamento.','Vorrei perdere l’appuntamento.','Vorrei smarrire l’appuntamento.','Vorrei consegnare l’appuntamento.']],
['Il pacco è arrivato con un articolo rotto.','Il prodotto è arrivato danneggiato.',['Il prodotto è arrivato danneggiato.','Il prodotto è arrivato in anticipo.','Il prodotto è arrivato confermato.','Il prodotto è arrivato puntuale.']],
['Nel pacco manca un articolo.','L’ordine è incompleto.',['L’ordine è incompleto.','L’ordine è puntuale.','L’ordine è disponibile.','L’ordine è confermato.']],
['Hai pagato ma vuoi riavere i soldi.','Vorrei chiedere un rimborso.',['Vorrei chiedere un rimborso.','Vorrei chiedere un ritardo.','Vorrei chiedere un indirizzo.','Vorrei chiedere una consegna.']],
['Hai inserito male l’indirizzo di consegna.','Ho inserito l’indirizzo sbagliato.',['Ho inserito l’indirizzo sbagliato.','Ho inserito il rimborso giusto.','Ho inserito la consegna puntuale.','Ho inserito il treno corretto.']],
['Non puoi muoverti perché c’è molto traffico.','Sono bloccato nel traffico.',['Sono bloccato nel traffico.','Sono puntuale nel traffico.','Sono confermato nel traffico.','Sono consegnato nel traffico.']],
['Hai poco tempo prima della partenza.','Ho fretta.',['Ho fretta.','Ho un rimborso.','Ho una sostituzione.','Ho una consegna.']]
];
function buildDescription(){return repeat100(descriptions.map((x,i)=>({id:`d${i}`,prompt:x[0],correct:x[1],options:shuffle(x[2]),f:fb(`La frase adatta è “${x[1]}”.`,x[1])})))}

const role=[
['Hai perso le chiavi di casa e non puoi entrare. Cosa dici a un vicino?','Scusa, ho perso le chiavi. Posso chiamare qualcuno da qui?',['Il mio ordine è incompleto.','Vorrei confermare la consegna.','Ho spostato il treno.']],
['Devi avvisare un collega che arriverai tardi.','Scusami, sono in ritardo. Ti avviso appena arrivo.',['Vorrei un rimborso per il traffico.','La consegna è danneggiata.','Ho perso l’appuntamento con il pacco.']],
['Hai perso il treno e devi chiedere informazioni alla stazione.','Mi scusi, ho perso il treno. Quando parte il prossimo?',['Mi scusi, posso spostare il pacco?','Vorrei cancellare il binario.','Il mio indirizzo è danneggiato.']],
['Devi cancellare un appuntamento.','Buongiorno, vorrei cancellare l’appuntamento di domani.',['Buongiorno, vorrei consegnare l’appuntamento.','Ho perso il rimborso.','Il treno è incompleto.']],
['Il tuo ordine è arrivato danneggiato. Contatti il servizio clienti.','Buongiorno, il prodotto è arrivato danneggiato. Vorrei una soluzione.',['Buongiorno, ho perso il treno del prodotto.','Vorrei spostare l’indirizzo a casa.','Il mio appuntamento è incompleto.']],
['Manca un articolo nel pacco.','Nel mio ordine manca un prodotto. Potete controllare, per favore?',['Ho perso un appuntamento nel pacco.','Vorrei cancellare il traffico.','Il prodotto è arrivato in anticipo.']],
['Hai inserito l’indirizzo sbagliato.','Mi sono accorto di aver inserito l’indirizzo sbagliato. Posso modificarlo?',['Ho perso l’indirizzo nel treno.','Vorrei confermare il ritardo.','La consegna è un appuntamento.']],
['Devi spostare un appuntamento a un altro giorno.','Avrei bisogno di spostare l’appuntamento a venerdì.',['Vorrei perdere l’appuntamento a venerdì.','Il prodotto è arrivato in ritardo.','Ho cancellato il rimborso.']]
];
function buildRole(){return repeat100(role.map((x,i)=>({id:`r${i}`,prompt:x[0],correct:x[1],options:shuffle([x[1],...x[2]]),f:fb('Questa formula gestisce la situazione in modo naturale e cortese.',x[1])})))}

const situations=[
['Hai perso le chiavi e devi entrare in casa. Cosa fai?',['Chiedo aiuto a un familiare o a un vicino.','Confermo la consegna.','Chiedo un rimborso al treno.','Sposto l’ordine.'],0],
['Hai dimenticato un documento importante a casa prima di un appuntamento. Cosa fai?',['Avviso la persona e chiedo se posso portarlo più tardi.','Fingo di averlo con me.','Confermo il ritardo del prodotto.','Cancello il traffico.'],0],
['Sei in ritardo per un appuntamento. Cosa fai?',['Avviso la persona appena possibile.','Non dico nulla.','Chiedo un rimborso.','Controllo il pacco.'],0],
['Hai perso il treno. Cosa fai?',['Controllo il prossimo treno e chiedo informazioni.','Confermo la consegna del pacco.','Sposto l’indirizzo.','Chiedo un rimborso al semaforo.'],0],
['Non puoi andare a un appuntamento già fissato. Cosa fai?',['Lo cancello o chiedo di spostarlo.','Aspetto senza avvisare.','Confermo che andrò comunque.','Cambio il prodotto.'],0],
['Il tuo ordine non è arrivato nel giorno previsto. Cosa fai?',['Controllo lo stato della consegna e contatto il servizio clienti se serve.','Cancello il traffico.','Perdo l’appuntamento.','Lascio le chiavi al corriere.'],0],
['Nel pacco manca un articolo. Cosa fai?',['Contatto il venditore e segnalo che l’ordine è incompleto.','Confermo che è tutto perfetto.','Sposto il treno.','Dimentico l’indirizzo.'],0],
['Il prodotto ricevuto è danneggiato. Cosa chiedi?',['Una sostituzione o un rimborso.','Un nuovo appuntamento dal dentista.','Un biglietto del treno.','Una chiave di casa.'],0],
['Hai inserito un indirizzo sbagliato nell’ordine. Cosa fai?',['Contatto subito il venditore per correggerlo, se possibile.','Aspetto la consegna senza dire nulla.','Cancello il treno.','Confermo l’indirizzo sbagliato.'],0],
['Sei bloccato nel traffico e arriverai tardi. Cosa fai?',['Avviso che sono in ritardo.','Spengo il telefono e non avviso nessuno.','Chiedo un rimborso per l’appuntamento.','Confermo la consegna.'],0]
];
function buildSituations(){return repeat100(situations.map((x,i)=>({id:`s${i}`,prompt:x[0],correct:x[1][0],options:shuffle(x[1]),f:fb('La scelta più utile affronta direttamente il problema e comunica la situazione.',x[1][0])})))}

const intruso=[
['perso','smarrito','dimenticato','confermato'],['ritardo','in ritardo','fare tardi','rimborso'],['ordine','consegna','prodotto','appuntamento'],['cancellare','annullare','disdire','confermare'],['spostare','rimandare','rinviare','danneggiato'],['rimborso','sostituzione','prodotto','chiavi'],['indirizzo','consegna','ordine','treno'],['appuntamento','prenotazione','riunione','portafoglio'],['chiavi','portafoglio','documento','ritardo'],['avvisare','informare','comunicare','perdere']
];
function buildIntruso(){return repeat100(intruso.map((x,i)=>{const groups=x.slice(0,3);const correct=x[3];return {id:`i${i}`,prompt:`Trova l’intruso: quale parola non appartiene al gruppo?`,correct,options:shuffle(x),f:fb(`“${correct}” è l’intruso perché non appartiene allo stesso gruppo semantico.`,`Esempio: ${correct} ha un significato diverso dalle altre tre parole.`)}}));}

const tf=[
['“Perdere il treno” significa non riuscire a prenderlo in tempo.',true],
['“Cancellare un appuntamento” significa spostarlo a un altro giorno.',false],
['Se sei arrivato dopo l’orario previsto, puoi dire “Sono arrivato in ritardo”.',true],
['Un “rimborso” è un nuovo appuntamento.',false],
['Se un ordine è “incompleto”, manca almeno un articolo.',true],
['“Spostare un appuntamento” significa cambiare giorno o ora.',true],
['Se un prodotto è “danneggiato”, è arrivato senza nessun problema.',false],
['“Avvisare” significa informare qualcuno di una situazione.',true],
['Se hai dimenticato qualcosa a casa, puoi dire “L’ho lasciato a casa”.',true],
['“Perdere le chiavi” significa sapere esattamente dove sono.',false],
['Un indirizzo sbagliato può creare un problema con una consegna.',true],
['“Rimandare” può significare spostare qualcosa a un momento successivo.',true]
];
function buildTF(){return repeat100(tf.map((x,i)=>({id:`t${i}`,prompt:x[0],correct:x[1]?'Vero':'Falso',options:['Vero','Falso'],f:fb(x[1]?'La frase è corretta.':'La frase non è corretta.',x[1]?'Esempio: “Ho perso il treno e devo prendere il prossimo.”':'Esempio corretto: “Cancellare” significa annullare, mentre “spostare” significa cambiare data o ora.')})))}

const flash=terms.map(x=>({id:`f-${x[0]}`,prompt:x[0],uk:x[1],definition:x[3],example:x[2]}));
function buildFlash(){return repeat100(flash);}

const builders={mixed:()=>shuffle([...buildGuess(),...buildMeaning(),...buildComplete(),...buildDescription(),...buildRole(),...buildSituations(),...buildIntruso(),...buildTF()]),guess:buildGuess,meaning:buildMeaning,complete:buildComplete,description:buildDescription,roleplay:buildRole,situations:buildSituations,intruso:buildIntruso,truefalse:buildTF,flashcard:buildFlash};
const titles={mixed:'Quiz misto',guess:'Indovina la parola',meaning:'Che cosa significa?',complete:'Completa la frase',description:'Completa la descrizione',roleplay:'Giochi di ruolo',situations:'Situazioni da risolvere',intruso:'Trova l’intruso',truefalse:'Vero o falso?',flashcard:'Flashcard'};
const typeNames={guess:'INDOVINA LA PAROLA',meaning:'CHE COSA SIGNIFICA?',complete:'COMPLETA LA FRASE',description:'COMPLETA LA DESCRIZIONE',roleplay:'GIOCHI DI RUOLO',situations:'SITUAZIONI DA RISOLVERE',intruso:'TROVA L’INTRUSO',truefalse:'VERO O FALSO?',flashcard:'FLASHCARD',mixed:'QUIZ MISTO'};

const params=new URLSearchParams(location.search);let type=params.get('type')||'mixed';if(!builders[type])type='mixed';
let pool=shuffle(builders[type]());
// Build a session from 15 distinct generated cards. For every new activity load, the pool is reshuffled.
let session=pool.slice(0,S);
let index=0,score=0,answered=false;
const titleEl=document.getElementById('title'), subtitle=document.getElementById('subtitle'), typeLabel=document.getElementById('typeLabel'), content=document.getElementById('content'), feedback=document.getElementById('feedback'), prev=document.getElementById('prev'), next=document.getElementById('next'), progressText=document.getElementById('progressText'), fill=document.getElementById('fill'), card=document.getElementById('card'), end=document.getElementById('end'), scoreEl=document.getElementById('score');
titleEl.textContent=titles[type];document.getElementById('eyebrow').textContent= type==='mixed'?'🎯 ESPRESSIONI E IMPREVISTI':'⚠️ '+(typeNames[type]||'ATTIVITÀ');

function setFeedback(ok,item){feedback.className='feedback show '+(ok?'good':'bad');feedback.innerHTML=`<strong>${ok?'✓ Risposta corretta':'× Non è la risposta corretta'}</strong><div>${item.f.why}</div><div>Esempio reale: <em>${item.f.example}</em></div>`;}
function renderFlash(item){content.innerHTML=`<div class="flashcard" tabindex="0"><div class="flash-inner"><div class="flash-face flash-front">“${item.prompt}”</div><div class="flash-face flash-back"><div class="uk">${item.uk}</div><div class="definition">${item.definition}</div><div class="example">${item.example}</div></div></div></div>`;const f=content.querySelector('.flashcard');f.addEventListener('click',()=>f.classList.toggle('flipped'));f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.classList.toggle('flipped')}});}
function render(){answered=false;feedback.className='feedback';feedback.innerHTML='';next.disabled=true;prev.disabled=index===0;progressText.textContent=`${index+1} / ${S}`;fill.style.width=`${((index+1)/S)*100}%`;const item=session[index];typeLabel.textContent=typeNames[type];
 if(type==='flashcard'){renderFlash(item);subtitle.textContent='Una carta alla volta.';next.disabled=false;return;}
 subtitle.textContent='Una domanda alla volta.';
 content.innerHTML=`<div class="question">${item.prompt}</div><div class="answers">${item.options.map((o,i)=>`<button class="answer" data-i="${i}" type="button">${o}</button>`).join('')}</div>`;
 content.querySelectorAll('.answer').forEach((b,i)=>b.addEventListener('click',()=>answer(i,item)));
}
function answer(i,item){if(answered)return;answered=true;const buttons=[...content.querySelectorAll('.answer')];const ok=buttons[i].textContent===item.correct;buttons[i].classList.add(ok?'correct':'wrong');if(!ok){buttons.find(b=>b.textContent===item.correct)?.classList.add('correct')}if(ok)score++;buttons.forEach(b=>b.disabled=true);setFeedback(ok,item);next.disabled=false;}
prev.addEventListener('click',()=>{if(index>0){index--;render()}});next.addEventListener('click',()=>{if(index<S-1){index++;render()}else{card.style.display='none';end.classList.add('show');scoreEl.textContent=`Hai completato la sessione: ${score} / ${S}`}});
render();
