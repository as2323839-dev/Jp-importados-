(function(){
  function field(id){const el=document.getElementById('co-'+id);return el?el.value.trim():''}
  function checkoutPayload(){
    return {
      method:'pix',
      items:Object.keys(cart).map(id=>({id,quantity:Number(cart[id]||0)})),
      payer:{name:field('nome'),cpf:field('cpf'),email:field('email'),phone:field('telefone')},
      delivery:{cep:field('cep'),street:field('rua'),number:field('numero'),complement:field('complemento'),neighborhood:field('bairro'),city:field('cidade'),state:field('estado')}
    }
  }
  function paymentData(order){
    const payments=order&&order.transactions&&order.transactions.payments;
    const p=Array.isArray(payments)?payments[0]:null;
    const pm=p&&p.payment_method||{};
    return {orderId:order&&order.id,status:(p&&p.status)||(order&&order.status),detail:(p&&p.status_detail)||(order&&order.status_detail),qr:pm.qr_code||'',qrBase64:pm.qr_code_base64||'',ticket:pm.ticket_url||''}
  }
  window.copyPixCode=async function(){
    const el=document.getElementById('pixCode');if(!el)return;
    try{await navigator.clipboard.writeText(el.value);const b=document.getElementById('copyPixBtn');if(b)b.textContent='COPIADO ✓'}catch(e){el.select();document.execCommand('copy')}
  };
  async function pollOrder(orderId){
    if(!orderId)return;
    let attempts=0;
    const timer=setInterval(async()=>{
      if(++attempts>40){clearInterval(timer);return}
      try{
        const r=await fetch('/api/order-status?id='+encodeURIComponent(orderId));
        const data=await r.json();
        const info=paymentData(data);
        const box=document.getElementById('mpStatus');
        if(!box)return clearInterval(timer);
        const approved=['processed','approved','accredited'].includes(String(info.status||'').toLowerCase())||String(info.detail||'').toLowerCase()==='accredited';
        if(approved){clearInterval(timer);box.innerHTML='<b>Pagamento aprovado ✓</b><br>Seu pagamento foi confirmado pelo Mercado Pago.'}
      }catch(e){}
    },3000)
  }
  window.submitCheckout=async function(){
    if(!validateCheckout())return;
    const status=document.getElementById('mpStatus');
    const btn=document.getElementById('payNowBtn');
    const err=document.getElementById('checkoutError');
    if(payment!=='Pix'){
      if(status)status.innerHTML='<b>Cartão de crédito:</b> vamos ativar essa etapa depois de confirmar o Pix de teste.';
      return;
    }
    if(btn){btn.disabled=true;btn.textContent='GERANDO PIX...'}
    if(status)status.innerHTML='Conectando com o Mercado Pago...';
    if(err)err.style.display='none';
    try{
      const r=await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(checkoutPayload())});
      const data=await r.json();
      if(!r.ok){
        const mpMessage=data&&data.mercado_pago&&(data.mercado_pago.message||data.mercado_pago.error);
        throw new Error(mpMessage||data.error||'Não foi possível gerar o Pix.');
      }
      const info=paymentData(data);
      if(!info.qr&&!info.ticket)throw new Error('O Mercado Pago criou a cobrança, mas não retornou o QR Code.');
      const testNote=data.test_mode?'<p style="margin:8px 0;color:#efbd5a"><b>Modo de teste:</b> nenhum dinheiro real será movimentado.</p>':'';
      const qr=info.qrBase64?`<img src="data:image/png;base64,${info.qrBase64}" alt="QR Code Pix" style="display:block;width:min(260px,100%);margin:12px auto;background:#fff;padding:10px;border-radius:12px">`:'';
      const copy=info.qr?`<label style="display:block;font-size:12px;margin:10px 0 6px">Pix Copia e Cola</label><textarea id="pixCode" readonly style="width:100%;min-height:92px;background:#080808;color:#fff;border:1px solid #80511b;border-radius:8px;padding:10px">${info.qr}</textarea><button id="copyPixBtn" class="continue" type="button" onclick="copyPixCode()">COPIAR CÓDIGO PIX</button>`:'';
      const ticket=info.ticket?`<a href="${info.ticket}" target="_blank" rel="noopener" style="display:block;text-align:center;margin-top:10px;color:#efbd5a">Abrir instruções do Mercado Pago</a>`:'';
      if(status)status.innerHTML=`<b>Pix gerado com sucesso.</b>${testNote}${qr}${copy}${ticket}<p style="margin-top:10px">Status: <b>${info.detail||info.status||'aguardando pagamento'}</b></p>`;
      if(btn){btn.textContent='PIX GERADO';btn.disabled=true}
      pollOrder(info.orderId);
    }catch(e){
      if(status)status.innerHTML='<b>Não foi possível gerar o Pix.</b>';
      if(err){err.style.display='block';err.textContent=String(e&&e.message||e)}
      if(btn){btn.disabled=false;btn.textContent='TENTAR GERAR PIX NOVAMENTE'}
    }
  };
})();