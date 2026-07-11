(function () {
  "use strict";

  var RECOVERY_PAGE = "reset-password.html";
  var CONFIRMATION_PAGE = "email_confirmation.html";

  function getParams() {
    var hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    var queryParams = new URLSearchParams(window.location.search);
    return { hashParams: hashParams, queryParams: queryParams };
  }

  function getParam(name, params) {
    return params.hashParams.get(name) || params.queryParams.get(name);
  }

  function buildRedirectUrl(page) {
    return page + window.location.search + window.location.hash;
  }

  function isRecoveryFlow(params) {
    if (getParam("type", params) === "recovery") {
      return true;
    }

    var redirectTo = getParam("redirect_to", params) || "";
    return redirectTo.indexOf("reset-password") !== -1;
  }

  function route() {
    var params = getParams();
    var target = isRecoveryFlow(params) ? RECOVERY_PAGE : CONFIRMATION_PAGE;
    window.location.replace(buildRedirectUrl(target));
  }

  route();
})();
