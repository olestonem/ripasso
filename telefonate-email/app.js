const S=15;
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
const unique=a=>[...new Set(a)];
const pick=(arr,n=3)=>shuffle(unique(arr)).slice(0,n);
const makeOptions=(correct, pool)=>shuffle([correct,...pick(pool.filter(x=>x!==correct),3)]);
const feedback=(why,example)=>({why,example});
const repeat100=items=>{const out=[];for(let i=0;i<100;i++)out.push(items[i%items.length]);return out};

const terms=[
['appuntamento','зустріч, прийом','Hai un appuntamento alle dieci?','Un incontro fissato per un giorno e un’ora precisi.'],
['ufficio','офіс, установа','Devo telefonare all’ufficio informazioni.','Luogo o servizio in cui si svolge un’attività amministrativa o professionale.'],
['segreteria','секретаріат, автовідповідач','Può lasciare un messaggio in segreteria.','Servizio o ufficio che riceve telefonate e messaggi.'],
['messaggio','повідомлення','Vorrei lasciare un messaggio per il direttore.','Informazione comunicata a una persona, per telefono o per iscritto.'],
['richiamare','передзвонити','La chiamo più tardi per richiamarla.','Telefonare di nuovo a qualcuno.'],
['rispondere','відповідати','Non posso rispondere in questo momento.','Dare una risposta a una telefonata, una domanda o una richiesta.'],
['chiamare','дзвонити, телефонувати','Posso chiamare domani mattina?','Contattare qualcuno per telefono.'],
['lasciare un messaggio','залишити повідомлення','Se non risponde, lascio un messaggio.','Comunicare brevemente qualcosa a una persona che non è disponibile.'],
['chiedere informazioni','запитати інформацію','Vorrei chiedere informazioni sul corso.','Domandare dati o chiarimenti su qualcosa.'],
['fissare un appuntamento','призначити зустріч/прийом','Vorrei fissare un appuntamento per lunedì.','Stabilire giorno e ora di un incontro.'],
['spostare un appuntamento','перенести зустріч/прийом','Posso spostare l’appuntamento a martedì?','Cambiare la data o l’ora di un appuntamento.'],
['disdire un appuntamento','скасувати зустріч/прийом','Devo disdire l’appuntamento di domani.','Annullare un appuntamento già fissato.'],
['essere disponibile','бути доступним','È disponibile alle tre?','Avere tempo o possibilità di fare qualcosa.'],
['linea occupata','лінія зайнята','La linea è occupata, riprovo più tardi.','Situazione in cui il telefono non permette di effettuare subito la chiamata.'],
['numero interno','внутрішній номер','Può passarmi il numero interno 24?','Numero usato per raggiungere una persona all’interno di un’organizzazione.'],
['centralino','комутатор, телефонна станція','Il centralino mi passa l’ufficio contabilità.','Servizio che riceve e smista le telefonate di un’organizzazione.'],
['orario di apertura','години роботи','Qual è l’orario di apertura dell’ufficio?','Ore in cui un servizio è aperto al pubblico.'],
['oggetto','тема листа','Nell’oggetto scrivi “Richiesta informazioni”.','Breve indicazione che riassume il tema di una email.'],
['allegato','вкладення','Le invio il documento in allegato.','File o documento inviato insieme a una email.'],
['inoltrare','переслати','Può inoltrarmi la email?','Inviare a un’altra persona un messaggio ricevuto.'],
['confermare','підтвердити','Le scrivo per confermare l’appuntamento.','Comunicare che qualcosa è corretto o resta valido.'],
['richiesta','запит, прохання','Le invio una richiesta di informazioni.','Domanda formale per ottenere qualcosa o ricevere informazioni.'],
['cordiali saluti','з повагою','Cordiali saluti, Olena','Formula comune per concludere una email formale.'],
['gentile','шановний/шановна','Gentile Dott.ssa Rossi,','Formula di apertura cortese, soprattutto in una email formale.'],
['buongiorno','добрий день','Buongiorno, chiamo per avere informazioni.','Saluto usato normalmente durante la giornata.'],
['mi chiamo','мене звати','Buongiorno, mi chiamo Anna.','Formula per presentarsi.'],
['potrei','чи міг/могла б я','Potrei parlare con il responsabile?','Forma cortese per chiedere qualcosa.'],
['vorrei','я хотів/хотіла б','Vorrei fissare un appuntamento.','Forma cortese per esprimere una richiesta o un desiderio.'],
['per favore','будь ласка','Può ripetere, per favore?','Formula cortese usata per una richiesta.'],
['grazie per la disponibilità','дякую за готовність допомогти','Grazie per la disponibilità.','Formula cortese per ringraziare qualcuno che dedica tempo o aiuto.'],
['in attesa di un suo riscontro','чекаю на вашу відповідь','Resto in attesa di un suo riscontro.','Formula formale per dire che si aspetta una risposta.'],
['resto a disposizione','залишаюся у вашому розпорядженні','Resto a disposizione per eventuali domande.','Formula formale per offrire ulteriore aiuto.'],
['un saluto','вітання','Un saluto e buona giornata.','Chiusura informale e cortese di un messaggio o email.'],
['a presto','до скорого','Grazie e a presto!','Formula informale per salutare una persona che si spera di rivedere presto.']
];
const termMap=new Map(terms.map(x=>[x[0],x]));
const words=terms.map(x=>x[0]);
const ukrainian=terms.map(x=>x[1]);

