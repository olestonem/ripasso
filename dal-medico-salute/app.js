const terms = [
['appuntamento','запис на прийом','Ho un appuntamento dal medico alle dieci.','Ora e momento concordati per una visita.'],
['medico di base','сімейний лікар','Chiamo il medico di base perché ho la febbre.','Medico di riferimento per i problemi di salute comuni.'],
['medico','лікар','Il medico mi visita e mi fa alcune domande.','Professionista sanitario che valuta e cura i problemi di salute.'],
['paziente','пацієнт','Il paziente aspetta il suo turno in sala d’attesa.','Persona che riceve cure o una visita sanitaria.'],
['visita','огляд / прийом','Domani ho una visita dal medico.','Controllo sanitario fatto da un professionista.'],
['visita specialistica','прийом у спеціаліста','Ho bisogno di una visita specialistica.','Visita effettuata da un medico specializzato in un settore.'],
['specialista','лікар-спеціаліст','Il medico mi ha consigliato uno specialista.','Medico con competenze specifiche in una branca della medicina.'],
['ambulatorio','амбулаторія / кабінет','L’ambulatorio è al primo piano.','Luogo in cui si effettuano visite e prestazioni sanitarie.'],
['sala d’attesa','зал очікування','Aspetto il medico in sala d’attesa.','Spazio dove i pazienti aspettano prima della visita.'],
['ricetta','рецепт','Il medico mi ha fatto una ricetta per il farmaco.','Documento con cui il medico prescrive una terapia o un farmaco.'],
['prescrizione','призначення','Seguo la prescrizione del medico.','Indicazione professionale su una cura o un farmaco.'],
['farmacia','аптека','Vado in farmacia a comprare il medicinale.','Luogo dove si vendono farmaci e altri prodotti sanitari.'],
['farmacista','фармацевт','Il farmacista mi spiega come usare il medicinale.','Professionista che lavora in farmacia e fornisce indicazioni sui farmaci.'],
['farmaco','лікарський препарат','Devo prendere questo farmaco dopo cena.','Sostanza o preparato usato per prevenire o curare una malattia.'],
['medicinale','ліки','Il medicinale deve essere conservato lontano dal calore.','Prodotto usato per trattare o prevenire un problema di salute.'],
['dose','доза','Qual è la dose indicata?','Quantità di farmaco da assumere in una volta o in un certo periodo.'],
['compressa','таблетка','Prendo una compressa con un bicchiere d’acqua.','Forma solida di un medicinale.'],
['sciroppo','сироп','Per la tosse mi hanno dato uno sciroppo.','Medicinale liquido, spesso usato per la tosse.'],
['gocce','краплі','Devo mettere tre gocce nell’orecchio.','Piccole quantità liquide somministrate una goccia alla volta.'],
['crema','крем','Applico la crema sulla pelle due volte al giorno.','Preparato morbido da applicare sulla pelle.'],
['cerotto','пластир','Metto un cerotto sul piccolo taglio.','Materiale adesivo usato per proteggere una piccola ferita.'],
['termometro','термометр','Misuro la temperatura con il termometro.','Strumento che misura la temperatura corporea.'],
['febbre','температура / жар','Ho la febbre da ieri sera.','Aumento della temperatura corporea rispetto al normale.'],
['temperatura','температура','La temperatura è di 38 gradi.','Valore che indica quanto è calda una persona o una sostanza.'],
['mal di testa','головний біль','Ho mal di testa e faccio fatica a concentrarmi.','Dolore localizzato nella zona della testa.'],
['mal di gola','біль у горлі','Ho mal di gola quando deglutisco.','Dolore o irritazione nella gola.'],
['mal di pancia','біль у животі','Ho mal di pancia dopo aver mangiato.','Dolore nella zona dell’addome.'],
['mal di schiena','біль у спині','Ho mal di schiena dopo aver lavorato tutto il giorno.','Dolore nella zona della schiena.'],
['tosse','кашель','La tosse non mi lascia dormire.','Reazione che provoca una forte espulsione d’aria dalle vie respiratorie.'],
['raffreddore','застуда','Ho il raffreddore e il naso chiuso.','Disturbo comune con naso chiuso, starnuti e secrezioni nasali.'],
['naso chiuso','закладений ніс','Con il raffreddore ho il naso chiuso.','Situazione in cui è difficile respirare attraverso il naso.'],
['nausea','нудота','Ho avuto nausea durante il viaggio.','Sensazione che precede o accompagna il bisogno di vomitare.'],
['vomito','блювання','Dopo il vomito mi sento molto debole.','Espulsione del contenuto dello stomaco attraverso la bocca.'],
['diarrea','діарея','Ho avuto diarrea per tutta la notte.','Disturbo caratterizzato da evacuazioni frequenti e liquide.'],
['capogiro','запаморочення','Ho avuto un capogiro quando mi sono alzato.','Sensazione di instabilità o di perdita momentanea dell’equilibrio.'],
['stanchezza','втома','Sento molta stanchezza da alcuni giorni.','Sensazione di mancanza di energia.'],
['debolezza','слабкість','Dopo la febbre ho ancora un po’ di debolezza.','Riduzione della forza fisica o della sensazione di energia.'],
['dolore','біль','Il dolore è aumentato durante la notte.','Sensazione fisica spiacevole legata a un problema o a una lesione.'],
['ferita','рана','La ferita deve essere pulita con attenzione.','Lesione di una parte del corpo, spesso della pelle.'],
['taglio','поріз','Mi sono fatto un piccolo taglio con il coltello.','Ferita causata da un oggetto affilato.'],
['bruciatura','опік','Ho una piccola bruciatura sulla mano.','Lesione provocata dal calore o da una sostanza molto calda.'],
['gonfiore','набряк','Ho notato un gonfiore alla caviglia.','Aumento del volume di una parte del corpo.'],
['livido','синець','Ho un livido sul braccio dopo la caduta.','Macchia sulla pelle causata da un piccolo trauma.'],
['prurito','свербіж','Questa crema mi provoca prurito.','Sensazione che porta a voler grattare la pelle.'],
['rash','висип','È comparso un rash sulla pelle.','Comparsa di alterazioni o macchie sulla pelle.'],
['allergia','алергія','Ho un’allergia alla polvere.','Reazione dell’organismo a una sostanza normalmente innocua.'],
['sintomo','симптом','La febbre è un sintomo comune.','Manifestazione percepita o osservata che può indicare un problema di salute.'],
['diagnosi','діагноз','Il medico deve fare una diagnosi.','Identificazione di una malattia o di un problema di salute.'],
['analisi del sangue','аналіз крові','Domani faccio le analisi del sangue.','Esame di laboratorio effettuato su un campione di sangue.'],
['esame','обстеження / аналіз','Il medico mi ha prescritto un esame.','Controllo o procedura usata per raccogliere informazioni sulla salute.'],
['radiografia','рентген','Devo fare una radiografia al braccio.','Esame che usa raggi X per osservare alcune strutture interne del corpo.'],
['ecografia','УЗД','L’ecografia serve a controllare l’addome.','Esame che usa ultrasuoni per visualizzare strutture interne.'],
['pressione','тиск','Il medico mi misura la pressione.','Forza esercitata dal sangue sulle pareti dei vasi sanguigni.'],
['battito','пульс / серцебиття','Il battito è regolare.','Ritmo delle contrazioni del cuore percepibile come pulsazione.'],
['respirare','дихати','Faccio fatica a respirare quando salgo le scale.','Inspirare ed espirare aria.'],
['deglutire','ковтати','Mi fa male deglutire.','Far passare cibo o liquidi dalla bocca alla gola.'],
['guarire','одужувати','Dopo alcuni giorni ho iniziato a guarire.','Tornare in buona salute dopo una malattia o una ferita.'],
['riprendersi','одужувати / відновлюватися','Dopo l’influenza devo riprendermi con calma.','Recuperare le forze o una condizione normale dopo una malattia.'],
['curare','лікувати','Il medico deve curare l’infezione.','Seguire una terapia per migliorare o risolvere un problema di salute.'],
['controllare','перевіряти / контролювати','Devo controllare la temperatura ogni sera.','Verificare una condizione o un valore.'],
['prenotare','записуватися / бронювати','Devo prenotare una visita.','Fissare in anticipo un appuntamento o un servizio.'],
['assumere','приймати (ліки)','Devo assumere il farmaco dopo i pasti.','Prendere un farmaco secondo le indicazioni ricevute.'],
['applicare','наносити','Applico la crema sulla zona interessata.','Mettere un prodotto su una parte del corpo.'],
['misurare','вимірювати','Misuro la febbre con il termometro.','Determinare un valore, come temperatura o pressione.'],
['riposo','відпочинок','Il medico mi ha consigliato qualche giorno di riposo.','Condizione di pausa e recupero delle energie.'],
['pronto soccorso','відділення невідкладної допомоги','Andiamo al pronto soccorso perché il dolore è molto forte.','Servizio ospedaliero per problemi urgenti.'],
['emergenza','надзвичайна ситуація','In caso di emergenza chiama il numero di soccorso.','Situazione improvvisa che richiede un intervento rapido.'],
['ambulanza','швидка допомога','Hanno chiamato un’ambulanza.','Veicolo attrezzato per trasportare e assistere persone malate o ferite.'],
['numero di emergenza','номер екстреної допомоги','In caso di emergenza chiama il numero di emergenza.','Numero telefonico da usare per chiedere soccorso.'],
['vaccino','вакцина','Ho fatto il vaccino prima del viaggio.','Preparazione che stimola una risposta immunitaria contro una malattia.'],
['vaccinazione','вакцинація','La vaccinazione è stata fatta ieri.','Somministrazione di un vaccino.'],
['certificato medico','медична довідка','Mi serve un certificato medico per il lavoro.','Documento rilasciato da un medico che attesta una condizione o una visita.'],
['intolleranza','непереносимість','Ho un’intolleranza al lattosio.','Difficoltà dell’organismo a tollerare una determinata sostanza.'],
['dieta','дієта / харчування','Il medico mi ha consigliato una dieta leggera.','Regime alimentare seguito per motivi di salute o di alimentazione.'],
['igiene','гігієна','Una buona igiene delle mani aiuta a prevenire alcune infezioni.','Insieme di pratiche per mantenere pulizia e salute.'],
['infezione','інфекція','Il medico sospetta un’infezione.','Presenza e moltiplicazione di agenti infettivi nell’organismo.'],
['infiammazione','запалення','C’è un’infiammazione alla gola.','Reazione del corpo a un danno o a un’infezione.'],
['infortunio','травма / нещасний випадок','Ha avuto un infortunio durante lo sport.','Danno fisico causato da un incidente o da un’attività.'],
['stampella','милиця','Cammina con una stampella dopo l’infortunio.','Supporto usato per aiutare una persona a camminare.'],
['cerotto medicato','лікувальний пластир','Metto un cerotto medicato sulla ferita.','Cerotto contenente una sostanza o destinato alla cura locale.']
];

