(function () {
  var config = window.PONTO_MARE_CONFIG;

  if (!config) {
    return;
  }

  var form = document.getElementById("subscription-form");
  var subscribeButton = document.getElementById("subscribe-button");
  var planCards = Array.prototype.slice.call(document.querySelectorAll(".plan-card"));
  var planInputs = Array.prototype.slice.call(document.querySelectorAll('input[name="plan_id"]'));
  var heroWarning = document.getElementById("hero-warning");
  var formWarning = document.getElementById("form-warning");
  var formError = document.getElementById("form-error");

  var params = new URLSearchParams(window.location.search);
  var userId = params.get("user_id");
  var accessToken = params.get("access_token");

  function textOrEmpty(value) {
    return value || "";
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = textOrEmpty(value);
    }
  }

  function setHref(id, value) {
    var el = document.getElementById(id);
    if (el) {
      el.href = value;
    }
  }

  function buildIcon(iconSymbol) {
    var icon = document.createElement("span");
    icon.className = "icon-pill";
    icon.textContent = iconSymbol;
    icon.setAttribute("aria-hidden", "true");
    return icon;
  }

  function renderHeroBenefits() {
    var list = document.getElementById("hero-benefits-list");
    if (!list) {
      return;
    }

    var preview = config.benefits.slice(0, 4);
    preview.forEach(function (benefit) {
      var li = document.createElement("li");
      li.appendChild(buildIcon("✓"));
      li.appendChild(document.createTextNode(benefit));
      list.appendChild(li);
    });
  }

  function renderBenefits() {
    var grid = document.getElementById("benefits-grid");
    if (!grid) {
      return;
    }

    var icons = ["✓", "⚡", "▦", "✓", "▣"];

    config.benefits.forEach(function (benefit, index) {
      var card = document.createElement("article");
      card.className = "feature-card";

      var icon = buildIcon(icons[index] || "✓");
      var title = document.createElement("h3");
      title.textContent = benefit;

      var description = document.createElement("p");
      description.textContent = "Recurso incluso para aumentar produtividade e controle da operação.";

      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(description);
      grid.appendChild(card);
    });
  }

  function renderTrustBlocks() {
    var grid = document.getElementById("trust-grid");
    if (!grid) {
      return;
    }

    var icons = ["🛡", "✓", "↺", "☎", "▣"];

    config.trustBlocks.forEach(function (item, index) {
      var card = document.createElement("article");
      card.className = "trust-card";

      var icon = buildIcon(icons[index] || "✓");
      var title = document.createElement("h3");
      title.textContent = item.title;

      var description = document.createElement("p");
      description.textContent = item.description;

      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(description);
      grid.appendChild(card);
    });
  }

  function renderFaq() {
    var container = document.getElementById("faq-list");
    if (!container) {
      return;
    }

    config.faq.forEach(function (item, index) {
      var details = document.createElement("details");
      details.className = "faq-item";
      if (index === 0) {
        details.open = true;
      }

      var summary = document.createElement("summary");
      summary.textContent = item.question;

      var answer = document.createElement("p");
      answer.textContent = item.answer;

      details.appendChild(summary);
      details.appendChild(answer);
      container.appendChild(details);
    });
  }

  function selectedPlanId() {
    var selectedInput = planInputs.find(function (input) {
      return input.checked;
    });
    return selectedInput ? selectedInput.value : "";
  }

  function refreshPlanSelection() {
    planCards.forEach(function (card) {
      var input = card.querySelector('input[name="plan_id"]');
      var isSelected = Boolean(input && input.checked);
      card.classList.toggle("selected", isSelected);
      card.setAttribute("aria-checked", String(isSelected));
    });
  }

  function setLoading(isLoading) {
    subscribeButton.disabled = isLoading;
    subscribeButton.textContent = isLoading ? config.cta.loading : config.cta.primary;
  }

  function showWarning(message) {
    heroWarning.textContent = message;
    formWarning.textContent = message;
    heroWarning.hidden = false;
    formWarning.hidden = false;
  }

  function hideWarnings() {
    heroWarning.hidden = true;
    formWarning.hidden = true;
  }

  function showError(message) {
    formError.textContent = message;
    formError.hidden = false;
  }

  function hideError() {
    formError.hidden = true;
    formError.textContent = "";
  }

  function hasAuthContext() {
    return Boolean(userId && accessToken);
  }

  function resolvePlanConfig(planId) {
    if (planId === config.pricing.yearly.planId) {
      return config.pricing.yearly;
    }
    return config.pricing.monthly;
  }

  function buildAutoRecurringPayload(planConfig) {
    var recurring = planConfig && planConfig.recurring;
    if (!recurring) {
      return null;
    }

    var frequency = Number(recurring.frequency);
    var transactionAmount = Number(recurring.transactionAmount);
    var frequencyType = String(recurring.frequencyType || "").trim();
    var currencyId = String(recurring.currencyId || "").trim();

    if (!Number.isInteger(frequency) || frequency <= 0) {
      return null;
    }
    if (!Number.isFinite(transactionAmount) || transactionAmount <= 0) {
      return null;
    }
    if (!frequencyType || !currencyId) {
      return null;
    }

    return {
      frequency: frequency,
      frequency_type: frequencyType,
      transaction_amount: transactionAmount,
      currency_id: currencyId
    };
  }

  function resolveRedirectUrl(body) {
    return body.subscription_checkout_url ||
      body.subscription_url ||
      body.init_point ||
      body.redirect_url ||
      "";
  }

  function extractMercadoPagoError(body) {
    if (!body || typeof body !== "object") {
      return "";
    }

    if (typeof body.message === "string" && body.message) {
      return body.message;
    }

    var details = body.details;
    if (details && typeof details === "object") {
      if (typeof details.message === "string" && details.message) {
        return details.message;
      }
      if (Array.isArray(details.cause)) {
        var firstCause = details.cause.find(function (causeItem) {
          return causeItem && typeof causeItem.description === "string" && causeItem.description;
        });
        if (firstCause) {
          return firstCause.description;
        }
      }
      if (typeof details.error === "string" && details.error) {
        return details.error;
      }
    }

    return "";
  }

  function hydrateStaticContent() {
    setText("brand-name", config.brand.name);
    setText("brand-tagline", config.brand.tagline);
    setText("hero-subscribe-link", config.cta.primary);
    setText("subscribe-button", config.cta.primary);
    setText("monthly-name", config.pricing.monthly.name);
    setText("monthly-price", config.pricing.monthly.priceLabel);
    setText("monthly-period", config.pricing.monthly.pricePeriod);
    setText("monthly-description", config.pricing.monthly.shortDescription);
    setText("yearly-name", config.pricing.yearly.name);
    setText("yearly-badge", config.pricing.yearly.badge);
    setText("yearly-price", config.pricing.yearly.priceLabel);
    setText("yearly-period", config.pricing.yearly.pricePeriod);
    setText("yearly-description", config.pricing.yearly.shortDescription);
    setText("footer-brand", config.brand.name + ". Todos os direitos reservados.");
    setHref("footer-terms", config.links.terms);
    setHref("footer-privacy", config.links.privacy);

    var logo = document.getElementById("brand-logo");
    if (logo) {
      logo.src = config.brand.logoPath;
    }
  }

  hydrateStaticContent();
  renderHeroBenefits();
  renderBenefits();
  renderTrustBlocks();
  renderFaq();
  refreshPlanSelection();

  planInputs.forEach(function (input) {
    input.addEventListener("change", refreshPlanSelection);
  });

  if (!hasAuthContext()) {
    showWarning(config.messages.missingAuthContext);
    subscribeButton.disabled = true;
  } else {
    hideWarnings();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideError();

    if (!hasAuthContext()) {
      showWarning(config.messages.missingAuthContext);
      return;
    }

    var endpoint = config.subscription && config.subscription.endpoint;
    if (!endpoint || endpoint.indexOf("YOUR_SUPABASE_PROJECT_REF") > -1) {
      showError(config.messages.setupRequired);
      return;
    }

    var planId = selectedPlanId();
    if (!planId) {
      showError("Selecione um plano para continuar.");
      return;
    }

    var planConfig = resolvePlanConfig(planId);
    var autoRecurring = buildAutoRecurringPayload(planConfig);
    if (!autoRecurring) {
      showError(config.messages.invalidRecurringConfiguration);
      return;
    }

    setLoading(true);

    var payload = {
      plan_id: planId,
      description: config.brand.name + " - " + (planId === config.pricing.yearly.planId
        ? config.pricing.yearly.name
        : config.pricing.monthly.name),
      auto_recurring: autoRecurring
    };

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return {
              ok: response.ok,
              body: body
            };
          });
      })
      .then(function (result) {
        if (!result.ok) {
          var mercadoPagoError = extractMercadoPagoError(result.body);
          throw new Error(
            mercadoPagoError ||
            result.body.message ||
            result.body.error ||
            config.messages.genericError
          );
        }

        var redirectUrl = resolveRedirectUrl(result.body);
        if (redirectUrl) {
          if (result.body.subscription_id) {
            sessionStorage.setItem("pontomare_mp_preapproval_id", result.body.subscription_id);
          }
          if (accessToken) {
            sessionStorage.setItem("pontomare_mp_access_token", accessToken);
          }
          if (userId) {
            sessionStorage.setItem("pontomare_mp_user_id", userId);
          }
          window.location.href = redirectUrl;
          return;
        }

        if (result.body.status === "authorized" || result.body.status === "approved") {
          window.location.href = "/assinatura/ponto-mare/sucesso.html?user_id=" + encodeURIComponent(userId);
          return;
        }

        if (result.body.status === "pending") {
          window.location.href = "/assinatura/ponto-mare/pendente.html?user_id=" + encodeURIComponent(userId);
          return;
        }

        throw new Error(config.messages.invalidCheckoutResponse);
      })
      .catch(function (error) {
        showError(error.message || config.messages.genericError);
        setLoading(false);
      });
  });
})();