const guessDefs=terms.map(x=>({prompt:`Parola o espressione: ${x[3]}`,correct:x[0],options:makeOptions(x[0],words),f:feedback(`La risposta corretta è “${x[0]}”.`,x[2])}));
function buildGuess(){return repeat100(guessDefs).map(x=>({...x,options:makeOptions(x.correct,words)}));}

const meaningItems=terms.map(x=>({prompt:`“${x[0]}” — ${x[3]}`,correct:x[1],options:makeOptions(x[1],ukrainian),f:feedback(`Il significato è “${x[1]}”.`,x[2])}));
function buildMeaning(){return repeat100(meaningItems).map(x=>({...x,options:makeOptions(x.correct,ukrainian)}));}

const completeBase=[
['Buongiorno, ___ informazioni sull’orario di apertura.','vorrei','vorrei',['vorrei','voglio','sono','ho']],
['Potrei ___ con la segreteria, per favore?','parlare','parlare',['parlare','parlo','parlato','parlando']],
['Se il responsabile non c’è, posso ___ un messaggio.','lasciare','lasciare',['lasciare','lasciato','lascio','lasciando']],
['Vorrei ___ un appuntamento per giovedì.','fissare','fissare',['fissare','fisso','fissato','fissando']],
['Mi dispiace, devo ___ l’appuntamento di domani.','disdire','disdire',['disdire','disdetto','disdico','disdicendo']],
['La linea è ___, provo a richiamare più tardi.','occupata','occupata',['occupata','disponibile','gentile','allegata']],
['Le invio il documento in ___.','allegato','allegato',['allegato','oggetto','centralino','interno']],
['Nell’___ della email scrivi “Richiesta informazioni”.','oggetto','oggetto',['oggetto','allegato','messaggio','riscontro']],
['Resto in attesa di un suo ___.','riscontro','riscontro',['riscontro','allegato','interno','orario']],
['___ saluti, Anna Rossi.','Cordiali','Cordiali',['Cordiali','Gentile','Buongiorno','Disponibile']],
['Grazie ___ disponibilità.','per la','per la',['per la','alla','della','con la']],
['Può ___ il messaggio, per favore?','ripetere','ripetere',['ripetere','ripete','ripetuto','ripetendo']],
['La richiamo ___ pomeriggio.','nel','nel',['nel','al','da','con']],
['Vorrei sapere ___ è aperto l’ufficio.','quando','quando',['quando','chi','quanto','dove']],
['Potrebbe dirmi ___ costa il servizio?','quanto','quanto',['quanto','quando','chi','quale']],
['Vorrei sapere ___ posso fissare l’appuntamento online.','se','se',['se','che','chi','quanto']],
['Mi chiamo Luca e telefono ___ avere informazioni.','per','per',['per','da','con','tra']],
['Può passarmi il numero ___ 24?','interno','interno',['interno','oggetto','allegato','aperto']],
['L’ufficio è disponibile ___ 9 alle 13.','dalle','dalle',['dalle','alle','nelle','sulle']],
['Resto a disposizione ___ eventuali domande.','per','per',['per','da','con','tra']]
];
function buildComplete(){return repeat100(completeBase.map(x=>({prompt:x[0],correct:x[1],options:makeOptions(x[2],x[3]),f:feedback(`La forma corretta è “${x[1]}”.`,`Esempio: ${x[0].replace('___',x[1])}`)}))).map(x=>({...x,options:makeOptions(x.correct,words)}));}

