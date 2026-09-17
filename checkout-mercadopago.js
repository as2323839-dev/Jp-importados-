(function(){
  function loadScript(src,onload){
    const s=document.createElement('script');
    s.src=src;
    s.onload=onload||null;
    s.onerror=function(){console.error('Não foi possível carregar '+src)};
    document.head.appendChild(s);
  }
  loadScript('/checkout-core.js?v=20260917',function(){
    loadScript('/mobile-fix.js?v=20260917h');
  });
})();
