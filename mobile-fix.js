(function(){
  if(window.innerWidth>600)return;

  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:600px){
      html,body{background:#000!important;overflow-x:hidden!important}
      body{padding-bottom:66px}
      .site{display:none!important}
      .overlay{align-items:flex-start!important;padding:6px!important}
      .modal{width:100%!important;max-height:96dvh!important;border-radius:12px!important}
      .modal-head{padding:14px 16px!important}
      .modal-head h2{font-size:19px!important}
      .products-grid{grid-template-columns:1fr!important;padding:10px!important}
      .card img{height:250px!important;object-fit:contain!important}
      .checkout-shell{grid-template-columns:1fr!important;padding:10px!important;gap:10px!important}
      .checkout-box{padding:14px!important}
      .payments,.pay-choice,.form-grid{grid-template-columns:1fr!important}
      .form-grid .full{grid-column:auto!important}

      .jp-mobile-home{display:block;background:#000;color:#fff;line-height:1.3}
      .jp-mobile-top{padding:14px 14px 12px;border-bottom:1px solid #5a3712;background:#050505}
      .jp-mobile-brandrow{display:flex;align-items:center;justify-content:space-between;gap:12px}
      .jp-mobile-brand{font-weight:900;font-size:22px;letter-spacing:.5px;color:#efbd5a}
      .jp-mobile-icons{display:flex;gap:8px}
      .jp-mobile-icon{width:38px;height:38px;border:1px solid #7a4d17;border-radius:50%;background:#0d0d0d;color:#efbd5a;font-size:17px;display:flex;align-items:center;justify-content:center;padding:0}
      .jp-mobile-search{display:flex;gap:8px;margin-top:12px}
      .jp-mobile-search input{flex:1;min-width:0;background:#0d0d0d;border:1px solid #7a4d17;color:#fff;border-radius:999px;padding:12px 14px;font-size:14px;outline:0}
      .jp-mobile-search button{width:46px;border:0;border-radius:999px;background:#dca33b;color:#080808;font-weight:900}

      .jp-mobile-hero{position:relative;overflow:hidden;padding:34px 20px 30px;text-align:center;border-bottom:1px solid #5a3712;background:radial-gradient(circle at 50% 20%,rgba(220,163,59,.18),transparent 42%),linear-gradient(180deg,#120c04 0%,#050505 70%,#000 100%)}
      .jp-mobile-hero:before,.jp-mobile-hero:after{content:'';position:absolute;border:1px solid rgba(239,189,90,.45);border-radius:50%;width:260px;height:260px;top:-150px}
      .jp-mobile-hero:before{left:-120px}.jp-mobile-hero:after{right:-120px}
      .jp-mobile-kicker{position:relative;z-index:1;color:#d8bd87;font-size:12px;letter-spacing:2px;font-weight:800}
      .jp-mobile-hero h1{position:relative;z-index:1;margin:10px 0 8px;color:#efbd5a;font-size:34px;line-height:1.05}
      .jp-mobile-hero p{position:relative;z-index:1;margin:0 auto 18px;max-width:310px;color:#d7c5a2;font-size:14px}
      .jp-mobile-cta{position:relative;z-index:1;border:0;border-radius:999px;background:#dca33b;color:#080808;font-weight:900;padding:13px 22px;font-size:14px;min-width:170px}

      .jp-mobile-benefits{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px;background:#050505;border-bottom:1px solid #5a3712}
      .jp-mobile-benefit{border:1px solid #3b2812;border-radius:10px;padding:10px 8px;text-align:center;color:#d7c5a2;font-size:11px;line-height:1.25}
      .jp-mobile-benefit b{display:block;color:#efbd5a;font-size:11px;margin-bottom:3px}

      .jp-mobile-cats{padding:18px 12px 20px;background:#030303;border-bottom:1px solid #5a3712}
      .jp-mobile-cats h2{margin:0 0 4px;text-align:center;color:#efbd5a;font-size:20px}
      .jp-mobile-cats p{margin:0 0 14px;text-align:center;color:#9f8b67;font-size:12px}
      .jp-mobile-catgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
      .jp-mobile-cat{border:1px solid #6f4719;background:#0d0d0d;color:#efbd5a;border-radius:10px;padding:13px 8px;font-weight:800;font-size:12px}

      .jp-mobile-products{display:block;background:#050505;padding:20px 12px 26px;color:#fff;line-height:1.3}
      .jp-mobile-products h2{margin:0 0 6px;text-align:center;color:#efbd5a;font-size:22px}
      .jp-mobile-products .sub{margin:0 0 16px;text-align:center;color:#bca77a;font-size:13px}
      .jp-mobile-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .jp-mobile-card{background:#0d0d0d;border:1px solid #5a3712;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
      .jp-mobile-card img{width:100%;height:150px;object-fit:contain;background:#111;display:block}
      .jp-mobile-card .body{padding:10px;display:flex;flex-direction:column;gap:6px;flex:1}
      .jp-mobile-card h3{margin:0;font-size:14px;line-height:1.2;color:#fff}
      .jp-mobile-card .cat{font-size:11px;color:#9d9d9d}
      .jp-mobile-card .price{font-size:17px;color:#efbd5a;font-weight:900}
      .jp-mobile-card .stock{font-size:10px;color:#aaa}
      .jp-mobile-card button{margin-top:auto;border:1px solid #b77a22;background:#dca33b;color:#080808;border-radius:8px;padding:10px 8px;font-weight:900;font-size:12px}
      .jp-mobile-more{display:block;width:100%;margin-top:12px;border:1px solid #8a5b20;background:#111;color:#efbd5a;border-radius:10px;padding:13px;font-weight:900}

      .jp-mobile-nav{position:fixed;left:8px;right:8px;bottom:8px;z-index:900;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:7px;background:rgba(8,8,8,.97);border:1px solid #5a3712;border-radius:14px;box-shadow:0 8px 25px rgba(0,0,0,.45)}
      .jp-mobile-nav button,.jp-mobile-nav a{min-width:0;border:0;background:transparent;color:#efbd5a;text-decoration:none;font-size:10px;font-weight:800;text-align:center;padding:9px 2px;border-radius:8px}
      .jp-mobile-nav button:active,.jp-mobile-nav a:active{background:#1b1208}
    }
    @media (min-width:601px){.jp-mobile-home,.jp-mobile-products,.jp-mobile-nav{display:none!important}}
  `;
  document.head.appendChild(style);

  function money(v){return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}

  function renderMobileHome(){
    if(document.querySelector('.jp-mobile-home'))return;
    const home=document.createElement('main');
    home.className='jp-mobile-home';
    home.innerHTML=`
      <section class="jp-mobile-top">
        <div class="jp-mobile-brandrow">
          <div class="jp-mobile-brand">JP IMPORTADOS</div>
          <div class="jp-mobile-icons">
            <button class="jp-mobile-icon" type="button" onclick="openProfile()" aria-label="Perfil">👤</button>
            <button class="jp-mobile-icon" type="button" onclick="openFavorites()" aria-label="Favoritos">♡</button>
            <button class="jp-mobile-icon" type="button" onclick="openCart()" aria-label="Carrinho">🛒</button>
          </div>
        </div>
        <div class="jp-mobile-search">
          <input id="jpMobileSearch" type="search" placeholder="O que você está procurando?" aria-label="Pesquisar produtos">
          <button id="jpMobileSearchBtn" type="button">⌕</button>
        </div>
      </section>
      <section class="jp-mobile-hero">
        <div class="jp-mobile-kicker">PRODUTOS ORIGINAIS</div>
        <h1>JP IMPORTADOS</h1>
        <p>Qualidade, estilo e confiança em produtos selecionados para você.</p>
        <button class="jp-mobile-cta" type="button" onclick="openProducts()">VER PRODUTOS</button>
      </section>
      <section class="jp-mobile-benefits">
        <div class="jp-mobile-benefit"><b>✓ PRODUTOS SELECIONADOS</b>Qualidade e variedade</div>
        <div class="jp-mobile-benefit"><b>🚚 ENTREGA</b>Atendimento para todo o Brasil</div>
        <div class="jp-mobile-benefit"><b>🔒 COMPRA SEGURA</b>Pix e cartão pelo Mercado Pago</div>
        <div class="jp-mobile-benefit"><b>💬 ATENDIMENTO</b>Fale com a loja pelo WhatsApp</div>
      </section>
      <section class="jp-mobile-cats">
        <h2>Categorias</h2>
        <p>Encontre o que você precisa</p>
        <div class="jp-mobile-catgrid">
          <button class="jp-mobile-cat" type="button" onclick="openProducts('Relógios')">⌚ RELÓGIOS</button>
          <button class="jp-mobile-cat" type="button" onclick="openProducts('Perfumes')">✦ PERFUMES</button>
          <button class="jp-mobile-cat" type="button" onclick="openProducts('Óculos')">◉ ÓCULOS</button>
          <button class="jp-mobile-cat" type="button" onclick="openProducts()">✧ TODOS OS PRODUTOS</button>
        </div>
      </section>`;
    document.body.insertBefore(home,document.body.firstChild);

    const input=document.getElementById('jpMobileSearch');
    const button=document.getElementById('jpMobileSearchBtn');
    const run=()=>{const q=(input.value||'').trim();q?openProducts('',q):openProducts()};
    if(input)input.addEventListener('keydown',e=>{if(e.key==='Enter')run()});
    if(button)button.addEventListener('click',run);
  }

  function renderMobileProducts(){
    if(document.querySelector('.jp-mobile-products'))return;
    if(!Array.isArray(window.products||products))return;
    const list=(window.products||products).slice(0,6);
    const section=document.createElement('section');
    section.className='jp-mobile-products';
    section.innerHTML='<h2>Produtos</h2><p class="sub">Escolha um produto para ver detalhes e comprar.</p><div class="jp-mobile-grid">'+
      list.map(p=>'<article class="jp-mobile-card"><img src="'+p.img+'" alt="'+p.name+'"><div class="body"><h3>'+p.name+'</h3><div class="cat">'+p.category+'</div><div class="price">'+money(p.price)+'</div><div class="stock">'+p.stock+' unid. em estoque</div><button type="button" onclick="openProduct(\''+p.id+'\')">VER PRODUTO</button></div></article>').join('')+
      '</div><button class="jp-mobile-more" type="button" onclick="openProducts()">VER TODOS OS PRODUTOS</button>';
    const home=document.querySelector('.jp-mobile-home');
    home.insertAdjacentElement('afterend',section);
  }

  function renderMobileNav(){
    if(document.querySelector('.jp-mobile-nav'))return;
    const nav=document.createElement('nav');
    nav.className='jp-mobile-nav';
    nav.innerHTML='<button type="button" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">INÍCIO</button><button type="button" onclick="openProducts()">PRODUTOS</button><button type="button" onclick="openCart()">CARRINHO</button><a href="https://wa.me/5511974979901" target="_blank" rel="noopener">WHATSAPP</a>';
    document.body.appendChild(nav);
  }

  async function syncStock(){
    try{
      const r=await fetch('/api/catalog',{cache:'no-store'});
      const data=await r.json();
      if(!r.ok||!data||!Array.isArray(data.inventory))return;
      data.inventory.forEach(item=>{
        const p=(window.products||products).find(x=>x.id===item.product_id);
        if(p)p.stock=Number(item.stock);
      });
    }catch(e){}
  }

  async function init(){
    await syncStock();
    renderMobileHome();
    renderMobileProducts();
    renderMobileNav();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
