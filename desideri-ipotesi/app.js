const N=100,S=15;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function unique(a){return [...new Set(a)]}
function options(correct,pool){return shuffle(unique([correct,...pool.filter(x=>x!==correct)]).slice(0,4))}

const words=[
['desiderio','бажання','Qualcosa che vorresti avere, fare o vivere.','Il mio desiderio è vivere vicino al mare.'],
['possibilità','можливість','Qualcosa che può succedere o può essere realizzato.','C’è la possibilità di partire domani.'],
['ipotesi','припущення / гіпотеза','Una situazione immaginata o non certa.','Facciamo un’ipotesi e vediamo cosa succede.'],
['sogno','мрія','Un desiderio molto grande, spesso difficile da realizzare.','Il mio sogno è fare un lungo viaggio.'],
['scelta','вибір','Decisione tra due o più possibilità.','Se potessi scegliere, lavorerei da casa.'],
['occasione','можливість / нагода','Una situazione favorevole per fare qualcosa.','Se avessi l’occasione, visiterei il Giappone.'],
['preferire','віддавати перевагу','Volere una cosa più di un’altra.','Preferirei restare a casa stasera.'],
['immaginare','уявляти','Pensare a una situazione che non è necessariamente reale.','Immagina di vivere in una grande città.'],
['potere','могти','Avere la possibilità o la capacità di fare qualcosa.','Con più tempo potrei studiare di più.'],
['volere','хотіти','Desiderare qualcosa o avere intenzione di farla.','Vorrei imparare a suonare la chitarra.'],
['piacere','подобатися / хотіти','Essere gradito; nella forma “mi piacerebbe” esprime un desiderio.','Mi piacerebbe conoscere meglio questa città.'],
['se avessi','якби я мав/мала','Forma usata per immaginare una condizione non reale o poco probabile.','Se avessi più soldi, viaggerei di più.'],
['se potessi','якби я міг/могла','Forma usata per immaginare una possibilità.','Se potessi, partirei subito.'],
['potrei','я міг/могла б','Condizionale di potere: indica una possibilità o una proposta.','Potrei aiutarti domani pomeriggio.'],
['vorrei','я хотів/хотіла б','Condizionale di volere: esprime un desiderio in modo gentile.','Vorrei una camera con vista.'],
['mi piacerebbe','мені хотілося б','Forma usata per esprimere un desiderio.','Mi piacerebbe andare a teatro.'],
['avrei bisogno di','мені потрібно було б','Espressione usata per chiedere o indicare una necessità in modo cortese.','Avrei bisogno di qualche giorno in più.'],
['sarebbe meglio','було б краще','Forma usata per dare un consiglio o indicare una soluzione preferibile.','Sarebbe meglio partire presto.'],
['in teoria','теоретично','Secondo un ragionamento, anche se nella realtà può essere diverso.','In teoria potremmo finire oggi.'],
['magari','можливо / було б добре','Può indicare possibilità, desiderio o speranza a seconda del contesto.','Magari potessi restare ancora un po’.']
];

