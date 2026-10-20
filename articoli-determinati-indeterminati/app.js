const S=15,$=id=>document.getElementById(id);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const nouns=[
{n:"libro",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"книга"},
{n:"ragazzo",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"хлопець"},
{n:"tavolo",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"стіл"},
{n:"fiore",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"квітка"},
{n:"studente",g:"m",s:"lo",p:"gli",ind:"uno",kind:"s",uk:"студент"},
{n:"zaino",g:"m",s:"lo",p:"gli",ind:"uno",kind:"z",uk:"рюкзак"},
{n:"specchio",g:"m",s:"lo",p:"gli",ind:"uno",kind:"s",uk:"дзеркало"},
{n:"amico",g:"m",s:"l’",p:"gli",ind:"un",kind:"vowel",uk:"друг"},
{n:"albero",g:"m",s:"l’",p:"gli",ind:"un",kind:"vowel",uk:"дерево"},
{n:"telefono",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"телефон"},
{n:"quaderno",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"зошит"},
{n:"treno",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"поїзд"},
{n:"cane",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"собака"},
{n:"gatto",g:"m",s:"il",p:"i",ind:"un",kind:"consonant",uk:"кіт"},
{n:"amica",g:"f",s:"l’",p:"le",ind:"un’",kind:"vowel",uk:"подруга"},
{n:"casa",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"будинок"},
{n:"penna",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"ручка"},
{n:"scuola",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"школа"},
{n:"borsa",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"сумка"},
{n:"sedia",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"стілець"},
{n:"arancia",g:"f",s:"l’",p:"le",ind:"un’",kind:"vowel",uk:"апельсин"},
{n:"isola",g:"f",s:"l’",p:"le",ind:"un’",kind:"vowel",uk:"острів"},
{n:"insegnante",g:"m/f",s:"l’",p:"gli/le",ind:"un’/un",kind:"vowel",uk:"вчитель / вчителька"},
{n:"pizza",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"піца"},
{n:"ragazza",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"дівчина"},
{n:"orologio",g:"m",s:"l’",p:"gli",ind:"un",kind:"vowel",uk:"годинник"},
{n:"alunna",g:"f",s:"l’",p:"le",ind:"un’",kind:"vowel",uk:"учениця"},
{n:"uomo",g:"m",s:"l’",p:"gli",ind:"un",kind:"vowel",uk:"чоловік"},
{n:"donna",g:"f",s:"la",p:"le",ind:"una",kind:"consonant",uk:"жінка"},
{n:"hotel",g:"m",s:"l’",p:"gli",ind:"un",kind:"vowel",uk:"готель"}
];
const articles=["il","lo","la","l’","i","gli","le","un","uno","una","un’"];
const labels={
 choose:["🎯 Scegli l’articolo","Обери правильний артикль перед іменником."],
 definite:["📌 Un libro o il libro?","Прочитай ситуацію та обери артикль, який відповідає контексту."],
 gender:["🧩 Maschile o femminile?","Обери правильний артикль."],
 plural:["👥 Singolare o plurale?","Обери правильну форму в множині."],
 complete:["✍️ Completa la frase","Встав правильний артикль у речення."],
 fix:["🔎 Trova l’errore","Знайди та виправ помилку."],
 memory:["🗂️ Ripasso veloce","Повтори правила про артиклі."]
};
const type=new URLSearchParams(location.search).get("type")||"choose";
const info=labels[type]||labels.choose;
let questions=[],idx=0,score=0,answered=false;
function q(prompt,correct,options,why){return {prompt,correct,options:shuffle([...new Set([correct,...options.filter(x=>x!==correct)])]).slice(0,4),why}}
function articlePhrase(article,noun){return article.endsWith("’")?`${article}${noun}`:`${article} ${noun}`}
function makeQuestions(){
 let all=[];
 for(const x of nouns){
  const def=x.s, ind=x.ind;
  if(type==="choose") all.push(q(`Обери означений артикль: <span class="target">${x.n}</span>`,def,articles,`Правильно: ${def} ${x.n}. Українською: ${x.uk}.`));
  else if(type==="definite") {
   // Context determines the intended article: first mention = indefinite; known/specific item = definite.
   const introduce=all.length%2===0;
   const correctArticle=introduce?ind:def;
   const correct=articlePhrase(correctArticle,x.n);
   const other=articlePhrase(introduce?def:ind,x.n);
   const context=introduce
    ? `Ситуація: ти вперше згадуєш цей предмет, співрозмовник ще не знає, про який саме йдеться.<br><span class="target">Ho comprato ___ ${x.n}.</span>`
    : `Ситуація: ви вже говорили саме про цей предмет, і співрозмовник знає, який це предмет.<br><span class="target">___ ${x.n} che mi hai consigliato è utile.</span>`;
   const why=introduce
    ? `Тут предмет згадується вперше, тому вживаємо неозначений артикль: <strong>${correct}</strong>. Означений артикль (${other}) був би можливий в іншому контексті — коли співрозмовник уже знає, про який предмет ідеться.`
    : `Тут ідеться про конкретний предмет, про який ви вже говорили, тому вживаємо означений артикль: <strong>${correct}</strong>. Неозначений артикль (${other}) змінив би зміст і не відповідав би цьому контексту.`;
   all.push(q(context,correct,[correct,other,articlePhrase("il",x.n),articlePhrase("un",x.n),articlePhrase("la",x.n)],why));
  }
  else if(type==="gender") all.push(q(`Обери артикль для слова <span class="target">${x.n}</span>.`,def,articles,`Правильно: ${def} ${x.n}. Рід: ${x.g==="f"?"жіночий":x.g==="m"?"чоловічий":"чоловічий або жіночий"}.`));
  else if(type==="plural") all.push(q(`Однина: <span class="target">${def} ${x.n}</span>. Обери множину.`,`${x.p} ${x.n}`,[`${x.p} ${x.n}`,`il ${x.n}`,`la ${x.n}`,`gli ${x.n}`],`Множина: ${x.p} ${x.n}.`));
  else if(type==="complete") all.push(q(`Доповни речення: <span class="target">___ ${x.n}</span> è qui.`,def,articles,`Правильно: ${def} ${x.n}.`));
  else if(type==="fix"){const wrong=def==="il"?"la":def==="la"?"il":def==="lo"?"il":def==="l’"?"la":"il";all.push(q(`Виправ артикль: <span class="target">${wrong} ${x.n}</span>.`,`${def} ${x.n}`,[`${def} ${x.n}`,`il ${x.n}`,`la ${x.n}`,`lo ${x.n}`],`Правильно: ${def} ${x.n} (${x.uk}).`))}
  else all.push(q(`Який артикль правильний? <span class="target">${x.n}</span>`,def,articles,`Запам’ятай: ${def} ${x.n}; неозначений артикль — ${ind}.`));
 }
 return shuffle(all).slice(0,60);
}
questions=makeQuestions().slice(0,S);
$("eyebrow").textContent="Gli articoli · A0–A1";$("title").textContent=info[0].replace(/^\S+\s/,"");$("subtitle").textContent=info[1];$("typeLabel").textContent=info[0];
function render(){
 answered=false;$("feedback").className="feedback";$("feedback").innerHTML="";
 $("progressText").textContent=`${idx+1} / ${S}`;$("fill").style.width=`${(idx+1)/S*100}%`;
 $("prev").disabled=idx===0;$("next").textContent=idx===S-1?"Завершити":"Avanti →";
 const item=questions[idx];
 $("content").innerHTML=`<div class="question">${item.prompt}</div><div class="answers">${item.options.map(o=>`<button type="button" class="answer" data-answer="${o.replace(/"/g,"&quot;")}">${o}</button>`).join("")}</div>`;
 document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(item,b));
}
function answer(item,b){
 if(answered)return;answered=true;const correct=b.dataset.answer===item.correct;if(correct)score++;
 document.querySelectorAll(".answer").forEach(x=>{x.disabled=true;if(x.dataset.answer===item.correct)x.classList.add("correct")});
 if(!correct)b.classList.add("wrong");
 $("feedback").className=`feedback show ${correct?"good":"bad"}`;
 $("feedback").innerHTML=`<strong>${correct?"✓ Правильно!":"✕ Не зовсім!"}</strong><div>${item.why}</div>`;
}
$("prev").onclick=()=>{if(idx>0){idx--;render()}};
$("next").onclick=()=>{if(idx<S-1){idx++;render()}else{$("card").style.display="none";$("end").classList.add("show");$("score").textContent=`Правильні відповіді: ${score} з ${S}.`}};
render();