(function(){
  if(window.innerWidth>600)return;

  const style=document.createElement('style');
  style.textContent=`
    @media(max-width:600px){
      html,body{margin:0!important;width:100%!important;min-height:100%!important;background:#000!important;color:#fff!important;overflow-x:hidden!important;font-family:Arial,Helvetica,sans-serif!important}
      body{min-height:100dvh!important}
      .site{display:none!important}
      .jp-mobile-site{display:block!important;width:100%!important;min-height:100dvh!important;background:#000!important;color:#fff!important;line-height:1.3!important;overflow-x:hidden!important}

      .jp-m-announce{height:48px;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 14px;background:#070707;border-bottom:1px solid #5c3b1a;color:#e6c98d;font-size:12px;font-weight:700;letter-spacing:.4px}

      .jp-m-bar{height:64px;display:grid;grid-template-columns:1fr auto;align-items:center;padding:0 16px;background:#050505;border-bottom:1px solid #5c3b1a}
      .jp-m-menu{display:flex;align-items:center;gap:12px;background:transparent;border:0;color:#fff;padding:0;font-size:17px;font-weight:800;min-height:44px}
      .jp-m-menu svg,.jp-m-searchbtn svg{width:28px;height:28px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
      .jp-m-searchbtn{width:48px;height:48px;border:0;background:transparent;color:#fff;display:grid;place-items:center}

      .jp-m-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:0;background:#0a0a0a;border-bottom:1px solid #5c3b1a}
      .jp-m-action{position:relative;min-height:96px;border:0;background:#0a0a0a;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:700}
      .jp-m-action svg{width:30px;height:30px;stroke:#efbd5a;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
      .jp-m-count{position:absolute;top:18px;left:calc(50% + 14px);min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#e7a934;color:#080808;font-size:10px;font-weight:900;display:grid;place-items:center}

      .jp-m-brand{padding:26px 16px 22px;text-align:center;background:#090909}
      .jp-m-logo{display:inline-flex;align-items:center;justify-content:center;gap:10px;color:#efbd5a}
      .jp-m-logo-mark{font-family:Georgia,serif;font-size:64px;font-weight:900;line-height:.86}
      .jp-m-logo-copy{text-align:left}
      .jp-m-logo-copy strong{display:block;font-family:Georgia,serif;font-size:24px;letter-spacing:1.2px}
      .jp-m-logo-copy small{display:block;color:#c1a66e;font-size:9px;letter-spacing:1.2px;margin-top:4px}

      .jp-m-search{display:flex;width:calc(100% - 32px);height:52px;margin:0 16px 20px;border:1px solid #8a5b20;border-radius:26px;overflow:hidden;background:#0c0c0c}
      .jp-m-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:#fff;padding:0 16px;font-size:16px}
      .jp-m-search button{width:58px;border:0;background:#e3a735;color:#080808;font-size:20px;font-weight:900}

      .jp-m-hero{position:relative;width:100%;height:380px;overflow:hidden;background:#000;border-top:1px solid #5c3b1a;border-bottom:1px solid #5c3b1a}
      .jp-m-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 50%;transform:scale(1.38)}
      .jp-m-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.12) 55%,rgba(0,0,0,.78))}
      .jp-m-hero-cta{position:absolute;z-index:2;left:32px;right:32px;bottom:20px;min-height:54px;border:1px solid #b97a22;background:#dfa735;color:#080808;border-radius:27px;font-size:16px;font-weight:900}

      .jp-m-benefits{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#4a3014}
      .jp-m-benefit{min-height:84px;background:#080808;padding:14px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center}
      .jp-m-benefit b{display:block;color:#efbd5a;font-size:12px;margin-bottom:4px}
      .jp-m-benefit span{color:#c7b388;font-size:11px}

      .jp-m-whatsapp{padding:28px 18px;text-align:center;background:#f7f4ec;color:#1b2430}
      .jp-m-whatsapp strong{display:block;font-size:22px;letter-spacing:2px}
      .jp-m-whatsapp span{display:block;margin-top:8px;font-size:18px;letter-spacing:2px}
      .jp-m-whatsapp a{display:inline-flex;align-items:center;justify-content:center;min-width:220px;min-height:50px;margin-top:18px;border-radius:25px;background:#111;color:#efbd5a;text-decoration:none;font-weight:900;border:1px solid #8a5b20}

      .jp-m-section{padding:28px 16px;background:#020202}
      .jp-m-section h2{margin:0;text-align:center;color:#efbd5a;font-family:Georgia,serif;font-size:28px;letter-spacing:1px}
      .jp-m-section p{margin:6px 0 20px;text-align:center;color:#a99368;font-size:12px}

      .jp-m-cats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
      .jp-m-cat{min-height:74px;border:1px solid #6f471d;background:#0b0b0b;color:#efbd5a;border-radius:12px;font-size:14px;font-weight:900;padding:12px}

      .jp-m-products{display:grid;grid-template-columns:1fr;gap:16px}
      .jp-m-card{background:#0b0b0b;border:1px solid #5d3b18;border-radius:14px;overflow:hidden}
      .jp-m-card img{display:block;width:100%;aspect-ratio:1.2/1;object-fit:contain;background:#111}
      .jp-m-cardbody{padding:14px}
      .jp-m-card h3{margin:0 0 6px;font-size:18px}
      .jp-m-price{color:#efbd5a;font-size:22px;font-weight:900;margin-bottom:4px}
      .jp-m-stock{color:#aaa;font-size:12px;margin-bottom:12px}
      .jp-m-card button,.jp-m-more{width:100%;min-height:52px;border:1px solid #b77a22;background:#dca33b;color:#080808;border-radius:10px;font-weight:900;font-size:14px}
      .jp-m-more{margin-top:14px;background:#111;color:#efbd5a}

      .jp-m-footer{padding:22px 16px 34px;text-align:center;background:#050505;border-top:1px solid #5c3b1a;color:#a99368;font-size:12px}

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

  document.querySelectorAll('.jp-mobile-site,.jp-mobile-continuation,.jp-mobile-original,.jp-mobile-products,.jp-mobile-nav').forEach(el=>el.remove());

  const mobile=document.createElement('main');
  mobile.className='jp-mobile-site';
  mobile.innerHTML=`
    <div class="jp-m-announce">JP IMPORTADOS • QUALIDADE • ESTILO • CONFIANÇA</div>

    <div class="jp-m-bar">
      <button class="jp-m-menu" type="button" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Início">
        <svg viewBox="0 0 32 32"><path d="M5 8h22M5 16h22M5 24h22"></path></svg>
        <span>INÍCIO</span>
      </button>
      <button class="jp-m-searchbtn" type="button" onclick="document.getElementById('jpMSearchInput').focus()" aria-label="Pesquisar">
        <svg viewBox="0 0 32 32"><circle cx="14" cy="14" r="8"></circle><path d="m20 20 7 7"></path></svg>
      </button>
    </div>

    <div class="jp-m-actions">
      <button class="jp-m-action" type="button" onclick="window.scrollTo({top:0,behavior:'smooth'})">
        <svg viewBox="0 0 32 32"><path d="M5 15 16 6l11 9v12H9V15"></path><path d="M13 27v-8h6v8"></path></svg>
        <span>INÍCIO</span>
      </button>
      <button class="jp-m-action" type="button" onclick="openProducts()">
        <svg viewBox="0 0 32 32"><rect x="5" y="6" width="8" height="8"></rect><rect x="19" y="6" width="8" height="8"></rect><rect x="5" y="19" width="8" height="8"></rect><rect x="19" y="19" width="8" height="8"></rect></svg>
        <span>PRODUTOS</span>
      </button>
      <button class="jp-m-action" type="button" onclick="openCart()">
        <svg viewBox="0 0 32 32"><path d="M5 7h3l2.2 12h12.6l2.3-8H9.2"></path><circle cx="13" cy="25" r="1.5"></circle><circle cx="23" cy="25" r="1.5"></circle></svg>
        <span>CARRINHO</span>
        <span class="jp-m-count" id="jpMCartCount">0</span>
      </button>
    </div>

    <section class="jp-m-brand">
      <div class="jp-m-logo">
        <div class="jp-m-logo-mark">JP</div>
        <div class="jp-m-logo-copy"><strong>IMPORTADOS</strong><small>O MUNDO AO SEU ALCANCE</small></div>
      </div>
    </section>

    <div class="jp-m-search">
      <input id="jpMSearchInput" type="search" placeholder="O que você está procurando?" aria-label="Pesquisar produtos">
      <button id="jpMSearchBtn" type="button" aria-label="Pesquisar">⌕</button>
    </div>

    <section class="jp-m-hero">
      <img src="site-reference.jpeg?v=mobile-example-1" alt="JP Importados">
      <button class="jp-m-hero-cta" type="button" onclick="openProducts()">VER PRODUTOS →</button>
    </section>

    <section class="jp-m-benefits">
      <div class="jp-m-benefit"><b>PRODUTOS ORIGINAIS</b><span>Com garantia</span></div>
      <div class="jp-m-benefit"><b>ENVIO RÁPIDO</b><span>E rastreamento</span></div>
      <div class="jp-m-benefit"><b>COMPRA SEGURA</b><span>Dados protegidos</span></div>
      <div class="jp-m-benefit"><b>ATENDIMENTO</b><span>Tire suas dúvidas</span></div>
    </section>

    <section class="jp-m-whatsapp">
      <strong>WHATSAPP</strong>
      <span>(11) 97497-9901</span>
      <a href="https://wa.me/5511974979901" target="_blank" rel="noopener">FALAR NO WHATSAPP</a>
    </section>

    <section class="jp-m-section">
      <h2>CATEGORIAS</h2>
      <p>ENCONTRE O QUE VOCÊ PRECISA</p>
      <div class="jp-m-cats">
        <button class="jp-m-cat" onclick="openProducts('Tênis')">TÊNIS</button>
        <button class="jp-m-cat" onclick="openProducts('Roupas')">ROUPAS</button>
        <button class="jp-m-cat" onclick="openProducts('Relógios')">RELÓGIOS</button>
        <button class="jp-m-cat" onclick="openProducts('Bolsas')">BOLSAS</button>
        <button class="jp-m-cat" onclick="openProducts('Perfumes')">PERFUMES</button>
        <button class="jp-m-cat" onclick="openProducts('Óculos')">ÓCULOS</button>
        <button class="jp-m-cat" onclick="openProducts('Eletrônicos')">ELETRÔNICOS</button>
        <button class="jp-m-cat" onclick="openProducts()">VER TODOS</button>
      </div>
    </section>

    <section class="jp-m-section">
      <h2>PRODUTOS</h2>
      <p>ESCOLHA SEU PRODUTO</p>
      <div class="jp-m-products" id="jpMProducts"></div>
      <button class="jp-m-more" type="button" onclick="openProducts()">VER TODOS OS PRODUTOS</button>
    </section>

    <footer class="jp-m-footer">JP Importados • Compra simples e segura</footer>
  `;

  document.body.insertBefore(mobile,document.body.firstChild);

  const sourceProducts=(typeof products!=='undefined' && Array.isArray(products)) ? products : [];
  const grid=document.getElementById('jpMProducts');
  const moneyMobile=v=>Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  if(grid){
    grid.innerHTML=sourceProducts.slice(0,6).map(p=>`
      <article class="jp-m-card">
        <img src="${p.img}" alt="${p.name}">
        <div class="jp-m-cardbody">
          <h3>${p.name}</h3>
          <div class="jp-m-price">${moneyMobile(p.price)}</div>
          <div class="jp-m-stock">${p.stock} unid. em estoque</div>
          <button type="button" onclick="openProduct('${p.id}')">VER PRODUTO</button>
        </div>
      </article>
    `).join('');
  }

  const search=document.getElementById('jpMSearchInput');
  const searchBtn=document.getElementById('jpMSearchBtn');
  function doSearch(){
    const q=(search&&search.value||'').trim();
    q?openProducts('',q):openProducts();
  }
  if(searchBtn)searchBtn.addEventListener('click',doSearch);
  if(search)search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doSearch();}});

  const originalBadge=document.getElementById('cartBadge');
  const mobileBadge=document.getElementById('jpMCartCount');
  function syncBadge(){if(originalBadge&&mobileBadge)mobileBadge.textContent=originalBadge.textContent||'0';}
  syncBadge();
  if(originalBadge&&window.MutationObserver)new MutationObserver(syncBadge).observe(originalBadge,{childList:true,subtree:true,characterData:true});
})();