const completeSeeds=[
['Se avessi più tempo, ___ di più.','viaggerei',['viaggio','ho viaggiato','viaggiavo'],'Con una condizione immaginaria si usa il condizionale.'],
['___ andare al concerto, ma ho già un impegno.','Vorrei',['Voglio','Volevo','Vorrei stato'],'“Vorrei” esprime un desiderio.'],
['Mi ___ piacerebbe vivere in una città più tranquilla.','piacerebbe',['piace','piacerà','è piaciuto'],'“Mi piacerebbe” presenta un desiderio.'],
['Se potessi scegliere, ___ lavorare quattro giorni alla settimana.','preferirei',['preferisco','preferivo','ho preferito'],'La situazione è ipotetica, quindi il condizionale è adatto.'],
['Con più soldi, ___ una casa più grande.','comprerei',['compro','compravo','ho comprato'],'La conseguenza di una condizione immaginaria va al condizionale.'],
['Se fossi in te, ___ con lei.','parlerei',['parlo','parlavo','ho parlato'],'“Se fossi in te” introduce un consiglio ipotetico.'],
['Domani ___ andare al mare, se il tempo fosse bello.','potremmo',['possiamo','potremo','potevamo'],'“Potremmo” indica una possibilità legata a una condizione.'],
['___ volentieri una pausa.','Farei',['Faccio','Facevo','Ho fatto'],'Il condizionale rende la richiesta più morbida e ipotetica.'],
['Se avessi la possibilità, ___ a vivere all’estero.','andrei',['vado','andavo','sono andato'],'La possibilità immaginata richiede il condizionale.'],
['Avrei bisogno di ___ giorno per finire il lavoro.','un altro',['un altro stato','un’altra stato','altri una'],'La forma corretta è “un altro giorno”.'],
['Sarebbe ___ partire presto.','meglio',['buono','bene stato','miglioremente'],'“Sarebbe meglio” è una struttura molto comune per dare un consiglio.'],
['Se non piovesse, ___ una passeggiata.','farei',['faccio','facevo','ho fatto'],'La condizione è ipotetica; la conseguenza è al condizionale.'],
['Mi piacerebbe ___ una lingua nuova.','imparare',['imparo','imparato','imparavo'],'Dopo “mi piacerebbe” si usa l’infinito.'],
['Se avessi più coraggio, ___ quella decisione.','prenderei',['prendo','prendevo','ho preso'],'Il condizionale esprime la conseguenza dell’ipotesi.'],
['Potrei ___ più tardi, se vuoi.','passare',['passo','passavo','sono passato'],'Dopo “potrei” si usa l’infinito.'],
['Vorrei ___ una domanda.','fare',['faccio','fatto','facevo'],'“Vorrei” + infinito esprime una richiesta o un desiderio.'],
['Se fossi ricco, ___ molto di più.','viaggerei',['viaggio','viaggiavo','ho viaggiato'],'Il periodo ipotetico presenta una situazione immaginaria.'],
['Se avessimo una macchina, ___ fuori città.','andremmo',['andiamo','andavamo','siamo andati'],'La conseguenza ipotetica va al condizionale.'],
['Magari ___ domani!','nevicasse',['nevica','nevicherà','ha nevicato'],'“Magari” può introdurre un desiderio.'],
['In teoria, ___ finire entro le sei.','potremmo',['possiamo','potremo','potevamo'],'“Potremmo” indica una possibilità.']
];

const choiceSeeds=[
['“Mi piacerebbe vivere vicino al mare.”','Desiderio',['Ipotesi certa','Ordine','Abitudine']],
['“Se avessi più tempo, studierei il francese.”','Ipotesi',['Desiderio diretto','Fatto passato','Ordine']],
['“Potrei venire con voi.”','Possibilità',['Abitudine','Fatto certo','Divieto']],
['“Vorrei un caffè, per favore.”','Desiderio / richiesta gentile',['Ipotesi impossibile','Abitudine','Racconto passato']],
['“Se potessi, resterei qui.”','Ipotesi',['Fatto certo','Ordine','Abitudine']],
['“Mi piacerebbe provare quel ristorante.”','Desiderio',['Divieto','Fatto passato','Obbligo']],
['“Potremmo andare a piedi.”','Possibilità / proposta',['Fatto passato','Ordine','Abitudine']],
['“Se fossi in te, accetterei.”','Consiglio ipotetico',['Desiderio personale','Fatto certo','Abitudine']],
['“Sarebbe bello avere più tempo.”','Desiderio / valutazione ipotetica',['Obbligo','Fatto passato','Divieto']],
['“Se avessi una settimana libera, partirei subito.”','Ipotesi',['Routine','Fatto certo','Ordine']],
['“Vorrei imparare a cucinare meglio.”','Desiderio',['Fatto già concluso','Divieto','Abitudine']],
['“Potrei aiutarti domani.”','Possibilità',['Necessità certa','Racconto passato','Abitudine']],
['“Magari avessi una casa al mare!”','Desiderio',['Ordine','Fatto passato','Divieto']],
['“Se non fosse così tardi, usciremmo.”','Ipotesi',['Abitudine','Fatto certo','Richiesta diretta']],
['“Mi piacerebbe conoscere persone nuove.”','Desiderio',['Obbligo','Fatto passato','Divieto']],
['“In teoria potremmo farlo oggi.”','Possibilità',['Fatto certo','Abitudine','Ordine']],
['“Se avessi la scelta, resterei.”','Ipotesi',['Racconto passato','Obbligo','Abitudine']],
['“Vorrei cambiare lavoro.”','Desiderio',['Fatto certo','Divieto','Abitudine']],
['“Sarebbe meglio aspettare.”','Consiglio ipotetico',['Racconto passato','Abitudine','Ordine obbligatorio']],
['“Potrei prenotare io.”','Possibilità / proposta',['Fatto passato','Abitudine','Divieto']]
];