const descriptionBase=[
['Per telefono, per iniziare una richiesta in modo cortese: “Buongiorno, ___ informazioni sul corso.”','vorrei avere',['vorrei avere','ho avuto','sono stato','mi piace']],
['In una email formale, nella riga dell’oggetto puoi scrivere: “___ informazioni”.','Richiesta',['Richiesta','Buongiorno','Cordiali','A presto']],
['Per chiudere una email formale: “___”.','Cordiali saluti',['Cordiali saluti','Ciao a presto','Ehi','Buona sera a tutti']],
['Per dire che aspetti una risposta: “Resto in attesa di un suo ___”.','riscontro',['riscontro','allegato','interno','oggetto']],
['Per chiedere un appuntamento in modo cortese: “___ fissare un appuntamento?”','Potrei',['Potrei','Sono','Ho','Vado']],
['Per dire che non puoi rispondere subito al telefono: “Non posso ___ in questo momento.”','rispondere',['rispondere','risposto','rispondo','rispondendo']],
['Per comunicare che richiamerai più tardi: “La ___ più tardi.”','richiamo',['richiamo','chiamo me','risposta','disdico']],
['Per annullare un appuntamento già fissato: “Devo ___ l’appuntamento.”','disdire',['disdire','fissare','confermare','inoltrare']],
['Per cambiare data o ora: “Vorrei ___ l’appuntamento.”','spostare',['spostare','lasciare','allegare','richiamare']],
['Per inviare un file insieme a una email: “Le invio il documento in ___.”','allegato',['allegato','oggetto','centralino','riscontro']]
];
function buildDescription(){return repeat100(descriptionBase.map(x=>({prompt:x[0],correct:x[1],options:makeOptions(x[1],x[2]),f:feedback(`La risposta corretta è “${x[1]}”.`,`La frase completa è: ${x[0].replace('___',x[1])}`)})));}

const roleBase=[
['Devi telefonare a un ufficio per sapere quando è aperto.','Buongiorno, vorrei sapere qual è il vostro orario di apertura.',['Ciao, quando chiudete voi?','Mandatemi subito un appuntamento.','Ho già chiuso l’ufficio.']],
['Chiami un medico per fissare una visita.','Buongiorno, vorrei fissare un appuntamento.',['Buongiorno, vorrei cancellare il telefono.','A presto, allego il centralino.','Quanto costa il messaggio?']],
['Telefonando, trovi la linea occupata.','Riprovo più tardi.',['Resto in attesa dell’allegato.','Scrivo il numero interno sulla busta.','Confermo la linea occupata.']],
['La persona che cerchi non è disponibile e vuoi lasciare un messaggio.','Vorrei lasciare un messaggio per Marco.',['Vorrei disdire Marco.','Vorrei allegare Marco.','Vorrei aprire Marco.']],
['Devi chiedere se puoi parlare con il responsabile.','Potrei parlare con il responsabile, per favore?',['Posso allegare il responsabile?','Il responsabile è un oggetto.','Richiamo il responsabile ieri.']],
['Hai già un appuntamento, ma non puoi rispettare l’orario.','Vorrei spostare l’appuntamento a domani.',['Vorrei oggettare l’appuntamento.','Vorrei inoltrare domani.','Vorrei chiamare l’orario.']],
['Hai ricevuto una email e vuoi inviarla a un collega.','Te la inoltro subito.',['Te la disdico subito.','Te la fisso subito.','Te la apro in ufficio.']],
['Hai inviato una richiesta formale e vuoi offrire ulteriore aiuto.','Resto a disposizione per eventuali domande.',['Resto chiuso per eventuali domande.','Resto allegato per eventuali domande.','Resto interno per eventuali domande.']],
['Devi chiudere una email formale a un’azienda.','Cordiali saluti.',['A presto, ciao ciao.','Ehi, grazie!','Ci vediamo al telefono.']],
['Devi chiedere quanto costa un servizio.','Potrebbe dirmi quanto costa il servizio?',['Potrebbe dirmi quando è il servizio?','Potrebbe dirmi chi è il costo?','Potrebbe dirmi l’allegato del servizio?']]
];
function buildRole(){return repeat100(roleBase.map(x=>({prompt:x[0],correct:x[1],options:makeOptions(x[1],x[2]),f:feedback('Questa formula è adatta alla situazione e mantiene un registro cortese.',x[1])})));}

