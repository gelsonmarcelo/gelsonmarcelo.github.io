(function () {
  var config = window.PONTO_MARE_CONFIG;
  if (!config) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var accessToken = params.get("access_token") || sessionStorage.getItem("pontomare_mp_access_token");
  var preapprovalId =
    params.get("preapproval_id") ||
    params.get("id") ||
    sessionStorage.getItem("pontomare_mp_preapproval_id");
  var syncEndpoint = config.subscription && config.subscription.syncEndpoint;

  var debugEl = document.getElementById("sync-status");
  function setDebug(message) {
    if (debugEl) {
      debugEl.textContent = message;
    }
    // eslint-disable-next-line no-console
    console.log("[pontomare-sync]", message);
  }

  if (!syncEndpoint) {
    setDebug("syncEndpoint não configurado em constants.js.");
    return;
  }
  if (!accessToken) {
    setDebug("Sem access_token (abra pelo app ou volte pela URL com access_token).");
    return;
  }
  if (!preapprovalId) {
    setDebug("Sem preapproval_id salvo. Refaça o fluxo a partir do app.");
    return;
  }

  setDebug("Sincronizando assinatura...");

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
        setDebug("Assinatura sincronizada (status: " + (result.body.status || "?") + ").");
      } else {
        var detail = result.body && (result.body.message || result.body.error)
          ? (result.body.message || result.body.error)
          : "";
        var step = result.body && result.body.step ? " [" + result.body.step + "]" : "";
        setDebug("Falha na sincronização (HTTP " + result.status + step + "). " + detail);
      }
    })
    .catch(function (error) {
      setDebug("Erro de rede ao sincronizar: " + (error && error.message ? error.message : error));
    });
})();
