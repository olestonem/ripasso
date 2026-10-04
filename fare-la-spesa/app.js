const N=100,S=15;
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const repeat100=a=>{const out=[];for(let i=0;out.length<N;i++)out.push({...a[i%a.length],_seed:i});return shuffle(out)};
const opts=(correct,others)=>shuffle([correct,...others.filter(x=>x!==correct)].slice(0,4));
const fb=(why,example)=>({why,example});

const terms=[
['pane','хліб','Compro il pane ogni mattina.','Alimento fatto soprattutto con farina, acqua e lievito.'],
['latte','молоко','Prendo un litro di latte.','Bevanda alimentare di origine animale.'],
['formaggio','сир','Vorrei due etti di formaggio.','Alimento prodotto dal latte.'],
['uova','яйця','Mi servono sei uova.','Alimenti racchiusi in un guscio, usati anche per cucinare.'],
['pasta','макарони','Compro la pasta per la cena.','Alimento secco fatto con farina e acqua.'],
['riso','рис','Prendo un chilo di riso.','Cereale usato come alimento.'],
['farina','борошно','Mi serve un pacco di farina.','Polvere ottenuta dalla macinazione dei cereali.'],
['zucchero','цукор','Quanto costa lo zucchero?','Ingrediente dolce usato in molte preparazioni.'],
['sale','сіль','Ho finito il sale.','Sostanza usata per insaporire i cibi.'],
['olio','олія','Prendo una bottiglia di olio d’oliva.','Liquido usato per condire e cucinare.'],
['acqua','вода','Compro sei bottiglie d’acqua.','Bevanda indispensabile e senza zuccheri aggiunti.'],
['succo','сік','Vorrei un succo d’arancia.','Bevanda ottenuta dalla frutta.'],
['mela','яблуко','Scelgo tre mele.','Frutto rotondo, spesso rosso, verde o giallo.'],
['banana','банан','Le banane sono in offerta.','Frutto giallo e allungato.'],
['arancia','апельсин','Compro delle arance per la colazione.','Frutto agrumato con buccia arancione.'],
['pomodoro','помідор','Prendo mezzo chilo di pomodori.','Ortaggio rosso usato in molte ricette.'],
['patata','картопля','Mi servono due chili di patate.','Tubero molto usato in cucina.'],
['insalata','салат','Compro un’insalata fresca.','Preparazione o verdura a foglia, spesso condita.'],
['carne','м’ясо','Vorrei tre etti di carne.','Alimento ricavato dagli animali.'],
['pesce','риба','Oggi compro il pesce.','Alimento di origine animale che vive nell’acqua.'],
['pollo','курятина','Prendo il pollo per cena.','Carne bianca molto comune.'],
['prosciutto','шинка','Vorrei due etti di prosciutto.','Salume ottenuto dalla coscia del maiale.'],
['yogurt','йогурт','Compro quattro yogurt.','Alimento cremoso ottenuto dalla fermentazione del latte.'],
['biscotti','печиво','Cerco dei biscotti senza zucchero.','Dolci secchi, spesso mangiati a colazione o merenda.'],
['scatola','коробка','Prendo una scatola di cereali.','Contenitore rigido di forma generalmente rettangolare.'],
['bottiglia','пляшка','Metto l’acqua nel carrello.','Contenitore, spesso di vetro o plastica, per liquidi.'],
['barattolo','банка','Compro un barattolo di marmellata.','Contenitore, spesso di vetro, per alimenti.'],
['confezione','упаковка','Quante confezioni devo comprare?','Involucro che contiene e presenta un prodotto.'],
['carrello','візок','Prendo un carrello all’ingresso.','Contenitore con ruote usato per fare la spesa.'],
['cassa','каса','Pago alla cassa.','Punto del negozio in cui si paga.']
];

const productNames=terms.map(x=>x[0]);
const guessBase=terms.map(([w,u,e,d],i)=>({prompt:d,correct:w,options:opts(w,productNames.filter(x=>x!==w).slice(i%12,i%12+10)),feedback:fb(`La parola corretta è “${w}”.`,e)}));
function buildGuess(){return repeat100(guessBase)}