const situationsBase=[
['Vuoi sapere se un ufficio è aperto sabato.',['Qual è l’orario di apertura di sabato?','Qual è il mio numero interno?','Può inoltrare la mia email?','Dove sono i miei saluti?'],0,'La domanda chiede direttamente gli orari del servizio.'],
['Devi parlare con una persona che non risponde al telefono.',['Posso lasciare un messaggio?','Qual è l’oggetto della linea?','Posso allegare il centralino?','Vorrei spostare il messaggio?'],0,'Quando la persona non è disponibile, lasciare un messaggio è una soluzione naturale.'],
['Hai un appuntamento ma hai un imprevisto e vuoi cambiarlo.',['Vorrei spostare l’appuntamento.','Vorrei confermare l’allegato.','Vorrei inoltrare l’orario.','Vorrei chiedere il centralino.'],0,'Per cambiare data o ora si usa “spostare un appuntamento”.'],
['Hai deciso di non presentarti più a un appuntamento.',['Vorrei disdire l’appuntamento.','Vorrei fissare l’appuntamento.','Vorrei inoltrare l’appuntamento.','Vorrei allegare l’appuntamento.'],0,'“Disdire” significa annullare un appuntamento già fissato.'],
['Scrivi a un ufficio e alleghi un documento.',['Le invio il documento in allegato.','Le invio il documento in centralino.','Le invio il documento in oggetto.','Le invio il documento in riscontro.'],0,'“In allegato” indica un file inviato insieme alla email.'],
['Hai bisogno di una risposta a una email formale.',['Resto in attesa di un suo riscontro.','Resto in attesa del suo centralino.','Resto in attesa del suo oggetto.','Resto in attesa del suo allegato.'],0,'“Riscontro” indica la risposta o il ritorno di informazioni.'],
['Vuoi chiedere in modo cortese di parlare con il responsabile.',['Potrei parlare con il responsabile, per favore?','Parla il responsabile adesso.','Dammi il responsabile.','Il responsabile è allegato.'],0,'“Potrei…?” rende la richiesta più cortese.'],
['Hai telefonato ma la linea è occupata.',['Riprovo più tardi.','Invio un oggetto al telefono.','Disdico la linea.','Allego il centralino.'],0,'Se la linea è occupata, puoi semplicemente riprovare più tardi.'],
['Vuoi sapere se una persona è disponibile alle 16.',['È disponibile alle quattro?','È allegata alle quattro?','È un oggetto alle quattro?','È un centralino alle quattro?'],0,'La domanda riguarda la disponibilità della persona a quell’ora.'],
['Devi iniziare una email formale indirizzata alla signora Rossi.',['Gentile Signora Rossi,','Ehi Rossi!','A presto, Rossi!','Ciao e grazie Rossi!'],0,'“Gentile…” è una formula adatta all’apertura formale.']
];
function buildSituations(){return repeat100(situationsBase.map(x=>({prompt:x[0],correct:x[1][x[2]],options:makeOptions(x[1][x[2]],x[1]),f:feedback(x[3],x[1][x[2]])})));}

