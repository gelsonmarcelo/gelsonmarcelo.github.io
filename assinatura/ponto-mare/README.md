# Landing de Assinatura - Ponto Maré Premium

Esta pasta contém a landing de assinatura usada pelo app desktop para iniciar assinaturas recorrentes no Mercado Pago (assinatura com plano associado).

## Arquivos principais

- `index.html`: página principal de conversão.
- `styles.css`: estilos da landing.
- `constants.js`: textos, preços, links e endpoint da Edge Function.
- `script.js`: lógica da página (seleção de plano, validação de `user_id`, assinatura).
- `sucesso.html`, `erro.html`, `pendente.html`: páginas de retorno do fluxo de assinatura.
- `return.css`: estilos compartilhados das páginas de retorno.

## Como alterar preços e textos

Edite o arquivo `constants.js`:

- Plano mensal: `pricing.monthly.priceLabel`
- Plano anual: `pricing.yearly.priceLabel`
- Nome dos planos e descrições: `pricing.monthly` e `pricing.yearly`
- FAQ e benefícios: `faq` e `benefits`
- Textos de botões: `cta`

## Como configurar assinatura

1. No `constants.js`, altere `subscription.endpoint` para a URL real da Edge Function Supabase.
2. Configure os `preapprovalPlanId` de mensal e anual com os IDs reais dos planos de assinatura no Mercado Pago.
3. A Edge Function pode retornar:
   - URL de redirecionamento (`subscription_checkout_url`, `subscription_url`, `init_point` ou `redirect_url`), ou
   - status final (`authorized`, `approved` ou `pending`).
4. O app deve abrir a página com `?user_id=...&access_token=...` (JWT do Supabase) para vincular a assinatura.
5. A landing envia `Authorization: Bearer <access_token>` para a Edge Function e usa o `preapprovalPlanId` como `plan_id` no payload.

## Links úteis

- Termos de uso: configurado em `links.terms`
- Privacidade: configurado em `links.privacy`
- Suporte: `brand.supportEmail`
