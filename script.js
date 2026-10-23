/* ===== Utilitários ===== */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
const toast=m=>{const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2600)};
const stars=n=>`<span class="star">${'★'.repeat(Math.round(n))}${'☆'.repeat(5-Math.round(n))}</span>`;

/* ===== Dados iniciais (fictícios) ===== */
const CATS=['Liderança e gestão','Plano de carreira','Salários e benefícios','Ambiente de trabalho'];
const SEED_CO=[
 {id:'nubank',nome:'Nubank',setor:'Fintech / Tecnologia',sede:'São Paulo - SP',porte:'1.001 a 5.000',tag:'Plano de Carreira Excelente',n0:339,c:[4.7,4.6,4.5,4.6],desc:'O Nubank possui um modelo de ciclos de carreira estruturados duas vezes ao ano ("performance cycles"). Ambiente colaborativo e foco no cliente.'},
 {id:'mercadolivre',nome:'Mercado Livre',setor:'E-commerce / Logística',sede:'Osasco - SP',porte:'+5.000',tag:'Boa Progressão',n0:511,c:[4.3,4.4,4.2,4.3],desc:'Gigante do e-commerce na América Latina com grande foco em inovação e expansão. Oferece muitas oportunidades de crescimento.'},
 {id:'techcorp',nome:'TechCorp Brasil',setor:'Software & Serviços',sede:'Campinas - SP',porte:'201 a 1.000',tag:'Carreira Estruturada',n0:144,c:[4.4,4.5,4.3,4.4],desc:'Empresa focada em transformação digital de grandes corporações. Possui uma matriz de cargos muito clara e bem definida.'},
 {id:'innovatelab',nome:'InnovateLab',setor:'Inovação / Startups',sede:'Florianópolis - SC',porte:'51 a 200',tag:'Cultura de Inovação',n0:98,c:[4.2,4.3,4.1,4.4],desc:'Laboratório de inovação que desenvolve produtos digitais com times enxutos e muita autonomia.'},
 {id:'xp',nome:'XP Inc.',setor:'Finanças / Investimentos',sede:'São Paulo - SP',porte:'+5.000',tag:'Alta Performance',n0:276,c:[4.1,4.2,4.0,4.2],desc:'Uma das maiores plataformas de investimentos do país, com cultura orientada a resultados.'}];
const R=(id,e,n,v,c,s,t,x,l,d)=>({id,empresa:e,nome:n,vinculo:v,cargo:c,notas:s,titulo:t,texto:x,likes:l,dislikes:d});
const SEED_REV=[
 R('r1','nubank','Juliana S.','ex','Analista',[5,4,4,5],'Ótima empresa para crescer','Grandes aprendizados e um excelente plano de carreira. Cultura muito colaborativa.',32,1),
 R('r2','nubank','Rafael M.','atual','Desenvolvedor',[4,4,5,4],'Ambiente incrível, com pontos de melhoria','Benefícios ótimos. A comunicação interna poderia ser mais clara em alguns momentos.',21,3),
 R('r3','nubank','Carla T.','ex','Designer',[4,5,4,5],'Experiência transformadora!','Trabalhei por 2 anos e foi uma das melhores experiências da minha vida profissional.',18,0),
 R('r4','mercadolivre','Pedro A.','atual','Analista de Operações',[4,4,4,4],'Muito espaço para crescer','Promoções frequentes para quem entrega resultado. Ritmo intenso.',14,2),
 R('r5','techcorp','Marina L.','ex','Consultora',[4,5,4,4],'Matriz de cargos clara','Sabia exatamente o que precisava para ser promovida. Faltou flexibilidade em alguns projetos.',9,1)];
let COS=load('fw_cos',[]).concat(SEED_CO), REVS=load('fw_revs',[]).concat(SEED_REV), VOTES=load('fw_votes',{}), USER=load('fw_user',null), Q='', TAB='geral', FIL={v:'todos',o:'recentes'};
const persist=()=>{save('fw_cos',COS.filter(c=>!SEED_CO.some(s=>s.id==c.id)));save('fw_revs',REVS.filter(r=>!SEED_REV.some(s=>s.id==r.id)));save('fw_votes',VOTES)};
function stats(id){const c=COS.find(x=>x.id==id),rs=REVS.filter(r=>r.empresa==id),n=c.n0+rs.length;
 const cats=CATS.map((_,i)=>n?(c.c[i]*c.n0+rs.reduce((s,r)=>s+r.notas[i],0))/n:0);return{c,rs,n,cats,total:avg(cats)}}
const nota=s=>s.n?s.total.toFixed(1):'–';
const tile=c=>`<div class="tile">${esc(c.nome[0].toUpperCase())}</div>`;
const opts=sel=>COS.map(c=>`<option value="${c.id}" ${c.id==sel?'selected':''}>${esc(c.nome)}</option>`).join('');

