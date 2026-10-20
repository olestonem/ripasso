const S=15;
const $=id=>document.getElementById(id);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const numWords={
0:["zero","нуль"],1:["uno","один"],2:["due","два"],3:["tre","три"],4:["quattro","чотири"],5:["cinque","п’ять"],6:["sei","шість"],7:["sette","сім"],8:["otto","вісім"],9:["nove","дев’ять"],10:["dieci","десять"],11:["undici","одинадцять"],12:["dodici","дванадцять"],13:["tredici","тринадцять"],14:["quattordici","чотирнадцять"],15:["quindici","п’ятнадцять"],16:["sedici","шістнадцять"],17:["diciassette","сімнадцять"],18:["diciotto","вісімнадцять"],19:["diciannove","дев’ятнадцять"],20:["venti","двадцять"],30:["trenta","тридцять"],40:["quaranta","сорок"],50:["cinquanta","п’ятдесят"],60:["sessanta","шістдесят"],70:["settanta","сімдесят"],80:["ottanta","вісімдесят"],90:["novanta","дев’яносто"],100:["cento","сто"]
};
function italian(n){
 if(numWords[n]) return numWords[n][0];
 if(n<0||n>100||!Number.isInteger(n)) return String(n);
 const tens=Math.floor(n/10)*10, unit=n%10, t=numWords[tens][0];
 if(unit===1||unit===8) return t.slice(0,-1)+numWords[unit][0];
 return t+numWords[unit][0];
}
function uk(n){
 if(numWords[n]) return numWords[n][1];
 if(n>20 && n<100){
   const tens=Math.floor(n/10)*10, unit=n%10;
   return numWords[tens][1] + (unit ? " " + numWords[unit][1] : "");
 }
 return "";
}
function uniqueOptions(correct, pool, count=4){return shuffle([correct,...shuffle([...new Set(pool.filter(x=>String(x)!==String(correct)))]).slice(0,count-1)])}
function fb(why,extra=""){return {why,extra}}
const activityInfo={
 flashcard:["🗂️ Flashcard","Перегортай картки та запам’ятовуй числа."],
 digit:["🔢 Come si scrive?","Обери італійське слово, яке відповідає цифрі."],
 number:["🔤 Dal numero alla cifra","Прочитай італійське слово та вибери цифру."],
 listen:["🔊 Ascolta e scegli","Прослухай число італійською та вибери цифру."],
 sequence:["➡️ Qual è il prossimo?","Продовж числовий ряд."],
 missing:["❓ Trova il numero mancante","Знайди число, якого бракує."],
 compare:["⚖️ Maggiore o minore?","Вибери правильне порівняння."],
 calculate:["➕ Piccoli calcoli","Розв’яжи простий приклад."]
};
const type=new URLSearchParams(location.search).get("type")||"digit";
if(!activityInfo[type]) location.replace("index.html");
let pool=[],questions=[],index=0,score=0,answered=false;
const baseNumbers=Array.from({length:101},(_,i)=>i);
function q(prompt,correct,options,why,extra="",kind="mc",more={}){return {prompt,correct:String(correct),options:options.map(String),feedback:fb(why,extra),kind,...more}}
function buildDigit(){return shuffle(baseNumbers.map(n=>q(`Яке італійське слово відповідає числу? <span class="number-big">${n}</span>`,italian(n),uniqueOptions(italian(n),baseNumbers.map(italian)),`Правильна відповідь: ${italian(n)} — ${n}.`,`${n} українською: ${uk(n)||"число"}.`))).slice(0,100)}
function buildNumber(){return shuffle(baseNumbers.map(n=>q(`Яка цифра відповідає слову? <span class="number-big">${italian(n)}</span>`,n,uniqueOptions(n,baseNumbers),`“${italian(n)}” означає ${n}.`,`${n} українською: ${uk(n)||"число"}.`))).slice(0,100)}
function buildListen(){return shuffle(baseNumbers.map(n=>q(`Прослухай число та вибери правильну цифру. <button class="listen-button" type="button" id="speakBtn">🔊 Прослухати ще раз</button>`,n,uniqueOptions(n,baseNumbers),`Ти почув/почула “${italian(n)}”: це ${n}.`,`Італійською: ${italian(n)}.`, "mc",{speak:italian(n)}))).slice(0,100)}
function buildSequence(){const starts=[0,1,2,3,4,5,10,11,12,15,20,30,40,50,60,70,80,90];return shuffle(starts.map((s,i)=>{const step=[1,1,1,1,2,2,5,10][i%8],a=[s,s+step,s+step*2];const ans=s+step*3;return q(`Яке число буде наступним? <span class="number-big">${a.join(" · ")} · ?</span>`,ans,uniqueOptions(ans,[ans-10,ans-5,ans-1,ans+1,ans+5,ans+10].filter(n=>n>=0&&n<=100)),`Після ${a.join(", ")} йде ${ans}.`,`Крок послідовності: +${step}.`)}))}
function buildMissing(){return shuffle(Array.from({length:30},(_,i)=>{const step=[1,2,5,10][i%4],s=[0,2,5,10,20,30,40,50][i%8],arr=[s,s+step,s+step*2,s+step*3];const at=i%3;const ans=arr[at];arr[at]="?";return q(`Якого числа бракує? <span class="number-big">${arr.join(" · ")}</span>`,ans,uniqueOptions(ans,[ans-10,ans-5,ans-1,ans+1,ans+5,ans+10].filter(n=>n>=0&&n<=100)),`Бракує числа ${ans}.`,`Послідовність змінюється на ${step}.`)}))}
function buildCompare(){return shuffle(Array.from({length:50},(_,i)=>{let a=(i*7+13)%101,b=(i*11+29)%101;if(a===b)b=(b+1)%101;const ans=a>b?">":a<b?"<":"=";return q(`Порівняй числа. <span class="number-big">${a}　□　${b}</span>`,ans,[">","<","="],`${a} ${ans} ${b}.`,`${a} ${a>b?"більше за":a<b?"менше за":"дорівнює"} ${b}.`)}))}
function buildCalculate(){return shuffle(Array.from({length:60},(_,i)=>{let a=(i*3)%21,b=(i*5+2)%21;if(i%2){if(a<b)[a,b]=[b,a];return q(`Розв’яжи приклад. <span class="number-big">${a} − ${b} = ?</span>`,a-b,uniqueOptions(a-b,Array.from({length:21},(_,j)=>j)),`${a} − ${b} = ${a-b}.`)}return q(`Розв’яжи приклад. <span class="number-big">${a} + ${b} = ?</span>`,a+b,uniqueOptions(a+b,Array.from({length:41},(_,j)=>j)),`${a} + ${b} = ${a+b}.`)}))}
function buildFlash(){return shuffle(baseNumbers.map(n=>({kind:"flash",prompt:`${n}`,correct:String(n),word:italian(n),ua:uk(n)||`число ${n}`,feedback:fb(`${n} італійською — ${italian(n)}.`,`${n} = ${italian(n)}.`)})))}
const builders={digit:buildDigit,number:buildNumber,listen:buildListen,sequence:buildSequence,missing:buildMissing,compare:buildCompare,calculate:buildCalculate,flashcard:buildFlash};
pool=builders[type]();questions=pool.slice(0,S);
function renderHeader(){$("eyebrow").textContent=activityInfo[type][0];$("title").textContent=activityInfo[type][0].replace(/^\S+\s/,"");$("subtitle").textContent=activityInfo[type][1];$("typeLabel").textContent=activityInfo[type][0]}
function render(){
 answered=false;$("feedback").className="feedback";$("feedback").innerHTML="";
 $("progressText").textContent=`${index+1} / ${S}`;$("fill").style.width=`${((index+1)/S)*100}%`;
 const q=questions[index];$("prev").disabled=index===0;$("next").textContent=index===S-1?"Завершити":"Avanti →";
 if(q.kind==="flash"){renderFlash(q);return}
 $("content").innerHTML=`<div class="question">${q.prompt}</div>${type==="listen"?`<div class="answers">${q.options.map(o=>`<button class="answer" type="button" data-answer="${o}">${o}</button>`).join("")}</div>`:`<div class="answers">${q.options.map(o=>`<button class="answer" type="button" data-answer="${o}">${o}</button>`).join("")}</div>`}`;
 document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(q,b));
 if(type==="listen"){const speak=()=>speakItalian(q.speak);const btn=document.getElementById("speakBtn");if(btn)btn.onclick=e=>{e.stopPropagation();speak()};setTimeout(speak,250)}
}
function renderFlash(q){$("content").innerHTML=`<div class="flashcard" tabindex="0" id="flashcard" role="button" aria-label="Перевернути картку"><div class="flash-inner"><div class="flash-face flash-front"><div>${q.word}</div><small>Натисни, щоб перевернути</small></div><div class="flash-face flash-back"><div class="uk">${q.prompt}</div><div>${q.ua}</div><div class="definition">${q.feedback.why}</div></div></div></div><div class="flash-hint">Натисни на картку, щоб побачити число та переклад.</div>`;const c=$("flashcard");c.onclick=()=>c.classList.toggle("flipped");c.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();c.classList.toggle("flipped")}}}
function answer(q,b){if(answered)return;answered=true;const chosen=b.dataset.answer;const ok=chosen===q.correct;if(ok)score++;document.querySelectorAll(".answer").forEach(x=>{x.disabled=true;if(x.dataset.answer===q.correct)x.classList.add("correct")});if(!ok)b.classList.add("wrong");showFeedback(ok,q.feedback)}
function showFeedback(ok,f){$("feedback").className=`feedback show ${ok?"good":"bad"}`;$("feedback").innerHTML=`<strong>${ok?"✓ Правильно!":"✕ Спробуй ще раз!"}</strong><div>${f.why}</div>${f.extra?`<div class="example">${f.extra}</div>`:""}`}
function speakItalian(text){if(!("speechSynthesis" in window)){return}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="it-IT";u.rate=.78;window.speechSynthesis.speak(u)}
$("prev").onclick=()=>{if(index>0){index--;render()}};
$("next").onclick=()=>{if(index<S-1){index++;render()}else finish()};
function finish(){$("card").style.display="none";$("end").classList.add("show");$("score").textContent=`Ти відповів/відповіла правильно на ${score} із ${S} запитань.`}
renderHeader();render();