const situations=[
['Un amico ti chiede cosa faresti con un mese libero.',['Se avessi un mese libero, viaggerei in Asia.','Ho un mese libero e viaggio in Asia.','Ogni mese viaggio in Asia.','Viaggerò in Asia ieri.'],'Se avessi un mese libero, viaggerei in Asia.','Per una situazione immaginaria si usa la struttura se + congiuntivo imperfetto / condizionale.'],
['Vuoi chiedere gentilmente un caffè al bar.',['Vorrei un caffè, per favore.','Voglio un caffè subito!','Vorrei avuto un caffè.','Ho voluto un caffè ieri.'],'Vorrei un caffè, per favore.','“Vorrei” rende la richiesta cortese.'],
['Un collega ti propone di andare a cena, ma non sai se puoi.',['Potrei venire, ma devo controllare.','Vengo sicuramente ieri.','Venivo sicuramente domani.','Sono venuto forse ogni giorno.'],'Potrei venire, ma devo controllare.','“Potrei” esprime una possibilità non certa.'],
['Racconti il tuo sogno di vivere in campagna.',['Mi piacerebbe vivere in campagna.','Vivo in campagna ieri.','Mi piace vissuto in campagna.','Vivevo in campagna domani.'],'Mi piacerebbe vivere in campagna.','“Mi piacerebbe” introduce un desiderio.'],
['Dai un consiglio a un amico usando una situazione ipotetica.',['Se fossi in te, aspetterei ancora.','Se sono te, aspetto ancora.','Se ero in te, ho aspettato ancora.','Sono in te e aspetto ancora.'],'Se fossi in te, aspetterei ancora.','“Se fossi in te” è una struttura tipica per i consigli ipotetici.'],
['Parli di cosa compreresti con molti soldi.',['Comprerei una casa al mare.','Compro una casa al mare ieri.','Compravo una casa al mare domani.','Ho comprato una casa al mare se.'],'Comprerei una casa al mare.','Il condizionale esprime la conseguenza di una condizione immaginaria.'],
['Un amico dice che forse potete partire domani.',['Potremmo partire domani.','Partivamo sicuramente domani.','Partiamo ieri.','Siamo partiti forse ogni giorno.'],'Potremmo partire domani.','“Potremmo” presenta una possibilità o proposta.'],
['Vuoi dire che preferiresti restare a casa.',['Preferirei restare a casa.','Preferisco restare ieri.','Preferivo restare domani.','Ho preferito restare ogni giorno.'],'Preferirei restare a casa.','“Preferirei” esprime una preferenza in modo ipotetico.'],
['Hai un desiderio molto forte per il futuro.',['Vorrei imparare a parlare meglio italiano.','Imparavo parlare meglio italiano.','Ho imparato parlare meglio ieri.','Imparo ieri italiano.'],'Vorrei imparare a parlare meglio italiano.','“Vorrei” + infinito esprime un desiderio.'],
['Immagini cosa faresti se non avessi lavoro domani.',['Se non lavorassi, andrei al mare.','Se non lavoro, sono andato al mare.','Non lavoravo e andavo domani.','Non ho lavoro, andavo ieri.'],'Se non lavorassi, andrei al mare.','La frase presenta una condizione immaginaria e la sua conseguenza.']
];

