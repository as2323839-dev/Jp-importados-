(function(){
  if(window.innerWidth>600)return;
  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:600px){
      html,body{margin:0!important;background:#000!important;overflow-x:hidden!important}
      .site{display:block!important;position:relative!important;width:100vw!important;height:100dvh!important;max-width:none!important;margin:0!important;overflow:hidden!important;background:#000!important}
      .site>img{display:block!important;width:100%!important;height:100%!important;object-fit:fill!important}
      .search{font-size:11px!important}
      .account-actions{left:84.5%!important;top:9.4%!important;width:13.8%!important;height:10.2%!important}
      .icon-btn{padding:13%!important}
      .overlay{align-items:flex-start!important;padding:6px!important}
      .modal{width:100%!important;max-height:96dvh!important;border-radius:12px!important}
      .products-grid{grid-template-columns:1fr!important;padding:10px!important}
      .product-detail,.checkout-shell{grid-template-columns:1fr!important}
      .payments,.pay-choice,.form-grid{grid-template-columns:1fr!important}
      .form-grid .full{grid-column:auto!important}
      .jp-mobile-original,.jp-mobile-products,.jp-mobile-nav{display:none!important}
    }
  `;
  document.head.appendChild(style);
  document.querySelectorAll('.jp-mobile-original,.jp-mobile-products,.jp-mobile-nav').forEach(el=>el.remove());
})();
