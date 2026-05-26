# gelsonmarcelo.github.io

Site pessoal e documentação dos apps publicados por [Gelson Marcelo](https://github.com/gelsonmarcelo).

Hospedado no [GitHub Pages](https://gelsonmarcelo.github.io/).

## Conteúdo

- **Página inicial** — apresentação, projetos publicados e contato
- **Documentação** — guias de uso dos apps (Coleta Frai e Slice Heads)
- **Políticas de privacidade** — versões em HTML para loja e WebView
- **Idiomas** — português e inglês (seletor no topo; preferência salva no navegador)

## Estrutura do repositório

```
/
├── index.html                      # Página inicial (desenvolvedor)
├── app-ads.txt                     # app-ads.txt (AdMob)
├── assets/
│   ├── css/                        # styles.css (site) e doc.css (documentação)
│   ├── js/i18n.js                  # Tradução PT/EN
│   ├── i18n/pt.json, en.json       # Textos
│   ├── img/                        # Avatar, screenshots dos apps
│   └── video/                      # Vídeos (ex.: demo Coleta Frai)
├── apps-documentation/
│   ├── coleta-frai/
│   │   ├── index.html
│   │   ├── privacy-policy.html
│   │   └── privacy-policy.md
│   └── sliceheads/
│       ├── index.html
│       ├── index.md
│       ├── privacy-policy.html
│       └── privacy-policy.md
└── coleta-frai-documentation/      # Legado (não usar em links novos)
```

## Apps

| App | Google Play | Documentação | Privacidade |
|-----|-------------|--------------|-------------|
| Coleta Frai | [Play Store](https://play.google.com/store/apps/details?id=br.edu.ifc.fraiburgo.coletafrai) | [apps-documentation/coleta-frai/](apps-documentation/coleta-frai/) | [privacy-policy.html](apps-documentation/coleta-frai/privacy-policy.html) |
| Slice Heads | [Play Store](https://play.google.com/store/apps/details?id=com.gelsonschikorski.sliceheads) | [apps-documentation/sliceheads/](apps-documentation/sliceheads/) | [privacy-policy.html](apps-documentation/sliceheads/privacy-policy.html) |

## URLs públicas

Substitua o domínio se o Pages estiver em outro repositório ou custom domain.

| Página | URL |
|--------|-----|
| Início | `https://gelsonmarcelo.github.io/` |
| Coleta Frai — documentação | `https://gelsonmarcelo.github.io/apps-documentation/coleta-frai/` |
| Coleta Frai — privacidade | `https://gelsonmarcelo.github.io/apps-documentation/coleta-frai/privacy-policy.html` |
| Slice Heads — documentação | `https://gelsonmarcelo.github.io/apps-documentation/sliceheads/` |
| Slice Heads — privacidade | `https://gelsonmarcelo.github.io/apps-documentation/sliceheads/privacy-policy.html` |

## Desenvolvimento local

Site estático: abra `index.html` no navegador ou use um servidor local na raiz do repo (necessário para carregar `assets/i18n/*.json` via fetch):

```bash
python3 -m http.server 8080
# http://localhost:8080/
```

## Publicação

Push na branch configurada no GitHub Pages (geralmente `main` do repositório `gelsonmarcelo.github.io`).

Se o app Coleta Frai ainda apontar para o repositório antigo (`coleta-frai-documentation`), atualize os links na Play Store e no código para as URLs em `apps-documentation/` listadas acima.

## Contato

Dúvidas sobre os apps: [gelsonschikorski1998@gmail.com](mailto:gelsonschikorski1998@gmail.com)
