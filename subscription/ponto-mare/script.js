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

  function normalizedHashParams() {
    var hash = window.location.hash || "";
    if (hash.indexOf("#") === 0) {
      hash = hash.slice(1);
    }
    return new URLSearchParams(hash);
  }

  function persistAuthContext(nextUserId, nextAccessToken) {
    if (nextUserId) {
      sessionStorage.setItem("pontomare_mp_user_id", nextUserId);
    }
    if (nextAccessToken) {
      sessionStorage.setItem("pontomare_mp_access_token", nextAccessToken);
    }
  }

  function sanitizeVisibleUrl() {
    if (!window.history || typeof window.history.replaceState !== "function") {
      return;
    }
    var sanitizedParams = new URLSearchParams(window.location.search);
    sanitizedParams.delete("access_token");
    sanitizedParams.delete("user_id");
    sanitizedParams.delete("preapproval_id");
    sanitizedParams.delete("id");
    var queryString = sanitizedParams.toString();
    var cleanUrl = window.location.pathname + (queryString ? "?" + queryString : "");
    window.history.replaceState(null, document.title, cleanUrl);
  }

  var params = new URLSearchParams(window.location.search);
  var hashParams = normalizedHashParams();
  var userId = hashParams.get("user_id") || params.get("user_id") || sessionStorage.getItem("pontomare_mp_user_id");
  var accessToken = hashParams.get("access_token") || params.get("access_token") || sessionStorage.getItem("pontomare_mp_access_token");

  persistAuthContext(userId, accessToken);
  sanitizeVisibleUrl();

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

  var SVG_NS = "http://www.w3.org/2000/svg";

  var ICON_PATHS = {
    sale: "M6 6h15l-1.5 9h-12z M6 6l-2-2 M9 20a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z",
    payment: "M3 7h18v10H3z M3 10h18 M7 15h3",
    inventory: "M4 7l8-4 8 4-8 4-8-4z M4 7v10l8 4 8-4V7 M12 11v10",
    cash: "M4 6h16v12H4z M8 10h8 M8 14h5",
    remote: "M7 8h10v8H7z M12 16v4 M9 20h6 M4 12H2 M22 12h-2",
    print: "M7 8h10v3H7z M6 11h12v8H6z M9 15h6",
    backup: "M12 3v10 M8 7l4-4 4 4 M5 14v4a3 3 0 003 3h8a3 3 0 003-3v-4",
    devices: "M8 5h8v12H8z M10 19h4 M5 8H3 M21 8h-2",
    shield: "M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z",
    clock: "M12 8v5l3 2 M12 21a9 9 0 110-18 9 9 0 010 18z",
    sync: "M20 7h-4V3 M4 17h4v4 M20 7a8 8 0 00-13 3 M4 17a8 8 0 0013-3",
    support: "M4 6a8 8 0 0116 0v4a4 4 0 01-4 4h-1l-2 3v-3H9a4 4 0 01-4-4V6z",
    check: "M5 12l4 4L19 6"
  };

  function buildSvgIcon(iconName, className) {
    var wrapper = document.createElement("span");
    wrapper.className = className;
    wrapper.setAttribute("aria-hidden", "true");

    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", ICON_PATHS[iconName] || ICON_PATHS.shield);
    svg.appendChild(path);
    wrapper.appendChild(svg);
    return wrapper;
  }

  function buildCheckIcon() {
    return buildSvgIcon("check", "icon-pill");
  }

  function renderHeroBenefits() {
    var list = document.getElementById("hero-benefits-list");
    if (!list) {
      return;
    }

    var preview = (config.hero && config.hero.previewBenefits) || [];
    preview.forEach(function (benefit) {
      var li = document.createElement("li");
      li.appendChild(buildCheckIcon());
      li.appendChild(document.createTextNode(benefit));
      list.appendChild(li);
    });
  }

  function renderBenefits() {
    var grid = document.getElementById("benefits-grid");
    if (!grid) {
      return;
    }

    config.benefits.forEach(function (benefit) {
      var card = document.createElement("article");
      card.className = "feature-card";

      var icon = buildSvgIcon(benefit.icon || "sale", "feature-icon");
      var title = document.createElement("h3");
      title.textContent = benefit.title;

      var description = document.createElement("p");
      description.textContent = benefit.description;

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

    config.trustBlocks.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "trust-card";

      var icon = buildSvgIcon(item.icon || "shield", "trust-icon");
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

  function renderPlanFeatures(planKey, listId) {
    var list = document.getElementById(listId);
    var plan = config.pricing && config.pricing[planKey];
    if (!list || !plan || !Array.isArray(plan.features)) {
      return;
    }

    plan.features.forEach(function (feature) {
      var item = document.createElement("li");
      item.textContent = feature;
      list.appendChild(item);
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
    var hero = config.hero || {};
    var sections = config.sections || {};

    setText("brand-name", config.brand.name);
    setText("brand-tagline", config.brand.tagline);
    setText("hero-eyebrow", hero.eyebrow);
    setText("hero-title", hero.title);
    setText("hero-description", hero.description);
    setText("hero-subscribe-link", config.cta.primary);
    setText("hero-secondary-link", config.cta.secondary);
    setText("subscribe-button", config.cta.primary);
    setText("beneficios-title", sections.benefitsTitle);
    setText("beneficios-subtitle", sections.benefitsSubtitle);
    setText("planos-title", sections.plansTitle);
    setText("planos-subtitle", sections.plansSubtitle);
    setText("confianca-title", sections.trustTitle);
    setText("faq-title", sections.faqTitle);
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

    var metaDescription = document.getElementById("meta-description");
    if (metaDescription && hero.description) {
      metaDescription.setAttribute("content", hero.description);
    }

    var logo = document.getElementById("brand-logo");
    if (logo) {
      logo.src = config.brand.logoPath;
    }
  }

  hydrateStaticContent();
  renderHeroBenefits();
  renderBenefits();
  renderPlanFeatures("monthly", "monthly-features");
  renderPlanFeatures("yearly", "yearly-features");
  renderTrustBlocks();
  renderFaq();
  refreshPlanSelection();

  planInputs.forEach(function (input) {
    input.addEventListener("change", refreshPlanSelection);
  });

  planCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var input = card.querySelector('input[name="plan_id"]');
      if (!input || input.checked) {
        return;
      }
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
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
          persistAuthContext(userId, accessToken);
          window.location.href = redirectUrl;
          return;
        }

        if (result.body.status === "authorized" || result.body.status === "approved" || result.body.status === "pending") {
          window.location.href = "/subscription/ponto-mare/backurl.html?user_id=" + encodeURIComponent(userId);
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
