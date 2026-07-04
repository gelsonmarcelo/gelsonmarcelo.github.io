(function () {
  var config = window.PONTO_MARE_CONFIG;
  if (!config) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var accessToken = params.get("access_token") || sessionStorage.getItem("pontomare_mp_access_token");
  var preapprovalId = sessionStorage.getItem("pontomare_mp_preapproval_id");
  var syncEndpoint = config.subscription && config.subscription.syncEndpoint;

  if (!syncEndpoint || !accessToken || !preapprovalId) {
    return;
  }

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
            body: body
          };
        });
    })
    .then(function (result) {
      if (result.ok) {
        sessionStorage.removeItem("pontomare_mp_preapproval_id");
        sessionStorage.removeItem("pontomare_mp_access_token");
        sessionStorage.removeItem("pontomare_mp_user_id");
      }
    })
    .catch(function () {
      // Webhook pode sincronizar depois; não bloqueia a tela de sucesso.
    });
})();