const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const $=id=>document.getElementById(id);
function pool100(arr){const out=[];for(let i=0;i<100;i++)out.push({...arr[i%arr.length],id:i});return out;}
function uniqueOptions(correct, pool){return shuffle([correct,...shuffle(pool.filter(x=>x!==correct)).slice(0,3)]);}
function fb(why,example){return {why,example};}

function buildFlash(){return pool100(terms.map(t=>({kind:'flash',word:t[0],uk:t[1],example:t[2],feedback:fb('',t[2])})));}

const guessBase=[
['È il documento che permette di identificare una persona durante una visita.','documento'],
['È il luogo dove si acquistano farmaci e si chiede consiglio al farmacista.','farmacia'],
['È il controllo sanitario effettuato da un medico.','visita'],
['È la sensazione che porta a voler grattare la pelle.','prurito'],
['È l’aumento della temperatura corporea rispetto al normale.','febbre'],
['È il dolore localizzato nella zona della testa.','mal di testa'],
['È una lesione causata da un oggetto affilato.','taglio'],
['È il valore che indica quanto è alta la temperatura corporea.','temperatura'],
['È un esame che usa i raggi X.','radiografia'],
['È la sensazione di instabilità o di perdita momentanea dell’equilibrio.','capogiro'],
['È il luogo ospedaliero per problemi urgenti.','pronto soccorso'],
['È il veicolo che trasporta e assiste persone malate o ferite.','ambulanza'],
['È la quantità di farmaco da assumere in una volta.','dose'],
['È il documento con cui un medico prescrive una terapia.','ricetta'],
['È la perdita di energia che può comparire dopo una malattia.','stanchezza'],
['È l’identificazione di una malattia o di un problema di salute.','diagnosi'],
['È il controllo di un campione di sangue in laboratorio.','analisi del sangue'],
['È il preparato che si applica sulla pelle.','crema'],
['È il ritorno alla salute dopo una malattia o una ferita.','guarigione'],
['È una reazione dell’organismo a una sostanza come polline o polvere.','allergia']
];
function buildGuess(){return pool100(guessBase.map((g,i)=>{const distract=guessBase.map(x=>x[1]);return {kind:'mc',prompt:g[0],correct:g[1],options:uniqueOptions(g[1],distract),feedback:fb(`La definizione descrive proprio “${g[1]}”.`,`Per esempio: Il medico mi ha spiegato come usare ${g[1]}.`),id:i};}));}