/* ===== Páginas ===== */
function coCard(c){const s=stats(c.id);return`<a class="card cc" href="#/empresa/${c.id}"><div class="top">${tile(c)}<div><b>${esc(c.nome)}</b><div class="mut" style="font-size:16px">${esc(c.setor)}</div></div><span class="rate"><span class="star">★</span> ${nota(s)}</span></div>
<span class="tag">✨ ${esc(c.tag)}</span><p>${esc(c.desc)}</p><div class="foot"><span>${s.n} avaliações</span><b>Ver detalhes →</b></div></a>`}
function home(){return`<section class="hero"><span class="pill">A nova era da transparência profissional no Brasil</span>
<h1>Como é de verdade trabalhar e crescer na <span>sua próxima empresa?</span></h1>
<p>Descubra planos de carreira reais, políticas de promoção, salários e relatos honestos de quem já esteve lá dentro.</p>
<form class="sbox" onsubmit="return buscar(event)"><input id="q" placeholder="Digite o nome da empresa (ex: Nubank, TechCorp)"><button class="btn">Pesquisar →</button></form>
<div class="chips">Mais buscadas: ${['nubank','techcorp','innovatelab','xp'].map(i=>`<a href="#/empresa/${i}">${esc(COS.find(c=>c.id==i).nome)}</a>`).join('')}</div></section>
<section class="stats"><div class="in"><div><b>+2.500</b><span>Empresas Avaliadas</span></div><div><b>+45.000</b><span>Ex-funcionários Colaborando</span></div><div><b>98%</b><span>Moderação Rigorosa</span></div><div><b>100%</b><span>Anonimato Garantido</span></div></div></section>
<section class="sec"><div class="eyebrow">DESTAQUES DA COMUNIDADE</div><h2>Empresas com Melhores Planos de Carreira</h2><a class="more" href="#/empresas">Ver todas as empresas →</a>
<div class="grid">${COS.slice(0,3).map(coCard).join('')}</div></section>
<section class="sec why"><div class="eyebrow">POR QUE O FEEDWORK?</div><h2>Diferente de tudo o que existe no mercado</h2><p class="s">Enquanto outros sites focam apenas em salários genéricos, nós detalhamos a jornada real de crescimento do profissional.</p>
<div class="grid"><div class="card feat"><div class="ic">🪜</div><h3>Foco em Plano de Carreira</h3><p>Saiba com precisão se a empresa promove por mérito ou por antiguidade, qual o ciclo de avaliação e se as promessas de subida de cargo são reais.</p></div>
<div class="card feat"><div class="ic">🛡️</div><h3>Ex-Funcionários Confiáveis</h3><p>Quem já saiu da empresa tem liberdade total para relatar os pontos fortes e fracos sem medo de retaliação corporativa, garantindo total veracidade.</p></div>
<div class="card feat"><div class="ic">💬</div><h3>Transparência Salarial</h3><p>Compare faixas salariais reais por nível (Júnior, Pleno, Sênior, Gerente) e saiba quanto negociar em sua próxima proposta de emprego.</p></div></div></section>`}
function buscar(e){e.preventDefault();Q=$('#q').value.trim();location.hash='#/empresas';return false}
function empresas(){const f=COS.filter(c=>c.nome.toLowerCase().includes(Q.toLowerCase()));
 return`<div class="pg"><h2>Empresas</h2><form class="sbox" style="margin:0 0 10px;max-width:none" onsubmit="Q=$('#q').value.trim();route();return false"><input id="q" value="${esc(Q)}" placeholder="Pesquise uma empresa..."><button class="btn">Pesquisar →</button></form>
 ${f.length?`<div class="grid">${f.map(coCard).join('')}</div>`:`<div class="card" style="margin-top:24px">Nenhuma empresa encontrada. <a class="btn sm" href="#/nova-empresa">Cadastrar "${esc(Q)}"</a></div>`}</div>`}