const mixedBase=[
['Devo comprare ___ di latte.','un litro',['un chilo','un etto','una bottiglia']],
['Vorrei ___ di formaggio, non troppo.','due etti',['due litri','due chili','due bottiglie']],
['Prendo ___ di mele.','un chilo',['un litro','un etto','un pacco']],
['Dove sono ___?','le casse',['i carrelli','le bottiglie','i prodotti']],
['Il prezzo è scritto ___ scaffale.','sullo',['nella','sul','alla']],
['Pago con la carta ___ cassa.','alla',['sulla','nella','dal']],
['Cerco un prodotto ___ zucchero.','senza',['con','tra','sotto']],
['Questa confezione è ___ due euro.','da',['di','a','in']],
['Le uova sono nel reparto ___.','freschi',['cassa','bevande','cestini']],
['Metto tutto ___ carrello.','nel',['sul','alla','dal']],
['Vorrei sapere quanto ___.','costa',['costano','costare','costi']],
['Mi può dare un sacchetto, ___?','per favore',['grazie mille','subito','ieri']],
['Il pane è ___ forno.','nel reparto del',['alla cassa del','sul carrello del','nel prezzo del']],
['Cerco una bottiglia ___ olio.','di',['da','a','con']],
['Questo prodotto è in ___.','offerta',['scatola','cassa','spesa']]
];
function buildMixed(){return repeat100(mixedBase.map(x=>({kind:'mc',prompt:x[0],correct:x[1],options:opts(x[1],x[2]),feedback:fb(`“${x[1]}” completa correttamente la frase.`,`Per esempio: ${x[1].charAt(0).toUpperCase()+x[1].slice(1)} è un’espressione comune quando facciamo la spesa.`)})))}

const intrusoBase=[
[['pane','pasta','riso','sapone'],'sapone','Gli altri tre sono alimenti a base di cereali.'],
[['mela','banana','arancia','formaggio'],'formaggio','Gli altri tre sono frutti.'],
[['latte','yogurt','formaggio','pomodoro'],'pomodoro','Gli altri tre sono prodotti derivati dal latte.'],
[['carrello','cassa','scaffale','banana'],'banana','Gli altri tre sono elementi o luoghi del supermercato.'],
[['bottiglia','barattolo','scatola','cassa'],'cassa','Gli altri tre sono contenitori.'],
[['carne','pollo','pesce','farina'],'farina','Gli altri tre sono alimenti di origine animale.'],
[['olio','acqua','succo','patata'],'patata','Gli altri tre sono liquidi.'],
[['sale','zucchero','farina','carrello'],'carrello','Gli altri tre sono prodotti alimentari da dispensa.'],
[['uova','prosciutto','formaggio','biscotti'],'biscotti','Gli altri tre sono alimenti salati o ingredienti comuni per piatti salati.'],
[['cassa','scontrino','prezzo','banana'],'banana','Gli altri tre sono collegati al pagamento o al costo.'],
[['scaffale','reparto','cassa','latte'],'latte','Gli altri tre sono parti o zone del negozio.'],
[['confezione','barattolo','bottiglia','pomodoro'],'pomodoro','Gli altri tre sono contenitori o imballaggi.']
];
function buildIntruso(){return repeat100(intrusoBase.map(x=>({kind:'intruso',prompt:'Quale parola non appartiene al gruppo?',choices:x[0],correct:x[1],feedback:fb(`“${x[1]}” è l’intruso. ${x[2]}`,`Per esempio: possiamo trovare ${x[0].filter(w=>w!==x[1])[0]} nel supermercato.`)})))}

const completeBase=[
['Vorrei un ___ di pane.','filone',['litro','etto','bottiglia']],
['Compro un ___ di latte.','litro',['chilo','etto','pacchetto']],
['Mi servono due ___ di mele.','chili',['litri','etti','scatole']],
['Prendo una ___ d’acqua.','bottiglia',['scatola','cassa','confezione']],
['Cerco un ___ di marmellata.','barattolo',['litro','etto','filone']],
['Metto la pasta nel ___.','carrello',['reparto','prezzo','scontrino']],
['Pago alla ___.','cassa',['scaffale','confezione','spesa']],
['Controllo il ___ prima di comprare il prodotto.','prezzo',['carrello','reparto','sacchetto']],
['Il prodotto è in ___.','offerta',['cassa','spesa','scaffale']],
['Vorrei due ___ di prosciutto.','etti',['litri','chili','bottiglie']],
['Mi dà un ___ di zucchero?','chilo',['litro','etto','barattolo']],
['Cerco il latte nel ___ frigorifero.','reparto',['prezzo','scontrino','carrello']],
['Dopo la spesa metto tutto nelle ___.','borse',['casse','scaffali','confezioni']],
['Prendo un ___ per portare i prodotti.','carrello',['scontrino','prezzo','barattolo']],
['Alla cassa ricevo lo ___.','scontrino',['scaffale','sacchetto','spesa']],
['Questo prodotto è ___ zucchero.','senza',['tra','sotto','da']],
['Mi serve una ___ di biscotti.','confezione',['cassa','cucina','spesa']],
['Compro mezzo ___ di formaggio.','chilo',['litro','bottiglia','scatola']],
['Il pane si trova nel ___ della panetteria.','reparto',['prezzo','carrello','scontrino']],
['Prendo le uova e le metto nel ___.','carrello',['reparto','prezzo','scontrino']]
];
function buildComplete(){return repeat100(completeBase.map(x=>({kind:'mc',prompt:x[0],correct:x[1],options:opts(x[1],x[2]),feedback:fb(`“${x[1]}” completa correttamente la frase.`,`Per esempio: ${x[1].charAt(0).toUpperCase()+x[1].slice(1)} è utile quando facciamo la spesa.`)})))}

