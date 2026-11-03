# ACHADOS Select v2 — instruções de publicação

## Atualizar o site (uma única vez)
1. Abra https://github.com/felipee333/achados-select
2. Substitua os arquivos `index.html` e `catalogo.json` existentes e adicione `style.css`, `site.js`, `admin.html` e `admin.js` na RAIZ do repositório. No GitHub, use **Add file > Upload files** e confirme **Commit changes**. Não envie o ZIP inteiro.
3. Aguarde o GitHub Pages publicar. A loja fica em https://felipee333.github.io/achados-select/

## Cadastrar novos produtos
1. Acesse `https://felipee333.github.io/achados-select/admin.html` no seu computador. ATENÇÃO: esta página é pública, sem autenticação. As alterações só são armazenadas no navegador local, e qualquer visitante pode editar sua própria cópia local sem mudar o site. Não trate como painel protegido.
2. Preencha nome, categoria, descrição, link de afiliado e imagem (se tiver permissão).
3. Clique em **Baixar catalogo.json**.
4. No GitHub, abra `catalogo.json` > ícone de editar (lápis) e substitua todo o conteúdo pelo conteúdo do JSON baixado (abra no Bloco de Notas), então **Commit changes**. Alternativamente use upload para substituir arquivo existente.
5. Após a publicação, a vitrine busca o catálogo novo ao abrir, ao voltar à aba e a cada cinco minutos enquanto aberta. Isso é sincronização automática do catálogo publicado, NÃO captura automática de anúncios ou preços.

## Métricas
- `admin.html` mostra quantidade de produtos; NÃO inventa visitas, cliques nem comissões.
- Use as métricas oficiais de cliques/pedidos/comissões no painel do Mercado Livre.
- Visitas globais à vitrine exigem um serviço externo de analytics (ex.: Cloudflare Web Analytics), com configuração e observância de privacidade.

## Segurança e limites
- Não inclua credenciais, tokens, dados pessoais ou senhas no repositório público.
- Links devem ser gerados no programa de afiliados e respeitar suas regras.
- O GitHub Pages é estático e não executa coleta automática de ofertas nem rastreamento de vendas no servidor.
- A imagem é opcional; use apenas imagens com autorização.
