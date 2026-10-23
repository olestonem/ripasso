const BANKS={essere:[],agreement:[],forms:[],imperfetto:[],contrast:[],negative:[],context:[],mixed:[]};
const add=(t,q,a,wrong,why)=>{const opts=[...new Set(wrong.filter(x=>x!==a))];BANKS[t].push({prompt:q,correct:a,wrong:opts,why});};
const people=[
 {s:'io (donna)',pp:'mi sono alzata',m:'mi sono alzato',imp:'mi alzavo',sub:'mi'},
 {s:'io (uomo)',pp:'mi sono alzato',m:'mi sono alzata',imp:'mi alzavo',sub:'mi'},
 {s:'tu (donna)',pp:'ti sei vestita',m:'ti sei vestito',imp:'ti vestivi',sub:'ti'},
 {s:'tu (uomo)',pp:'ti sei vestito',m:'ti sei vestita',imp:'ti vestivi',sub:'ti'},
 {s:'Marco',pp:'si è svegliato',m:'si è svegliata',imp:'si svegliava',sub:'si'},
 {s:'Anna',pp:'si è svegliata',m:'si è svegliato',imp:'si svegliava',sub:'si'},
 {s:'noi (gruppo femminile)',pp:'ci siamo preparate',m:'ci siamo preparati',imp:'ci preparavamo',sub:'ci'},
 {s:'noi (gruppo maschile/misto)',pp:'ci siamo preparati',m:'ci siamo preparate',imp:'ci preparavamo',sub:'ci'},
 {s:'voi (gruppo femminile)',pp:'vi siete divertite',m:'vi siete divertiti',imp:'vi divertivate',sub:'vi'},
 {s:'voi (gruppo maschile/misto)',pp:'vi siete divertiti',m:'vi siete divertite',imp:'vi divertivate',sub:'vi'},
 {s:'le ragazze',pp:'si sono addormentate',m:'si sono addormentati',imp:'si addormentavano',sub:'si'},
 {s:'i ragazzi',pp:'si sono addormentati',m:'si sono addormentate',imp:'si addormentavano',sub:'si'}
];
const verbs=[
 ['alzarsi','alzata','alzato','alzavo','alzavi','alzava','alzavamo','alzavate','alzavano'],
 ['svegliarsi','svegliata','svegliato','svegliavo','svegliavi','svegliava','svegliavamo','svegliavate','svegliavano'],
 ['vestirsi','vestita','vestito','vestivo','vestivi','vestiva','vestivamo','vestivate','vestivano'],
 ['prepararsi','preparata','preparato','preparavo','preparavi','preparava','preparavamo','preparavate','preparavano'],
 ['divertirsi','divertita','divertito','divertivo','divertivi','divertiva','divertivamo','divertivate','divertivano'],
 ['addormentarsi','addormentata','addormentato','addormentavo','addormentavi','addormentava','addormentavamo','addormentavate','addormentavano'],
 ['rilassarsi','rilassata','rilassato','rilassavo','rilassavi','rilassava','rilassavamo','rilassavate','rilassavano'],
 ['sentirsi','sentita','sentito','sentivo','sentivi','sentiva','sentivamo','sentivate','sentivano']
];
const ppForms=[
 ['io (donna)','mi sono svegliata','mi sono svegliato','У passato prossimo зворотні дієслова використовують essere; з жінкою узгоджуємо -a.'],
 ['Marco','si è vestito','si è vestita','Marco — чоловічий рід, однина: vestito.'],
 ['Anna','si è preparata','si è preparato','Anna — жіночий рід, однина: preparata.'],
 ['noi (solo donne)','ci siamo divertite','ci siamo divertiti','Група лише жінок: множина жіночого роду -e.'],
 ['i ragazzi','si sono addormentati','si sono addormentate','I ragazzi — чоловічий рід, множина: -i.'],
 ['le sorelle','si sono rilassate','si sono rilassati','Le sorelle — жіночий рід, множина: -e.'],
 ['tu (uomo)','ti sei alzato','ti sei alzata','Tu riferito a un uomo: alzato.'],
 ['voi (gruppo misto)','vi siete preparati','vi siete preparate','Il maschile plurale si usa per un gruppo misto.'],
 ['Luca e Paolo','si sono svegliati','si sono svegliate','Luca e Paolo: maschile plurale, svegliati.'],
 ['Marta e Giulia','si sono vestite','si sono vestiti','Marta e Giulia: femminile plurale, vestite.']
];
ppForms.forEach(([s,a,b,why],i)=>{add('agreement',`${s}: completa «Ieri ___ presto».`,a,[b,'sono alzata','si è alzati'],why);add('forms',`${s}: scegli la forma corretta di alzarsi/vestirsi.`,a,[b,'mi alzo','si erano vestite'],why);add('essere',`${s}: ieri ___ .`,a,[b,'ho svegliata','è preparato'],`Le forme riflessive al passato prossimo si costruiscono con essere. ${why}`);});
const routine=[
 ['Da bambina, io ___ sempre alle sette. (svegliarsi)','mi svegliavo','mi sono svegliata','mi sveglierò','Imperfetto: un’abitudine ripetuta nel passato.'],
 ['Quando andavo a scuola, ___ prima di colazione. (vestirsi, io)','mi vestivo','mi sono vestita','mi veste','L’imperfetto descrive una routine passata.'],
 ['Ogni sera, Marco ___ verso le dieci. (addormentarsi)','si addormentava','si è addormentato','si addormenterà','Ogni sera indica un’abitudine: imperfetto.'],
 ['Da piccoli, noi ___ presto durante la settimana. (alzarsi)','ci alzavamo','ci siamo alzati','ci alzeremo','Azione ripetuta nel passato: ci alzavamo.'],
 ['D’estate, voi ___ tardi. (svegliarsi)','vi svegliavate','vi siete svegliati','vi svegliate','D’estate descrive una consuetudine passata.'],
 ['Prima, le mie sorelle ___ sempre per la scuola. (prepararsi)','si preparavano','si sono preparate','si prepareranno','Imperfetto per la routine abituale.'],
 ['Quando lavoravo di notte, ___ al mattino. (rilassarsi, io)','mi rilassavo','mi sono rilassato','mi rilasso','La situazione abituale nel passato richiede l’imperfetto.'],
 ['Da bambini, ci ___ molto alle feste. (divertirsi)','divertivamo','siamo divertiti','divertiamo','Per un’abitudine passata si usa l’imperfetto: ci divertivamo.']
];
routine.forEach(x=>{add('imperfetto',x[0],x[1],[x[2],x[3]],x[4]);add('context',x[0],x[1],[x[2],x[3]],x[4]);add('mixed',x[0],x[1],[x[2],x[3]],x[4]);});
const contrasts=[
 ['Ieri mattina mi ___ alle sei e mezza, poi sono uscito. (alzarsi)','sono alzato','alzavo','alzavo stato','Un evento singolo e concluso: passato prossimo.'],
 ['Da bambina mi ___ sempre presto. (svegliarsi)','svegliavo','sono svegliata','sveglierò','Sempre indica un’abitudine: imperfetto.'],
 ['Mentre ___, è suonato il telefono. (prepararsi, io)','mi preparavo','mi sono preparata','mi preparo','L’imperfetto presenta l’azione in corso; l’evento che interrompe è «è suonato».'],
 ['Ieri sera Anna ___ subito dopo cena. (addormentarsi)','si è addormentata','si addormentava','si addormenta','Evento concluso in un momento preciso: passato prossimo.'],
 ['Quando abitavamo a Roma, ___ alle otto. (alzarsi, noi)','ci alzavamo','ci siamo alzati','ci alziamo','Abitudine durante un periodo passato: imperfetto.'],
 ['La settimana scorsa le ragazze ___ molto alla festa. (divertirsi)','si sono divertite','si divertivano','si divertono','La settimana scorsa colloca un evento concluso: passato prossimo.'],
 ['Ogni domenica mio nonno ___ dopo pranzo. (riposarsi)','si riposava','si è riposato','si riposa','Ogni domenica indica ripetizione abituale nel passato.'],
 ['Mentre i bambini ___, la mamma è entrata. (vestirsi)','si vestivano','si sono vestiti','si vestono','Azione in corso interrotta da un evento: imperfetto.'],
 ['Ieri io ___ tardi perché ero stanca. (addormentarsi, donna)','mi sono addormentata','mi addormentavo','mi addormento','Un episodio preciso di ieri: passato prossimo; accordo al femminile.'],
 ['Da ragazzi, ci ___ ogni sera prima di uscire. (prepararsi)','preparavamo','siamo preparati','prepariamo','Routine nel passato: imperfetto.']
];
contrasts.forEach(x=>{add('contrast',x[0],x[1],[x[2],x[3]],x[4]);add('mixed',x[0],x[1],[x[2],x[3]],x[4]);});
const negatives=[
 ['Ieri io ___ alzata presto. (non, donna)','non mi sono','non sono mi','mi non sono','La negazione precede il gruppo pronominale: non mi sono alzata.'],
 ['Marco ___ è vestito perché era ancora in pigiama. (non)','non si','si non','non ha','La forma corretta è non si è vestito.'],
 ['Da bambina, Anna ___ svegliava tardi la domenica. (non)','non si','si non','non è','Con imperfetto: non si svegliava.'],
 ['Noi ___ siamo divertiti alla festa. (non, gruppo misto)','non ci','ci non','non abbiamo','La forma negativa: non ci siamo divertiti.'],
 ['Le ragazze ___ sono preparate in tempo. (non)','non si','si non','non hanno','La forma negativa: non si sono preparate.'],
 ['Prima io ___ rilassavo mai dopo il lavoro. (non)','non mi','mi non','non sono','Con imperfetto: non mi rilassavo.']
];
negatives.forEach(x=>{add('negative',x[0],x[1],[x[2],x[3]],x[4]);add('mixed',x[0],x[1],[x[2],x[3]],x[4]);});
// Generate varied pools with correct person, auxiliary, participle agreement and reflexive pronoun.
for(let r=0;r<12;r++){
 const [inf,fem,masc,im0,im1,im2,im3,im4,im5]=verbs[r%verbs.length];
 const row=people[r%people.length];
 const personIndex=r%people.length;
 const aux=personIndex<2?'sono':personIndex<4?'sei':personIndex<6?'è':personIndex<8?'siamo':personIndex<10?'siete':'sono';
 const isFem=[0,2,5,6,8,10].includes(personIndex);
 const participle=isFem?fem:masc;
 const pp=`${row.sub} ${aux} ${participle}`;
 const wrongGender=`${row.sub} ${aux} ${isFem?masc:fem}`;
 add('essere',`${row.s}: completa «Ieri ___ (${inf})».`,pp,[wrongGender,`${row.sub} ha ${participle}`,`${row.sub} ${aux} ${inf}`],`I verbi riflessivi al passato prossimo vogliono essere. La forma corretta è: ${pp}.`);
 add('forms',`Scegli la forma corretta: ${row.s}, ieri (${inf}).`,pp,[wrongGender,`${row.sub} ${aux} ${inf}`,`${row.sub} aveva ${participle}`],`La forma corretta è ${pp}; il participio concorda con il soggetto.`);
 add('agreement',`Accordo: ${row.s} ___ (${inf}) ieri.`,pp,[wrongGender,`${row.sub} ha ${participle}`,`${row.sub} ${aux} ${participle}o`],`Il participio passato concorda con il soggetto: ${pp}.`);
 const impForms=[im0,im1,im2,im3,im4,im5]; const ix=personIndex<2?0:personIndex<4?1:personIndex<6?2:personIndex<8?3:personIndex<10?4:5;
 const impPronoun=['mi','ti','si','ci','vi','si'][ix];
 const imp=`${impPronoun} ${impForms[ix]}`;
 add('imperfetto',`Da piccolo/a, ${['io','tu','lui/lei','noi','voi','loro'][ix]} ___ ogni mattina. (${inf})`,imp,[pp,`${impPronoun} sono ${participle}`,`${impPronoun} ${impForms[(ix+1)%6]}`],`L’imperfetto descrive una routine passata: ${imp}.`);
}
const LABELS={essere:['Passato prossimo con essere','Усі зворотні дієслова утворюють passato prossimo з essere.'],agreement:['Accordo del participio','Дієприкметник узгоджується з підметом у роді та числі.'],forms:['Le forme al passato','Обери правильну форму passato prossimo для особи й ситуації.'],imperfetto:['Imperfetto e routine','Imperfetto використовується для звичок і повторюваних дій у минулому.'],contrast:['Passato prossimo o imperfetto?','Звертай увагу на контекст: завершена подія чи минула звичка/дія в процесі.'],negative:['La forma negativa','Non ставимо перед зворотним займенником: non mi sono alzato/a.'],context:['La routine nel passato','Визнач, чи йдеться про звичку або конкретну подію.'],mixed:['Ripasso finale','Змішані вправи на passato prossimo, imperfetto та узгодження.']};
const $=id=>document.getElementById(id);const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};const params=new URLSearchParams(location.search);const type=params.get('type')||'mixed';const bank=type==='mixed'?[...BANKS.mixed,...BANKS.essere,...BANKS.agreement,...BANKS.forms,...BANKS.imperfetto,...BANKS.contrast,...BANKS.context,...BANKS.negative]:BANKS[type]||BANKS.mixed;const TOTAL=15;let questions=shuffle(bank).slice(0,TOTAL).map(x=>({prompt:x.prompt,correct:x.correct,options:shuffle([x.correct,...shuffle(x.wrong.filter(v=>v!==x.correct)).slice(0,3)]),why:x.why}));let index=0,score=0,answered=false;const label=LABELS[type]||LABELS.mixed;$('eyebrow').textContent='Passato prossimo e imperfetto · A2';$('title').textContent=label[0];$('subtitle').textContent=label[1];$('typeLabel').textContent=label[0];function escapeHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}function render(){answered=false;$('feedback').className='feedback';$('feedback').innerHTML='';$('progressText').textContent=`${index+1} / ${TOTAL}`;$('fill').style.width=`${(index+1)/TOTAL*100}%`;const item=questions[index];$('prev').disabled=index===0;$('next').textContent=index===TOTAL-1?'Завершити':'Avanti →';$('content').innerHTML=`<div class="question">${item.prompt}</div><div class="answers">${item.options.map(o=>`<button class="answer" type="button" data-answer="${escapeHTML(o)}">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(btn=>btn.addEventListener('click',()=>answer(item,btn)));}function answer(item,btn){if(answered)return;answered=true;const ok=btn.dataset.answer===item.correct;if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');$('feedback').className=`feedback show ${ok?'good':'bad'}`;$('feedback').innerHTML=`<strong>${ok?'✓ Правильно!':'✕ Неправильно'}</strong><div>${item.why}</div>`;}$('prev').addEventListener('click',()=>{if(index>0){index--;render()}});$('next').addEventListener('click',()=>{if(!answered){$('feedback').className='feedback show bad';$('feedback').innerHTML='<strong>Спочатку обери відповідь.</strong>';return}if(index<TOTAL-1){index++;render()}else finish()});function finish(){$('card').style.display='none';$('end').classList.add('show');$('score').textContent=`Правильних відповідей: ${score} із ${TOTAL}.`;$('summary').innerHTML=`<p>${score>=12?'Чудово! Продовжуй так само.':score>=8?'Добре! Повтори пояснення до помилок.':'Перечитай правило та спробуй ще раз.'}</p><button class="retry" id="retry">Спробувати ще раз</button>`;$('retry').addEventListener('click',()=>location.reload())}render();