const roleBase=[
['Sei al banco della gastronomia. Vuoi 200 grammi di prosciutto. Cosa dici?','Vorrei due etti di prosciutto, per favore.',['Mi dà due litri di prosciutto?','Cerco un chilo di bottiglie.','Dov’è la cassa?'],'La risposta indica quantità, prodotto e usa una richiesta naturale.','Vorrei tre etti di formaggio, per favore.'],
['Non trovi il latte. Cosa chiedi a un commesso?','Scusi, dov’è il latte?',['Quanto costa la cassa?','Vorrei pagare il latte.','Dov’è il mio carrello?'],'È una richiesta diretta e cortese per trovare un prodotto.','Scusi, dov’è il reparto della frutta?'],
['Alla cassa vuoi pagare con la carta. Cosa dici?','Posso pagare con la carta?',['Posso mettere la carta nel carrello?','Dove sono le mele?','Vorrei due etti di carta.'],'È la formula naturale per chiedere se il pagamento con carta è possibile.','Posso pagare con il bancomat?'],
['Il prezzo sullo scaffale non è chiaro. Cosa chiedi?','Quanto costa questo prodotto?',['Dove metto il prezzo?','Quanto pesa la cassa?','Posso comprare lo scaffale?'],'La domanda chiede direttamente il prezzo del prodotto.','Quanto costa questa confezione di biscotti?'],
['Hai dimenticato un sacchetto. Cosa chiedi alla cassa?','Mi dà un sacchetto, per favore?',['Mi dà uno scaffale?','Dov’è il reparto?','Mi dà un chilo di cassa?'],'È una richiesta cortese e adatta alla situazione.','Mi dà due sacchetti, per favore?'],
['Vuoi sapere se un prodotto è senza zucchero. Cosa chiedi?','È senza zucchero?',['È senza carrello?','È nella cassa?','Quanto pesa il prezzo?'],'La domanda verifica una caratteristica del prodotto.','Questo yogurt è senza zuccheri aggiunti?'],
['Cerchi il reparto della frutta. Cosa dici?','Dov’è il reparto della frutta?',['Quanto costa la frutta?','Dov’è lo scontrino della frutta?','Posso pagare la frutta?'],'La risposta chiede correttamente la posizione di un reparto.','Dov’è il reparto dei prodotti freschi?'],
['Hai bisogno di mezzo chilo di formaggio. Cosa dici al banco?','Vorrei mezzo chilo di formaggio.',['Vorrei mezzo litro di formaggio.','Cerco una cassa di formaggio.','Dov’è il carrello del formaggio?'],'La risposta usa una quantità corretta e una richiesta naturale.','Vorrei un chilo di patate, per favore.']
];
function buildRole(){return repeat100(roleBase.map(x=>({kind:'role',prompt:x[0],correct:x[1],options:opts(x[1],x[2]),feedback:fb(x[3],x[4])})))}

