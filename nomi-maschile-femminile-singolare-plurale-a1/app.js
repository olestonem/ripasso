const TOTAL=15;
const $=id=>document.getElementById(id);
const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const unique=(correct,options,count=4)=>shuffle([String(correct),...shuffle([...new Set(options.map(String).filter(x=>x!==String(correct)))]).slice(0,count-1)]);
const q=(prompt,correct,options,why,extra="",context="")=>({prompt,correct:String(correct),options:unique(correct,options),why,extra,context});
const A={
gender:["⚥ Maschile o femminile?","Визнач рід іменника. Звертай увагу на артикль."],
changeGender:["🪞 Il maschile e il femminile","Обери відповідну форму чоловічого або жіночого роду."],
number:["1️⃣ Singolare o plurale?","Визнач, чи йдеться про одну особу/річ, чи про кілька."],
plural:["🔁 Dal singolare al plurale","Обери правильну форму множини."],
endings:["🔤 Le desinenze","Повторюй типові закінчення і правила утворення множини."],
people:["👨‍👩‍👧 Nomi di persone","Знайди відповідну назву людини або пару."],
special:["⭐ Nomi particolari","Запам’ятай поширені особливі та незмінювані іменники."],
mixed:["🎯 Ripasso finale","Перевір свої знання про рід і число іменників."]
};
const genderData=[
["il libro","maschile"],["la casa","femminile"],["lo studente","maschile"],["l'amica","femminile"],["il ragazzo","maschile"],["la notte","femminile"],["il fiore","maschile"],["la lezione","femminile"],["il problema","maschile"],["la mano","femminile"],["il cinema","maschile"],["la città","femminile"],["il padre","maschile"],["la madre","femminile"],["l'albero","maschile"],["la chiave","femminile"],["il cane","maschile"],["la radio","femminile"],["lo zaino","maschile"],["l'università","femminile"],["il giorno","maschile"],["la famiglia","femminile"],["il latte","maschile"],["la foto","femminile"]
];
const genderQuestions=()=>shuffle(genderData).map(([noun,g])=>q(`Qual è il genere del nome? <span class="big">${noun}</span>`,g,["maschile","femminile"],`“${noun}” è ${g}.`,`Impara il nome insieme all’articolo: l’articolo aiuta a ricordare il genere.`));
const pairs=[
["ragazzo","ragazza"],["bambino","bambina"],["amico","amica"],["italiano","italiana"],["maestro","maestra"],["studente","studentessa"],["professore","professoressa"],["attore","attrice"],["uomo","donna"],["padre","madre"],["fratello","sorella"],["marito","moglie"],["figlio","figlia"],["nonno","nonna"],["zio","zia"],["cugino","cugina"],["signore","signora"],["re","regina"],["gatto","gatta"],["leone","leonessa"]
];
const changeQuestions=()=>shuffle(pairs).map(([m,f],i)=>i%2?q(`Qual è il femminile di “${m}”?`,f,[m,f,...pairs.map(p=>p[1])],`Il femminile di “${m}” è “${f}”.`,`Alcune forme cambiano solo la desinenza; altre hanno una forma diversa.`):q(`Qual è il maschile di “${f}”?`,m,[m,f,...pairs.map(p=>p[0])],`Il maschile di “${f}” è “${m}”.`,`Non tutte le coppie seguono la stessa regola: per esempio, uomo/donna e marito/moglie sono forme diverse.`));
const numberData=[
["il libro","singolare"],["i libri","plurale"],["la casa","singolare"],["le case","plurale"],["lo studente","singolare"],["gli studenti","plurale"],["l'amica","singolare"],["le amiche","plurale"],["il fiore","singolare"],["i fiori","plurale"],["la lezione","singolare"],["le lezioni","plurale"],["la città","singolare"],["le città","plurale"],["il problema","singolare"],["i problemi","plurale"],["l'uomo","singolare"],["gli uomini","plurale"],["la mano","singolare"],["le mani","plurale"],["il bar","singolare"],["i bar","plurale"],["la foto","singolare"],["le foto","plurale"]
];
const numberQuestions=()=>shuffle(numberData).map(([noun,n])=>q(`Il nome è al singolare o al plurale? <span class="big">${noun}</span>`,n,["singolare","plurale"],`“${noun}” è al ${n}.`,`Singolare = una persona o una cosa; plurale = due o più.`));
const pluralData=[
["il libro","i libri","I nomi in -o formano spesso il plurale in -i."],["la casa","le case","I nomi in -a femminili formano spesso il plurale in -e."],["il cane","i cani","I nomi in -e formano spesso il plurale in -i."],["la lezione","le lezioni","I nomi in -ione formano il plurale in -ioni."],["lo studente","gli studenti","Studente diventa studenti; cambia anche l’articolo."],["l'amica","le amiche","Amica diventa amiche: si aggiunge h per mantenere il suono duro di c."],["il problema","i problemi","Problema è maschile e al plurale diventa problemi."],["la città","le città","Città è invariabile: la forma non cambia al plurale."],["il bar","i bar","Bar è invariabile: la forma resta uguale."],["la foto","le foto","Foto è invariabile: la forma resta uguale."],["l'uomo","gli uomini","Uomo ha il plurale irregolare: uomini."],["la valigia","le valigie","Valigia diventa valigie."],["l'uovo","le uova","Uovo ha il plurale irregolare uova."],["il medico","i medici","Medico diventa medici: in questo caso c cambia suono davanti a i."],["l'albergo","gli alberghi","Albergo diventa alberghi: si aggiunge h per mantenere il suono duro di g."]
];
const pluralQuestions=()=>shuffle(pluralData).map(([s,p,rule])=>q(`Scegli il plurale corretto di <span class="big">${s}</span>`,p,pluralData.map(x=>x[1]),`Il plurale corretto è “${p}”.`,rule));
const endingData=[
["libro","-o","-i"],["ragazza","-a","-e"],["cane","-e","-i"],["studentessa","-a","-e"],["fiore","-e","-i"],["giorno","-o","-i"],["notte","-e","-i"],["problema","-a","-i"],["mano","-o","-i"],["lezione","-e","-i"],["amica","-a","-e"],["albero","-o","-i"],["chiave","-e","-i"],["amico","-o","-i"],["università","-à","-à"]
];
const endingQuestions=()=>shuffle(endingData).map(([noun,end,pluralEnd])=>q(`Qual è la desinenza finale di “${noun}”?`,end,["-o","-a","-e","-à"],`“${noun}” termina in ${end}.`,`La desinenza aiuta a riconoscere il genere, ma ci sono eccezioni: “problema” è maschile e “mano” è femminile.`));
const peopleData=[
["uomo","donna"],["padre","madre"],["fratello","sorella"],["marito","moglie"],["figlio","figlia"],["nonno","nonna"],["zio","zia"],["cugino","cugina"],["ragazzo","ragazza"],["bambino","bambina"],["re","regina"],["attore","attrice"],["professore","professoressa"],["studente","studentessa"],["signore","signora"],["gatto","gatta"],["gallo","gallina"],["maestro","maestra"]
];
const peopleQuestions=()=>shuffle(peopleData).map(([m,f],i)=>i%2?q(`Completa la coppia: “${m}” e…`,f,peopleData.map(p=>p[1]),`La coppia è “${m} / ${f}”.`,`Alcuni nomi formano coppie con una desinenza diversa; altri usano parole diverse.`):q(`Completa la coppia: “${f}” e…`,m,peopleData.map(p=>p[0]),`La coppia è “${m} / ${f}”.`,`Memorizza le coppie più comuni come parole nuove.`));
const specialData=[
["la città","le città","La forma resta uguale al plurale: cambia solo l’articolo."],["il bar","i bar","Bar è invariabile."],["la foto","le foto","Foto è un’abbreviazione di fotografia e resta invariabile."],["il cinema","i cinema","Cinema resta invariabile al plurale."],["l'uomo","gli uomini","Uomo ha un plurale irregolare: uomini."],["l'uovo","le uova","Uovo ha un plurale irregolare: uova."],["la mano","le mani","Mano è femminile anche se termina in -o."],["il problema","i problemi","Problema è maschile anche se termina in -a."],["il programma","i programmi","Programma è maschile anche se termina in -a."],["l'amico","gli amici","Amico diventa amici; non si scrive “amichi”."],["l'albergo","gli alberghi","Albergo diventa alberghi per mantenere il suono duro di g."],["la farmacia","le farmacie","Farmacia diventa farmacie."],["il dito","le dita","Il plurale collettivo più comune è dita."],["il ristorante","i ristoranti","Ristorante segue la regola comune dei nomi in -e: al plurale termina in -i."],["il caffè","i caffè","Caffè è invariabile al plurale."]
];
const specialQuestions=()=>shuffle(specialData).map(([s,p,rule])=>q(`Qual è il plurale corretto di <span class="big">${s}</span>?`,p,specialData.map(x=>x[1]),`La forma corretta è “${p}”.`,rule));
function mixedQuestions(){
 const a=genderQuestions().slice(0,5),b=numberQuestions().slice(0,4),c=pluralQuestions().slice(0,3),d=changeQuestions().slice(0,3);
 return shuffle([...a,...b,...c,...d]);
}
const builders={gender:genderQuestions,changeGender:changeQuestions,number:numberQuestions,plural:pluralQuestions,endings:endingQuestions,people:peopleQuestions,special:specialQuestions,mixed:mixedQuestions};
const type=new URLSearchParams(location.search).get("type")||"mixed";
if(!builders[type]) location.replace("index.html");
let questions=shuffle(builders[type]()).slice(0,TOTAL),index=0,score=0,answered=false,results=[];
function renderHeader(){const info=A[type];$("eyebrow").textContent=info[0]+" · A1";$("title").textContent=info[0].replace(/^\S+\s/,"");$("subtitle").textContent=info[1];$("typeLabel").textContent=info[0];}
function render(){
 answered=false;$("feedback").className="feedback";$("feedback").innerHTML="";
 $("progressText").textContent=`${index+1} / ${TOTAL}`;$("fill").style.width=`${((index+1)/TOTAL)*100}%`;
 const item=questions[index];$("prev").disabled=index===0;$("next").textContent=index===TOTAL-1?"Завершити":"Avanti →";
 $("content").innerHTML=`<div class="question">${item.prompt}</div>${item.context?`<p class="context">${item.context}</p>`:""}<div class="answers">${item.options.map((o,i)=>`<button class="answer" type="button" data-answer="${escapeAttr(o)}">${o}</button>`).join("")}</div>`;
 document.querySelectorAll(".answer").forEach(btn=>btn.addEventListener("click",()=>answer(item,btn)));
}
function escapeAttr(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function answer(item,btn){
 if(answered)return;answered=true;const chosen=btn.dataset.answer;const ok=chosen===item.correct;results[index]=ok;score=results.filter(Boolean).length;
 document.querySelectorAll(".answer").forEach(b=>{b.disabled=true;if(b.dataset.answer===item.correct)b.classList.add("correct")});
 if(!ok)btn.classList.add("wrong");
 $("feedback").className=`feedback show ${ok?"good":"bad"}`;
 $("feedback").innerHTML=`<strong>${ok?"✓ Правильно!":"✕ Не зовсім. Спробуй запам’ятати правило."}</strong><div>${item.why}</div>${item.extra?`<div style="margin-top:7px">${item.extra}</div>`:""}`;
}
$("prev").addEventListener("click",()=>{if(index>0){index--;render()}});
$("next").addEventListener("click",()=>{if(!answered){$("feedback").className="feedback show bad";$("feedback").innerHTML="<strong>Спочатку обери відповідь.</strong><div>Вибери один із варіантів, а потім переходь далі.</div>";return;}if(index<TOTAL-1){index++;render()}else finish()});
function finish(){
 $("card").style.display="none";$("end").classList.add("show");$("score").textContent=`Ти відповів/відповіла правильно на ${score} із ${TOTAL} запитань.`;
 const wrong=TOTAL-score;
 $("summary").innerHTML=`<div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:18px 0 28px"><div style="padding:18px 24px;background:var(--green);border-radius:18px"><strong style="font-size:28px">${score}</strong><div>Правильно</div></div><div style="padding:18px 24px;background:var(--pink);border-radius:18px"><strong style="font-size:28px">${wrong}</strong><div>Помилки</div></div></div><button class="home-btn" id="retry" type="button">Спробувати ще раз</button>`;
 $("retry").addEventListener("click",()=>location.reload());
}
renderHeader();render();