(function(){
  if(window.innerWidth>600)return;

  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:600px){
      html,body{background:#000!important;overflow-x:hidden!important}
      body{padding-bottom:66px}
      .site{width:100%!important;max-width:100%!important;margin:0!important;overflow:hidden!important}
      .site>img{display:block!important;width:100%!important;height:auto!important;object-fit:contain!important}
      .search{font-size:11px!important}
      .account-actions{left:84.5%!important;top:9.4%!important;width:13.8%!important;height:10.2%!important}
      .icon-btn{padding:13%!important}
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
      .jp-mobile-products{display:block;background:#050505;border-top:1px solid #5a3712;padding:20px 12px 26px;color:#fff;line-height:1.3}
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
      .jp-mobile-nav{position:fixed;left:8px;right:8px;bottom:8px;z-index:900;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:7px;background:rgba(8,8,8,.96);border:1px solid #5a3712;border-radius:14px;box-shadow:0 8px 25px rgba(0,0,0,.45)}
      .jp-mobile-nav button,.jp-mobile-nav a{min-width:0;border:0;background:transparent;color:#efbd5a;text-decoration:none;font-size:10px;font-weight:800;text-align:center;padding:9px 2px;border-radius:8px}
      .jp-mobile-nav button:active,.jp-mobile-nav a:active{background:#1b1208}
    }
    @media (min-width:601px){.jp-mobile-products,.jp-mobile-nav{display:none!important}}
  `;
  document.head.appendChild(style);

  function money(v){return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}

  function renderMobileProducts(){
    if(document.querySelector('.jp-mobile-products'))return;
    const site=document.querySelector('.site');
    if(!site||!Array.isArray(window.products||products))return;
    const list=(window.products||products).slice(0,6);
    const section=document.createElement('section');
    section.className='jp-mobile-products';
    section.innerHTML='<h2>Produtos</h2><p class="sub">Escolha um produto para ver detalhes e comprar.</p><div class="jp-mobile-grid">'+
      list.map(p=>'<article class="jp-mobile-card"><img src="'+p.img+'" alt="'+p.name+'"><div class="body"><h3>'+p.name+'</h3><div class="cat">'+p.category+'</div><div class="price">'+money(p.price)+'</div><div class="stock">'+p.stock+' unid. em estoque</div><button type="button" onclick="openProduct(\''+p.id+'\')">VER PRODUTO</button></div></article>').join('')+
      '</div><button class="jp-mobile-more" type="button" onclick="openProducts()">VER TODOS OS PRODUTOS</button>';
    site.insertAdjacentElement('afterend',section);
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
    renderMobileProducts();
    renderMobileNav();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
