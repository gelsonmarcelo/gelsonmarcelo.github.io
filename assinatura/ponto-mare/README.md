# Landing de Assinatura - Ponto Maré Premium

Esta pasta contém a landing de assinatura usada pelo app desktop para iniciar assinaturas recorrentes no Mercado Pago (checkout hospedado, sem captura de cartão no frontend).

## Arquivos principais

- `index.html`: página principal de conversão.
- `styles.css`: estilos da landing.
- `constants.js`: textos, preços, recorrência e endpoint da Edge Function.
- `script.js`: lógica da página (seleção de plano, autenticação, chamada ao checkout).
- `sucesso.html`, `erro.html`, `pendente.html`: páginas de retorno do fluxo de assinatura.
- `return.css`: estilos compartilhados das páginas de retorno.

## Como alterar preços e textos

Edite o arquivo `constants.js`:

- Plano mensal: `pricing.monthly.priceLabel`
- Plano anual: `pricing.yearly.priceLabel`
- Recorrência (valor/frequência enviados ao backend): `pricing.monthly.recurring` e `pricing.yearly.recurring`
- Nome dos planos e descrições: `pricing.monthly` e `pricing.yearly`
- FAQ e benefícios: `faq` e `benefits`
- Textos de botões: `cta`

## Como configurar assinatura

1. No `constants.js`, altere `subscription.endpoint` para a URL real da Edge Function Supabase.
2. Configure a recorrência de cada plano em `pricing.monthly.recurring` e `pricing.yearly.recurring`.
3. A Edge Function retorna `init_point`; a landing redireciona o navegador para o checkout do Mercado Pago.
4. O app deve abrir a página com `?user_id=...&access_token=...` (JWT do Supabase).
5. A landing envia `Authorization: Bearer <access_token>` e o payload `plan_id` + `auto_recurring`.
6. Após pagamento, `sucesso.html` tenta sincronizar via `sync-mercado-pago-subscription` (fallback do webhook).

Documentação completa do backend, webhook e secrets: repositório `pdv/pdv` → `docs/mercado_pago_setup.md`.

## Testes em sandbox

Para homologar compras de teste, **não use** apenas as credenciais de teste da aplicação logado com sua conta real de desenvolvedor. Para assinaturas com buyer test, o token no Supabase (`MERCADO_PAGO_ACCESS_TOKEN`) deve ser o **Access Token obtido logado na conta seller test**.

Resumo do fluxo de teste:

1. Criar contas **Seller test** e **Buyer test** no painel Mercado Pago (mesmo país: BR).
2. Em aba anônima, logar no Developers como **seller test** e copiar o Access Token da aplicação.
3. Configurar esse token no Supabase e validar com `GET /users/me` (deve retornar usuário teste, não seu nome pessoal).
4. No app, usar usuário Supabase com e-mail do **buyer test** (`test_user_...@testuser.com`).
5. Abrir landing pelo app, assinar, e no checkout MP logar com o **mesmo buyer test**.
6. Concluir com [cartão de teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/integration-test/test-purchases).

Erros comuns ao misturar real + teste:

- `Both payer and collector must be real or test users`
- `Uma das partes ... é de teste`
- Botão **Confirmar** desabilitado no checkout

Detalhes, troubleshooting e checklist: `pdv/pdv/docs/mercado_pago_setup.md` (seção 10).

## Links úteis

- Termos de uso: configurado em `links.terms`
- Privacidade: configurado em `links.privacy`
- Suporte: `brand.supportEmail`
- Contas de teste MP: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/test/accounts