const intrusoBase=[
[['febbre','tosse','raffreddore','stazione'],'stazione'],
[['farmacia','farmacista','ricetta','aeroporto'],'aeroporto'],
[['radiografia','ecografia','analisi del sangue','valigia'],'valigia'],
[['mal di testa','mal di gola','mal di schiena','binario'],'binario'],
[['compressa','sciroppo','gocce','marciapiede'],'marciapiede'],
[['medico','paziente','specialista','bagaglio'],'bagaglio'],
[['ferita','taglio','livido','biglietto'],'biglietto'],
[['ambulanza','pronto soccorso','emergenza','albergo'],'albergo'],
[['pressione','battito','temperatura','destinazione'],'destinazione'],
[['prenotare','assumere','applicare','viaggiare'],'viaggiare'],
[['sintomo','diagnosi','terapia','binario'],'binario'],
[['igiene','vaccinazione','dieta','parcheggio'],'parcheggio'],
[['nausea','vomito','diarrea','check-in'],'check-in'],
[['prurito','rash','gonfiore','autostrada'],'autostrada'],
[['cerotto','crema','compressa','passaporto'],'passaporto'],
[['visita','appuntamento','ambulatorio','gate'],'gate'],
[['infezione','infiammazione','allergia','coincidenza'],'coincidenza'],
[['guarire','curare','riprendersi','partire'],'partire']
];
function buildIntruso(){return pool100(intrusoBase.map((x,i)=>({kind:'intruso',prompt:'Quale parola non appartiene al gruppo?',options:x[0],correct:x[1],feedback:fb(`Le altre parole appartengono allo stesso campo semantico della salute.`,`Per esempio: ${x[0].filter(w=>w!==x[1])[0]} è un termine utile quando si parla di salute.`),id:i})));}