const intrusoBase=[
['Quale non appartiene alle formule di apertura di una email?',['Gentile Dott.ssa Rossi','Buongiorno','Gentile Signora Bianchi','Cordiali saluti'],'Cordiali saluti','“Cordiali saluti” è una formula di chiusura.'],
['Quale non riguarda la gestione di un appuntamento?',['fissare','spostare','disdire','inoltrare'],'inoltrare','“Inoltrare” riguarda l’invio di un messaggio ricevuto.'],
['Quale non è legato direttamente a una telefonata?',['centralino','numero interno','linea occupata','allegato'],'allegato','“Allegato” è tipicamente legato a una email o a un documento inviato.'],
['Quale non è una formula cortese per una richiesta?',['Potrei…?','Vorrei…','Per favore…','Dammi…'],'Dammi…','“Dammi…” è molto più diretto e non ha la stessa funzione cortese.'],
['Quale non è una formula di chiusura?',['Cordiali saluti','A presto','Un saluto','Potrei parlare con…?'],'Potrei parlare con…?','“Potrei parlare con…?” è una richiesta, non una chiusura.'],
['Quale non riguarda una email?',['oggetto','allegato','inoltrare','numero interno'],'numero interno','Il numero interno appartiene soprattutto alla gestione delle telefonate.']
];
function buildIntruso(){return repeat100(intrusoBase.map(x=>({prompt:x[0],correct:x[2],options:shuffle(x[1]),f:feedback(x[3],x[2])})));}

const tfBase=[
['“Potrei parlare con il responsabile, per favore?” è una richiesta cortese.','true','La formula “Potrei…?” rende la richiesta più cortese.','Potrei parlare con il responsabile, per favore?'],
['“Cordiali saluti” è normalmente una formula di apertura di una email formale.','false','“Cordiali saluti” si usa normalmente per chiudere una email formale.','Cordiali saluti, Anna Rossi.'],
['“Disdire un appuntamento” significa annullare un appuntamento già fissato.','true','“Disdire” indica l’annullamento di un appuntamento già fissato.','Devo disdire l’appuntamento di domani.'],
['“In allegato” indica il tema principale scritto nell’oggetto della email.','false','“In allegato” indica un file o documento inviato insieme alla email.','Le invio il documento in allegato.'],
['Se la linea è occupata, puoi riprovare più tardi.','true','Una linea occupata può impedire di parlare subito, quindi puoi riprovare più tardi.','La linea è occupata, riprovo più tardi.'],
['“Resto in attesa di un suo riscontro” è una formula tipica di una email informale tra amici.','false','È una formula formale usata per aspettare una risposta.','Resto in attesa di un suo riscontro.'],
['“Vorrei fissare un appuntamento” può essere usato per stabilire giorno e ora di un incontro.','true','“Fissare un appuntamento” significa stabilire un appuntamento.','Vorrei fissare un appuntamento per giovedì.'],
['“Numero interno” indica il file allegato a una email.','false','Il numero interno è un numero usato per raggiungere una persona all’interno di un’organizzazione.','Può passarmi il numero interno 24?']
];
function buildTF(){return repeat100(tfBase.map(x=>({kind:'tf',prompt:`${x[0]}`,correct:x[1]==='true'?'Vero':'Falso',options:['Vero','Falso'],f:feedback(x[2],x[3])})));}

const flashBase=terms.map(x=>({kind:'flash',word:x[0],ua:x[1],example:x[2],definition:x[3]}));
function buildFlash(){return repeat100(flashBase);}

function buildMixed(){
 const pools=[buildGuess(),buildComplete(),buildRole(),buildSituations(),buildTF(),buildMeaning(),buildDescription(),buildIntruso()];
 return repeat100(pools.flat().slice(0,100));
}

