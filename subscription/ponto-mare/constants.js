(function () {
  window.PONTO_MARE_CONFIG = {
    brand: {
      name: "Ponto Maré Premium",
      tagline: "Sistema de ponto de venda para lojas",
      supportEmail: "contato.pontomare@gmail.com",
      logoPath: "../../assets/img/ponto-mare-logo.png"
    },
    hero: {
      eyebrow: "PDV completo para lojas",
      title: "Venda no balcão, controle estoque e caixa em um só sistema",
      description:
        "O Ponto Maré Premium libera o PDV completo do app: leitura por código de barras, múltiplas formas de pagamento, histórico de vendas, controle de estoque, caixa com turno configurável, impressão de cupons e etiquetas, backup e Produtos Remotos — no Android e no Windows.",
      previewBenefits: [
        "PDV com código de barras, busca de produtos e bloqueio por estoque",
        "Pagamentos divididos, maquininhas e conferência por forma de pagamento",
        "Caixa do dia, movimentações manuais e turno para lojas que fecham tarde",
        "Cupom, etiqueta, backup e catálogo remoto para cadastrar fora da loja"
      ]
    },
    sections: {
      benefitsTitle: "O que o Premium libera na prática",
      benefitsSubtitle:
        "São as funcionalidades reais do Ponto Maré para operar venda, estoque, caixa e impressão no dia a dia da loja.",
      plansTitle: "Escolha o plano ideal",
      plansSubtitle: "Mensal para flexibilidade ou anual para melhor custo no período. Os dois liberam o mesmo acesso completo ao sistema.",
      trustTitle: "Confiança para assinar com tranquilidade",
      faqTitle: "Perguntas frequentes"
    },
    pricing: {
      monthly: {
        planId: "monthly_plan",
        name: "Plano Mensal",
        priceLabel: "R$ 29,90",
        pricePeriod: "/mês",
        shortDescription: "Flexível para começar sem compromisso longo.",
        features: [
          "Acesso completo a Caixa, Venda, Vendas, Produtos e Pagamentos",
          "Produtos Remotos, impressão, backup e configurações liberados",
          "Cobrança mensal pelo Mercado Pago, com cancelamento quando você quiser"
        ],
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
        shortDescription: "Melhor custo-benefício para operação contínua da loja.",
        features: [
          "Mesmo acesso completo ao PDV, estoque, caixa e impressão",
          "Economia frente ao mensal no período de 12 meses",
          "Ideal para quem já usa o sistema no balcão com regularidade"
        ],
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
      endpoint: "https://nvfrjjoktlkpuuwxaxqv.supabase.co/functions/v1/create-mercado-pago-checkout",
      syncEndpoint: "https://nvfrjjoktlkpuuwxaxqv.supabase.co/functions/v1/sync-mercado-pago-subscription"
    },
    benefits: [
      {
        icon: "sale",
        title: "Ponto de venda ágil no balcão",
        description:
          "Leia ou informe o código de barras do produto, busque itens cadastrados, acompanhe o total em tempo real e finalize com desconto, observações e impressão de cupom."
      },
      {
        icon: "payment",
        title: "Pagamentos e conferência",
        description:
          "Use Dinheiro, PIX, débito, crédito à vista ou parcelado, cadastre formas personalizadas, associe maquininhas e confira recebimentos por período na área Pagamentos."
      },
      {
        icon: "inventory",
        title: "Produtos, estoque e etiquetas",
        description:
          "Cadastre código, preço, custo e quantidade, bloqueie venda sem estoque, proteja visualização de custo com senha de administrador e imprima etiquetas na hora."
      },
      {
        icon: "cash",
        title: "Caixa e movimentações do dia",
        description:
          "Veja vendas, entradas e saídas manuais em um só lugar, registre reforços e despesas e configure o turno do caixa para lojas que operam após a meia-noite."
      },
      {
        icon: "remote",
        title: "Produtos Remotos online",
        description:
          "Cadastre mercadoria fora do balcão em um celular secundário, importe quantidades para o estoque local e vincule itens em lote no PDV principal."
      },
      {
        icon: "print",
        title: "Cupom e etiqueta personalizados",
        description:
          "Configure cabeçalho, rodapé e logo da loja, reimprima cupons pelo histórico e use impressão Bluetooth, USB ou PDF em papel térmico 58, 72 ou 80 mm."
      },
      {
        icon: "backup",
        title: "Backup, restauração e operação local",
        description:
          "Mantenha vendas, produtos e caixa no dispositivo, faça backup manual ou online na sua conta e restaure quando precisar retomar a operação com segurança."
      },
      {
        icon: "devices",
        title: "Android e Windows na mesma conta",
        description:
          "Use a mesma conta do Ponto Maré no app Android e no desktop Windows. No Windows, você conclui a assinatura nesta página com o pagamento pelo Mercado Pago."
      }
    ],
    trustBlocks: [
      {
        icon: "shield",
        title: "Pagamento pelo Mercado Pago",
        description:
          "A cobrança é processada com a segurança do Mercado Pago. Os dados do seu cartão não ficam nesta página."
      },
      {
        icon: "clock",
        title: "Liberação após confirmação",
        description:
          "Depois que o Mercado Pago confirma o pagamento, sua conta é atualizada e o app libera o acesso automaticamente."
      },
      {
        icon: "sync",
        title: "Confirmação automática",
        description:
          "Assim que o pagamento é aprovado, sua assinatura é registrada. Se houver um pequeno atraso, a confirmação é concluída nesta página de retorno."
      },
      {
        icon: "support",
        title: "Suporte quando precisar",
        description:
          "Em caso de dúvida, fale com nosso suporte pelo e-mail indicado no app. Pelas configurações, você também pode enviar informações para ajudar no atendimento."
      },
      {
        icon: "devices",
        title: "Conta única no app",
        description:
          "A assinatura fica vinculada à sua conta do Ponto Maré. Abra esta página pelo app desktop para garantir que tudo seja associado corretamente."
      }
    ],
    faq: [
      {
        question: "O que está incluso na assinatura Premium?",
        answer:
          "Tudo o que o Ponto Maré oferece como PDV: ponto de venda, histórico e desfazer vendas, cadastro e estoque de produtos com código de barras, caixa com movimentações manuais, conferência de pagamentos, formas de pagamento e maquininhas, impressão de cupons e etiquetas, logo da loja, backup e restauração, Produtos Remotos e registro de atividades do sistema. Sem assinatura ativa ou período de teste válido, o app pede a assinatura para continuar."
      },
      {
        question: "Para quem é o Ponto Maré?",
        answer:
          "Para lojas e comércios que precisam vender no balcão, controlar estoque, registrar pagamentos, acompanhar caixa e imprimir comprovantes sem depender de planilhas soltas. O app é ferramenta de apoio operacional e não substitui contador ou orientação fiscal."
      },
      {
        question: "Como funciona no Android e no Windows?",
        answer:
          "No Android, a assinatura é feita pela Google Play. No Windows, o app abre esta página com sua conta já logada e o pagamento recorrente é feito pelo Mercado Pago. O acesso fica vinculado à sua conta do Ponto Maré, não apenas ao aparelho."
      },
      {
        question: "Existe período de teste?",
        answer:
          "Sim. Depois de confirmar o e-mail no cadastro, você ganha 30 dias para experimentar o sistema antes de assinar."
      },
      {
        question: "Quando o acesso é liberado após pagar no desktop?",
        answer:
          "Em geral, poucos instantes após a confirmação do Mercado Pago. Quando o pagamento é aprovado, o app reconhece a assinatura ativa e libera o acesso automaticamente."
      },
      {
        question: "Posso usar o PDV offline?",
        answer:
          "Sim, para a operação do dia a dia. Vendas, produtos e caixa ficam no seu dispositivo. Para validar a assinatura, é preciso internet de tempos em tempos. Se você já estava com acesso liberado, o app ainda permite usar por um período sem conexão antes de pedir nova validação."
      },
      {
        question: "O que são Produtos Remotos?",
        answer:
          "É um catálogo opcional na sua conta para cadastrar mercadoria fora do balcão — por exemplo no depósito — e depois criar ou vincular produtos locais e importar quantidades para o estoque do PDV principal."
      },
      {
        question: "Posso desfazer uma venda errada?",
        answer:
          "Sim, pelo menu Vendas. Em alguns casos, vendas de um turno anterior podem exigir senha de administrador."
      },
      {
        question: "Qual a diferença entre mensal e anual?",
        answer:
          "O mensal custa R$ 29,90 por mês. O anual custa R$ 199,90 por ano e sai mais em conta no período. Os dois planos liberam o mesmo acesso completo ao sistema."
      },
      {
        question: "Por que preciso abrir esta página pelo app?",
        answer:
          "Porque a assinatura no desktop precisa ser vinculada à conta com a qual você está logado no Ponto Maré. Se abrir esta página direto no navegador, sem passar pelo app, o botão de assinar fica bloqueado por segurança."
      }
    ],
    messages: {
      missingAuthContext: "Abra esta página pelo app desktop do Ponto Maré para vincular sua assinatura.",
      genericError: "Não foi possível iniciar a assinatura no momento. Tente novamente em instantes.",
      invalidCheckoutResponse: "Não foi possível concluir o início da assinatura. Tente novamente em instantes.",
      setupRequired: "O serviço de assinatura ainda não está disponível. Tente novamente mais tarde.",
      invalidRecurringConfiguration: "Configuração de cobrança recorrente inválida para o plano selecionado."
    }
  };
})();