const completeBase=[
['Se hai la febbre, devi ___ la temperatura.','misurare',['controllare','prenotare','curare']],
['Prima della visita devo ___ un appuntamento.','prenotare',['assumere','applicare','misurare']],
['Il medico mi ha dato una ___ per il farmaco.','ricetta',['diagnosi','visita','dose']],
['Prendo una ___ dopo pranzo.','compressa',['radiografia','stampella','ambulanza']],
['Per la tosse mi hanno consigliato uno ___.','sciroppo',['cerotto','specialista','ambulatorio']],
['Mi fa male ___ quando mangio.','deglutire',['respirare','guarire','misurare']],
['Dopo l’influenza ho bisogno di molto ___.','riposo',['rash','pedaggio','controllo']],
['Il medico vuole fare una ___ al braccio.','radiografia',['ricetta','dieta','prenotazione']],
['Se il dolore è molto forte, puoi andare al ___.','pronto soccorso',['farmacista','ambulatorio','termometro']],
['Ho un’___ alla polvere.','allergia',['infezione','intolleranza','infiammazione']],
['Il farmacista mi spiega qual è la ___.','dose',['ferita','diagnosi','pressione']],
['Metto un ___ sul piccolo taglio.','cerotto',['sciroppo','termometro','certificato medico']],
['Dopo la caduta ho un ___ sul braccio.','livido',['sintomo','capogiro','rash']],
['Il medico mi misura la ___.','pressione',['temperatura','dose','goccia']],
['La ___ permette al medico di capire quale problema hai.','diagnosi',['prenotazione','ricetta','vaccinazione']],
['Per prevenire alcune malattie si può fare una ___.','vaccinazione',['radiografia','visita','prescrizione']],
['Se non riesci a respirare, chiama subito i soccorsi in caso di ___.','emergenza',['appuntamento','riposo','intolleranza']],
['Applico la ___ sulla zona irritata.','crema',['compressa','ricetta','radiografia']],
['Dopo la malattia devo ___ gradualmente.','riprendermi',['deglutire','applicare','prenotare']],
['Il medico mi consiglia una ___ leggera per qualche giorno.','dieta',['diagnosi','dose','ferita']]
];
function buildComplete(){return pool100(completeBase.map((x,i)=>({kind:'mc',prompt:x[0],correct:x[1],options:uniqueOptions(x[1],[...x[2],...completeBase.map(y=>y[1])]),feedback:fb(`“${x[1]}” è la parola che completa correttamente la situazione.`,`Per esempio: ${x[1].charAt(0).toUpperCase()+x[1].slice(1)} è una parola molto usata quando si parla di salute.`),id:i})));}

