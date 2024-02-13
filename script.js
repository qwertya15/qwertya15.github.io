// css transitions init
document.body.onload=()=>document.body.classList.add('loaded');

// splash header image setup
document.querySelectorAll('section.splash[data-src]').forEach(e=>{
  e.style.backgroundImage=`url('${e.dataset.src}')`;
});


// nav toggle button setup
let nav=document.querySelector('header nav');
document.querySelector('.nav-toggle').onclick=()=>nav.classList.toggle('open');


// fancy project card tilting setup
let fancyCards=true;
function setupCard(c,c1) {
  let hovering=false,deg=0.025;
  // setup
  reset();
  c1.style.transform=`perspective(400px) rotateX(var(--rx)) rotateY(var(--ry))`;
  c1.style.background=`radial-gradient(at var(--bx) var(--by), var(--t-bg1), #0000) var(--t-bg3)`;
  // calculations
  function reset() {
    hovering=false;
    c1.style.setProperty('--rx','0deg');
    c1.style.setProperty('--ry','0deg');
    c1.style.setProperty('--bx','25%');
    c1.style.setProperty('--by','25%');
  }
  function tilt(e) {
    if (!fancyCards) return reset();
    let x=(e.clientX-c.offsetLeft+window.scrollX),
        y=(e.clientY-c.offsetTop+window.scrollY);
    let dx=(c.offsetWidth/2)-x,
        dy=(c.offsetHeight/2)-y;
    c1.style.setProperty('--rx',`${dy*deg}deg`);
    c1.style.setProperty('--ry',`${-dx*deg}deg`);
    c1.style.setProperty('--bx',`${100-((x/c.offsetWidth)*100)}%`);
    c1.style.setProperty('--by',`${100-((y/c.offsetHeight)*100)}%`);
  }
  // add listeners
  c.addEventListener('pointerover',e=>{
    c.classList.add('hover');
    hovering=true;
    tilt(e);
  },{passive:true});
  window.addEventListener('pointermove',e=>{
    if (hovering) tilt(e);
  },{passive:true});
  c.addEventListener('pointerout',e=>{
    hovering=false;
    c.classList.remove('hover');
    reset();
  },{passive:true});
}
document.querySelectorAll('.cards .card').forEach(e=>setupCard(e,e.querySelector('.card-details')));
let fancyToggle = document.querySelector('#fc');
if (fancyToggle) fancyToggle.oninput=()=> fancyCards = !!fancyToggle.checked;