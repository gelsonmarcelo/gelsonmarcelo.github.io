# Publicar um novo release — Ponto Maré

Guia para publicar uma nova versão do Ponto Maré na página de downloads e no bucket Supabase.

**Página pública:** `https://gelsonmarcelo.github.io/apps-documentation/pontomare/releases.html`

## Visão geral

| Plataforma | Onde publicar | O que atualizar neste site |
|------------|---------------|----------------------------|
| **Windows (desktop)** | Bucket Supabase `pontomare-releases` | `releases-config.js`, `releases.html`, i18n |
| **Android** | Google Play Console | Opcional: versão de referência na documentação |

O instalador Windows **não** fica no repositório GitHub Pages. Apenas o link aponta para o Supabase.

## Pré-requisitos

- Instalador `.exe` gerado pelo build Flutter/desktop (ex.: `PontoMare-Setup-1.0.0+18.exe`).
- Bucket **`pontomare-releases`** no Supabase com leitura pública dos arquivos.
- Nome do arquivo alinhado ao padrão: `PontoMare-Setup-<versão>.exe` (ex.: `PontoMare-Setup-1.0.0+18.exe`).

### Bucket Supabase

1. No painel Supabase: **Storage** → criar bucket `pontomare-releases` (se ainda não existir).
2. Tornar os objetos legíveis publicamente (bucket público ou política RLS de `SELECT` para `anon`).
3. Fazer upload do instalador na raiz do bucket (ou manter o mesmo caminho usado em `releases-config.js`).

URL pública gerada automaticamente:

```
https://nvfrjjoktlkpuuwxaxqv.supabase.co/storage/v1/object/public/pontomare-releases/<nome-do-arquivo>
```

O project ref (`nvfrjjoktlkpuuwxaxqv`) e o bucket estão em `releases-config.js`.

## Passo a passo — Windows

### 1. Subir o instalador no Supabase

1. Acesse **Storage** → `pontomare-releases`.
2. Faça upload do `.exe` da nova versão.
3. Confirme que o arquivo abre no navegador (ou inicia download) pela URL pública.

### 2. Atualizar `releases-config.js`

Arquivo: `apps-documentation/pontomare/releases-config.js`

1. Adicione a nova versão no array `releases`.
2. Marque `latest: true` **somente** na versão mais recente; nas anteriores, use `latest: false`.
3. Ajuste `version`, `date` (formato `AAAA-MM-DD`) e `windows.fileName`.

Exemplo:

```javascript
releases: [
  {
    version: "1.0.0+19",
    date: "2026-08-01",
    latest: true,
    windows: {
      fileName: "PontoMare-Setup-1.0.0+19.exe",
      url: buildUrl("PontoMare-Setup-1.0.0+19.exe")
    }
  },
  {
    version: "1.0.0+18",
    date: "2026-07-11",
    latest: false,
    windows: {
      fileName: "PontoMare-Setup-1.0.0+18.exe",
      url: buildUrl("PontoMare-Setup-1.0.0+18.exe")
    }
  }
]
```

O script `releases.js` preenche automaticamente:

- botão **Baixar para Windows** (versão mais recente);
- rótulos `#latest-version`, `#latest-date`, `#latest-windows-filename`;
- links de download no histórico (`data-release-version`).

### 3. Atualizar `releases.html` (changelog)

Arquivo: `apps-documentation/pontomare/releases.html`

1. Atualize os valores padrão em `#latest-version` e `#latest-date` (fallback antes do JS).
2. Na seção **Histórico de versões**, adicione um bloco para a nova versão (copie o `<article class="doc-changelog-version">` existente).
3. Na versão anterior, remova o badge **Mais recente** (`doc-changelog-badge`).
4. Defina `data-release-version` igual ao campo `version` do config.

Exemplo de novo bloco:

```html
<article class="doc-changelog-version" data-release-version="1.0.0+19">
  <header class="doc-changelog-header">
    <h3>
      <span data-i18n="pontoMareReleases.changelog.versionLabel">Versão</span>
      <code>1.0.0+19</code>
      <span class="doc-changelog-badge" data-i18n="pontoMareReleases.changelog.latestBadge">Mais recente</span>
    </h3>
    <p class="doc-changelog-date"><time datetime="2026-08-01">1 de agosto de 2026</time></p>
  </header>
  <ul data-i18n-list="pontoMareReleases.changelog.v1_0_0_19">
    <li></li>
    <li></li>
  </ul>
  <p class="doc-changelog-download">
    <a data-release-download href="#" data-i18n="pontoMareReleases.changelog.downloadWindows">Baixar instalador Windows desta versão</a>
  </p>
</article>
```

**Convenção da chave i18n do changelog:** versão `1.0.0+19` → `pontoMareReleases.changelog.v1_0_0_19` (pontos e `+` viram `_`).

### 4. Atualizar traduções (i18n)

Arquivos:

- `assets/i18n/pt.json`
- `assets/i18n/en.json`

Em `pontoMareReleases.changelog`, adicione a chave da nova versão com a lista de mudanças:

```json
"v1_0_0_19": [
  "Descrição da mudança 1.",
  "Descrição da mudança 2."
]
```

### 5. (Opcional) Versão de referência na documentação

Se a documentação cita a versão atual, atualize em:

- `apps-documentation/pontomare/index.html` — linha **Versão de referência**
- `assets/i18n/en.json` — `pontoMareDoc.contentHtml` (trecho com `Reference version`)

## Passo a passo — Android (Google Play)

A página de downloads já aponta para a Play Store via `playStoreId` em `releases-config.js`.

1. Publique o bundle/APK na **Google Play Console**.
2. Se o pacote não mudou, não é necessário alterar o site.
3. Se quiser refletir a versão na doc, siga o passo 5 acima.

## Checklist antes de publicar

- [ ] Instalador testado em Windows 10+ (64 bits)
- [ ] Arquivo no Supabase com URL pública funcionando
- [ ] `releases-config.js` com `latest` correto e `fileName` igual ao arquivo no bucket
- [ ] Novo bloco no changelog em `releases.html`
- [ ] Chaves `vX_Y_Z` em `pt.json` e `en.json`
- [ ] Badge **Mais recente** apenas na versão nova
- [ ] Teste local: `python3 -m http.server 8080` → abrir `/apps-documentation/pontomare/releases.html`
- [ ] Botão Windows baixa o arquivo certo
- [ ] Link do histórico da versão antiga ainda funciona (se mantida no Supabase)

## Teste local

Na raiz do repositório:

```bash
python3 -m http.server 8080
```

Abra: `http://localhost:8080/apps-documentation/pontomare/releases.html`

## Arquivos envolvidos

| Arquivo | Função |
|---------|--------|
| `releases-config.js` | Versões, URLs Supabase, Play Store ID |
| `releases.js` | Preenche links e rótulos na página |
| `releases.html` | Página pública de downloads e changelog |
| `assets/i18n/pt.json` | Textos em português |
| `assets/i18n/en.json` | Textos em inglês |
| `assets/css/doc.css` | Estilos dos cards de download e changelog |

## Remover uma versão antiga do histórico

1. Remova o bloco correspondente em `releases.html`.
2. Remova a entrada em `releases-config.js` (ou mantenha só se o arquivo ainda existir no Supabase).
3. Remova a chave `changelog.vX_Y_Z` nos JSON de i18n.
4. Opcional: delete o `.exe` antigo do bucket Supabase.

## Links úteis

- Página de downloads: `/apps-documentation/pontomare/releases.html`
- Documentação do app: `/apps-documentation/pontomare/index.html`
- Assinatura desktop: `/subscription/ponto-mare/`
- Supabase Storage: painel do projeto `nvfrjjoktlkpuuwxaxqv`