const roleplayBase=[
['Sei in farmacia. Hai mal di gola e vuoi sapere quale prodotto può aiutarti.','Cosa dici?','Buongiorno, ho mal di gola. Cosa mi consiglia?','È una richiesta chiara: spieghi il problema e chiede un consiglio.','Per esempio: Ho una tosse forte. Avete qualcosa per alleviarla?'],
['Sei dal medico. Da ieri hai febbre e ti senti debole.','Cosa dici?','Da ieri ho la febbre e mi sento molto debole.','È utile indicare da quanto tempo hai i sintomi e come ti senti.','Per esempio: Ho mal di testa da questa mattina.'],
['Devi prenotare una visita specialistica al telefono.','Cosa dici?','Vorrei prenotare una visita specialistica, per favore.','La richiesta indica chiaramente il servizio che vuoi prenotare.','Per esempio: Vorrei fissare un appuntamento per la prossima settimana.'],
['Il farmacista ti chiede se hai già preso il farmaco.','Come rispondi?','No, non l’ho ancora preso.','Rispondi in modo preciso alla domanda sul farmaco.','Per esempio: Sì, l’ho già preso dopo cena.'],
['Sei in sala d’attesa e vuoi sapere quanto manca alla visita.','Cosa dici?','Scusi, sa dirmi quanto devo ancora aspettare?','È una richiesta educata di informazione.','Per esempio: Mi scusi, il medico è già disponibile?'],
['Il medico ti chiede quali sintomi hai.','Cosa dici?','Ho tosse, mal di gola e un po’ di febbre.','Elencare i sintomi aiuta il medico a capire la situazione.','Per esempio: Ho nausea e mal di pancia da ieri.'],
['Hai bisogno di un certificato medico.','Cosa dici al medico?','Avrei bisogno di un certificato medico, per favore.','Indichi direttamente il documento di cui hai bisogno.','Per esempio: Mi serve un certificato per il lavoro.'],
['Il medico ti consiglia di riposare. Vuoi chiedere per quanto tempo.','Cosa dici?','Per quanti giorni devo riposare?','La domanda serve a ottenere un’indicazione concreta.','Per esempio: Per quanto tempo devo evitare attività fisica?'],
['Hai dimenticato come assumere un farmaco.','Cosa dici al farmacista?','Mi può ricordare come devo assumere questo farmaco?','Chiedere conferma è più sicuro che indovinare la dose.','Per esempio: Devo prenderlo prima o dopo i pasti?'],
['Hai una piccola ferita e vuoi chiedere dove comprare un cerotto.','Cosa dici?','Dove posso trovare dei cerotti?','La richiesta è semplice e adatta alla situazione.','Per esempio: Avete dei cerotti resistenti all’acqua?'],
['Hai un appuntamento ma devi spostarlo.','Cosa dici alla segreteria?','Vorrei spostare il mio appuntamento, se possibile.','Comunichi il cambiamento in modo chiaro e cortese.','Per esempio: È possibile cambiare l’orario della visita?'],
['Il medico ti chiede se hai allergie.','Come rispondi?','Sì, sono allergico alla polvere.','Dai un’informazione importante per la valutazione e la terapia.','Per esempio: No, non ho allergie conosciute.']
];
function buildRoleplay(){return pool100(roleplayBase.map((x,i)=>({kind:'mc',prompt:`${x[0]} ${x[1]}`,correct:x[2],options:uniqueOptions(x[2],roleplayBase.map(y=>y[2])),feedback:fb(x[3],x[4]),id:i})));}

