(function(){
  if(window.innerWidth>600)return;

  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:600px){
      html,body{margin:0!important;background:#000!important;overflow-x:hidden!important}
      body{min-height:100dvh!important}

      /* Mantém a arte original sem esticar/deformar */
      .site{display:block!important;position:relative!important;width:100%!important;height:auto!important;max-width:none!important;margin:0!important;overflow:visible!important;background:#000!important;line-height:0!important}
      .site>img{display:block!important;width:100%!important;height:auto!important;max-width:none!important;object-fit:contain!important}

      /* Mantém os controles alinhados à arte original */
      .search{font-size:10px!important}
      .account-actions{left:84.5%!important;top:9.4%!important;width:13.8%!important;height:10.2%!important}
      .icon-btn{padding:13%!important}

      /* O conteúdo aberto continua adaptado ao celular */
      .overlay{align-items:flex-start!important;padding:6px!important}
      .modal{width:100%!important;max-height:96dvh!important;border-radius:12px!important}
      .products-grid{grid-template-columns:1fr!important;padding:10px!important}
      .product-detail,.checkout-shell{grid-template-columns:1fr!important}
      .payments,.pay-choice,.form-grid{grid-template-columns:1fr!important}
      .form-grid .full{grid-column:auto!important}

      .jp-mobile-original,.jp-mobile-products,.jp-mobile-nav{display:none!important}

      /* Em vez de esticar a arte, completa a tela com uma continuação natural */
      .jp-mobile-continuation{display:block!important;padding:20px 14px 34px;background:#000;border-top:1px solid #4a3014;color:#fff;line-height:1.35}
      .jp-mobile-continuation h2{margin:0 0 14px;color:#efbd5a;text-align:center;font-size:22px}
      .jp-mobile-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .jp-mobile-actions button,.jp-mobile-actions a{min-height:48px;border:1px solid #8a5b20;background:#111;color:#efbd5a;border-radius:10px;padding:10px;font-weight:800;text-decoration:none;display:flex;align-items:center;justify-content:center;text-align:center;font-size:13px}
      .jp-mobile-actions .primary{background:#dca33b;color:#080808}
      .jp-mobile-actions .full{grid-column:1/-1}
    }
    @media (min-width:601px){.jp-mobile-continuation{display:none!important}}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.jp-mobile-original,.jp-mobile-products,.jp-mobile-nav').forEach(el=>el.remove());

  if(!document.querySelector('.jp-mobile-continuation')){
    const site=document.querySelector('.site');
    if(site){
      const section=document.createElement('section');
      section.className='jp-mobile-continuation';
      section.innerHTML='<h2>JP Importados</h2><div class="jp-mobile-actions"><button class="primary" type="button" onclick="openProducts()">VER PRODUTOS</button><button type="button" onclick="openCart()">CARRINHO</button><button type="button" onclick="openFavorites()">FAVORITOS</button><a href="https://wa.me/5511974979901" target="_blank" rel="noopener">WHATSAPP</a><button class="full" type="button" onclick="openAbout()">SOBRE A JP IMPORTADOS</button></div>';
      site.insertAdjacentElement('afterend',section);
    }
  }
})();
