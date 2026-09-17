(function(){
  if(window.innerWidth>600)return;

  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:600px){
      html,body{margin:0!important;background:#000!important;color:#fff!important;overflow-x:hidden!important;font-family:Arial,Helvetica,sans-serif!important}
      body{min-height:100dvh!important}
      .site{display:none!important}
      .jp-mobile-site{display:block!important;width:100%;min-height:100dvh;background:#000;color:#fff;line-height:1.25}
      .jp-mobile-top{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 10px 8px;border-bottom:1px solid #5b3917;background:#050505}
      .jp-mobile-top div{font-size:9px;line-height:1.2;text-align:center;color:#d6c39a}
      .jp-mobile-top b{display:block;color:#efbd5a;font-size:10px;margin-bottom:2px}
      .jp-mobile-head{padding:12px 14px 10px;border-bottom:1px solid #6a431d;background:#050505}
      .jp-mobile-brandrow{display:flex;align-items:center;justify-content:space-between;gap:12px}
      .jp-mobile-brand{display:flex;align-items:center;gap:8px;min-width:0}
      .jp-mobile-mark{font-family:Georgia,serif;font-size:38px;font-weight:800;line-height:.9;color:#efbd5a;text-shadow:0 0 12px rgba(239,189,90,.18)}
      .jp-mobile-brandtext strong{display:block;font-family:Georgia,serif;color:#efbd5a;font-size:18px;letter-spacing:1.2px;white-space:nowrap}
      .jp-mobile-brandtext small{display:block;color:#bda77d;font-size:8px;letter-spacing:.8px;margin-top:3px}
      .jp-mobile-icons{display:flex;align-items:center;gap:4px}
      .jp-mobile-icon{position:relative;width:36px;height:36px;border:0;background:transparent;color:#fff;display:grid;place-items:center;border-radius:50%;font-size:19px;padding:0}
      .jp-mobile-badge{position:absolute;right:-1px;top:-2px;min-width:18px;height:18px;border-radius:999px;background:#e6a832;color:#050505;font-size:10px;font-weight:900;display:grid;place-items:center;padding:0 4px}
      .jp-mobile-searchwrap{display:flex;margin-top:12px;height:44px;border:1px solid #9b6724;border-radius:999px;overflow:hidden;background:#0d0d0d}
      .jp-mobile-searchwrap input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:#fff;padding:0 16px;font-size:14px}
      .jp-mobile-searchwrap button{width:52px;border:0;background:#e3a735;color:#080808;font-size:20px;font-weight:900}
      .jp-mobile-nav{display:grid!important;grid-template-columns:repeat(4,1fr);position:static!important;left:auto!important;right:auto!important;bottom:auto!important;gap:0!important;padding:0!important;border:0!important;border-radius:0!important;background:#050505!important;box-shadow:none!important;border-bottom:1px solid #5b3917!important}
      .jp-mobile-nav button{border:0;background:transparent;color:#fff;padding:12px 4px;font-size:11px;font-weight:700}
      .jp-mobile-nav button:active{color:#efbd5a;background:#14100a}
      .jp-mobile-hero{position:relative;min-height:420px;background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.35)),url('site-reference.jpeg?v=mobile-normal-1');background-size:auto 100%;background-position:center center;background-repeat:no-repeat;border-bottom:1px solid #6a431d;display:flex;align-items:flex-end;justify-content:center;padding:26px 18px}
      .jp-mobile-hero-card{width:100%;max-width:380px;text-align:center;background:rgba(0,0,0,.62);border:1px solid rgba(239,189,90,.45);border-radius:16px;padding:16px 14px;backdrop-filter:blur(2px)}
      .jp-mobile-hero-card h1{margin:0;color:#efbd5a;font-family:Georgia,serif;font-size:28px;letter-spacing:.8px}
      .jp-mobile-hero-card p{margin:7px 0 14px;color:#e7d5b0;font-size:13px}
      .jp-mobile-primary{width:100%;border:1px solid #b97a22;background:#dfa735;color:#070707;border-radius:999px;padding:13px 16px;font-weight:900;font-size:14px}
      .jp-mobile-benefits{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#3f2913;border-bottom:1px solid #5b3917}
      .jp-mobile-benefits div{background:#070707;padding:12px 10px;text-align:center;font-size:10px;color:#d7c5a3}
      .jp-mobile-benefits b{display:block;color:#efbd5a;font-size:11px;margin-bottom:2px}
      .jp-mobile-cats{padding:22px 14px 28px;background:#030303}
      .jp-mobile-cats h2{margin:0;text-align:center;color:#efbd5a;font-family:Georgia,serif;font-size:24px;letter-spacing:1px}
      .jp-mobile-cats p{margin:5px 0 16px;text-align:center;color:#a99268;font-size:11px;letter-spacing:.8px}
      .jp-mobile-catgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
      .jp-mobile-cat{min-height:72px;border:1px solid #6f471d;background:#0a0a0a;color:#efbd5a;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;font-weight:800;font-size:13px;padding:10px}
      .jp-mobile-cat span{font-size:23px;line-height:1}
      .jp-mobile-footer{padding:18px 14px 28px;border-top:1px solid #5b3917;background:#050505;text-align:center}
      .jp-mobile-footer p{margin:0 0 12px;color:#c9b58c;font-size:12px}
      .jp-mobile-footer a{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border:1px solid #8a5b20;color:#efbd5a;border-radius:999px;padding:11px 18px;font-weight:800;font-size:12px}

      .overlay{align-items:flex-start!important;padding:6px!important}
      .modal{width:100%!important;max-height:96dvh!important;border-radius:12px!important}
      .products-grid{grid-template-columns:1fr!important;padding:10px!important}
      .product-detail,.checkout-shell{grid-template-columns:1fr!important}
      .payments,.pay-choice,.form-grid{grid-template-columns:1fr!important}
      .form-grid .full{grid-column:auto!important}
    }
    @media (min-width:601px){.jp-mobile-site{display:none!important}}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.jp-mobile-continuation,.jp-mobile-original,.jp-mobile-products,.jp-mobile-nav').forEach(el=>el.remove());
  if(document.querySelector('.jp-mobile-site'))return;

  const mobile=document.createElement('main');
  mobile.className='jp-mobile-site';
  mobile.innerHTML=`
    <section class="jp-mobile-top">
      <div><b>ENTREGA RÁPIDA</b>Para todo o Brasil</div>
      <div><b>COMPRA SEGURA</b>Seus dados protegidos</div>
      <div><b>ATENDIMENTO</b>Antes e depois da compra</div>
    </section>
    <header class="jp-mobile-head">
      <div class="jp-mobile-brandrow">
        <div class="jp-mobile-brand"><div class="jp-mobile-mark">JP</div><div class="jp-mobile-brandtext"><strong>IMPORTADOS</strong><small>O MUNDO AO SEU ALCANCE</small></div></div>
        <div class="jp-mobile-icons">
          <button class="jp-mobile-icon" type="button" onclick="openProfile()" aria-label="Perfil">♙</button>
          <button class="jp-mobile-icon" type="button" onclick="openFavorites()" aria-label="Favoritos">♡</button>
          <button class="jp-mobile-icon" type="button" onclick="openCart()" aria-label="Carrinho">🛒<span class="jp-mobile-badge" id="jpMobileBadge">0</span></button>
        </div>
      </div>
      <div class="jp-mobile-searchwrap"><input id="jpMobileSearch" type="search" placeholder="O que você está procurando?" aria-label="Pesquisar produtos"><button id="jpMobileSearchBtn" type="button" aria-label="Pesquisar">⌕</button></div>
    </header>
    <nav class="jp-mobile-nav">
      <button type="button" onclick="window.scrollTo({top:0,behavior:'smooth'})">INÍCIO</button>
      <button type="button" onclick="openProducts()">PRODUTOS</button>
      <button type="button" onclick="openAbout()">SOBRE NÓS</button>
      <button type="button" onclick="openContact()">CONTATO</button>
    </nav>
    <section class="jp-mobile-hero">
      <div class="jp-mobile-hero-card"><h1>JP IMPORTADOS</h1><p>Produtos selecionados, estilo e confiança.</p><button class="jp-mobile-primary" type="button" onclick="openProducts()">VER PRODUTOS →</button></div>
    </section>
    <section class="jp-mobile-benefits">
      <div><b>PRODUTOS ORIGINAIS</b>Com garantia</div>
      <div><b>ENVIO RÁPIDO</b>E rastreamento</div>
      <div><b>COMPRA SEGURA</b>Dados protegidos</div>
      <div><b>ATENDIMENTO</b>Tire suas dúvidas</div>
    </section>
    <section class="jp-mobile-cats">
      <h2>CATEGORIAS</h2><p>ENCONTRE O QUE VOCÊ PRECISA</p>
      <div class="jp-mobile-catgrid">
        <button class="jp-mobile-cat" type="button" onclick="openProducts('Tênis')"><span>◢</span>TÊNIS</button>
        <button class="jp-mobile-cat" type="button" onclick="openProducts('Roupas')"><span>♕</span>ROUPAS</button>
        <button class="jp-mobile-cat" type="button" onclick="openProducts('Relógios')"><span>◉</span>RELÓGIOS</button>
        <button class="jp-mobile-cat" type="button" onclick="openProducts('Bolsas')"><span>▣</span>BOLSAS</button>
        <button class="jp-mobile-cat" type="button" onclick="openProducts('Perfumes')"><span>♢</span>PERFUMES</button>
        <button class="jp-mobile-cat" type="button" onclick="openProducts('Óculos')"><span>∞</span>ÓCULOS</button>
        <button class="jp-mobile-cat" type="button" onclick="openProducts('Eletrônicos')"><span>▯</span>ELETRÔNICOS</button>
        <button class="jp-mobile-cat" type="button" onclick="openProducts()"><span>+</span>VER TODOS</button>
      </div>
    </section>
    <footer class="jp-mobile-footer"><p>JP Importados • Compra simples e segura</p><a href="https://wa.me/5511974979901" target="_blank" rel="noopener">FALAR NO WHATSAPP</a></footer>
  `;
  document.body.insertBefore(mobile,document.body.firstChild);

  const search=document.getElementById('jpMobileSearch');
  const searchBtn=document.getElementById('jpMobileSearchBtn');
  function doSearch(){
    const original=document.getElementById('searchInput');
    if(original){original.value=search.value;original.dispatchEvent(new Event('input',{bubbles:true}));}
    openProducts();
  }
  searchBtn.addEventListener('click',doSearch);
  search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doSearch();}});

  const originalBadge=document.getElementById('cartBadge');
  const mobileBadge=document.getElementById('jpMobileBadge');
  function syncBadge(){if(originalBadge&&mobileBadge)mobileBadge.textContent=originalBadge.textContent||'0';}
  syncBadge();
  if(originalBadge&&window.MutationObserver)new MutationObserver(syncBadge).observe(originalBadge,{childList:true,subtree:true,characterData:true});
})();