const situationsBase=[
['Hai 39°C di febbre e ti senti molto debole.','Qual è la scelta più utile?','Contattare un professionista sanitario e descrivere i sintomi.','Per esempio: Indica da quanto tempo hai la febbre e se hai altri sintomi.'],
['Hai una piccola ferita che continua a sanguinare.','Cosa fai?','Chiedere assistenza se il sanguinamento non si ferma o la ferita è importante.','Per esempio: Per una ferita lieve puoi seguire le indicazioni ricevute per pulirla e proteggerla.'],
['Hai dimenticato di prendere un farmaco e non sai cosa fare.','Cosa fai?','Chiedere al medico o al farmacista come comportarti.','Per esempio: Non raddoppiare una dose senza aver ricevuto indicazioni.'],
['Hai un forte dolore al petto e difficoltà a respirare.','Cosa fai?','Richiedere immediatamente assistenza di emergenza.','Per esempio: In una situazione urgente chiama il numero di emergenza.'],
['Hai un appuntamento dal medico ma non puoi andare.','Cosa fai?','Contattare l’ambulatorio per spostare o cancellare l’appuntamento.','Per esempio: Avvisa appena possibile se devi cambiare giorno.'],
['Hai un rash comparso dopo aver usato un nuovo prodotto.','Cosa fai?','Descrivere il problema a un professionista sanitario e indicare il prodotto usato.','Per esempio: Porta con te il nome o la confezione del prodotto.'],
['Hai mal di gola e vuoi comprare qualcosa in farmacia.','Cosa fai?','Descrivere i sintomi al farmacista e chiedere un consiglio.','Per esempio: Spiega anche da quanto tempo hai il mal di gola.'],
['Dopo alcuni giorni di malattia ti senti ancora molto debole.','Cosa fai?','Contattare il medico se i sintomi persistono o peggiorano.','Per esempio: Racconta quali sintomi sono rimasti e da quanto tempo.'],
['Devi fare un esame ma non sai come prepararti.','Cosa fai?','Chiedere alla struttura quali preparazioni sono necessarie.','Per esempio: Verifica se devi essere a digiuno.'],
['Hai una nuova terapia e non ricordi gli orari.','Cosa fai?','Controllare la prescrizione e chiedere chiarimenti al professionista.','Per esempio: Puoi chiedere se il farmaco va assunto prima o dopo i pasti.'],
['Hai un’allergia nota e devi iniziare un nuovo farmaco.','Cosa fai?','Informare il medico o il farmacista della tua allergia prima di assumerlo.','Per esempio: Tieni a portata di mano le informazioni sulle allergie conosciute.'],
['Hai bisogno di un certificato medico per il lavoro.','Cosa fai?','Chiedere al medico come ottenere il certificato necessario.','Per esempio: Spiega per quale motivo ti serve il documento.']
];
function buildSituations(){return pool100(situationsBase.map((x,i)=>({kind:'mc',prompt:`${x[0]} ${x[1]}`,correct:x[2],options:uniqueOptions(x[2],situationsBase.map(y=>y[2])),feedback:fb('La risposta è coerente con una gestione prudente della situazione.',x[3]),id:i})));}