const roles=[
['Hai un anno sabbatico.','Racconta dove vorresti andare, cosa ti piacerebbe imparare e cosa faresti se avessi un budget limitato.'],
['Un amico ti chiede: “Se potessi cambiare una cosa della tua città, cosa cambieresti?”','Esprimi un desiderio e spiega la conseguenza.'],
['Stai organizzando il prossimo weekend.','Proponi due possibilità usando “potremmo” e indica quale preferiresti.'],
['Immagina di avere una casa enorme.','Descrivi cosa ci sarebbe dentro e cosa ti piacerebbe fare lì.'],
['Parli con un collega del lavoro ideale.','Spiega che lavoro vorresti fare e cosa cambieresti rispetto a quello attuale.'],
['Un amico vuole un consiglio.','Usa “Se fossi in te…” e formula una soluzione.'],
['Immagina di poter viaggiare senza limiti.','Scegli tre destinazioni e spiega perché ci andresti.'],
['Hai la possibilità di studiare una nuova lingua.','Spiega quale sceglieresti e cosa ti piacerebbe fare con quella lingua.'],
['Devi scegliere tra due case.','Descrivi le due possibilità e spiega quale preferiresti.'],
['Immagina di poter incontrare una persona famosa.','Spiega chi sceglieresti e cosa le chiederesti.']
];

const intrusoSets=[
['vorrei','potrei','mi piacerebbe','ieri'],['se avessi','se potessi','se fossi','domani mattina'],['desiderio','sogno','possibilità','valigia'],['preferirei','comprerei','andrei','mangio'],['ipotetico','immaginario','possibile','obbligatorio'],['potremmo','potrei','potresti','abbiamo'],['scelta','occasione','possibilità','stazione'],['vorrei','preferirei','mi piacerebbe','sono andato'],['se lavorassi','se avessi','se potessi','ho lavorato'],['sarebbe meglio','potrebbe essere','vorrei','è stato']
];

function repeat100(seeds, mapper){let out=[];for(let i=0;i<N;i++)out.push(mapper(seeds[i%seeds.length],i));return shuffle(out)}
function guessBank(){return repeat100(words,(w,i)=>({q:w[2],a:w[0],o:options(w[0],words.map(x=>x[0])),ex:w[3]}))}
function completeBank(){return repeat100(completeSeeds,(x,i)=>({q:x[0].replace('___','_____'),a:x[1],o:options(x[1],x[2]),ex:x[0].replace('___',x[1])+' '+x[3]}))}
function choiceBank(){return repeat100(choiceSeeds,(x,i)=>({q:`${x[0]} — ${x[1]}`,a:x[1],o:options(x[1],choiceSeeds.map(y=>y[1])),ex:`Esempio: ${['Se avessi più tempo, farei un corso di fotografia.','Mi piacerebbe provare una nuova ricetta.','Potremmo prendere il treno delle otto.','Se fossi in te, aspetterei qualche giorno.'][i%4]}`}))}
function situationsBank(){return repeat100(situations,(x,i)=>({q:x[0],a:x[2],o:shuffle(x[1]),ex:x[3]+' '+x[4]}))}
function roleBank(){return repeat100(roles,(x,i)=>{let good='Descrivi la situazione, esprimi il desiderio o l’ipotesi e spiega cosa faresti.';let opts=shuffle([good,'Racconta solo cosa hai fatto ieri.','Dai una definizione del condizionale senza parlare della situazione.','Elenca soltanto tre verbi al presente.']);return {q:x[0]+' '+x[1],a:good,o:opts,ex:'Esempio reale: Se avessi più tempo, seguirei un corso serale.'}})}
function intrusoBank(){return repeat100(intrusoSets,(s,i)=>{let bad=s[s.length-1];return {q:'Quale parola o espressione è l’intrusa?',a:bad,o:shuffle(s),ex:`“${bad}” non appartiene al gruppo perché ha un significato o una funzione diversa.`}})}
function mixedBank(){return shuffle([...guessBank().slice(0,34),...completeBank().slice(0,33),...choiceBank().slice(0,33)]).slice(0,N)}
function flashBank(){return repeat100(words,(w,i)=>({q:w[0],a:w[1],ex:w[3],def:w[2]}))}

