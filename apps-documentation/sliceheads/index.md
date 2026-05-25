[← Início](../../index.html)

# Documentação Slice Heads

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.gelsonschikorski.sliceheads">
    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/pt-br_badge_web_generic.png" width="200" alt="Disponível no Google Play">
  </a>
</p>

<p align="center">
  <strong>Pacote:</strong> <code>com.gelsonschikorski.sliceheads</code>
</p>

O **Slice Heads** é um jogo casual para Android em que você corta cabeças com gestos de arrastar, evita bombas e tenta bater seu recorde. A partida usa animação interativa em **Rive** (proporção **16:9**, modo **paisagem**) e pode integrar **Google Play Games** para placar e conquistas.

Nesta documentação você encontra um guia das funcionalidades do app, alinhado ao que está disponível no menu e nas telas in-app.

---

## Política de privacidade

[Acesse a política de privacidade clicando aqui.](privacy-policy.md)

---

## Aviso

Este aplicativo é um jogo independente desenvolvido por **Gelson Schikorski**. Não possui vínculo com a **Rive, Inc.** nem com o autor original da animação do marketplace, além do uso da obra **Heads Will Roll** conforme a licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). A animação base está em: [Heads Will Roll — Rive Marketplace](https://rive.app/marketplace/24665-46084-heads-will-roll/).

---

## Funcionalidades

### Menu principal

No menu você pode:

- **Play** — iniciar uma partida;
- ver o **Best Score** (melhor pontuação salva no aparelho);
- abrir **Settings** (configurações de som);
- ler **How to play** (como jogar);
- ver **Créditos** (atribuições do app e da animação);
- abrir a **Privacy Policy** (política de privacidade na WebView);
- entrar no **Google Play Games** (opcional), abrir **Leaderboards** e **Achievements** quando estiver conectado.

O placar global e as conquistas dependem de login na conta Google via Play Games.

### Como jogar (partida)

A experiência principal é em **modo paisagem**, pois a animação foi feita para **16:9**. Em celulares, o jogo pode exibir uma mensagem pedindo para girar o aparelho antes de começar.

**Regras principais:**

| Ação | Efeito |
|------|--------|
| Arrastar sobre as **cabeças** | Corta na direção do gesto; pontua |
| **Errar** uma cabeça (não cortar) | Ganha **1 strike** |
| Cortar ou tocar uma **bomba** | **Game over** imediato |
| **Pontuação** sobe | A dificuldade aumenta (ritmo e desafio) |

Durante a partida há botão de **pausa**. Ao pausar, a animação e a música de fundo param até você continuar ou voltar ao menu.

### Strikes e créditos “Clear strikes”

Quando você perde cabeças, acumula **strikes**. É possível, de forma **opcional**:

1. No **menu de pausa**, assistir a um **vídeo recompensado** (anúncio) para ganhar um **crédito** de limpar strikes;
2. Durante a partida, tocar no **botão Clear strikes** no HUD (ícone com badge quando há créditos);
3. O botão fica **esmaecido** quando não há créditos; com créditos, o badge mostra quantos você pode usar.

Os créditos não são obrigatórios — dá para jogar sem assistir anúncios.

A tela **How to play** no app mostra uma prévia visual desse botão (com e sem crédito).

### Configurações de som

No **Settings** (folha inferior no menu) você ajusta:

- **volume da música** de fundo;
- **silenciar** a música.

A trilha muda conforme o progresso da partida (faixas por faixa de pontuação) e há música específica no **game over**. A música pausa durante vídeos recompensados e quando o jogo está pausado.

### Google Play Games

Integração **opcional** com Play Games:

- **Sign in** — login com conta Google;
- **Leaderboards** — envio da melhor pontuação ao placar configurado do jogo;
- **Achievements** — desbloqueio e progresso de conquistas durante a partida.

Sem login, placar e conquistas do Play Games não ficam disponíveis; o **best score local** continua sendo salvo no aparelho.

### How to play e Créditos (no app)

Telas nativas no aplicativo (não dependem de internet, exceto links tocáveis nos créditos):

- **How to play** — regras detalhadas: gestos, bombas, strikes, dificuldade, paisagem e demonstração do botão de clear strikes;
- **Créditos** — agradecimento, informações sobre o desenvolvimento do app Android e atribuição da animação **Heads Will Roll** / **isaganttus** com links para o marketplace Rive e para a licença CC BY 4.0.

### Política de privacidade (no app)

A política é exibida em **WebView** a partir de uma URL configurada pelo desenvolvedor. Ela deve descrever uso de dados por serviços como **Firebase** (analytics, crashes, desempenho), **Google AdMob** (anúncios) e **Play Games**, conforme a [versão publicada](privacy-policy.md).

---

## Dados salvos no aparelho

Sem criar conta própria do Slice Heads, o app pode guardar localmente:

- melhor pontuação;
- volume e mute da música;
- flags internas de conquistas já processadas.

Com **backup automático do Android** ativo, esses dados podem entrar no backup do sistema, conforme configuração do fabricante.

---

## Requisitos e permissões

- **Android 8.0+** (API 26, `minSdk 26`);
- permissão de **Internet** (política de privacidade, anúncios, Play Games, Firebase);
- recomendado jogar em **paisagem** em telefones.

---

## Créditos da animação

A cena de jogo é baseada em [**Heads Will Roll**](https://rive.app/marketplace/24665-46084-heads-will-roll/), de **isaganttus**, adaptada para o Slice Heads, sob [**Creative Commons Attribution 4.0 International**](https://creativecommons.org/licenses/by/4.0/).

---

## Contato e feedback

**Dúvidas:** [gelsonschikorski1998@gmail.com](mailto:gelsonschikorski1998@gmail.com)

**Bugs:** [Abrir issue](https://github.com/gelsonmarcelo/apps-documentation/issues/new)

**Sugestões:** [Nova discussão (Ideas)](https://github.com/gelsonmarcelo/apps-documentation/discussions/new?category=ideas)

---

*Slice Heads — documentação para usuários · última revisão alinhada ao app v1.0*
