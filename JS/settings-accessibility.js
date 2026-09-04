document.addEventListener('DOMContentLoaded',()=>{
  const defaults={textSize:'medium',contrast:'normal',keyboardNav:false,screenReader:false};
  let settings={...defaults};
  try{settings={...defaults,...JSON.parse(localStorage.getItem('petcare_accessibility')||'{}')}}catch{}
  settings.textSize=String(settings.textSize||'medium').toLowerCase();
  if(!['small','medium','large'].includes(settings.textSize))settings.textSize='medium';
  function save(){localStorage.setItem('petcare_accessibility',JSON.stringify(settings));apply();}
  function apply(){document.body.classList.remove('text-size-small','text-size-medium','text-size-large','high-contrast','keyboard-navigation-active');document.body.classList.add('text-size-'+settings.textSize);if(settings.contrast==='high')document.body.classList.add('high-contrast');if(settings.keyboardNav)document.body.classList.add('keyboard-navigation-active');document.documentElement.style.setProperty('--pc-text-scale',settings.textSize==='small'?'0.9':settings.textSize==='large'?'1.15':'1');const display=document.getElementById('text-size-display');if(display){const l=(localStorage.getItem('petcare_language')||'es')==='en';display.textContent=l?({small:'Small',medium:'Medium',large:'Large'}[settings.textSize]):({small:'Pequeño',medium:'Mediano',large:'Grande'}[settings.textSize]);}}
  function sync(){const minus=document.getElementById('btn-text-decrease'),plus=document.getElementById('btn-text-increase'),contrast=document.getElementById('contrast-select'),keyboard=document.getElementById('switch-keyboard'),reader=document.getElementById('switch-screen-reader');if(contrast)contrast.value=settings.contrast;if(keyboard)keyboard.checked=!!settings.keyboardNav;if(reader)reader.checked=!!settings.screenReader;apply();}
  document.getElementById('btn-text-decrease')?.addEventListener('click',e=>{e.preventDefault();settings.textSize=settings.textSize==='large'?'medium':settings.textSize==='medium'?'small':'small';save();});
  document.getElementById('btn-text-increase')?.addEventListener('click',e=>{e.preventDefault();settings.textSize=settings.textSize==='small'?'medium':settings.textSize==='medium'?'large':'large';save();});
  document.getElementById('contrast-select')?.addEventListener('change',e=>{settings.contrast=e.target.value;save();});
  document.getElementById('switch-keyboard')?.addEventListener('change',e=>{settings.keyboardNav=e.target.checked;save();});
  document.getElementById('switch-screen-reader')?.addEventListener('change',e=>{settings.screenReader=e.target.checked;localStorage.setItem('petcare_screen_reader',String(e.target.checked));save();});
  window.addEventListener('petcare:languagechange',apply);sync();
});