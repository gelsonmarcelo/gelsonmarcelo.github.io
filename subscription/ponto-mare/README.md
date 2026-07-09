# Landing de Assinatura - Ponto Maré Premium

Esta pasta contém a landing de assinatura usada pelo app desktop para iniciar assinaturas recorrentes no Mercado Pago (checkout hospedado, sem captura de cartão no frontend).

URL pública: `/subscription/ponto-mare/`

## Arquivos principais

- `index.html`: página principal de conversão.
- `styles.css`: estilos da landing.
- `constants.js`: textos, preços, recorrência, benefícios, FAQ e endpoints.
- `script.js`: lógica da página (seleção de plano, autenticação, chamada ao checkout).
- `backurl.html`: página oficial de retorno do fluxo de assinatura.
- `return.css`: estilos compartilhados das páginas de retorno.

## Como alterar preços e textos

Edite o arquivo `constants.js`:

- Hero: `hero`
- Benefícios: `benefits`
- FAQ: `faq`
- Plano mensal: `pricing.monthly`
- Plano anual: `pricing.yearly`
- Recorrência enviada ao backend: `pricing.*.recurring`
- Textos de botões: `cta`

## Como configurar assinatura

1. No `constants.js`, altere `subscription.endpoint` para a URL real da Edge Function Supabase.
2. Configure a recorrência de cada plano em `pricing.monthly.recurring` e `pricing.yearly.recurring`.
3. A Edge Function retorna `init_point`; a landing redireciona o navegador para o checkout do Mercado Pago.
4. O app deve abrir a página com `#user_id=...&access_token=...` (JWT do Supabase no fragment/hash, não na query string).
5. A landing lê o contexto do hash, salva em `sessionStorage`, limpa a barra com `history.replaceState(...)` e envia `Authorization: Bearer <access_token>` com o payload `plan_id` + `auto_recurring`.
6. Após pagamento, `backurl.html` tenta sincronizar via `sync-mercado-pago-subscription` (fallback do webhook).

Documentação completa do backend, webhook e secrets: `FlutterPontoMare/docs/mercado_pago_setup.md`.

## Testes em sandbox

Para homologar compras de teste, **não use** apenas as credenciais de teste da aplicação logado com sua conta real de desenvolvedor. Para assinaturas com buyer test, o token no Supabase (`MERCADO_PAGO_ACCESS_TOKEN`) deve ser o **Access Token obtido logado na conta seller test**.

Detalhes, troubleshooting e checklist: `FlutterPontoMare/docs/mercado_pago_setup.md` (seção 10).

## Links úteis

- Termos de uso: configurado em `links.terms`
- Privacidade: configurado em `links.privacy`
- Suporte: `brand.supportEmail`
- Contas de teste MP: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/test/accounts
