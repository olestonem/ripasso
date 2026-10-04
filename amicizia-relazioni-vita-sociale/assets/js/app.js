
const state={items:[],index:0,answered:false,activity:null,flipped:false};

function shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
function pick15(arr){return shuffle(arr).slice(0,15)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}

function initActivity(type){
  state.activity=type;
  state.items=pick15(window.CUCINA_DATA[type]);
  state.index=0;
  render();
}
function render(){
  state.answered=false; state.flipped=false;
  const item=state.items[state.index];
  const pct=((state.index+1)/15)*100;
  document.getElementById('progressLabel').textContent=`${state.index+1}/15`;
  document.getElementById('progressBar').style.width=pct+'%';
  const prompt=document.getElementById('prompt'),content=document.getElementById('content'),feedback=document.getElementById('feedback');
  feedback.className='feedback';feedback.innerHTML='';prompt.textContent=item.q||'';content.innerHTML='';
  document.getElementById('prevBtn').disabled=state.index===0;
  document.getElementById('nextBtn').textContent=state.index===14?'Fine →':'Avanti →';
  if(state.activity==='quiz'||state.activity==='completa'||state.activity==='roleplay'||state.activity==='situazioni'||state.activity==='verbi') renderMC(item,content);
  else if(state.activity==='indovina') renderWord(item,content);
  else if(state.activity==='intruso') renderIntruder(item,content);
  else if(state.activity==='flashcard') renderFlash(item,content);
}
function renderMC(item,content){
  if(item.context){const c=document.createElement('div');c.className='context';c.textContent=item.context;content.appendChild(c)}
  const box=document.createElement('div');box.className='options';
  shuffle(item.options.map((text,i)=>({text,i}))).forEach(o=>{
    const b=document.createElement('button');b.className='option';b.textContent=o.text;
    b.onclick=()=>answerMC(item,o.i,b,box);box.appendChild(b)
  });
  content.appendChild(box)
}
function answerMC(item,chosen,button,box){
  if(state.answered)return;state.answered=true;
  [...box.children].forEach(b=>b.disabled=true);
  button.classList.add(chosen===item.answer?'correct':'wrong');
  if(chosen!==item.answer){
    const correctText=item.options[item.answer];
    const idx=[...box.children].findIndex(b=>b.textContent===correctText);
    if(idx>=0)box.children[idx].classList.add('correct')
  }
  showFeedback(chosen===item.answer,item.explanation,item.example)
}
function renderWord(item,content){
  const box=document.createElement('div');
  box.className='word-answer';

  // "Indovina la parola" can use either of the two data formats
  // already present in the project:
  // 1) item.options + numeric item.answer
  // 2) string item.answer + distractors taken from the same activity.
  let candidates=[];
  let correctIndex=null;
  let correctWord=null;

  if(Array.isArray(item.options) && item.options.length){
    const answerIndex=Number(item.answer);
    if(!Number.isInteger(answerIndex) || answerIndex<0 || answerIndex>=item.options.length){
      const msg=document.createElement('div');
      msg.className='word-answer-error';
      msg.textContent='Le opzioni di questa domanda non sono disponibili.';
      content.appendChild(msg);
      return;
    }
    correctIndex=answerIndex;
    correctWord=item.options[answerIndex];
    candidates=shuffle(item.options.map((text,index)=>({text,index})));
  }else if(item.answer!==undefined && item.answer!==null){
    correctWord=String(item.answer);
    const pool=state.items
      .map(x=>x && x.answer)
      .filter(x=>x!==undefined && x!==null)
      .map(String)
      .filter(x=>x!==correctWord);
    candidates=shuffle([correctWord,...pool.filter((x,i,a)=>a.indexOf(x)===i).slice(0,3)])
      .map(text=>({text,index:null}));
  }

  if(!candidates.length){
    const msg=document.createElement('div');
    msg.className='word-answer-error';
    msg.textContent='Le opzioni di questa domanda non sono disponibili.';
    content.appendChild(msg);
    return;
  }

  candidates.forEach(o=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='word-chip';
    b.textContent=o.text;
    if(o.index!==null)b.dataset.optionIndex=String(o.index);
    b.onclick=()=>answerWord(item,o,b,box);
    box.appendChild(b);
  });
  content.appendChild(box);
}

function answerWord(item,choice,b,box){
  if(state.answered)return;
  state.answered=true;
  [...box.children].forEach(x=>x.disabled=true);

  let ok=false;
  let correctButton=null;
  if(Array.isArray(item.options) && item.options.length){
    const correctIndex=Number(item.answer);
    ok=choice.index===correctIndex;
    correctButton=[...box.children].find(x=>Number(x.dataset.optionIndex)===correctIndex);
  }else{
    const correctWord=String(item.answer);
    ok=choice.text===correctWord;
    correctButton=[...box.children].find(x=>x.textContent===correctWord);
  }

  b.classList.add(ok?'correct':'wrong');
  if(!ok && correctButton)correctButton.classList.add('correct');
  showFeedback(ok,item.explanation,item.example);
}
function renderIntruder(item,content){
  const box=document.createElement('div');box.className='word-answer';
  shuffle(item.options).forEach(word=>{
    const b=document.createElement('button');b.className='word-chip';b.textContent=word;
    b.onclick=()=>answerWord(item,word,b,box);box.appendChild(b)
  });
  content.appendChild(box)
}
function renderFlash(item,content){
  document.getElementById('prompt').textContent='';
  const wrap=document.createElement('div');wrap.className='flashcard';
  const inner=document.createElement('div');inner.className='flash-inner';
  const front=document.createElement('div');front.className='face front';
  front.innerHTML=`<div class="term">${esc(item.front)}</div>`;
  const back=document.createElement('div');back.className='face back';
  const parts=item.back.split('\n');
  back.innerHTML=`<div class="ua">${esc(parts[0])}</div><div class="expl">${esc(parts.slice(1).join(' '))}</div>`;
  inner.append(front,back);wrap.appendChild(inner);content.appendChild(wrap);
  wrap.onclick=()=>{wrap.classList.toggle('flipped');state.flipped=!state.flipped}
}
function showFeedback(ok,ex,example){
  const f=document.getElementById('feedback');f.className='feedback show';
  f.innerHTML=`<strong>${ok?'✓ Corretto':'✗ Non corretto'}</strong><div>${esc(ex)}</div><div class="example"><b>Esempio reale:</b> ${esc(example)}</div>`
}
function prev(){if(state.index>0){state.index--;render()}}
function next(){if(state.index<14){state.index++;render()}else{location.href='index.html'}}
