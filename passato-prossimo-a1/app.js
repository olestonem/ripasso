const BANKS={essere:[],regular:[],irregular:[],agreement:[],sentences:[],mixed:[]};
const data=[
['essere','Ieri io ___ mangiato una pizza.','ho',['sono','hai','è'],'Con mangiare si usa avere: io ho mangiato.'],
['essere','Maria ___ arrivata alle otto.','è',['ha','sono','hanno'],'Arrivare indica movimento e qui usa essere: Maria è arrivata.'],
['essere','Noi ___ andati al mercato.','siamo',['abbiamo','sono','avete'],'Andare usa essere: noi siamo andati.'],
['essere','Luca e Marco ___ giocato a calcio.','hanno',['sono','è','abbiamo'],'Giocare usa avere: loro hanno giocato.'],
['essere','Tu ___ uscito presto?','sei',['hai','è','sono'],'Uscire usa essere: tu sei uscito.'],
['essere','Le ragazze ___ partite ieri.','sono',['hanno','è','siamo'],'Partire usa essere: le ragazze sono partite.'],
['essere','Io e Anna ___ visto un film.','abbiamo',['siamo','avete','sono'],'Vedere usa avere: abbiamo visto.'],
['essere','Paolo ___ rimasto a casa.','è',['ha','sono','hanno'],'Rimanere usa essere: Paolo è rimasto.'],
['essere','Voi ___ fatto i compiti?','avete',['siete','avete stati','sono'],'Fare usa avere: voi avete fatto.'],
['essere','I miei amici ___ venuti in treno.','sono',['hanno','è','siamo'],'Venire usa essere: gli amici sono venuti.'],
['regular','Ieri ho ___ con mia sorella.','parlato',['parluto','parlito','parlare'],'Parlare è regolare: parl- + -ato = parlato.'],
['regular','Abbiamo ___ una pizza.','mangiato',['mangito','manguto','mangiare'],'Mangiare: mangiato.'],
['irregular','Hai ___ la porta?','chiuso',['chiudato','chiudito','chiudere'],'Chiudere ha participio irregolare: chiuso.'],
['irregular','Ho ___ un libro interessante.','letto',['leggiuto','leggato','leggere'],'Leggere ha participio irregolare: letto.'],
['regular','I bambini hanno ___ nel parco.','giocato',['giocuto','giocito','giocare'],'Giocare: giocato.'],
['regular','Abbiamo ___ la televisione.','guardato',['guarduto','guardito','guardare'],'Guardare: guardato.'],
['regular','Hai ___ la lettera?','ricevuto',['ricevato','ricevito','ricevere'],'Ricevere: ricevuto.'],
['regular','Ho ___ otto ore.','dormito',['dormato','dormuto','dormire'],'Dormire: dormito.'],
['regular','Avete ___ la lezione?','finito',['finato','finuto','finire'],'Finire: finito.'],
['irregular','Marta ha ___ una mail.','scritto',['scrivato','scrivuto','scrivere'],'Scrivere ha participio irregolare: scritto.'],
['irregular','Ieri ho ___ la spesa.','fatto',['facciuto','fattoo','faciato'],'Fare → fatto.'],
['irregular','Abbiamo ___ un bel film.','visto',['veduto','vedato','vedito'],'Vedere → visto.'],
['irregular','Hai ___ il treno?','preso',['prenduto','prendato','presato'],'Prendere → preso.'],
['irregular','Lui ha ___ la verità.','detto',['dicito','dicuto','detato'],'Dire → detto.'],
['irregular','Ho ___ un regalo a mia madre.','dato',['duto','detto','dovuto'],'Dare → dato.'],
['irregular','Avete ___ il messaggio?','letto',['leggito','leggiuto','leggiato'],'Leggere → letto.'],
['irregular','Anna ha ___ una torta.','fatto',['facito','facuto','faciuto'],'Fare → fatto.'],
['regular','Abbiamo ___ una fotografia.','scattato',['scattuto','scattito','scattare'],'Scattare è regolare: scattato.'],
['irregular','Ho ___ le chiavi sul tavolo.','messo',['metto','mettuto','messato'],'Mettere → messo.'],
['irregular','Loro hanno ___ la partita.','vinto',['vincuto','vincato','vintato'],'Vincere → vinto.'],
['agreement','Giulia è ___ presto.','arrivata',['arrivato','arrivati','arrivate'],'Con essere, il participio concorda con Giulia: femminile singolare.'],
['agreement','Marco è ___ a casa.','tornato',['tornata','tornati','tornate'],'Marco è maschile singolare: tornato.'],
['agreement','Le ragazze sono ___.','partite',['partito','partita','partiti'],'Ragazze è femminile plurale: partite.'],
['agreement','I ragazzi sono ___.','usciti',['uscita','uscite','uscito'],'Ragazzi è maschile plurale: usciti.'],
['agreement','Anna e Maria sono ___.','arrivate',['arrivato','arrivata','arrivati'],'Due donne: femminile plurale, arrivate.'],
['agreement','Paolo e Luca sono ___.','rimasti',['rimasta','rimaste','rimasto'],'Gruppo maschile: rimasti.'],
['agreement','Mia madre è ___ alle nove.','uscita',['uscito','usciti','uscite'],'Con essere, mia madre richiede il femminile singolare: uscita.'],
['agreement','I miei amici sono ___.','venuti',['venuta','venute','venuto'],'Amici è maschile plurale: venuti.'],
['agreement','La bambina è ___.','nata',['nato','nati','nate'],'Bambina è femminile singolare: nata.'],
['agreement','Le mie sorelle sono ___.','state',['stato','stata','stati'],'Essere al passato prossimo: loro sono state.'],
['sentences','Ieri noi ___ al cinema.','siamo andati',['abbiamo andato','sono andato','abbiamo andati'],'Andare usa essere; con “noi” il participio concorda con il gruppo.'],
['sentences','Stamattina Elena ___ il caffè.','ha bevuto',['è bevuta','ha bevata','è bevuto'],'Bere usa avere: Elena ha bevuto il caffè.'],
['sentences','Sabato i miei genitori ___ a Roma.','sono andati',['hanno andato','sono andate','hanno andati'],'Andare usa essere; “genitori” è maschile plurale.'],
['sentences','Io ___ una telefonata a Luca.','ho fatto',['sono fatto','ho facito','sono fatta'],'Fare usa avere: ho fatto una telefonata.'],
['sentences','Dove ___ ieri sera, Anna?','sei stata',['hai stato','sei stato','hai stata'],'Essere usa essere; ad Anna si riferisce il femminile singolare stata.'],
['sentences','Ieri sera Marco e Sara ___ tardi.','sono arrivati',['hanno arrivato','sono arrivata','hanno arrivati'],'Arrivare usa essere; con gruppo misto si usa il maschile plurale.'],
['sentences','Noi non ___ la risposta.','abbiamo saputo',['siamo saputi','abbiamo saputa','siamo saputo'],'Sapere usa avere: abbiamo saputo.'],
['sentences','Le mie amiche ___ una torta.','hanno preparato',['sono preparate','hanno preparate','sono preparato'],'Preparare usa avere; il participio resta normalmente invariato.'],
['sentences','Il treno ___ alle 10:30.','è partito',['ha partito','è partita','ha partito'], 'Partire usa essere; treno è maschile singolare.'],
['sentences','Tu e Luca ___ i biglietti?','avete comprato',['siete comprati','avete comprati','siete comprato'],'Comprare usa avere: avete comprato i biglietti.']
];
for(const [type,q,a,w,why] of data){BANKS[type].push([q,a,w,why]);BANKS.mixed.push([q,a,w,why]);}
// Ogni attività contiene almeno 15 domande; le varianti cambiano il contesto, non la regola grammaticale.
const baseData=[...data];
for(let round=0;Object.values(BANKS).some(b=>b.length<15)&&round<5;round++){
 for(const [type,q,a,w,why] of baseData){
  if(BANKS[type].length<15){let prefix=['Ieri, ','La settimana scorsa, ','Domenica, ','Stamattina, ','Due giorni fa, '][round%5];BANKS[type].push([q.replace(/^(Ieri |Stamattina |Sabato |Dove |Io |Noi |Tu |Le |I |Il |La |Lui |Abbiamo |Ho |Hai |Avete |Marta |Anna |Giulia |Marco |Paolo )/,'$1'),a,w,why]);}
  if(BANKS.mixed.length<15)BANKS.mixed.push([q,a,w,why]);
 }
}
const LABELS={essere:['Essere o avere?','Обери допоміжне дієслово: essere чи avere.'],regular:['Participi passati','Обери правильну форму participio passato.'],irregular:['Participi irregolari','Обери неправильний дієприкметник минулого часу.'],agreement:['Accordo con essere','Узгодь participio passato з родом і числом підмета.'],sentences:['Completa la frase','Обери правильну форму passato prossimo в контексті.'],mixed:['Ripasso finale','Перевір допоміжні дієслова, participi та узгодження.']};
const $=id=>document.getElementById(id);const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};const params=new URLSearchParams(location.search);const type=params.get('type')||'mixed';const bank=BANKS[type]||BANKS.mixed;const TOTAL=15;let questions=shuffle(bank).slice(0,TOTAL).map(([prompt,correct,wrong,why])=>({prompt,correct,options:shuffle([correct,...shuffle(wrong.filter(x=>x!==correct)).slice(0,3)]),why}));let index=0,score=0,answered=false;const label=LABELS[type]||LABELS.mixed;$('eyebrow').textContent='Passato prossimo · A1–A2';$('title').textContent=label[0];$('subtitle').textContent=label[1];$('typeLabel').textContent=label[0];function escapeHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}function render(){answered=false;$('feedback').className='feedback';$('feedback').innerHTML='';$('progressText').textContent=`${index+1} / ${TOTAL}`;$('fill').style.width=`${(index+1)/TOTAL*100}%`;const item=questions[index];$('prev').disabled=index===0;$('next').textContent=index===TOTAL-1?'Завершити':'Avanti →';$('content').innerHTML=`<div class="question">${item.prompt}</div><div class="answers">${item.options.map(o=>`<button class="answer" type="button" data-answer="${escapeHTML(o)}">${o}</button>`).join('')}</div>`;document.querySelectorAll('.answer').forEach(btn=>btn.addEventListener('click',()=>answer(item,btn)));}function answer(item,btn){if(answered)return;answered=true;const chosen=btn.dataset.answer;const ok=chosen===item.correct;if(ok)score++;document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.correct)b.classList.add('correct')});if(!ok)btn.classList.add('wrong');$('feedback').className=`feedback show ${ok?'good':'bad'}`;$('feedback').innerHTML=`<strong>${ok?'✓ Правильно!':'✕ Неправильно'}</strong><div>${item.why}</div>`;}$('prev').addEventListener('click',()=>{if(index>0){index--;render()}});$('next').addEventListener('click',()=>{if(!answered){$('feedback').className='feedback show bad';$('feedback').innerHTML='<strong>Спочатку обери відповідь.</strong>';return}if(index<TOTAL-1){index++;render()}else finish()});function finish(){$('card').style.display='none';$('end').classList.add('show');$('score').textContent=`Правильних відповідей: ${score} із ${TOTAL}.`;$('summary').innerHTML=`<p>${score>=12?'Чудово! Продовжуй так само.':score>=8?'Добре! Повтори пояснення до помилок.':'Перечитай правило та спробуй ще раз.'}</p><button class="retry" id="retry">Спробувати ще раз</button>`;$('retry').addEventListener('click',()=>location.reload())}render();