const verbs=[
['prenotare','Io ___ una visita dal dentista per lunedì.','prenoto',['prenota','prenotiamo','prenotare']],
['avere','Lei ___ la febbre da ieri sera.','ha',['hanno','hai','avere']],
['sentire','Io ___ un forte dolore alla schiena.','sento',['sente','sentono','sentire']],
['misurare','Noi ___ la temperatura ogni sera.','misuriamo',['misura','misurate','misurare']],
['assumere','Tu ___ il farmaco dopo i pasti?','assumi',['assume','assumete','assumere']],
['applicare','Lei ___ la crema sulla zona irritata.','applica',['applicano','applichiamo','applicare']],
['respirare','Io ___ con difficoltà quando corro.','respiro',['respira','respirano','respirare']],
['deglutire','Lui ___ con dolore.','deglutisce',['deglutiscono','deglutiamo','deglutire']],
['curare','Il medico ___ l’infezione.','cura',['curano','curiamo','curare']],
['controllare','Voi ___ la pressione a casa?','controllate',['controlla','controllano','controllare']],
['guarire','Dopo la terapia lei ___ lentamente.','guarisce',['guariscono','guariamo','guarire']],
['riprendersi','Dopo l’influenza noi ___ con calma.','ci riprendiamo',['si riprende','vi riprendete','riprendersi']],
['chiamare','In caso di emergenza loro ___ i soccorsi.','chiamano',['chiama','chiamiamo','chiamare']],
['prenotare','Voi ___ un appuntamento per domani?','prenotate',['prenota','prenotano','prenotare']],
['fare','Io ___ le analisi del sangue domani.','faccio',['fa','fanno','fare']],
['essere','Il paziente ___ già in sala d’attesa.','è',['sono','sei','essere']],
['dovere','Tu ___ seguire la prescrizione del medico.','devi',['deve','dovete','dovere']],
['potere','Noi ___ chiamare il medico oggi.','possiamo',['può','potete','potere']]
];
function buildVerbs(){return pool100(verbs.map((v,i)=>({kind:'mc',prompt:v[1],correct:v[2],options:uniqueOptions(v[2],v[3]),feedback:fb(`La forma corretta è “${v[2]}” e concorda con il soggetto della frase.`,`Per esempio: ${v[0].charAt(0).toUpperCase()+v[0].slice(1)} è un verbo molto usato quando si parla di salute.`),id:i})));}

function makeMixed(){const sets=[buildGuess(),buildComplete(),buildIntruso(),buildRoleplay(),buildSituations(),buildVerbs()];const pool=[];sets.forEach(s=>s.forEach(q=>pool.push(q)));return pool100(pool.slice(0,100));}