const type=new URLSearchParams(location.search).get('type')||'mixed';
const titles={mixed:'Quiz misto',guess:'Indovina la parola',intruso:'Trova l’intruso',complete:'Completa la frase',role:'Giochi di ruolo',situations:'Situazioni da risolvere',choice:'Desiderio o ipotesi?',flash:'Flashcard'};
let bank=type==='mixed'?mixedBank():type==='guess'?guessBank():type==='intruso'?intrusoBank():type==='complete'?completeBank():type==='role'?roleBank():type==='situations'?situationsBank():type==='choice'?choiceBank():flashBank();
let i=0,score=0,answered=false;
function answerIntruder(item,word,b,box){if(answered)return;answered=true;let correct=word===item.a;if(correct)score++;[...box.children].forEach(z=>{z.disabled=true;if(z.textContent===item.a)z.classList.add('correct')});if(!correct)b.classList.add('wrong');$('#feedback').innerHTML=`<div class="feedback ${correct?'ok':'bad'}"><b>${correct?'✓ Corretto':'✕ Non è la risposta corretta'}</b><p>Risposta: <strong>${esc(item.a)}</strong></p><p>Esempio: <strong>${esc(item.ex)}</strong></p></div>`;$('#next').disabled=false}
function render(){
if(i>=S){$('#app').innerHTML=`<div class="crumb">${esc(titles[type].toUpperCase())}</div><h1>Finito!</h1><p class="lead">Hai risposto correttamente a ${score} domande su ${S}.</p><a class="back" href="index.html">← Torna al tema principale</a>`;return}
let x=bank[i];
$('#app').innerHTML=`<div class="crumb">${esc(titles[type].toUpperCase())}</div><div class="progress"><span>${i+1} / ${S}</span><i style="--legacy-progress:${i/S*100}%"></i></div><h1>${esc(titles[type])}</h1><p class="lead">Una domanda alla volta.</p><section class="question"><small>${esc(type==='flash'?'FLASHCARD':titles[type].toUpperCase())}</small>${type==='flash'?`<div class="flash" id="flash"><div class="front">“${esc(x.q)}”</div><div class="back"><strong>${esc(x.a)}</strong><p>${esc(x.def)}</p><p><b>Esempio:</b> ${esc(x.ex)}</p></div></div>`:`<h2>${esc(x.q)}</h2><div class="answers">${x.o.map((o,j)=>`<button data-j="${j}">${esc(o)}</button>`).join('')}</div><div id="feedback"></div>`}<div class="nav"><button id="prev" ${i===0?'disabled':''}>← Indietro</button><button id="next" ${type==='flash'?'':'disabled'}>Avanti →</button></div></section>`;
if(type==='flash'){$('#flash').onclick=()=>$('#flash').classList.toggle('flip');$('#next').onclick=()=>{if(i<S-1){i++;answered=false;render()}else{location.href='index.html'}};}else {document.querySelectorAll('.answers button').forEach(b=>b.onclick=()=>answer(b));$('#next').onclick=()=>{if(!answered)return;if(i<S-1){i++;answered=false;render()}else{location.href='index.html'}};}
$('#prev').onclick=()=>{if(i>0){i--;answered=false;render()}};
}
function answer(b){if(answered)return;answered=true;let x=bank[i],correct=b.textContent===x.a;if(correct)score++;document.querySelectorAll('.answers button').forEach(z=>{if(z.textContent===x.a)z.classList.add('correct');if(z===b&&!correct)z.classList.add('wrong')});$('#feedback').innerHTML=`<div class="feedback ${correct?'ok':'bad'}"><b>${correct?'✓ Corretto':'✕ Non è la risposta corretta'}</b><p>Risposta: <strong>${esc(x.a)}</strong></p><p>Esempio: <strong>${esc(x.ex)}</strong></p></div>`;$('#next').disabled=false}
render();