function empresa(id){const c=COS.find(x=>x.id==id);if(!c)return`<div class="pg">Empresa não encontrada.</div>`;const s=stats(id);
 let rs=s.rs.filter(r=>FIL.v=='todos'||r.vinculo==FIL.v);if(FIL.o=='likes')rs=[...rs].sort((a,b)=>b.likes-a.likes);
 return`<div class="pg"><a class="more" href="#/empresas">← Voltar para resultados</a>
 <div class="head" style="margin-top:20px">${tile(c)}<div><h1>${esc(c.nome)}</h1><div class="mut">${esc(c.setor)}</div><div>${nota(s)} ${stars(s.total)} <span class="mut">(${s.n} avaliações)</span></div></div><a class="btn" href="#/avaliar/${c.id}">Avaliar empresa</a></div>
 <div class="tabs"><button class="${TAB=='geral'?'on':''}" onclick="TAB='geral';route()">Visão geral</button><button class="${TAB=='av'?'on':''}" onclick="TAB='av';route()">Avaliações (${s.n})</button></div>
 ${TAB=='geral'?`<div class="two"><div class="card"><div class="big">${nota(s)}</div><div style="text-align:center">${stars(s.total)}<div class="mut">Nota geral</div></div><br>${CATS.map((n,i)=>`<div class="bar"><span>${n}</span><i><b style="width:${s.cats[i]*20}%"></b></i>${s.n?s.cats[i].toFixed(1):'–'}</div>`).join('')}</div>
 <div class="card"><h3>Sobre a empresa</h3><p style="margin:10px 0 16px;color:var(--mut)">${esc(c.desc)}</p><p class="mut">Setor: ${esc(c.setor)}<br>Sede: ${esc(c.sede)}<br>Funcionários: ${esc(c.porte)}</p></div></div>`
 :`<div class="layout"><aside class="card"><b>Filtros</b><label>Tipo de avaliação</label><select onchange="FIL.v=this.value;route()"><option value="todos">Todos</option><option value="atual" ${FIL.v=='atual'?'selected':''}>Funcionários atuais</option><option value="ex" ${FIL.v=='ex'?'selected':''}>Ex-funcionários</option></select>
 <label>Ordenar por</label><select onchange="FIL.o=this.value;route()"><option value="recentes">Mais recentes</option><option value="likes" ${FIL.o=='likes'?'selected':''}>Mais úteis</option></select></aside>
 <div>${rs.length?rs.map(revCard).join(''):'<div class="card">Ainda não há avaliações. Seja a primeira pessoa a avaliar!</div>'}</div></div>`}</div>`}
function revCard(r){const v=VOTES[r.id];return`<div class="card rev"><span class="badge ${r.vinculo=='ex'?'ex':''}">${r.vinculo=='ex'?'Ex-funcionário(a)':'Funcionário(a) atual'}</span><span class="mut">${esc(r.nome)} · ${esc(r.cargo)}</span> ${stars(avg(r.notas))}
 <h4>${esc(r.titulo)}</h4><p style="color:var(--mut)">${esc(r.texto)}</p>
 <div class="vote"><button class="${v=='l'?'on':''}" onclick="votar('${r.id}','l')">👍 Útil (${r.likes})</button><button class="${v=='d'?'on':''}" onclick="votar('${r.id}','d')">👎 Não útil (${r.dislikes})</button></div></div>`}
function votar(id,t){const r=REVS.find(x=>x.id==id),a=VOTES[id];
 if(a=='l')r.likes--;if(a=='d')r.dislikes--;
 if(a==t)delete VOTES[id];else{VOTES[id]=t;t=='l'?r.likes++:r.dislikes++}
 persist();route()}
function avaliar(id){return`<div class="pg"><form class="card form" onsubmit="return enviarAv(event)"><h2>Avalie uma empresa</h2><p class="mut">Sua experiência pode ajudar outras pessoas a fazerem escolhas melhores.</p>
 <label>Qual empresa você deseja avaliar?</label><select id="emp" required>${opts(id)}</select><p class="mut" style="margin-top:6px">Não encontrou? <a class="more" href="#/nova-empresa">Cadastre a empresa</a></p>
 <label>Qual é a sua relação com a empresa?</label><select id="vin"><option value="atual">Funcionário(a) atual</option><option value="ex">Ex-funcionário(a)</option></select>
 <div class="row"><div><label>Seu cargo</label><input id="cargo" required placeholder="Ex.: Analista"></div><div><label>Nome ou apelido (opcional)</label><input id="nome" placeholder="Anônimo"></div></div>
 <label>Dê uma nota (1 a 5)</label><div class="row">${CATS.map(n=>`<div><span class="mut">${n}</span><select class="nota">${[5,4,3,2,1].map(x=>`<option>${x}</option>`).join('')}</select></div>`).join('')}</div>
 <label>Título da avaliação</label><input id="tit" required maxlength="80">
 <label>Comentário</label><textarea id="txt" rows="5" required minlength="20" placeholder="Conte como é trabalhar nessa empresa..."></textarea><br><br>
 <button class="btn" style="width:100%">Publicar avaliação</button><div class="note">🔒 Suas informações são anônimas e protegidas.</div></form></div>`}
function enviarAv(e){e.preventDefault();const id=$('#emp').value;
 REVS.unshift(R('u'+Date.now(),id,$('#nome').value.trim()||(USER?USER.nome:'Anônimo'),$('#vin').value,$('#cargo').value,[...document.querySelectorAll('.nota')].map(s=>+s.value),$('#tit').value,$('#txt').value,0,0));
 persist();TAB='av';FIL.v='todos';toast('Avaliação publicada!');location.hash='#/empresa/'+id;return false}
