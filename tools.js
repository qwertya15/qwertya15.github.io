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





initDU();