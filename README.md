# Stenio's Barbearia

Site institucional da **Stenio's Barbearia**, desenvolvido como uma landing page moderna para apresentar serviços, equipe, clube de assinatura, produtos, depoimentos, galeria e informações de contato.

## Visão geral

O projeto é um site estático com interface em React + Vite, estilos separados em CSS e assets organizados por pasta. A proposta é entregar uma experiência premium, responsiva e acessível para clientes da barbearia.

## Recursos

- **Landing page institucional** com seções completas.
- **Seletor de idiomas** com suporte a português, inglês e espanhol.
- **Layout responsivo** para desktop, tablet e mobile.
- **Botão flutuante de WhatsApp** para agendamento.
- **Carrossel de equipe** com navegação por botões, teclado e toque.
- **Seções de serviços, clube, produtos, depoimentos, galeria e unidade**.
- **Boas práticas de acessibilidade**, incluindo link para pular ao conteúdo, foco visível e suporte a redução de movimento.
- **Organização de assets** com CSS, JavaScript e imagens separados.

## Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **React 18**
- **Vite**
- **Google Fonts**

## Estrutura do projeto

```text
.
├── index.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.jsx
│   │   ├── components/
│   │   │   ├── media.jsx
│   │   │   └── team-carousel.jsx
│   │   ├── config/
│   │   │   └── translations.jsx
│   │   ├── data/
│   │   │   └── testimonials.jsx
│   │   └── hooks/
│   │       ├── animations.jsx
│   │       └── responsive.jsx
│   └── images/
└── README.md
```

## Arquivos principais

- **`index.html`**: documento principal, metadados, carregamento das dependências e ponto de montagem da aplicação.
- **`assets/css/styles.css`**: estilos visuais, responsividade, animações e regras de acessibilidade.
- **`assets/js/app.jsx`**: aplicação React principal e composição das seções.
- **`assets/js/components/`**: componentes reutilizáveis de interface.
- **`assets/js/config/`**: configurações e traduções do site.
- **`assets/js/data/`**: dados editoriais reutilizáveis, como depoimentos.
- **`assets/js/hooks/`**: hooks de comportamento, animação e responsividade.
- **`assets/images/`**: imagens e mídias do projeto.
- **`robots.txt`** e **`sitemap.xml`**: arquivos de apoio para indexação em buscadores.
- **`site.webmanifest`**: configurações básicas de instalação e identidade visual.

## Como executar localmente

Você pode abrir o arquivo `index.html` diretamente no navegador.

Para executar com Vite:

```bash
npm install
npm run dev
```

Depois, acesse a URL exibida no terminal.

Para gerar a versão de produção:

```bash
npm run build
```

## Idiomas

O site possui suporte a:

- **Português**
- **Inglês**
- **Espanhol**

O seletor de idiomas faz parte dos requisitos do projeto e deve ser mantido.

## Boas práticas aplicadas

- **Separação de responsabilidades** entre HTML, CSS e JavaScript.
- **HTML semântico** com `header`, `nav`, `main`, `section` e `footer`.
- **Acessibilidade básica** com `aria-label`, `label` para seletor de idioma, foco visível e link de pular conteúdo.
- **Responsividade** com media queries.
- **Segurança em links externos** com `rel="noopener noreferrer"`.
- **SEO básico** com `lang`, `viewport`, `description` e `theme-color`.

## Checklist de qualidade

Antes de publicar alterações, recomenda-se verificar:

- **Navegação geral** entre seções.
- **Seletor de idiomas** em português, inglês e espanhol.
- **Responsividade** em telas pequenas, médias e grandes.
- **Links de WhatsApp e contato**.
- **Console do navegador** para identificar erros.
- **Referências de CSS, JS e imagens**.
- **Acessibilidade básica** por teclado.

## Observações para produção

O projeto usa React + Vite para build de produção, minificação e organização dos assets.

## Autores

- **Emerson Pereira Siqueira**
- **Roberto Barbosa (Romero)**