const typeInfo={
flashcard:['🗂️ Flashcard','Italiano → ucraino → spiegazione ed esempio.'],
verbs:['⚙️ Verbi della salute','Scegli la forma verbale corretta nel contesto.'],
intruso:['🕵️ Trova l’intruso','Scegli direttamente la parola che non appartiene al gruppo.'],
mixed:['🎯 Quiz misto','Lessico e situazioni diverse, sempre una domanda alla volta.'],
guess:['💡 Indovina la parola','Leggi la descrizione e trova la parola.'],
complete:['✏️ Completa la frase','Scegli la parola che completa meglio la frase.'],
roleplay:['🎫 Giochi di ruolo','Scegli cosa dire in una situazione reale.'],
situations:['💡 Situazioni da risolvere','Leggi la situazione e scegli cosa fare o dire.']};
const builders={flashcard:buildFlash,verbs:buildVerbs,intruso:buildIntruso,mixed:makeMixed,guess:buildGuess,complete:buildComplete,roleplay:buildRoleplay,situations:buildSituations};
const params=new URLSearchParams(location.search);let type=params.get('type')||'mixed';if(!builders[type])type='mixed';let all=builders[type]();let session=shuffle(all).slice(0,15);let pos=0;let score=0;let answered=Array(15).fill(null);
$('title').textContent=typeInfo[type][0];$('subtitle').textContent=typeInfo[type][1];$('eyebrow').textContent=typeInfo[type][0];
function updateProgress(){$('progressText').textContent=`${pos+1} / 15`;$('fill').style.width=`${((pos+1)/15)*100}%`;$('prev').disabled=pos===0;$('next').textContent=pos===14?'Fine →':'Avanti →'}
function render(){const q=session[pos];$('feedback').className='feedback';$('feedback').innerHTML='';$('content').innerHTML='';$('typeLabel').textContent=typeInfo[type][0];updateProgress();
if(q.kind==='flash'){const card=document.createElement('div');card.className='flashcard';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Gira la flashcard');card.innerHTML=`<div class="flash-inner"><div class="flash-face flash-front"><div>${q.word}<small>Premi per girare la carta</small></div></div><div class="flash-face flash-back"><div class="uk">${q.uk}</div><div class="example">${q.example}</div></div></div>`;const flip=()=>{card.classList.toggle('flipped');answered[pos]={viewed:true}};card.onclick=flip;card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()}};$('content').appendChild(card);const hint=document.createElement('div');hint.className='small-hint';hint.textContent='Premi la carta per vedere la traduzione in ucraino e un esempio.';$('content').appendChild(hint);if(answered[pos])card.classList.add('flipped');return}
$('content').innerHTML=`<div class="question">${q.prompt}</div><div class="answers"></div>`;const answers=$('content').querySelector('.answers');shuffle(q.options).forEach(opt=>{const b=document.createElement('button');b.className='answer';b.textContent=opt;b.onclick=()=>answer(q,opt,b);answers.appendChild(b)});if(answered[pos])restore(q);}
function answer(q,opt,btn){if(answered[pos])return;const ok=opt===q.correct;answered[pos]={ok,correct:q.correct,selected:opt};if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.textContent===q.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');const fbEl=$('feedback');fbEl.className='feedback '+(ok?'good':'bad')+' show';fbEl.innerHTML=`<strong>${ok?'✓ Corretto!':'✗ Non proprio.'}</strong>${ok?'Ottima scelta.':'La risposta corretta è <em>'+q.correct+'</em>.'} ${q.feedback?.why||''}<br><strong>Esempio:</strong> ${q.feedback?.example||''}`;}
function restore(q){setTimeout(()=>{const a=answered[pos];document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.textContent===q.correct)b.classList.add('correct');if(a.selected===b.textContent&&!a.ok)b.classList.add('wrong')});const fbEl=$('feedback');fbEl.className='feedback '+(a.ok?'good':'bad')+' show';fbEl.innerHTML=`<strong>${a.ok?'✓ Corretto!':'✗ Non proprio.'}</strong>${a.ok?'Ottima scelta.':'La risposta corretta è <em>'+q.correct+'</em>.'} ${q.feedback?.why||''}<br><strong>Esempio:</strong> ${q.feedback?.example||''}`},0)}
$('prev').onclick=()=>{if(pos>0){pos--;render()}};$('next').onclick=()=>{if(pos<14){pos++;render()}else{$('card').style.display='none';$('end').classList.add('show');$('score').textContent=type==='flashcard'?'Hai completato 15 flashcard.':`Hai completato 15 attività. Hai risposto correttamente a ${score} / 15 domande.`}};render();