const situationsBase=[
['Il prezzo alla cassa è più alto di quello che hai visto sullo scaffale.','Chiedi gentilmente di controllare il prezzo.',['Lasci tutto e vai via senza dire nulla.','Prendi un altro carrello.','Chiedi un sacchetto più grande.'],'È utile chiedere di verificare la differenza prima di pagare.','Scusi, possiamo controllare il prezzo sullo scaffale?'],
['Non trovi un prodotto nella corsia indicata.','Chiedi aiuto a un commesso.',['Aspetti alla cassa.','Metti un prodotto a caso nel carrello.','Lasci il supermercato.'],'Il commesso può indicarti il reparto o la posizione precisa.','Scusi, non trovo la farina. Mi può aiutare?'],
['Hai comprato troppe cose e il sacchetto è pesante.','Usa un secondo sacchetto o chiedine uno più resistente.',['Metti tutto in una bottiglia.','Lasci i prodotti alla cassa.','Chiedi di cambiare il prezzo.'],'Dividere il peso rende più facile trasportare la spesa.','Mi dà un altro sacchetto, per favore?'],
['Vuoi comprare un prodotto, ma non sai se contiene latte.','Controlla l’etichetta o chiedi informazioni.',['Lo compri senza controllare.','Lo metti nel reparto frutta.','Chiedi dove sono i carrelli.'],'L’etichetta o il personale possono aiutarti a capire gli ingredienti.','Questo prodotto contiene latte?'],
['Alla cassa ti accorgi di aver dimenticato il portafoglio.','Spiega subito la situazione al cassiere.',['Nascondi il prodotto.','Lasci la spesa senza dire nulla.','Paghi con lo scontrino.'],'È la soluzione più corretta e trasparente.','Mi dispiace, ho dimenticato il portafoglio.'],
['Cerchi un prodotto in offerta.','Controlla il cartello del prezzo e l’etichetta dell’offerta.',['Prendi il primo prodotto senza guardare.','Chiedi il prezzo del carrello.','Vai direttamente all’uscita.'],'L’offerta deve essere verificata sul prodotto corretto.','È in offerta? Qual è il prezzo?'],
['Hai bisogno di 300 grammi di formaggio al banco.','Indica chiaramente la quantità.',['Chiedi tre litri.','Prendi una bottiglia vuota.','Chiedi una cassa.'],'Per i prodotti venduti a peso è importante indicare la quantità.','Vorrei tre etti di formaggio, per favore.'],
['Vuoi sapere se puoi pagare con la carta.','Chiedilo prima di concludere il pagamento.',['Metti la carta nel carrello.','Chiedi al reparto frutta.','Cerchi uno scontrino prima di comprare.'],'Così sai subito quale metodo di pagamento puoi usare.','Posso pagare con la carta?']
];
function buildSituations(){return repeat100(situationsBase.map(x=>({kind:'situation',prompt:x[0],correct:x[1],options:opts(x[1],x[2]),feedback:fb(x[3],x[4])})))}

const verbsBase=[
['Ogni sabato io ___ la spesa al supermercato.','faccio',['fai','fa','fanno']],
['Prima di uscire, ___ la lista della spesa.','controllo',['controlli','controlla','controllano']],
['Di solito noi ___ il carrello all’ingresso.','prendiamo',['prendete','prende','prendono']],
['Marta ___ il prezzo prima di comprare.','controlla',['controllo','controlli','controllano']],
['Voi ___ con la carta alla cassa?','pagate',['paghiamo','paga','pagano']],
['Io ___ il pane nel reparto panetteria.','cerco',['cerchi','cerca','cercano']],
['Loro ___ due chili di patate.','comprano',['compro','comprate','compra']],
['Tu ___ il latte nel carrello?','metti',['metto','mette','mettono']],
['Noi ___ il conto prima di pagare.','controlliamo',['controllate','controlla','controllano']],
['Io ___ un sacchetto, per favore.','chiedo',['chiedi','chiede','chiedono']],
['Il commesso ___ dove si trova il reparto.','spiega',['spiego','spieghi','spiegano']],
['Voi ___ spesso al mercato?','andate',['andiamo','va','vanno']],
['Lei ___ le mele una per una.','sceglie',['scelgo','scegli','scelgono']],
['Io ___ la lista prima di uscire.','preparo',['prepari','prepara','preparano']],
['Noi ___ i prodotti nelle borse.','mettiamo',['mettete','mette','mettono']],
['Tu ___ il prezzo sullo scaffale?','leggi',['leggo','legge','leggono']],
['Loro ___ il pane fresco ogni giorno.','comprano',['compro','comprate','compra']],
['Io ___ se questo prodotto è senza zucchero.','chiedo',['chiedi','chiede','chiedono']],
['Mia madre ___ la spesa online.','fa',['faccio','fai','fanno']],
['Noi ___ lo scontrino dopo aver pagato.','prendiamo',['prendete','prende','prendono']]
];
function buildVerbs(){return repeat100(verbsBase.map(x=>({kind:'mc',prompt:x[0],correct:x[1],options:opts(x[1],x[2]),feedback:fb(`La forma corretta è “${x[1]}”.`,`Per esempio: ${x[1].charAt(0).toUpperCase()+x[1].slice(1)} quando facciamo la spesa.`)})))}

