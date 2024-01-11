document.body.onload=()=>document.body.classList.add('loaded');

document.querySelectorAll('section.splash[data-src]').forEach(e=>{
  e.style.backgroundImage=`url('${e.dataset.src}')`;
});

let nav=document.querySelector('header nav');
document.querySelector('.nav-toggle').onclick=()=>nav.classList.toggle('open');