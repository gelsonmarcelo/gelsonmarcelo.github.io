# Supabase Auth — URLs do Ponto Maré

Configuração das URLs de autenticação no painel Supabase (**Authentication** → **URL Configuration**).

## Site URL (redirect padrão)

Use esta página como **Site URL**:

```
https://gelsonmarcelo.github.io/apps-documentation/pontomare/auth-callback.html
```

Ela recebe o retorno padrão do Supabase e redireciona automaticamente para:

| Fluxo | Página destino |
|-------|----------------|
| Confirmação de e-mail, troca de e-mail, login mágico | `email_confirmation.html` |
| Redefinição de senha (`type=recovery`) | `reset-password.html` |

## Redirect URLs (lista permitida)

Adicione também estas URLs em **Redirect URLs**:

```
https://gelsonmarcelo.github.io/apps-documentation/pontomare/auth-callback.html
https://gelsonmarcelo.github.io/apps-documentation/pontomare/email_confirmation.html
https://gelsonmarcelo.github.io/apps-documentation/pontomare/reset-password.html
```

Se usar domínio customizado no GitHub Pages, substitua `gelsonmarcelo.github.io` pelo domínio real.

## Templates de e-mail

No Supabase, a variável `{{ .SiteURL }}` nos templates de e-mail apontará para `auth-callback.html`.

Exemplo de link de confirmação no template:

```html
<a href="{{ .ConfirmationURL }}">Confirmar e-mail</a>
```

O `{{ .ConfirmationURL }}` já inclui o redirect correto quando configurado no app; o **Site URL** é o fallback quando nenhum redirect específico é informado.

## Arquivos

| Arquivo | Função |
|---------|--------|
| `auth-callback.html` | Página padrão (Site URL) |
| `auth-callback.js` | Roteamento por tipo de fluxo |
| `email_confirmation.html` | Confirmação de e-mail |
| `reset-password.html` | Nova senha após link de recuperação |

## Teste rápido

1. Configure o **Site URL** no Supabase.
2. Cadastre um usuário de teste no app.
3. Abra o link do e-mail de confirmação — deve passar por `auth-callback.html` e chegar em `email_confirmation.html`.
4. Teste **Esqueci minha senha** — deve chegar em `reset-password.html`.

## Troubleshooting

- **Link inválido logo após clicar no e-mail:** confira se `reset-password.html` está publicado no GitHub Pages e se a URL está em **Redirect URLs** no Supabase. A página deve usar implicit flow (não PKCE) porque o link abre fora do app.
- **429 / too many requests:** limite de e-mails do Supabase (2/h no free). Aguarde ou use `auth.admin.generateLink` para testes.
