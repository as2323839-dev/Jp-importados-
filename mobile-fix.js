(function(){
  if(window.innerWidth>600)return;

  const style=document.createElement('style');
  style.textContent=`
    @media(max-width:600px){
      html,body{margin:0!important;width:100%!important;min-height:100%!important;background:#000!important;color:#fff!important;overflow-x:hidden!important;font-family:Arial,Helvetica,sans-serif!important}
      body{min-height:100dvh!important}
      .site{display:none!important}
      .jp-mobile-site{display:block!important;width:100vw!important;max-width:100vw!important;min-height:100dvh!important;margin:0!important;background:#000!important;color:#fff!important;line-height:1.3!important;overflow-x:hidden!important}
      .jp-mobile-top{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#3b2814;border-bottom:1px solid #6d471f}
      .jp-mobile-top div{background:#070707;padding:10px 5px;text-align:center;color:#d8c79f;font-size:9px;line-height:1.25}
      .jp-mobile-top b{display:block;color:#efbd5a;font-size:9px;margin-bottom:2px}
      .jp-mobile-head{padding:14px 14px 12px;background:#050505;border-bottom:1px solid #5c3b1a}
      .jp-mobile-brandrow{display:flex;align-items:center;justify-content:space-between;gap:10px}
      .jp-mobile-brand{display:flex;align-items:center;gap:8px;min-width:0}
      .jp-mobile-mark{font-family:Georgia,serif;font-size:44px;font-weight:900;line-height:.9;color:#efbd5a}
      .jp-mobile-brandtext strong{display:block;font-family:Georgia,serif;color:#efbd5a;font-size:20px;letter-spacing:1px}
      .jp-mobile-brandtext small{display:block;color:#b7a076;font-size:8px;letter-spacing:.8px;margin-top:3px}
      .jp-mobile-icons{display:flex;align-items:center;gap:3px}
      .jp-mobile-icon{position:relative;width:36px;height:36px;border:0;background:transparent;color:#fff;display:grid;place-items:center;padding:0;border-radius:50%}
      .jp-mobile-icon svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .jp-mobile-badge{position:absolute;right:-2px;top:-3px;min-width:18px;height:18px;padding:0 4px;border-radius:999px;background:#e7a934;color:#080808;font-size:10px;font-weight:900;display:grid;place-items:center}
      .jp-mobile-searchwrap{display:flex;width:100%;height:44px;margin-top:12px;border:1px solid #9b6724;border-radius:999px;overflow:hidden;background:#0d0d0d}
      .jp-mobile-searchwrap input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:#fff;padding:0 16px;font-size:14px}
      .jp-mobile-searchwrap button{width:52px;border:0;background:#e3a735;color:#080808;font-size:18px;font-weight:900}
      .jp-mobile-nav{display:grid!important;grid-template-columns:repeat(4,1fr)!important;width:100%!important;position:static!important;margin:0!important;padding:0!important;gap:0!important;border:0!important;border-bottom:1px solid #5c3b1a!important;border-radius:0!important;background:#050505!important;box-shadow:none!important}
      .jp-mobile-nav button{border:0;background:transparent;color:#fff;padding:12px 2px;font-size:10px;font-weight:800}
      .jp-mobile-hero{position:relative;width:100%;height:360px;background:url('site-reference.jpeg?v=mobile-hero-4') center 82%/220% auto no-repeat #000;border-bottom:1px solid #5c3b1a;cursor:pointer}
      .jp-mobile-hero:after{content:'VER PRODUTOS →';position:absolute;left:50%;bottom:18px;transform:translateX(-50%);width:78%;max-width:340px;padding:13px 14px;border:1px solid #b97a22;background:rgba(223,167,53,.96);color:#080808;border-radius:999px;text-align:center;font-weight:900;font-size:14px;line-height:1.2;box-sizing:border-box}
      .jp-mobile-benefits{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#3f2913;border-bottom:1px solid #5c3b1a}
      .jp-mobile-benefits div{background:#080808;padding:12px 8px;text-align:center;color:#cdb98f;font-size:10px}
      .jp-mobile-benefits b{display:block;color:#efbd5a;font-size:10px;margin-bottom:2px}
      .jp-mobile-section{padding:22px 14px;background:#020202}
      .jp-mobile-section h2{margin:0;text-align:center;color:#efbd5a;font-family:Georgia,serif;font-size:23px;letter-spacing:.8px}
      .jp-mobile-section .sub{margin:5px 0 16px;text-align:center;color:#a99368;font-size:11px}
      .jp-mobile-catgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
      .jp-mobile-cat{min-height:74px;border:1px solid #6f471d;background:#0a0a0a;color:#efbd5a;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;padding:10px;text-align:center}
      .jp-mobile-products{display:block!important;padding:0 14px 26px;background:#020202}
      .jp-mobile-productgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .jp-mobile-card{background:#0b0b0b;border:1px solid #5d3b18;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
      .jp-mobile-card img{width:100%;aspect-ratio:1/1;object-fit:contain;background:#111;display:block}
      .jp-mobile-cardbody{padding:10px;display:flex;flex-direction:column;gap:5px;flex:1}
      .jp-mobile-card h3{margin:0;color:#fff;font-size:13px;line-height:1.2}
      .jp-mobile-price{color:#efbd5a;font-size:16px;font-weight:900}
      .jp-mobile-stock{color:#9b9b9b;font-size:10px}
      .jp-mobile-card button{margin-top:auto;border:1px solid #b77a22;background:#dca33b;color:#080808;border-radius:8px;padding:9px 6px;font-weight:900;font-size:11px}
      .jp-mobile-more{width:100%;margin-top:12px;border:1px solid #8a5b20;background:#111;color:#efbd5a;border-radius:10px;padding:12px;font-weight:900}
      .jp-mobile-footer{padding:18px 14px 28px;border-top:1px solid #5c3b1a;background:#050505;text-align:center}
      .jp-mobile-footer a{display:inline-flex;text-decoration:none;border:1px solid #8a5b20;color:#efbd5a;border-radius:999px;padding:11px 18px;font-size:12px;font-weight:900}
      .overlay{align-items:flex-start!important;padding:6px!important}
      .modal{width:100%!important;max-height:96dvh!important;border-radius:12px!important}
      .products-grid{grid-template-columns:1fr!important;padding:10px!important}
      .product-detail,.checkout-shell{grid-template-columns:1fr!important}
      .payments,.pay-choice,.form-grid{grid-template-columns:1fr!important}
      .form-grid .full{grid-column:auto!important}
    }
    @media(min-width:601px){.jp-mobile-site{display:none!important}}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.jp-mobile-continuation,.jp-mobile-original,.jp-mobile-products,.jp-mobile-nav,.jp-mobile-site').forEach(el=>el.remove());

  const mobile=document.createElement('main');
  mobile.className='jp-mobile-site';
  mobile.innerHTML=`
    <section class="jp-mobile-top"><div><b>ENTREGA RÁPIDA</b>Para todo o Brasil</div><div><b>COMPRA SEGURA</b>Seus dados protegidos</div><div><b>ATENDIMENTO</b>Tire suas dúvidas</div></section>
    <header class="jp-mobile-head">
      <div class="jp-mobile-brandrow">
        <div class="jp-mobile-brand"><div class="jp-mobile-mark">JP</div><div class="jp-mobile-brandtext"><strong>IMPORTADOS</strong><small>O MUNDO AO SEU ALCANCE</small></div></div>
        <div class="jp-mobile-icons">
          <button class="jp-mobile-icon" type="button" onclick="openProfile()" aria-label="Perfil"><svg viewBox="0 0 32 32"><circle cx="16" cy="10" r="5"></circle><path d="M7 27c0-6 4-10 9-10s9 4 9 10"></path></svg></button>
          <button class="jp-mobile-icon" type="button" onclick="openFavorites()" aria-label="Favoritos"><svg viewBox="0 0 32 32"><path d="M16 27S5 20.5 5 11.8C5 7.8 8 5 11.6 5c2.2 0 3.7 1.1 4.4 2.4C16.7 6.1 18.2 5 20.4 5 24 5 27 7.8 27 11.8 27 20.5 16 27 16 27Z"></path></svg></button>
          <button class="jp-mobile-icon" type="button" onclick="openCart()" aria-label="Carrinho"><svg viewBox="0 0 32 32"><path d="M5 7h3l2.2 12h12.6l2.3-8H9.2"></path><circle cx="13" cy="25" r="1.5"></circle><circle cx="23" cy="25" r="1.5"></circle></svg><span class="jp-mobile-badge" id="jpMobileBadge">0</span></button>
        </div>
      </div>
      <div class="jp-mobile-searchwrap"><input id="jpMobileSearch" type="search" placeholder="O que você está procurando?" aria-label="Pesquisar produtos"><button id="jpMobileSearchBtn" type="button">⌕</button></div>
    </header>
    <nav class="jp-mobile-nav"><button type="button" onclick="window.scrollTo({top:0,behavior:'smooth'})">INÍCIO</button><button type="button" onclick="openProducts()">PRODUTOS</button><button type="button" onclick="openAbout()">SOBRE NÓS</button><button type="button" onclick="openContact()">CONTATO</button></nav>
    <section class="jp-mobile-hero" role="button" tabindex="0" aria-label="Ver produtos" onclick="openProducts()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProducts()}"></section>
    <section class="jp-mobile-benefits"><div><b>PRODUTOS ORIGINAIS</b>Com garantia</div><div><b>ENVIO RÁPIDO</b>E rastreamento</div><div><b>COMPRA SEGURA</b>Dados protegidos</div><div><b>ATENDIMENTO</b>Antes e depois da compra</div></section>
    <section class="jp-mobile-section"><h2>CATEGORIAS</h2><p class="sub">ENCONTRE O QUE VOCÊ PRECISA</p><div class="jp-mobile-catgrid"><button class="jp-mobile-cat" onclick="openProducts('Tênis')">TÊNIS</button><button class="jp-mobile-cat" onclick="openProducts('Roupas')">ROUPAS</button><button class="jp-mobile-cat" onclick="openProducts('Relógios')">RELÓGIOS</button><button class="jp-mobile-cat" onclick="openProducts('Bolsas')">BOLSAS</button><button class="jp-mobile-cat" onclick="openProducts('Perfumes')">PERFUMES</button><button class="jp-mobile-cat" onclick="openProducts('Óculos')">ÓCULOS</button><button class="jp-mobile-cat" onclick="openProducts('Eletrônicos')">ELETRÔNICOS</button><button class="jp-mobile-cat" onclick="openProducts()">VER TODOS</button></div></section>
    <section class="jp-mobile-section" style="padding-bottom:10px"><h2>PRODUTOS</h2><p class="sub">ESCOLHA SEU PRODUTO</p></section>
    <section class="jp-mobile-products"><div class="jp-mobile-productgrid" id="jpMobileProductGrid"></div><button class="jp-mobile-more" type="button" onclick="openProducts()">VER TODOS OS PRODUTOS</button></section>
    <footer class="jp-mobile-footer"><a href="https://wa.me/5511974979901" target="_blank" rel="noopener">FALAR NO WHATSAPP</a></footer>`;
  document.body.insertBefore(mobile,document.body.firstChild);

  const list=(window.products||[]).slice(0,6);
  const grid=document.getElementById('jpMobileProductGrid');
  const money=v=>Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  if(grid)grid.innerHTML=list.map(p=>`<article class="jp-mobile-card"><img src="${p.img}" alt="${p.name}"><div class="jp-mobile-cardbody"><h3>${p.name}</h3><div class="jp-mobile-price">${money(p.price)}</div><div class="jp-mobile-stock">${p.stock} unid. em estoque</div><button type="button" onclick="openProduct('${p.id}')">VER PRODUTO</button></div></article>`).join('');

  const search=document.getElementById('jpMobileSearch');
  const searchBtn=document.getElementById('jpMobileSearchBtn');
  function doSearch(){const original=document.getElementById('searchInput');if(original){original.value=search.value;original.dispatchEvent(new Event('input',{bubbles:true}));}openProducts();}
  searchBtn.addEventListener('click',doSearch);
  search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doSearch();}});

  const originalBadge=document.getElementById('cartBadge');
  const mobileBadge=document.getElementById('jpMobileBadge');
  function syncBadge(){if(originalBadge&&mobileBadge)mobileBadge.textContent=originalBadge.textContent||'0';}
  syncBadge();
  if(originalBadge&&window.MutationObserver)new MutationObserver(syncBadge).observe(originalBadge,{childList:true,subtree:true,characterData:true});
})();
