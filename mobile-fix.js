(function(){
  if(window.innerWidth>600)return;

  const originalSite=document.querySelector('.site');
  if(!originalSite||document.querySelector('.jp-mobile-original'))return;

  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:600px){
      html,body{margin:0!important;background:#000!important;overflow-x:hidden!important}
      .site{display:none!important}
      .jp-mobile-original{display:block;width:100%;background:#000;line-height:0;overflow:hidden}
      .jp-mslice{position:relative;width:100vw;overflow:hidden;background:#000}
      .jp-mslice img{position:absolute;max-width:none!important;height:auto!important;display:block!important;user-select:none;-webkit-user-drag:none;pointer-events:none}
      .jp-mscroll{overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .jp-mscroll::-webkit-scrollbar{display:none}
      .jp-mscroll-inner{position:relative;height:100%}
      .jp-hit{position:absolute;z-index:8;border:0;background:transparent;padding:0;margin:0;cursor:pointer;border-radius:8px;color:transparent;font-size:0}
      .jp-hit:focus-visible{outline:2px solid #efbd5a;outline-offset:2px}
      .jp-mobile-search{position:absolute;z-index:10;border:0;outline:0;background:transparent;color:#fff;font-family:Arial,Helvetica,sans-serif;line-height:normal;padding:0 10px}
      .jp-mobile-search::placeholder{color:transparent}
      .overlay{align-items:flex-start!important;padding:6px!important}
      .modal{width:100%!important;max-height:96dvh!important;border-radius:12px!important}
      .products-grid{grid-template-columns:1fr!important;padding:10px!important}
      .product-detail,.checkout-shell{grid-template-columns:1fr!important}
      .payments,.pay-choice,.form-grid{grid-template-columns:1fr!important}
      .form-grid .full{grid-column:auto!important}
    }
    @media (min-width:601px){.jp-mobile-original{display:none!important}}
  `;
  document.head.appendChild(style);

  const shell=document.createElement('main');
  shell.className='jp-mobile-original';
  shell.setAttribute('aria-label','JP Importados');
  originalSite.insertAdjacentElement('beforebegin',shell);

  const parts=[
    {name:'header',start:0,end:.13,scale:1.4,align:'center'},
    {name:'nav',start:.13,end:.23,scale:1.25,align:'center'},
    {name:'hero-text',start:.23,end:.72,scale:2.05,align:'left'},
    {name:'hero-model',start:.23,end:.72,scale:2.05,align:'right'},
    {name:'categories',start:.72,end:1,scale:2.25,align:'scroll'}
  ];

  const hotspotDefs={
    inicio:{x:.30,y:.145,w:.052,h:.058,action:()=>window.scrollTo({top:0,behavior:'smooth'})},
    produtos:{x:.353,y:.145,w:.065,h:.058,action:()=>openProducts()},
    categorias:{x:.421,y:.145,w:.084,h:.058,action:()=>openProducts()},
    sobre:{x:.528,y:.145,w:.068,h:.058,action:()=>openAbout()},
    contato:{x:.605,y:.145,w:.067,h:.058,action:()=>openContact()},
    verProdutos:{x:.15,y:.522,w:.163,h:.075,action:()=>openProducts()},
    tenis:{x:.064,y:.83,w:.125,h:.135,action:()=>openProducts('Tênis')},
    roupas:{x:.197,y:.83,w:.125,h:.135,action:()=>openProducts('Roupas')},
    relogios:{x:.321,y:.83,w:.127,h:.135,action:()=>openProducts('Relógios')},
    bolsas:{x:.448,y:.83,w:.125,h:.135,action:()=>openProducts('Bolsas')},
    perfumes:{x:.577,y:.83,w:.125,h:.135,action:()=>openProducts('Perfumes')},
    oculos:{x:.705,y:.83,w:.125,h:.135,action:()=>openProducts('Óculos')},
    eletronicos:{x:.83,y:.83,w:.115,h:.135,action:()=>openProducts('Eletrônicos')},
    perfil:{x:.849,y:.097,w:.044,h:.094,action:()=>openProfile()},
    favoritos:{x:.893,y:.097,w:.044,h:.094,action:()=>openFavorites()},
    carrinho:{x:.937,y:.097,w:.055,h:.094,action:()=>openCart()}
  };

  function hitsFor(name){
    if(name==='header')return ['perfil','favoritos','carrinho'];
    if(name==='nav')return ['inicio','produtos','categorias','sobre','contato'];
    if(name==='hero-text')return ['verProdutos'];
    if(name==='categories')return ['tenis','roupas','relogios','bolsas','perfumes','oculos','eletronicos'];
    return [];
  }

  function addHit(parent,def,geom,scrollMode){
    const b=document.createElement('button');
    b.type='button';
    b.className='jp-hit';
    b.setAttribute('aria-label','Abrir');
    const left=def.x*geom.iw+(scrollMode?0:geom.left);
    const top=def.y*geom.ih-geom.startY;
    b.style.left=left+'px';
    b.style.top=top+'px';
    b.style.width=(def.w*geom.iw)+'px';
    b.style.height=(def.h*geom.ih)+'px';
    b.addEventListener('click',def.action);
    parent.appendChild(b);
  }

  function build(imgNaturalW,imgNaturalH){
    shell.innerHTML='';
    const cw=window.innerWidth;
    parts.forEach(part=>{
      const iw=cw*part.scale;
      const ih=iw*(imgNaturalH/imgNaturalW);
      const startY=part.start*ih;
      const endY=part.end*ih;
      const ch=endY-startY;
      const slice=document.createElement('section');
      slice.className='jp-mslice'+(part.align==='scroll'?' jp-mscroll':'');
      slice.style.height=Math.ceil(ch)+'px';
      let left=0;
      if(part.align==='center')left=(cw-iw)/2;
      else if(part.align==='right')left=cw-iw;

      const holder=part.align==='scroll'?document.createElement('div'):slice;
      if(part.align==='scroll'){
        holder.className='jp-mscroll-inner';
        holder.style.width=Math.ceil(iw)+'px';
        holder.style.height=Math.ceil(ch)+'px';
        slice.appendChild(holder);
      }

      const im=document.createElement('img');
      im.src='site-reference.jpeg?v=20260917-original-mobile';
      im.alt='JP Importados';
      im.style.width=Math.ceil(iw)+'px';
      im.style.left=(part.align==='scroll'?0:left)+'px';
      im.style.top=(-startY)+'px';
      holder.appendChild(im);

      const geom={iw,ih,startY,left};
      hitsFor(part.name).forEach(key=>addHit(holder,hotspotDefs[key],geom,part.align==='scroll'));

      if(part.name==='header'){
        const s=document.createElement('input');
        s.className='jp-mobile-search';
        s.type='search';
        s.setAttribute('aria-label','Pesquisar produtos');
        const x=.292,y=.091,w=.405,h=.048;
        s.style.left=(x*iw+left)+'px';
        s.style.top=(y*ih-startY)+'px';
        s.style.width=(w*iw)+'px';
        s.style.height=(h*ih)+'px';
        s.style.fontSize=Math.max(11,iw*.009)+'px';
        s.addEventListener('input',()=>{
          const original=document.getElementById('searchInput');
          if(original){original.value=s.value;original.dispatchEvent(new Event('input',{bubbles:true}));}
        });
        s.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();openProducts();}});
        slice.appendChild(s);
      }

      shell.appendChild(slice);
    });
  }

  const probe=new Image();
  probe.onload=function(){build(probe.naturalWidth,probe.naturalHeight)};
  probe.src='site-reference.jpeg?v=20260917-original-mobile';
  window.addEventListener('resize',()=>{
    if(window.innerWidth<=600&&probe.naturalWidth)build(probe.naturalWidth,probe.naturalHeight);
  });
})();
