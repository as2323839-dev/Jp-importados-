(function(){
  if(window.innerWidth>600)return;

  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:600px){
      html,body{margin:0!important;background:#000!important;overflow-x:hidden!important}
      body{min-height:100dvh!important}

      /* Remove qualquer bloco mobile criado nas tentativas anteriores */
      .jp-mobile-continuation,.jp-mobile-original,.jp-mobile-products,.jp-mobile-nav{display:none!important}

      /* Mantém o design original, mas amplia no celular sem deformar */
      .site{
        display:block!important;
        position:relative!important;
        width:138vw!important;
        max-width:none!important;
        height:auto!important;
        margin:0 0 0 -19vw!important;
        overflow:visible!important;
        background:#000!important;
        line-height:0!important;
      }
      .site>img{
        display:block!important;
        width:100%!important;
        height:auto!important;
        max-width:none!important;
        object-fit:contain!important;
      }

      /* Controles continuam acompanhando a arte */
      .search{font-size:11px!important}
      .account-actions{left:84.5%!important;top:9.4%!important;width:13.8%!important;height:10.2%!important}
      .icon-btn{padding:13%!important}

      /* Modais e checkout responsivos */
      .overlay{align-items:flex-start!important;padding:6px!important}
      .modal{width:100%!important;max-height:96dvh!important;border-radius:12px!important}
      .products-grid{grid-template-columns:1fr!important;padding:10px!important}
      .product-detail,.checkout-shell{grid-template-columns:1fr!important}
      .payments,.pay-choice,.form-grid{grid-template-columns:1fr!important}
      .form-grid .full{grid-column:auto!important}
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.jp-mobile-continuation,.jp-mobile-original,.jp-mobile-products,.jp-mobile-nav').forEach(el=>el.remove());
})();
