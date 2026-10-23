# Feedwork – Carreira & Transparência

Plataforma web onde funcionários e ex-funcionários avaliam empresas de forma anônima, com foco em **plano de carreira**, salários e cultura. Projeto acadêmico desenvolvido em HTML, CSS e JavaScript puros.

> 🎓 Projeto da disciplina **[nome da disciplina]** – **[nome da faculdade]** – entrega em 05/12.

## 💡 Sobre o projeto

Muitos sites de avaliação focam apenas em salários genéricos. O Feedwork detalha a **jornada real de crescimento** do profissional: se a empresa promove por mérito ou antiguidade, como são os ciclos de avaliação e se as promessas de ascensão se cumprem.

## ✨ Funcionalidades

- Busca de empresas e página de detalhes com nota geral e notas por categoria (liderança, plano de carreira, salários e ambiente)
- Avaliação de empresas por **funcionários atuais** e **ex-funcionários**, com filtro por tipo
- **Cadastro de novas empresas**
- **Like e dislike** nos comentários (voto único, pode ser trocado ou desfeito)
- Página para empresas (B2B) e formulário de contato
- Login simulado
- Layout responsivo (celular e desktop)

## 💼 Modelo de negócio

**B2C (gratuito):** usuários e candidatos leem e escrevem avaliações, pesquisam planos de carreira e comparam empresas.

**B2B (receita):** ferramentas e dados vendidos ao RH das empresas:

| Produto | Descrição |
|---|---|
| Painel de Insights e RH Analytics | Relatórios e dashboards sobre o que ex-funcionários dizem, gargalos de carreira e perda de talentos para a concorrência |
| Selo de Transparência / Employer Branding | Selo "Empresa Certificada Feedwork" para empresas bem avaliadas usarem em vagas |
| Resposta e Atração | Respostas públicas a avaliações, vagas direcionadas e destaque da cultura da empresa |

## 🛠️ Tecnologias

- HTML5
- CSS3 (variáveis CSS, Grid e Flexbox)
- JavaScript (ES6+), com rotas por hash e `localStorage`
- Fonte Inter (Google Fonts)

## 📁 Estrutura

```
feedwork/
├── index.html        # estrutura da página (cabeçalho, rodapé)
├── style.css         # estilos e paleta de cores (bordô + grafite)
├── script.js         # páginas, rotas, avaliações, votos e cadastro
├── logo-gatinho.png  # logo
└── README.md
```

## ▶️ Como executar

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/feedwork.git
   ```
2. Abra o arquivo `index.html` no navegador. Não precisa instalar nada.

## ⚠️ Limitações

- Os dados ficam no `localStorage` do navegador, sem back-end nem banco de dados.
- O login é simulado.
- As empresas, avaliações e números da página inicial são fictícios, para demonstração.

## 🚀 Próximos passos

- Back-end e banco de dados (por exemplo, Node.js + PostgreSQL ou Firebase)
- Autenticação real e moderação de avaliações
- Página de salários por cargo
- Painel B2B funcional

## 👥 Equipe

- Nome do integrante 1
- Nome do integrante 2
- Nome do integrante 3

## 📄 Licença

Projeto acadêmico, sem fins comerciais.