const flashBase=terms.map(([word,ua,example,definition])=>({kind:'flash',word,ua,example,definition}));
function buildFlash(){return repeat100(flashBase)}

const info={
 mixed:['🎯 Quiz misto','Lessico della spesa e significati nel contesto.'],guess:['💡 Indovina la parola','Leggi la descrizione e trova il prodotto.'],intruso:['🕵️ Trova l’intruso','Quale parola non appartiene al gruppo?'],complete:['✏️ Completa la frase','Scegli la parola che completa la situazione.'],roleplay:['🛍️ Giochi di ruolo','Situazioni reali da vivere al supermercato e nei negozi.'],situations:['💡 Situazioni da risolvere','Leggi la situazione e scegli cosa fare o dire.'],verbs:['⚙️ Verbi della spesa','Scegli la forma verbale corretta nel contesto.'],flashcard:['🗂️ Flashcard','Italiano → ucraino → spiegazione ed esempio.']};
const builders={mixed:buildMixed,guess:buildGuess,intruso:buildIntruso,complete:buildComplete,roleplay:buildRole,situations:buildSituations,verbs:buildVerbs,flashcard:buildFlash};
const type=new URLSearchParams(location.search).get('type')||'mixed';
const questions=shuffle(builders[type]?builders[type]():buildMixed()).slice(0,S);
let index=0,score=0,answered=false;
const $=id=>document.getElementById(id);
function renderHeader(){ $('eyebrow').textContent=info[type][0]; $('title').textContent=info[type][0].replace(/^\S+\s/,''); $('subtitle').textContent=info[type][1]; }
function render(){answered=false;$('feedback').className='feedback';$('feedback').innerHTML='';$('progressText').textContent=`${index+1} / ${S}`;$('fill').style.width=`${((index+1)/S)*100}%`;const q=questions[index];$('typeLabel').textContent=info[type][0];$('prev').disabled=index===0;$('next').textContent=index===S-1?'Termina':'Avanti →';if(q.kind==='flash'){renderFlash(q);return}if(q.kind==='intruso'){renderIntruso(q);return}renderMC(q)}
function renderMC(q){$('content').innerHTML=`<div class="question">${(type==='roleplay'?'Що ти скажеш у цій ситуації?':type==='situations'?'Що ти зробиш у цій ситуації?':q.prompt)}</div>${(type==='roleplay'||type==='situations')?`<div class="context">(${q.prompt})</div>`:``}<div class="answers">${q.options.map(o=>`<button class="answer">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answer(q,b));}
function renderIntruso(q){$('content').innerHTML=`<div class="question">${q.prompt}</div><div class="answers">${shuffle(q.choices).map(o=>`<button class="answer">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answer(q,b));}
function answer(q,b){if(answered)return;answered=true;const ok=b.textContent===q.correct;if(ok)score++;document.querySelectorAll('.answer').forEach(x=>{x.disabled=true;if(x.textContent===q.correct)x.classList.add('correct')});if(!ok)b.classList.add('wrong');showFeedback(ok,q.feedback)}
function showFeedback(ok,f){$('feedback').className=`feedback show ${ok?'good':'bad'}`;$('feedback').innerHTML=`<strong>${ok?'✓ Corretto':'✕ Non è la risposta corretta'}</strong><div>${f.why}</div><div class="example">Esempio reale: <em>${f.example}</em></div>`}
function renderFlash(q){$('content').innerHTML=`<div class="flashcard" tabindex="0" id="flashcard"><div class="flash-inner"><div class="flash-face flash-front"><div>${q.word}</div><small>Clicca per girare</small></div><div class="flash-face flash-back"><div class="uk">${q.ua}</div><div class="definition">${q.definition}</div><div class="example">${q.example}</div><small>Clicca per tornare indietro</small></div></div></div><div class="flash-hint">Tocca la carta per vedere la traduzione e l’esempio.</div>`;const c=$('flashcard');c.onclick=()=>c.classList.toggle('flipped');c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();c.classList.toggle('flipped')}}}
$('prev').onclick=()=>{if(index>0){index--;render()}};$('next').onclick=()=>{if(index<S-1){index++;render()}else{finish()}};
function finish(){$('card').style.display='none';$('end').classList.add('show');$('score').textContent=`Hai risposto correttamente a ${score} domande su ${S}.`}
renderHeader();render();
