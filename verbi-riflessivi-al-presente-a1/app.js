const PRONOUNS=[
 {subject:'Io',p:'mi',i:0},{subject:'Tu',p:'ti',i:1},{subject:'Lui',p:'si',i:2},{subject:'Lei',p:'si',i:2},{subject:'Noi',p:'ci',i:3},{subject:'Voi',p:'vi',i:4},{subject:'Loro',p:'si',i:5}
];
const VERBS=[
 {inf:'chiamarsi',forms:['mi chiamo','ti chiami','si chiama','ci chiamiamo','vi chiamate','si chiamano'],base:'chiamare',ua:'називатися'},
 {inf:'svegliarsi',forms:['mi sveglio','ti svegli','si sveglia','ci svegliamo','vi svegliate','si svegliano'],base:'svegliare',ua:'прокидатися'},
 {inf:'alzarsi',forms:['mi alzo','ti alzi','si alza','ci alziamo','vi alzate','si alzano'],base:'alzare',ua:'вставати'},
 {inf:'lavarsi',forms:['mi lavo','ti lavi','si lava','ci laviamo','vi lavate','si lavano'],base:'lavare',ua:'митися'},
 {inf:'vestirsi',forms:['mi vesto','ti vesti','si veste','ci vestiamo','vi vestite','si vestono'],base:'vestire',ua:'одягатися'},
 {inf:'prepararsi',forms:['mi preparo','ti prepari','si prepara','ci prepariamo','vi preparate','si preparano'],base:'preparare',ua:'готуватися'},
 {inf:'sentirsi',forms:['mi sento','ti senti','si sente','ci sentiamo','vi sentite','si sentono'],base:'sentire',ua:'почуватися'},
 {inf:'addormentarsi',forms:['mi addormento','ti addormenti','si addormenta','ci addormentiamo','vi addormentate','si addormentano'],base:'addormentare',ua:'засинати'},
 {inf:'divertirsi',forms:['mi diverto','ti diverti','si diverte','ci divertiamo','vi divertite','si divertono'],base:'divertire',ua:'розважатися'},
 {inf:'rilassarsi',forms:['mi rilasso','ti rilassi','si rilassa','ci rilassiamo','vi rilassate','si rilassano'],base:'rilassare',ua:'розслаблятися'},
 {inf:'sedersi',forms:['mi siedo','ti siedi','si siede','ci sediamo','vi sedete','si siedono'],base:'sedere',ua:'сідати'}
];
const BANKS={pronouns:[],conjugation:[],chiamarsi:[],routine:[],sentence:[],negative:[],context:[],mixed:[]};
function add(type,q,a,wrong,why){const options=[...new Set(wrong.filter(x=>x!==a))];BANKS[type].push([q,a,options,why]);}
const routineActs=[
 {v:'svegliarsi',ctx:'alle sette',sentence:'___ alle sette.',ua:'Прокидаюся о сьомій.'},
 {v:'alzarsi',ctx:'dal letto',sentence:'___ dal letto.',ua:'Встаю з ліжка.'},
 {v:'lavarsi',ctx:'la mattina',sentence:'___ la mattina.',ua:'Миюся вранці.'},
 {v:'vestirsi',ctx:'prima di uscire',sentence:'___ prima di uscire.',ua:'Одягаюся перед виходом.'},
 {v:'prepararsi',ctx:'per la scuola',sentence:'___ per la scuola.',ua:'Готуюся до школи.'},
 {v:'addormentarsi',ctx:'verso le dieci',sentence:'___ verso le dieci.',ua:'Засинаю близько десятої.'},
 {v:'rilassarsi',ctx:'dopo il lavoro',sentence:'___ dopo il lavoro.',ua:'Розслабляюся після роботи.'},
 {v:'divertirsi',ctx:'con gli amici',sentence:'___ con gli amici.',ua:'Розважаюся з друзями.'}
];
const subs=['Io','Tu','Lui','Lei','Noi','Voi','Loro'];
VERBS.forEach(v=>PRONOUNS.forEach((s,si)=>{
 const form=v.forms[s.i];
 add('conjugation',`${s.subject} ___ (${v.inf})`,form,VERBS.filter(x=>x!==v).map(x=>x.forms[s.i]).concat([v.forms[(s.i+1)%6]]),`Форма ${v.inf}: ${s.subject.toLowerCase()} → ${form}. Займенник змінюється відповідно до особи.`);
 add('pronouns',`${s.subject.toLowerCase()} → ___ ${v.base}`,s.p,PRONOUNS.filter(x=>x.p!==s.p).map(x=>x.p),`${s.subject}: займенник — ${s.p}.`);
 add('mixed',`${s.subject} ___ (${v.inf})`,form,VERBS.filter(x=>x!==v).map(x=>x.forms[s.i]).concat([v.forms[(s.i+2)%6]]),`Правильно: ${form}.`);
}));
VERBS[0].forms.forEach((form,i)=>{
 const s=PRONOUNS[i];
 add('chiamarsi',`${s.subject} ___ ${['Olena','Marco','Anna','Luca','Sofia','Paolo','Marta'][i]}.`,form,VERBS[0].forms.filter(x=>x!==form).slice(0,3),`Chiamarsi: ${s.subject.toLowerCase()} → ${form}.`);
 add('sentence',`Completa: ${s.subject} ___ . (chiamarsi)`,form,VERBS[0].forms.filter(x=>x!==form).slice(0,3),`La forma corretta è ${form}.`);
});
// Clear, natural daily routine contexts.
const contexts=[
 ['La mattina, appena apro gli occhi, ___ . (io, svegliarsi)','mi sveglio','ti svegli','si sveglia','З io: mi sveglio.'],
 ['Prima di andare al lavoro, Marco ___ . (alzarsi)','si alza','mi alzo','si alzano','Marco = lui: si alza.'],
 ['Dopo la doccia, Anna ___ . (vestirsi)','si veste','ti vesti','si vestono','Anna = lei: si veste.'],
 ['Prima di uscire, noi ___ . (prepararsi)','ci prepariamo','si preparano','vi preparate','Noi: ci prepariamo.'],
 ['Dopo una giornata lunga, io ___ sul divano. (rilassarsi)','mi rilasso','si rilassa','ci rilassiamo','Io: mi rilasso.'],
 ['I bambini ___ presto la sera. (addormentarsi)','si addormentano','si addormenta','ci addormentiamo','I bambini = loro: si addormentano.'],
 ['Alle feste, voi ___ molto. (divertirsi)','vi divertite','si divertono','ci divertiamo','Voi: vi divertite.'],
 ['Oggi non sto bene: ___ stanco. (io, sentirsi)','mi sento','si sente','ti senti','Io: mi sento stanco/a.'],
 ['Prima della scuola, tu ___ e fai colazione. (lavarsi)','ti lavi','mi lavo','si lava','Tu: ti lavi.'],
 ['Come ___? Mi chiamo Giulia. (tu, chiamarsi)','ti chiami','mi chiamo','si chiama','La domanda a tu: Come ti chiami?'],
 ['Noi ___ alle sette e poi facciamo colazione. (svegliarsi)','ci svegliamo','si svegliano','vi svegliate','Noi: ci svegliamo.'],
 ['Mio fratello ___ alle undici. (addormentarsi)','si addormenta','mi addormento','si addormentano','Mio fratello = lui: si addormenta.'],
 ['Io ___ davanti allo specchio. (prepararsi)','mi preparo','ti prepari','si prepara','Io: mi preparo.'],
 ['Dopo il corso, le studentesse ___ con gli amici. (divertirsi)','si divertono','ci divertiamo','si diverte','Le studentesse = loro: si divertono.'],
 ['Quando siete stanchi, voi ___ un po’. (rilassarsi)','vi rilassate','si rilassano','ci rilassiamo','Voi: vi rilassate.']
];
contexts.forEach(x=>{add('context',x[0],x[1],[x[2],x[3]],x[4]);add('mixed',x[0],x[1],[x[2],x[3]],x[4]);});
// Reflexive pronoun placement in negative sentences.
const negatives=[
 ['Io ___ sveglio tardi la domenica. (non)','non mi','mi non','non si','In italiano: non + pronome riflessivo + verbo → non mi sveglio.'],
 ['Tu ___ lavi con acqua fredda. (non)','non ti','ti non','non mi','La forma negativa è non ti lavi.'],
 ['Lui ___ veste in fretta. (non)','non si','si non','non ti','La forma negativa è non si veste.'],
 ['Noi ___ addormentiamo subito. (non)','non ci','ci non','non si','La forma negativa è non ci addormentiamo.'],
 ['Voi ___ preparate per uscire. (non)','non vi','vi non','non ci','La forma negativa è non vi preparate.'],
 ['Loro ___ divertono alla festa. (non)','non si','si non','non vi','La forma negativa è non si divertono.'],
 ['Anna ___ sente bene oggi. (non)','non si','si non','non mi','Anna = lei: non si sente bene.']
];
negatives.forEach(x=>{add('negative',x[0],x[1],[x[2],x[3]],x[4]);add('mixed',x[0],x[1],[x[2],x[3]],x[4]);});
// Build substantial pools with varied subjects, verbs and everyday contexts.
for(let round=0;round<8;round++){
 VERBS.forEach((v,vi)=>PRONOUNS.forEach((s,si)=>{
  const form=v.forms[s.i];
  add('conjugation',`${s.subject} ___ (${v.inf}) · esercizio ${round+1}`,form,VERBS.filter(x=>x!==v).map(x=>x.forms[s.i]).concat([v.forms[(s.i+1)%6]]),`${v.inf}: ${s.subject.toLowerCase()} → ${form}.`);
  add('pronouns',`${s.subject} ___ ${v.base} (${v.inf})`,s.p,PRONOUNS.filter(x=>x.p!==s.p).map(x=>x.p),`${s.subject}: usa ${s.p}.`);
  add('mixed',`${s.subject} ___ (${v.inf})`,form,VERBS.filter(x=>x!==v).map(x=>x.forms[s.i]).concat([v.forms[(s.i+3)%6]]),`La forma corretta è ${form}.`);
 }));
}
for(let round=0;round<10;round++){
 const v=VERBS[round%VERBS.length]; const i=round%6; const sub=PRONOUNS[i]; const form=v.forms[i];
 add('sentence',`${sub.subject} ___ ${['ogni mattina','prima di uscire','la sera','dopo il lavoro','alle sette'][round%5]}. (${v.inf})`,form,VERBS.filter(x=>x!==v).map(x=>x.forms[i]).concat([v.forms[(i+1)%6]]),`La forma corretta è ${form}.`);
 add('context',`${sub.subject} ___ ${['alle sette','prima di uscire','dopo il lavoro','la sera','con gli amici'][round%5]}. (${v.inf})`,form,VERBS.filter(x=>x!==v).map(x=>x.forms[i]).concat([v.forms[(i+2)%6]]),`${sub.subject}: ${form}.`);
}
const LABELS={pronouns:['I pronomi riflessivi','Обери правильний займенник: mi, ti, si, ci, vi, si.'],conjugation:['Le forme verbali','Звертай увагу на особу та форму зворотного дієслова.'],chiamarsi:['Chiamarsi','Тренуй форми дієслова chiamarsi, щоб представитися.'],routine:['La routine quotidiana','Вивчай зворотні дієслова для опису щоденних справ.'],sentence:['Completa la frase','Обери форму, яка правильно завершує речення.'],negative:['La forma negativa','У запереченні non ставимо перед зворотним займенником.'],context:['Situazioni quotidiane','Визнач особу за контекстом і вибери правильну форму.'],mixed:['Ripasso finale','Змішані вправи на займенники та зворотні дієслова.']};
const $=id=>document.getElementById(id);const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};const params=new URLSearchParams(location.search);const type=params.get('type')||'mixed';const bank=type==='mixed'?[...BANKS.mixed,...BANKS.conjugation,...BANKS.pronouns,...BANKS.context,...BANKS.sentence]:type==='routine'?[...BANKS.context,...BANKS.sentence,...BANKS.conjugation].filter((_,i)=>i%2===0):BANKS[type]||BANKS.mixed;const TOTAL=15;let questions=shuffle(bank).slice(0,TOTAL).map(([prompt,correct,wrong,why])=>({prompt,correct,options:shuffle([correct,...shuffle(wrong.filter(x=>x!==correct)).slice(0,3)]),why}));let index=0,score=0,answered=false;const label=LABELS[type]||LABELS.mixed;$('eyebrow').textContent='Presente indicativo · A1';$('title').textContent=label[0];$('subtitle').textContent=label[1];$('typeLabel').textContent=label[0];function escapeHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}function render(){answered=false;$('feedback').className='feedback';$('feedback').innerHTML='';$('progressText').textContent=`${index+1} / ${TOTAL}`;$('fill').style.width=`${(index+1)/TOTAL*100}%`;const item=questions[index];$('prev').disabled=index===0;$('next').textContent=index===TOTAL-1?'Завершити':'Avanti →';$('content').innerHTML=`<div class="question">${item.prompt}</div><div class="answers">${item.options.map(o=>`<button class="answer" type="button" data-answer="${escapeHTML(o)}">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(btn=>btn.addEventListener('click',()=>answer(item,btn)));}function answer(item,btn){if(answered)return;answered=true;const chosen=btn.dataset.answer;const ok=chosen===item.correct;if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');$('feedback').className=`feedback show ${ok?'good':'bad'}`;$('feedback').innerHTML=`<strong>${ok?'✓ Правильно!':'✕ Неправильно'}</strong><div>${item.why}</div>`;}$('prev').addEventListener('click',()=>{if(index>0){index--;render()}});$('next').addEventListener('click',()=>{if(!answered){$('feedback').className='feedback show bad';$('feedback').innerHTML='<strong>Спочатку обери відповідь.</strong>';return}if(index<TOTAL-1){index++;render()}else finish()});function finish(){$('card').style.display='none';$('end').classList.add('show');$('score').textContent=`Правильних відповідей: ${score} із ${TOTAL}.`;$('summary').innerHTML=`<p>${score>=12?'Чудово! Продовжуй так само.':score>=8?'Добре! Повтори пояснення до помилок.':'Перечитай правило та спробуй ще раз.'}</p><button class="retry" id="retry">Спробувати ще раз</button>`;$('retry').addEventListener('click',()=>location.reload())}render();