const info={
 mixed:['🎯 Quiz misto','Lessico, formule e situazioni nel contesto.'],
 guess:['💡 Indovina la parola','Leggi la descrizione e trova la parola corretta.'],
 intruso:['🕵️ Trova l’intruso','Quale parola o formula non appartiene al gruppo?'],
 complete:['✏️ Completa la frase','Scegli la parola o formula corretta nel contesto.'],
 roleplay:['🗣️ Giochi di ruolo','Gestisci telefonate, messaggi e richieste reali.'],
 situations:['💬 Situazioni da risolvere','Scegli cosa dire o fare in una situazione reale.'],
 truefalse:['✓✕ Vero o falso?','Capisci se una formula è adatta alla situazione.'],
 meaning:['🔎 Che cosa significa?','Scegli il significato corretto di una formula.'],
 description:['📝 Completa la descrizione','Completa una descrizione di email o telefonata.'],
 findword:['🔤 Trova la parola','Leggi il significato e trova la parola adatta.'],
 flashcard:['🗂️ Flashcard','Italiano → ucraino → spiegazione ed esempio.']
};
const builders={mixed:buildMixed,guess:buildGuess,intruso:buildIntruso,complete:buildComplete,roleplay:buildRole,situations:buildSituations,truefalse:buildTF,meaning:buildMeaning,description:buildDescription,findword:buildGuess,flashcard:buildFlash};
const type=new URLSearchParams(location.search).get('type')||'mixed';
let pool=builders[type]?builders[type]():buildMixed();
if(type==='findword') pool=meaningItems.map(x=>({prompt:x.prompt.replace(`“${x.correct}” — `,''),correct:x.correct,options:makeOptions(x.correct,words),f:feedback(`La parola corretta è “${x.correct}”.`,termMap.get(x.correct)[2])}));
const questions=shuffle(pool).slice(0,S);
let index=0,score=0,answered=false;
const $=id=>document.getElementById(id);
function renderHeader(){ $('eyebrow').textContent=info[type][0]; $('title').textContent=info[type][0].replace(/^\S+\s/,''); $('subtitle').textContent=info[type][1] }
function render(){answered=false;$('feedback').className='feedback';$('feedback').innerHTML='';$('progressText').textContent=`${index+1} / ${S}`;$('fill').style.width=`${((index+1)/S)*100}%`;const q=questions[index];$('prev').disabled=index===0;$('next').textContent=index===S-1?'Termina':'Avanti →';$('typeLabel').textContent=info[type][0];if(q.kind==='flash'){renderFlash(q);return}renderMC(q)}
function renderMC(q){$('content').innerHTML=`<div class="question">${q.prompt}</div><div class="answers">${q.options.map(o=>`<button class="answer">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answer(q,b))}
function answer(q,b){if(answered)return;answered=true;const ok=b.textContent===q.correct;if(ok)score++;document.querySelectorAll('.answer').forEach(x=>{x.disabled=true;if(x.textContent===q.correct)x.classList.add('correct')});if(!ok)b.classList.add('wrong');showFeedback(ok,q.f)}
function showFeedback(ok,f){$('feedback').className=`feedback show ${ok?'good':'bad'}`;$('feedback').innerHTML=`<strong>${ok?'✓ Corretto':'✕ Non è la risposta corretta'}</strong><div>${f.why}</div><div class="example">Esempio reale: <em>${f.example}</em></div>`}
function renderFlash(q){$('content').innerHTML=`<div class="flashcard" tabindex="0" id="flashcard"><div class="flash-inner"><div class="flash-face flash-front"><div>${q.word}</div></div><div class="flash-face flash-back"><div class="uk">${q.ua}</div><div class="definition">${q.definition}</div><div class="example">${q.example}</div></div></div></div>`;const c=$('flashcard');c.onclick=()=>c.classList.toggle('flipped');c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();c.classList.toggle('flipped')}}}
$('prev').onclick=()=>{if(index>0){index--;render()}};$('next').onclick=()=>{if(index<S-1){index++;render()}else{finish()}};function finish(){$('card').style.display='none';$('end').classList.add('show');$('score').textContent=`Hai risposto correttamente a ${score} domande su ${S}.`}
renderHeader();render();
