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
function setupCard(c,c1) {
  let hovering=false,deg=0.025;
  // calculations
  function tilt(e) {
    let x=(e.clientX-c.offsetLeft+window.scrollX),
        y=(e.clientY-c.offsetTop+window.scrollY);
    let dx=(c.offsetWidth/2)-x,
        dy=(c.offsetHeight/2)-y;
    c1.style.transform=`rotateX(${dy*deg}deg) rotateY(${-dx*deg}deg)`;
    c1.style.background=`radial-gradient(at ${100-((x/c.offsetWidth)*100)}% ${100-((y/c.offsetHeight)*100)}%,var(--t-bg2),#0000) var(--t-bg4)`;
  }
  function reset() {
    c1.style.transform=null;
    c1.style.background=null;
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