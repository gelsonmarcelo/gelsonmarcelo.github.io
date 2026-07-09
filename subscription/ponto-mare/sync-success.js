(function () {
  var config = window.PONTO_MARE_CONFIG;
  if (!config) {
    return;
  }

  function normalizedHashParams() {
    var hash = window.location.hash || "";
    if (hash.indexOf("#") === 0) {
      hash = hash.slice(1);
    }
    return new URLSearchParams(hash);
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
  var accessToken =
    hashParams.get("access_token") ||
    params.get("access_token") ||
    sessionStorage.getItem("pontomare_mp_access_token");
  var preapprovalId =
    params.get("preapproval_id") ||
    params.get("id") ||
    sessionStorage.getItem("pontomare_mp_preapproval_id");
  var syncEndpoint = config.subscription && config.subscription.syncEndpoint;

  if (accessToken) {
    sessionStorage.setItem("pontomare_mp_access_token", accessToken);
  }
  sanitizeVisibleUrl();

  var debugEl = document.getElementById("sync-status");
  function setDebug(message) {
    if (debugEl) {
      debugEl.textContent = message;
    }
    // eslint-disable-next-line no-console
    console.log("[pontomare-sync]", message);
  }

  if (!syncEndpoint) {
    setDebug("Não foi possível confirmar sua assinatura agora. Volte ao app e tente novamente.");
    return;
  }
  if (!accessToken) {
    setDebug("Reabra o fluxo de assinatura pelo app desktop do Ponto Maré.");
    return;
  }
  if (!preapprovalId) {
    setDebug("Não encontramos os dados desta compra. Volte ao app e tente assinar novamente.");
    return;
  }

  setDebug("Confirmando sua assinatura...");

  fetch(syncEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken
    },
    body: JSON.stringify({
      preapproval_id: preapprovalId
    })
  })
    .then(function (response) {
      return response.json()
        .catch(function () {
          return {};
        })
        .then(function (body) {
          return {
            ok: response.ok,
            status: response.status,
            body: body
          };
        });
    })
    .then(function (result) {
      if (result.ok && result.body && result.body.success) {
        sessionStorage.removeItem("pontomare_mp_preapproval_id");
        sessionStorage.removeItem("pontomare_mp_access_token");
        sessionStorage.removeItem("pontomare_mp_user_id");
        setDebug("Assinatura confirmada! Volte ao app — o acesso será liberado em instantes.");
      } else if (result.body && result.body.pending) {
        setDebug("Pagamento recebido. Aguardando confirmação do Mercado Pago — o acesso é liberado automaticamente em instantes.");
      } else {
        var detail = result.body && (result.body.message || result.body.error)
          ? (result.body.message || result.body.error)
          : "";
        setDebug(
          detail
            ? "Não foi possível confirmar agora: " + detail + " Volte ao app em alguns instantes."
            : "Não foi possível confirmar sua assinatura agora. Volte ao app em alguns instantes ou fale com o suporte."
        );
      }
    })
    .catch(function (error) {
      setDebug("Falha na conexão ao confirmar a assinatura. Verifique sua internet e tente novamente pelo app.");
    });
})();
