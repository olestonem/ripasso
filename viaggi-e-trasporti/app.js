const terms = [
['biglietto','квиток','Ho comprato il biglietto del treno online.','Documento che permette di viaggiare su un mezzo o di entrare in un servizio.'],
['andata','поїздка в один бік','Ho un biglietto di sola andata per Roma.','Indica il viaggio verso la destinazione, senza il ritorno.'],
['ritorno','зворотна поїздка','Il ritorno è previsto per domenica sera.','Indica il viaggio dalla destinazione verso il punto di partenza.'],
['andata e ritorno','туди й назад','Vorrei un biglietto di andata e ritorno.','Comprende il viaggio verso la destinazione e quello per tornare indietro.'],
['partenza','відправлення','La partenza del treno è alle 8:15.','È il momento o il luogo in cui inizia un viaggio.'],
['arrivo','прибуття','L’arrivo a Milano è previsto alle 11:40.','È il momento o il luogo in cui termina il viaggio.'],
['fermata','зупинка','Scendo alla prossima fermata.','È il punto in cui autobus o tram si fermano per far salire o scendere i passeggeri.'],
['stazione','вокзал / станція','Ci vediamo davanti alla stazione.','È il luogo da cui partono o in cui arrivano i treni.'],
['binario','колія','Il treno per Firenze parte dal binario 7.','È lo spazio della stazione su cui viaggia un treno.'],
['marciapiede','платформа','Aspettiamo sul marciapiede numero tre.','È la piattaforma della stazione accanto al binario dove aspettano i passeggeri.'],
['treno','потяг','Prendo il treno delle nove.','È un mezzo di trasporto formato da carrozze che viaggiano su rotaie.'],
['carrozza','вагон','La mia carrozza è la numero cinque.','È una parte del treno dove viaggiano i passeggeri.'],
['posto a sedere','сидяче місце','Ho prenotato un posto a sedere vicino al finestrino.','È il posto del passeggero su un mezzo di trasporto.'],
['finestrino','вікно','Preferisco un posto vicino al finestrino.','È il piccolo finestrino accanto al posto del passeggero.'],
['corridoio','прохід','Il mio posto è vicino al corridoio.','È lo spazio che permette di passare tra i sedili di un mezzo.'],
['ritardo','затримка','Il treno ha venti minuti di ritardo.','Succede quando un mezzo parte o arriva più tardi del previsto.'],
['cancellazione','скасування','Hanno annunciato la cancellazione del volo.','È l’annullamento di una partenza prevista.'],
['coincidenza','пересадка / стикування','Ho solo dieci minuti per la coincidenza.','È il collegamento tra due mezzi che richiede di cambiare treno, autobus o altro.'],
['cambio','пересадка / зміна','A Bologna devo fare un cambio.','È il passaggio da un mezzo a un altro durante lo stesso viaggio.'],
['prenotazione','бронювання','Ho una prenotazione per due notti.','È la richiesta fatta in anticipo per assicurarsi un posto o una camera.'],
['bagaglio','багаж','Il mio bagaglio è troppo pesante.','È l’insieme delle cose che una persona porta con sé durante un viaggio.'],
['valigia','валіза','La valigia è pronta.','È un contenitore usato per trasportare vestiti e oggetti durante un viaggio.'],
['zaino','рюкзак','Porto uno zaino piccolo in cabina.','È una borsa che si porta sulle spalle.'],
['bagaglio a mano','ручна поклажа','Il bagaglio a mano deve entrare sotto il sedile.','È il bagaglio piccolo che il passeggero può portare con sé in cabina.'],
['bagaglio da stiva','багаж, що здається','La valigia grande va nel bagaglio da stiva.','È il bagaglio consegnato al personale e trasportato fuori dalla cabina.'],
['smarrimento','втрата','Ho denunciato lo smarrimento della valigia.','È la perdita di un oggetto o di un bagaglio.'],
['passaporto','паспорт','Controlli il passaporto prima di partire.','È il documento usato per identificare una persona durante molti viaggi internazionali.'],
['carta d’identità','посвідчення особи','Per questo viaggio basta la carta d’identità.','È un documento ufficiale che identifica una persona.'],
['documento','документ','Tenga il documento a portata di mano.','È un atto ufficiale usato per identificare o dimostrare qualcosa.'],
['controllo di sicurezza','контроль безпеки','Prima del gate passiamo il controllo di sicurezza.','È il controllo dei passeggeri e degli oggetti prima di entrare in una zona protetta.'],
['aeroporto','аеропорт','L’aeroporto è fuori città.','È il luogo da cui partono e arrivano gli aerei.'],
['volo','рейс / політ','Il mio volo parte alle 18:30.','È il viaggio effettuato da un aereo.'],
['compagnia aerea','авіакомпанія','Quale compagnia aerea utilizzi?','È l’azienda che offre e gestisce servizi di trasporto aereo.'],
['check-in','реєстрація на рейс','Ho fatto il check-in online.','È la procedura con cui il passeggero conferma il viaggio prima della partenza.'],
['gate','вихід на посадку','Il gate è cambiato all’ultimo momento.','È il punto dell’aeroporto da cui i passeggeri accedono all’imbarco.'],
['imbarco','посадка','L’imbarco inizierà tra dieci minuti.','È il momento in cui i passeggeri salgono sull’aereo o su un altro mezzo.'],
['carta d’imbarco','посадковий талон','Mostri la carta d’imbarco al gate.','È il documento che permette al passeggero di accedere all’imbarco.'],
['atterraggio','приземлення','L’atterraggio è stato tranquillo.','È il momento in cui un aereo arriva al suolo.'],
['decollo','зліт','Il decollo è previsto alle 7:05.','È il momento in cui un aereo lascia il suolo.'],
['bagaglio smarrito','втрачений багаж','Abbiamo aperto una pratica per il bagaglio smarrito.','È una valigia che non è arrivata insieme al passeggero.'],
['autobus','автобус','Prendo l’autobus fino al centro.','È un mezzo stradale pubblico che trasporta più passeggeri.'],
['pullman','міжміський автобус','Il pullman per Napoli parte alle sei.','È un autobus usato spesso per viaggi extraurbani o a lunga distanza.'],
['tram','трамвай','Il tram passa ogni dieci minuti.','È un mezzo pubblico che viaggia normalmente su rotaie in città.'],
['metropolitana','метро','Prendiamo la metropolitana fino alla stazione centrale.','È un sistema ferroviario urbano, spesso in parte sotterraneo.'],
['taxi','таксі','Prendiamo un taxi davanti all’hotel.','È un servizio di trasporto con conducente richiesto dal passeggero.'],
['noleggio auto','оренда автомобіля','Abbiamo scelto il noleggio auto per visitare la regione.','È il servizio che permette di usare un’auto per un periodo pagando un prezzo.'],
['autonoleggio','прокат автомобілів','L’ufficio di autonoleggio è vicino all’aeroporto.','È il servizio o l’azienda che offre auto in affitto.'],
['parcheggio','паркінг','Dove si trova il parcheggio più vicino?','È il luogo in cui si lasciano le automobili.'],
['benzina','бензин','Devo fare benzina prima di partire.','È un carburante usato da molti automobili con motore a benzina.'],
['pedaggio','плата за проїзд','Il pedaggio dell’autostrada si paga al casello.','È la somma pagata per utilizzare alcune strade o autostrade.'],
['casello','пункт оплати','Al casello c’è una lunga fila.','È il punto dell’autostrada in cui si paga il pedaggio.'],
['autostrada','автомагістраль','Prendiamo l’autostrada per arrivare prima.','È una strada veloce riservata principalmente al traffico motorizzato.'],
['traffico','дорожній рух / затор','C’è molto traffico in centro.','È l’insieme dei veicoli che circolano su una strada; può indicare anche una situazione congestionata.'],
['ingorgo','затори','Siamo rimasti bloccati in un ingorgo.','È una situazione in cui il traffico è molto lento o fermo.'],
['mappa','карта','Controlliamo la mappa prima di partire.','È una rappresentazione grafica di un territorio o di una zona.'],
['percorso','маршрут','Qual è il percorso più veloce?','È la strada o l’insieme di strade che si segue per arrivare a una destinazione.'],
['destinazione','місце призначення','La nostra destinazione è Firenze.','È il luogo verso cui si viaggia.'],
['itinerario','маршрут подорожі','Abbiamo preparato un itinerario di cinque giorni.','È il programma o percorso previsto durante un viaggio.'],
['escursione','екскурсія / прогулянка','Domani facciamo un’escursione in montagna.','È una gita, spesso breve, organizzata per visitare o esplorare un luogo.'],
['gita','поїздка / екскурсія','Domenica facciamo una gita al lago.','È un breve viaggio fatto per svago o per visitare un luogo.'],
['viaggio','подорож','Il viaggio è durato tre ore.','È lo spostamento da un luogo a un altro, soprattutto se richiede tempo.'],
['vacanza','відпустка / канікули','Quest’estate facciamo una vacanza in Puglia.','È un periodo dedicato al riposo, al divertimento o al turismo.'],
['albergo','готель','Abbiamo prenotato un albergo vicino alla stazione.','È una struttura che offre camere e servizi ai viaggiatori.'],
['hotel','готель','L’hotel ha una piscina.','È una struttura ricettiva dove i viaggiatori possono soggiornare.'],
['camera','номер / кімната','La camera è al terzo piano.','È lo spazio privato dell’hotel in cui soggiorna il cliente.'],
['reception','ресепшен','Chiediamo alla reception l’orario della colazione.','È il punto dell’hotel in cui si accolgono e si assistono gli ospiti.'],
['check-in alberghiero','реєстрація в готелі','Il check-in alberghiero è dalle 14.','È la procedura di arrivo e registrazione in hotel.'],
['check-out','виселення','Il check-out è entro le undici.','È la procedura con cui si lascia la camera e si conclude il soggiorno.'],
['soggiorno','перебування','Abbiamo organizzato un soggiorno di una settimana.','È il periodo trascorso in un luogo, spesso in una struttura ricettiva.'],
['pernottamento','ночівля','Il prezzo include il pernottamento.','È l’azione di dormire e passare la notte in un luogo.'],
['colazione inclusa','сніданок включено','La prenotazione ha la colazione inclusa.','Indica che il servizio della colazione è compreso nel prezzo.'],
['camera singola','одномісний номер','Ho prenotato una camera singola.','È una camera destinata a una sola persona.'],
['camera doppia','двомісний номер','Cerchiamo una camera doppia con balcone.','È una camera pensata per due persone.'],
['ostello','хостел','Abbiamo scelto un ostello economico.','È una struttura economica con camere condivise o private.'],
['campeggio','кемпінг','Dormiamo in campeggio vicino al mare.','È un luogo in cui si soggiorna in tenda, camper o strutture simili.'],
['spiaggia','пляж','L’hotel è a cinque minuti dalla spiaggia.','È la zona di sabbia o ciottoli lungo il mare o un lago.'],
['centro storico','історичний центр','L’albergo è vicino al centro storico.','È la parte più antica e storicamente importante di una città.'],
['ufficio informazioni','туристичний інформаційний офіс','Chiediamo all’ufficio informazioni una mappa della città.','È il servizio che fornisce informazioni utili a cittadini e turisti.'],
['guida turistica','туристичний гід / путівник','Abbiamo prenotato una guida turistica.','Può essere una persona che accompagna i visitatori oppure un libro con informazioni turistiche.'],
['museo','музей','Domani visitiamo il museo.','È un luogo in cui sono conservate ed esposte opere o oggetti di interesse.'],
['monumento','пам’ятка','Il monumento è nella piazza principale.','È un’opera o un luogo importante dal punto di vista storico o culturale.'],
['piazza','площа','Ci incontriamo in piazza alle nove.','È uno spazio pubblico aperto, spesso al centro di una città.'],
['centro','центр міста','L’hotel è in centro.','Indica la zona centrale di una città o di un paese.'],
['fuori città','за містом','Nel weekend andiamo fuori città.','Indica una zona esterna al centro abitato.'],
['all’estero','за кордоном','Quest’anno viaggio all’estero.','Indica un luogo che si trova in un altro Paese rispetto a quello in cui si vive.'],
['confine','кордон','Abbiamo attraversato il confine in auto.','È la linea che separa due Stati o territori.'],
['frontiera','кордон','Alla frontiera hanno controllato i documenti.','È il luogo o la linea in cui termina un territorio e ne inizia un altro.'],
['moneta','валюта / монета','In questo Paese si usa una moneta diversa.','È il sistema di denaro utilizzato in un Paese.'],
['cambio valuta','обмін валюти','Cerco un ufficio per il cambio valuta.','È l’operazione con cui si cambia una valuta in un’altra.'],
['assicurazione di viaggio','туристичне страхування','Ho fatto un’assicurazione di viaggio.','È una polizza che offre copertura per alcuni problemi durante un viaggio.'],
['emergenza','надзвичайна ситуація','In caso di emergenza chiama il numero indicato.','È una situazione improvvisa e grave che richiede un intervento rapido.'],
['numero di emergenza','номер екстреної служби','Qual è il numero di emergenza locale?','È il numero telefonico da chiamare per ottenere aiuto urgente.'],
['perdita','втрата','Ho segnalato la perdita del portafoglio.','È il fatto di non avere più con sé qualcosa che si possedeva.'],
['smarrire','загубити','Ho paura di smarrire il passaporto.','Significa perdere qualcosa senza sapere dove si trova.'],
['partire','вирушати','Domani partiamo presto.','Significa iniziare un viaggio o lasciare un luogo.'],
['arrivare','прибути','Arriviamo a Roma alle dieci.','Significa raggiungere il luogo di destinazione.'],
['prenotare','бронювати','Vorrei prenotare una camera.','Significa riservare in anticipo un posto, una camera o un servizio.'],
['confermare','підтверджувати','Devo confermare la prenotazione.','Significa dichiarare che una prenotazione o informazione rimane valida.'],
['cancellare','скасовувати','Vorrei cancellare il volo.','Significa annullare una prenotazione o un viaggio previsto.'],
['cambiare','змінювати / пересідати','Devo cambiare treno a Bologna.','Significa passare da un mezzo a un altro oppure modificare qualcosa.'],
['salire','сідати / підніматися','Sali sul treno dal binario quattro.','Significa entrare su un mezzo di trasporto o andare verso un punto più alto.'],
['scendere','виходити / спускатися','Scendo alla prossima fermata.','Significa uscire da un mezzo oppure andare verso un punto più basso.'],
['viaggiare','подорожувати','Mi piace viaggiare in treno.','Significa spostarsi da un luogo a un altro, soprattutto per un periodo di tempo.'],
['guidare','керувати автомобілем','Preferisco guidare di giorno.','Significa condurre un’automobile o un altro veicolo.'],
['noleggiare','орендувати','Abbiamo noleggiato una macchina.','Significa prendere un veicolo o un oggetto in affitto per un periodo.'],
['visitare','відвідувати','Domani visitiamo il centro storico.','Significa andare in un luogo per conoscerlo o vedere ciò che offre.'],
['soggiornare','перебувати / проживати','Soggiorniamo in un hotel vicino al mare.','Significa restare per un periodo in un luogo, spesso durante una vacanza.'],
['attraversare','перетинати','Abbiamo attraversato il confine in treno.','Significa passare da una parte all’altra di un luogo o di una linea.']
];

