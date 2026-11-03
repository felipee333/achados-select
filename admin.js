const $=id=>document.getElementById(id),key='achados_select_editor_v3';let products=[];const safe=s=>{try{const u=new URL(s);return u.protocol==='https:'?u.href:''}catch{return ''}};function validate(d){if(!Array.isArray(d))throw Error('JSON deve conter uma lista');return d.slice(0,500).filter(p=>p&&typeof p.name==='string'&&typeof p.category==='string'&&safe(p.url)).map(p=>({id:String(p.id||crypto.randomUUID()),name:p.name.slice(0,120),category:p.category.slice(0,60),description:String(p.description||'').slice(0,350),url:safe(p.url),image:safe(p.image||'')}))}function save(){localStorage.setItem(key,JSON.stringify(products));render()}function render(){$('count').textContent='('+products.length+')';$('metricProducts').textContent=products.length;$('entries').replaceChildren();for(const p of products){const row=document.createElement('div');row.className='entry';const name=document.createElement('span');name.textContent=p.name+' · '+p.category;const btn=document.createElement('button');btn.textContent='Excluir';btn.className='secondary';btn.onclick=()=>{if(confirm('Excluir '+p.name+'?')){products=products.filter(x=>x.id!==p.id);save()}};row.append(name,btn);$('entries').append(row)}}async function load(){try{const raw=localStorage.getItem(key);if(raw)products=validate(JSON.parse(raw));else{const r=await fetch('./catalogo.json?t='+Date.now(),{cache:'no-store'});products=validate(await r.json())}render()}catch(e){$('status').textContent='Abra o editor pelo site publicado ou importe catalogo.json. '+e.message}}$('form').onsubmit=e=>{e.preventDefault();const image=$('image').value.trim(),url=$('url').value.trim();if(!safe(url)||(image&&!safe(image))){$('status').textContent='Use somente links HTTPS válidos.';return}products.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:$('name').value.trim(),category:$('category').value,description:$('description').value.trim(),url:safe(url),image:safe(image)});save();e.target.reset();$('status').textContent='Produto adicionado neste navegador. Baixe e publique catalogo.json para atualizar a loja.'};$('export').onclick=()=>{const blob=new Blob([JSON.stringify(products,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='catalogo.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),3000)};$('import').onclick=()=>$('file').click();$('file').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;const d=validate(JSON.parse(await file.text()));if(confirm('Substituir os '+products.length+' produtos atuais por '+d.length+' do arquivo?')){products=d;save()}}catch(err){$('status').textContent='Erro ao importar: '+err.message}e.target.value=''};load();
// Publicacao assistida: abre uma Issue pre-preenchida, sem token no navegador.
let ultimoProdutoNovo = null;
const formularioOriginal = $('form').onsubmit;
$('form').onsubmit = function(event) {
  const antes = products.length;
  formularioOriginal.call(this, event);
  if (products.length > antes) {
    ultimoProdutoNovo = products[products.length - 1];
    $('publish').disabled = false;
  }
};
$('publish').onclick = () => {
  if (!ultimoProdutoNovo) {
    $('status').textContent = 'Cadastre um novo produto nesta sessao antes de publicar.';
    return;
  }
  const payload = JSON.stringify(ultimoProdutoNovo, null, 2);
  const issueUrl = new URL('https://github.com/felipee333/achados-select/issues/new');
  issueUrl.searchParams.set('title', 'Publicar produto: ' + ultimoProdutoNovo.name);
  issueUrl.searchParams.set('body', payload);
  $('status').textContent = 'No GitHub, confirme a Issue e depois adicione a etiqueta publicar-produto. Apenas a conta felipee333 pode autorizar.';
  window.open(issueUrl.toString(), '_blank', 'noopener,noreferrer');
};