function novaEmpresa(){return`<div class="pg"><form class="card form" onsubmit="return enviarEmp(event)"><h2>Cadastrar nova empresa</h2><p class="mut">A empresa que você procura não está na lista? Cadastre-a e seja a primeira pessoa a avaliar.</p>
 <label>Nome da empresa</label><input id="cn" required>
 <div class="row"><div><label>Setor</label><select id="cs"><option>Tecnologia</option><option>Finanças</option><option>Varejo</option><option>Saúde</option><option>Educação</option><option>Indústria</option><option>Serviços</option><option>Outro</option></select></div>
 <div><label>Faixa de funcionários</label><select id="cp"><option>1 a 50</option><option>51 a 200</option><option>201 a 1.000</option><option>1.001 a 5.000</option><option>+5.000</option></select></div></div>
 <label>Sede (cidade - UF)</label><input id="cd" placeholder="São Paulo - SP" required>
 <label>Descrição</label><textarea id="cx" rows="3" placeholder="Fale brevemente sobre a empresa"></textarea><br><br><button class="btn" style="width:100%">Cadastrar empresa</button></form></div>`}
function enviarEmp(e){e.preventDefault();const nome=$('#cn').value.trim(),id=nome.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'')||'empresa'+Date.now();
 if(COS.some(c=>c.id==id)){toast('Essa empresa já está cadastrada.');location.hash='#/empresa/'+id;return false}
 COS.push({id,nome,setor:$('#cs').value,sede:$('#cd').value,porte:$('#cp').value,tag:'Nova na plataforma',n0:0,c:[0,0,0,0],desc:$('#cx').value||'Empresa cadastrada pela comunidade Feedwork.'});
 persist();toast('Empresa cadastrada! Agora avalie-a.');location.hash='#/avaliar/'+id;return false}
function b2b(){return`<div class="pg"><div class="eyebrow">FEEDWORK PARA EMPRESAS (B2B)</div><h2>Entenda o que dizem seus funcionários e ex-funcionários</h2><p class="mut" style="font-size:17px">O lado B2C é gratuito. A receita vem de ferramentas e dados para o RH das empresas:</p>
 <div class="grid"><div class="card feat"><div class="ic">📊</div><h3>Painel de Insights e RH Analytics</h3><p>Relatórios e dashboards sobre o que ex-funcionários dizem, gargalos no plano de carreira e talentos perdidos para a concorrência.</p></div>
 <div class="card feat"><div class="ic">🏅</div><h3>Selo de Transparência</h3><p>Empresas bem avaliadas assinam o selo "Empresa Certificada Feedwork" para usar em vagas e atrair melhores profissionais.</p></div>
 <div class="card feat"><div class="ic">📣</div><h3>Resposta e Atração</h3><p>Responda avaliações publicamente, publique vagas direcionadas e destaque sua cultura na plataforma.</p></div></div>
 <h2 style="margin-top:50px">Fale com a gente</h2><form class="card form" style="margin:0" onsubmit="event.preventDefault();toast('Contato enviado! Retornaremos em breve.');this.reset()"><label>Empresa</label><input required><label>E-mail corporativo</label><input type="email" required><label>Plano de interesse</label><select><option>Painel de Insights</option><option>Selo de Transparência</option><option>Resposta e Atração</option></select><br><br><button class="btn">Solicitar demonstração</button></form></div>`}
function entrar(){return`<div class="pg">${USER?`<div class="card form"><h2>Olá, ${esc(USER.nome)}</h2><p class="mut">${esc(USER.email)}</p><br><button class="btn" onclick="sair()">Sair</button></div>`
 :`<form class="card form" onsubmit="return logar(event)"><h2>Entrar no Feedwork</h2><label>Nome</label><input id="ln" required><label>E-mail</label><input id="le" type="email" required><br><br><button class="btn" style="width:100%">Entrar</button><div class="note">Login simulado: os dados ficam apenas neste navegador.</div></form>`}</div>`}
function logar(e){e.preventDefault();USER={nome:$('#ln').value.trim(),email:$('#le').value.trim()};save('fw_user',USER);setLogin();toast('Bem-vindo(a)!');location.hash='#/';return false}
function sair(){USER=null;try{localStorage.removeItem('fw_user')}catch(e){}setLogin();route()}
const setLogin=()=>{$('#login').textContent=USER?'Olá, '+USER.nome.split(' ')[0]:'Entrar'};

/* ===== Rotas ===== */
function route(){const[,p,id]=location.hash.slice(1).split('/');
 $('#app').innerHTML=({'':home,empresas,empresa:()=>empresa(id),avaliar:()=>avaliar(id),'nova-empresa':novaEmpresa,b2b,entrar}[p||'']||home)();window.scrollTo(0,0)}
addEventListener('hashchange',()=>{TAB='geral';route()});setLogin();route();