const termMap=Object.fromEntries(terms.map(x=>[x[0],x]));
const travelVerbs=['partire','arrivare','prenotare','confermare','cancellare','cambiare','salire','scendere','viaggiare','guidare','noleggiare','visitare','soggiornare','attraversare'];
const transportGroups=[
 ['treno','autobus','tram','metropolitana'],['aeroporto','stazione','fermata','parcheggio'],['valigia','zaino','bagaglio a mano','bagaglio da stiva'],['passaporto','carta d’identità','carta d’imbarco','documento'],['hotel','ostello','campeggio','albergo'],['museo','monumento','spiaggia','centro storico'],['biglietto','prenotazione','itinerario','mappa'],['binario','marciapiede','gate','reception']
];
const $=id=>document.getElementById(id);
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
function choiceOptions(correct,pool){const unique=[...new Set(pool.filter(x=>x!==correct))];return shuffle([correct,...shuffle(unique).slice(0,3)]);}
function fb(correct,example,why){return {correct,example,why};}

function buildFlash(){
  return Array.from({length:100},(_,i)=>{const t=terms[i];return {kind:'flash',word:t[0],uk:t[1],example:t[2],id:i};});
}
function buildGuess(){
  return Array.from({length:100},(_,i)=>{const t=terms[i];return {kind:'mc',prompt:t[3],correct:t[0],options:choiceOptions(t[0],terms.map(x=>x[0])),feedback:fb(t[0],t[2],'Questa definizione indica precisamente il termine richiesto.'),id:i};});
}
function buildComplete(){
  return Array.from({length:100},(_,i)=>{const t=terms[i];const sentence=t[2].replace(new RegExp(t[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'___');return {kind:'mc',prompt:`Completa la frase: ${sentence}`,correct:t[0],options:choiceOptions(t[0],terms.map(x=>x[0])),feedback:fb(t[0],`Per esempio: ${t[2]}`,'La parola completa la frase in modo naturale e coerente con il contesto.'),id:i};});
}
function buildIntruso(){
  const out=[];
  transportGroups.forEach((group,gi)=>{
    for(let v=0;v<13;v++){
      const intrGroup=transportGroups[(gi+1+v)%transportGroups.length];
      const intr=intrGroup[v%intrGroup.length];
      const inGroup=group.filter(x=>x!==intr);
      const fillers=[...inGroup];
      const alt=group[(v+1)%group.length];
      const options=shuffle([alt,...inGroup.filter(x=>x!==alt).slice(0,2),intr]);
      out.push({kind:'intruso',prompt:'Quale parola non appartiene al gruppo?',options,correct:intr,feedback:fb(intr,`Per esempio: ${termMap[intr][2]}`,'Le altre tre parole appartengono allo stesso gruppo semantico.')});
    }
  });
  return out.slice(0,100).map((q,i)=>({...q,id:i}));
}
const roleScenarios=[
['Sei alla stazione e vuoi sapere da quale binario parte il treno.','Quale frase usi?','Scusi, da quale binario parte il treno?','Scusi, dove posso comprare una valigia?','Chiedi informazioni sul binario prima della partenza.'],
['Sei in hotel e vuoi sapere a che ora è la colazione.','Quale frase usi?','A che ora viene servita la colazione?','A che ora parte il prossimo autobus?','Chiedi un’informazione sul servizio dell’hotel.'],
['Sei in aeroporto e non trovi il gate.','Cosa dici al personale?','Mi scusi, dov’è il gate 24?','Mi scusi, quanto costa questa camera?','Chiedi di trovare il punto d’imbarco.'],
['Il tuo treno è in ritardo e vuoi sapere quanto.','Cosa chiedi?','Di quanti minuti è il ritardo?','Dove posso noleggiare una bicicletta?','Chiedi informazioni sul ritardo del treno.'],
['Hai perso la valigia e sei all’aeroporto.','Cosa dici al banco assistenza?','Vorrei segnalare lo smarrimento del bagaglio.','Vorrei cambiare posto al ristorante.','Segnali che il bagaglio non è arrivato.'],
['Vuoi prenotare una camera doppia per due notti.','Cosa dici?','Vorrei prenotare una camera doppia per due notti.','Vorrei comprare un biglietto di sola andata per domani.','Specifichi camera, numero di persone e durata.'],
['Vuoi sapere se il biglietto del museo si può comprare online.','Cosa chiedi?','È possibile acquistare il biglietto online?','È possibile cambiare il binario online?','Chiedi se l’acquisto è disponibile online.'],
['Sei sul bus e vuoi scendere alla prossima fermata.','Cosa puoi dire?','Devo scendere alla prossima fermata.','Devo partire dalla prossima stazione.','Comunichi dove vuoi scendere.']
];
function buildRoleplay(){
  const places=['alla stazione di Roma','all’aeroporto di Napoli','in un hotel a Firenze','alla fermata dell’autobus','in un ufficio informazioni'];
  const moments=['questa mattina','domani','nel pomeriggio','prima della partenza','all’arrivo'];
  const out=[];for(let i=0;i<100;i++){const s=roleScenarios[i%roleScenarios.length];const context=`${s[0]} Sei ${places[Math.floor(i/8)%places.length]} ${moments[i%moments.length]}.`;const correct=s[2];const opts=choiceOptions(correct,roleScenarios.map(x=>x[2]));out.push({kind:'mc',prompt:`${context} ${s[1]}`,correct,options:opts,feedback:fb(correct,s[3],s[4]),id:i});}return out;
}
const situations=[
['Il tuo treno è stato cancellato e devi arrivare oggi.','Qual è la reazione più utile?','Chiedere al personale quali sono le alternative disponibili.','Per esempio: Chiedi se c’è un treno successivo o un rimborso.','Non aspettare senza informazioni: cerca una soluzione alternativa.'],
['Arrivi in hotel ma la camera non è ancora pronta.','Cosa fai?','Chiedere alla reception quanto tempo bisogna aspettare.','Per esempio: Puoi chiedere se puoi lasciare lì il bagaglio.','Prima di protestare, chiedi informazioni precise.'],
['Hai dimenticato il passaporto prima di partire per un viaggio internazionale.','Cosa fai?','Controllare subito i documenti e contattare chi può aiutarti.','Per esempio: Verifica se puoi recuperarlo prima della partenza.','È un documento essenziale per molti viaggi internazionali.'],
['Il tuo bagaglio non arriva al nastro.','Cosa fai?','Segnalare subito il bagaglio smarrito al servizio aeroportuale.','Per esempio: Conserva la ricevuta del bagaglio e il numero della pratica.','La segnalazione permette di avviare la ricerca.'],
['Hai solo dieci minuti per una coincidenza.','Cosa fai?','Controllare subito il binario e andare direttamente verso la coincidenza.','Per esempio: Guarda il tabellone appena scendi dal primo treno.','Con poco tempo è importante sapere immediatamente dove andare.'],
['Il navigatore ti propone un percorso molto più lungo per arrivare in centro.','Cosa fai?','Controllare il percorso e confrontarlo con un’alternativa.','Per esempio: Verifica se ci sono strade chiuse o traffico intenso.','Prima di cambiare strada, cerca di capire perché il percorso è più lungo.'],
['Vuoi noleggiare un’auto ma non conosci le condizioni.','Cosa fai?','Chiedere prezzo, assicurazione, franchigia e condizioni del noleggio.','Per esempio: Chiedi anche dove riconsegnare l’auto.','Conoscere le condizioni evita costi inattesi.'],
['Sei all’estero e non capisci quale moneta usare.','Cosa fai?','Chiedere quale valuta viene accettata e controllare il cambio.','Per esempio: Puoi chiedere se accettano carte di pagamento.','È utile conoscere valuta e modalità di pagamento prima di acquistare.']
];
function buildSituations(){
 const places=['alla stazione','in aeroporto','in hotel','sull’autobus','in centro città'];
 const times=['prima di partire','durante il viaggio','appena arrivato','nel pomeriggio','la sera'];
 const out=[];for(let i=0;i<100;i++){const s=situations[i%situations.length];const prompt=`${s[0]} Sei ${places[Math.floor(i/8)%places.length]} ${times[i%times.length]}. ${s[1]}`;const opts=choiceOptions(s[2],situations.map(x=>x[2]));out.push({kind:'mc',prompt,correct:s[2],options:opts,feedback:fb(s[2],s[3],s[4]),id:i});}return out;
}
function buildVerbs(){
 const forms=[
 ['partire','Noi ___ alle sette per evitare il traffico.','partiamo','partite','partono','partire','Per esempio: Partiamo alle sette.'],
 ['arrivare','Il treno ___ alle 18:30.','arriva','arrivano','arrivate','arrivare','Per esempio: Arriviamo in stazione alle otto.'],
 ['prenotare','Io ___ una camera doppia per due notti.','prenoto','prenota','prenotiamo','prenotare','Per esempio: Prenoto una camera con colazione.'],
 ['confermare','Lei ___ la prenotazione oggi.','conferma','confermano','confermiamo','confermare','Per esempio: Confermo la prenotazione via email.'],
 ['cancellare','Noi ___ il viaggio se c’è uno sciopero.','cancelliamo','cancellate','cancellano','cancellare','Per esempio: Cancelliamo il volo se necessario.'],
 ['cambiare','Tu ___ treno a Bologna?','cambi','cambia','cambiate','cambiare','Per esempio: Cambio autobus in centro.'],
 ['salire','I passeggeri ___ sull’autobus.','salgono','sale','saliamo','salire','Per esempio: Salgo sul treno dal binario quattro.'],
 ['scendere','Io ___ alla prossima fermata.','scendo','scende','scendiamo','scendere','Per esempio: Scendo alla stazione centrale.'],
 ['viaggiare','Loro ___ spesso in treno.','viaggiano','viaggia','viaggiate','viaggiare','Per esempio: Viaggiamo in treno ogni estate.'],
 ['guidare','Marta ___ fino all’aeroporto.','guida','guidano','guidi','guidare','Per esempio: Guido solo di giorno.'],
 ['noleggiare','Noi ___ un’auto per tre giorni.','noleggiamo','noleggia','noleggiate','noleggiare','Per esempio: Noleggio un’auto vicino alla stazione.'],
 ['visitare','Voi ___ il museo domani?','visitate','visita','visitano','visitare','Per esempio: Visitiamo il centro storico.'],
 ['soggiornare','Io ___ in un hotel vicino al centro.','soggiorno','soggiorna','soggiornano','soggiornare','Per esempio: Soggiorniamo in un piccolo albergo.'],
 ['attraversare','Noi ___ il confine in auto.','attraversiamo','attraversa','attraversate','attraversare','Per esempio: Attraverso il confine con il passaporto.']
 ];
 const extras=['domani mattina','questa sera','nel weekend','la prossima settimana','prima delle otto','dopo pranzo','durante le vacanze','a luglio','prima del volo','dopo l’arrivo'];
 const out=[];for(let i=0;i<100;i++){const v=forms[i%forms.length];const extra=extras[i%extras.length];let prompt=v[1].replace('.',` ${extra}.`);const options=choiceOptions(v[2],[v[2],v[3],v[4],v[5]]);out.push({kind:'mc',prompt,correct:v[2],options,feedback:fb(v[2],v[6],`Il verbo ${v[0]} deve concordare con il soggetto della frase.`),id:i});}return out;
}
function makeMixed(){const sets=[buildGuess(),buildComplete(),buildVerbs(),buildIntruso(),buildRoleplay(),buildSituations()];const pool=[];sets.forEach(set=>set.forEach(q=>pool.push(q)));return shuffle(pool).slice(0,100);}
const typeInfo={flashcard:['🗂️ Flashcard','Italiano → ucraino → spiegazione ed esempio.'],verbs:['⚙️ Verbi di viaggio','Usa il verbo nel contesto.'],intruso:['🕵️ Trova l’intruso','Scegli direttamente la parola che non appartiene al gruppo.'],mixed:['🎯 Quiz misto','Tipologie diverse, sempre una domanda alla volta.'],guess:['💡 Indovina la parola','Leggi la descrizione e trova la parola.'],complete:['✏️ Completa la frase','Scegli la parola che completa meglio la frase.'],roleplay:['🎫 Giochi di ruolo','Scegli cosa dire nella situazione.'],situations:['💡 Situazioni da risolvere','Risolvi un piccolo problema comunicativo.']};
const builders={flashcard:buildFlash,verbs:buildVerbs,intruso:buildIntruso,mixed:makeMixed,guess:buildGuess,complete:buildComplete,roleplay:buildRoleplay,situations:buildSituations};
const params=new URLSearchParams(location.search);let type=params.get('type')||'mixed';if(!builders[type])type='mixed';let all=builders[type]();let session=shuffle(all).slice(0,15);let pos=0;let score=0;let answered=Array(15).fill(null);
$('title').textContent=typeInfo[type][0];$('subtitle').textContent=typeInfo[type][1];$('eyebrow').textContent=typeInfo[type][0];
function updateProgress(){$('progressText').textContent=`${pos+1} / 15`;$('fill').style.width=`${((pos+1)/15)*100}%`;$('prev').disabled=pos===0;$('next').textContent=pos===14?'Fine →':'Avanti →'}
function render(){const q=session[pos];$('feedback').className='feedback';$('feedback').innerHTML='';$('content').innerHTML='';$('typeLabel').textContent=typeInfo[type][0];updateProgress();
if(q.kind==='flash'){const card=document.createElement('div');card.className='flashcard';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Gira la flashcard');card.innerHTML=`<div class="flash-inner"><div class="flash-face flash-front"><div>${q.word}<small>Premi per girare la carta</small></div></div><div class="flash-face flash-back"><div class="uk">${q.uk}</div><div class="example">${q.example}</div></div></div>`;const flip=()=>{card.classList.toggle('flipped');answered[pos]={viewed:true}};card.onclick=flip;card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()}};$('content').appendChild(card);const hint=document.createElement('div');hint.className='small-hint';hint.textContent='Premi la carta per vedere la traduzione in ucraino e un esempio.';$('content').appendChild(hint);if(answered[pos])card.classList.add('flipped');return}
$('content').innerHTML=`<div class="question">${q.prompt}</div><div class="answers"></div>`;const answers=$('content').querySelector('.answers');shuffle(q.options).forEach(opt=>{const b=document.createElement('button');b.className='answer';b.textContent=opt;b.onclick=()=>answer(q,opt,b);answers.appendChild(b)});if(answered[pos])restore(q);}
function answer(q,opt,btn){if(answered[pos])return;const ok=opt===q.correct;answered[pos]={ok,correct:q.correct,selected:opt};if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.textContent===q.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');const fb=$('feedback');fb.className='feedback '+(ok?'good':'bad')+' show';fb.innerHTML=`<strong>${ok?'✓ Corretto!':'✗ Non proprio.'}</strong>${ok?'Ottima scelta.':'La risposta corretta è <em>'+q.correct+'</em>.'} ${q.feedback?.why||''}<br><strong>Esempio:</strong> ${q.feedback?.example||''}`;}
function restore(q){setTimeout(()=>{const a=answered[pos];document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.textContent===q.correct)b.classList.add('correct');if(a.selected===b.textContent&&!a.ok)b.classList.add('wrong')});const fb=$('feedback');fb.className='feedback '+(a.ok?'good':'bad')+' show';fb.innerHTML=`<strong>${a.ok?'✓ Corretto!':'✗ Non proprio.'}</strong>${a.ok?'Ottima scelta.':'La risposta corretta è <em>'+q.correct+'</em>.'} ${q.feedback?.why||''}<br><strong>Esempio:</strong> ${q.feedback?.example||''}`},0)}
$('prev').onclick=()=>{if(pos>0){pos--;render()}};$('next').onclick=()=>{if(pos<14){pos++;render()}else{$('card').style.display='none';$('end').classList.add('show');$('score').textContent=type==='flashcard'?'Hai completato 15 flashcard.':`Hai completato 15 attività. Hai risposto correttamente a ${score} / 15 domande.`}};render();
