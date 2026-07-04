(function () {
  window.PONTO_MARE_CONFIG = {
    brand: {
      name: "Ponto Maré Premium",
      tagline: "Sistema de ponto de venda para lojas",
      supportEmail: "suporte@pontomare.com.br",
      logoPath: "../../assets/img/ponto-mare-logo.png"
    },
    pricing: {
      monthly: {
        planId: "monthly_plan",
        name: "Plano Mensal",
        priceLabel: "R$ 29,90",
        pricePeriod: "/mês",
        shortDescription: "Mais flexibilidade para o dia a dia da sua loja.",
        recurring: {
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 29.90,
          currencyId: "BRL"
        }
      },
      yearly: {
        planId: "yearly_plan",
        name: "Plano Anual",
        badge: "Melhor valor",
        priceLabel: "R$ 199,90",
        pricePeriod: "/ano",
        shortDescription: "Melhor custo-benefício para crescer com previsibilidade.",
        recurring: {
          frequency: 12,
          frequencyType: "months",
          transactionAmount: 199.90,
          currencyId: "BRL"
        }
      }
    },
    cta: {
      primary: "Assinar agora",
      secondary: "Ver planos",
      loading: "Iniciando assinatura..."
    },
    links: {
      terms: "../../apps-documentation/pontomare/terms-of-use.html",
      privacy: "../../apps-documentation/pontomare/privacy-policy.html"
    },
    subscription: {
      endpoint: "https://nvfrjjoktlkpuuwxaxqv.supabase.co/functions/v1/create-mercado-pago-checkout"
    },
    benefits: [
      "Acesso completo a todos os recursos do sistema",
      "Venda com mais agilidade no dia a dia",
      "Gestão centralizada do seu ponto de venda",
      "Controle de produtos, preços e estoque",
      "Uso multiplataforma no Android e Windows"
    ],
    trustBlocks: [
      {
        title: "Segurança de pagamento",
        description: "Assinatura Mercado Pago com cobrança recorrente e proteção de pagamento."
      },
      {
        title: "Acesso imediato após confirmação",
        description: "Assim que o pagamento for aprovado, a assinatura é liberada no app."
      },
      {
        title: "Cancelamento simples",
        description: "Gerencie sua assinatura sem burocracia sempre que precisar."
      },
      {
        title: "Suporte ao cliente",
        description: "Conte com atendimento para dúvidas de uso e assinatura."
      },
      {
        title: "Compatibilidade Android + Windows",
        description: "Use o Ponto Maré Premium no app Android e no desktop Windows."
      }
    ],
    faq: [
      {
        question: "O que está incluso na assinatura?",
        answer: "Você desbloqueia todos os recursos do Ponto Maré Premium para operação completa da loja."
      },
      {
        question: "Posso cancelar quando quiser?",
        answer: "Sim. O cancelamento é simples e pode ser solicitado sem processos complexos."
      },
      {
        question: "Como funciona no Android e Windows?",
        answer: "A assinatura ativa sua conta para uso nas versões Android e Windows do sistema."
      },
      {
        question: "Quando o acesso é liberado?",
        answer: "Após a confirmação de pagamento pelo Mercado Pago, o acesso é liberado automaticamente."
      },
      {
        question: "Qual a diferença entre mensal e anual?",
        answer: "O mensal custa R$ 29,90 por mês. O anual custa R$ 199,90 por ano e entrega melhor valor no período."
      }
    ],
    messages: {
      missingAuthContext: "Abra esta página pelo app desktop do Ponto Maré para vincular sua assinatura.",
      genericError: "Não foi possível iniciar a assinatura no momento. Tente novamente em instantes.",
      invalidCheckoutResponse: "Resposta inválida do serviço de assinatura.",
      setupRequired: "Configure a URL da Edge Function antes de publicar esta página.",
      invalidRecurringConfiguration: "Configuração de cobrança recorrente inválida para o plano selecionado."
    }
  };
})();
