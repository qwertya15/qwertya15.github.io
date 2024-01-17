// src: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
function copy(s) {
  if ('navigator' in window && navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(s);
  else alert(s);
}

async function readFile(f) {
  return new Promise((rs,rj)=>{
    let r = new FileReader();
    r.addEventListener('load',()=>{
      if (r.result) rs(r.result);
      else rj();
    });
    r.readAsDataURL(f);
  });
}



function initDU() {
  let du = document.querySelector('#datauri');
  let f = du.querySelector('.file-input'),
      o = du.querySelector('.text-output'),
      b = du.querySelector('.copy-result');
  f.addEventListener('input',async()=>{
    let f1 = f.files[0];
    if (f1.size > 500000 && !confirm('The URI for that file might cause a lot of lag...continue anyway?')) f.value=o.value=null;
    else o.value= (!!f1) ? await readFile(f1) : '';
  });
  b.addEventListener('click',()=>{
    copy(o.value);
  });
}

function initCalendar() {
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
      daynames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      md = [31,28,31,30,31,30,31,31,30,31,30,31];
  let c = document.querySelector('.calendar');
  let m = c.querySelector('.month'),
      dn = c.querySelector('.daynames'),
      d = c.querySelector('.days'),
      nextM = c.querySelector('.nextM'),
      prevM = c.querySelector('.prevM');
  dn.insertAdjacentHTML('beforeend',daynames.map(n=>`<span class="dayname">${n}</span>`).join('\n'));
  function updateCalendar(D = new Date()) {
    let year=D.getFullYear(),mnum=D.getMonth(),now=new Date();
    let current=(now.getMonth() == mnum) && (now.getFullYear() == year);
    md[1] = (year%4 == 0 && (year%100 != 0 || year%400 == 0)) ? 29 : 28;
    m.textContent = months[mnum] + ' ' + year;
    let month = months[mnum];
    let days = md[mnum], date = D.getDate(), e = [];
    let D0=new Date(month+' 1, '+year);
    let offset = D0.getDay(), days0 = md.at(mnum-1);
    for (i=0; i<offset; i++) e.push(`<span class="day othermonth">${days0-i}</span>`);
    e.reverse();
    for (i=0; i<days; i++) e.push(`<span class="day${current && i+1==date ? ' today' : ''}">${i+1}</span>`);
    offset = (days+offset)%7;
    if (offset > 0) for (i=0; i<7-offset; i++) e.push(`<span class="day othermonth">${i+1}</span>`);
    d.innerHTML='';
    d.insertAdjacentHTML('beforeend',e.join('\n'));
  }
  let D1 = new Date();
  nextM.addEventListener('click',()=>{
    D1.setMonth(D1.getMonth() + 1);
    updateCalendar(D1);
  });
  prevM.addEventListener('click',()=>{
    D1.setMonth(D1.getMonth() - 1);
    updateCalendar(D1);
  });
  m.addEventListener('click',()=>{
    D1 = new Date();
    updateCalendar(D1);
  });
  updateCalendar(D1);
}


initDU();
initCalendar();