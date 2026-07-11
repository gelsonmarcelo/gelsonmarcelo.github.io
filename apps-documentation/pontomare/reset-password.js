(function () {
  "use strict";

  var SUPABASE_URL = "https://nvfrjjoktlkpuuwxaxqv.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_ISZnrRRnwGf0xQl_7wiKZA_lGDOOp7F";
  var MIN_PASSWORD_LENGTH = 6;

  var loadingView = document.getElementById("loading-view");
  var formView = document.getElementById("form-view");
  var successView = document.getElementById("success-view");
  var invalidView = document.getElementById("invalid-view");
  var formMessage = document.getElementById("form-message");
  var invalidMessage = document.getElementById("invalid-message");
  var resetForm = document.getElementById("reset-form");
  var submitButton = document.getElementById("submit-button");

  var supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      detectSessionInUrl: true,
      flowType: "pkce"
    }
  });

  var recoveryReady = false;
  var validationFinished = false;

  function showView(view) {
    [loadingView, formView, successView, invalidView].forEach(function (element) {
      element.classList.add("hidden");
    });
    view.classList.remove("hidden");
  }

  function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "message " + type;
    formMessage.classList.remove("hidden");
  }

  function hideFormMessage() {
    formMessage.classList.add("hidden");
    formMessage.textContent = "";
  }

  function showInvalidLink(message) {
    if (validationFinished) {
      return;
    }

    validationFinished = true;
    invalidMessage.textContent = message || "O link pode ter expirado ou já ter sido utilizado.";
    showView(invalidView);
  }

  function showRecoveryForm() {
    if (validationFinished) {
      return;
    }

    validationFinished = true;
    recoveryReady = true;
    showView(formView);
  }

  supabaseClient.auth.onAuthStateChange(function (event) {
    if (event === "PASSWORD_RECOVERY") {
      showRecoveryForm();
    }
  });

  async function validateRecoveryLink() {
    var hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    var searchParams = new URLSearchParams(window.location.search);
    var hasRecoveryHint =
      hashParams.get("type") === "recovery" ||
      searchParams.get("type") === "recovery" ||
      searchParams.has("code") ||
      hashParams.has("access_token");

    if (!hasRecoveryHint) {
      showInvalidLink("Abra esta página pelo link enviado no e-mail de redefinição de senha.");
      return;
    }

    await new Promise(function (resolve) {
      window.setTimeout(resolve, 500);
    });

    var sessionResult = await supabaseClient.auth.getSession();

    if (sessionResult.error) {
      showInvalidLink(sessionResult.error.message);
      return;
    }

    if (sessionResult.data.session) {
      showRecoveryForm();
      return;
    }

    window.setTimeout(async function () {
      if (validationFinished) {
        return;
      }

      var retryResult = await supabaseClient.auth.getSession();

      if (retryResult.error) {
        showInvalidLink(retryResult.error.message);
        return;
      }

      if (retryResult.data.session) {
        showRecoveryForm();
        return;
      }

      showInvalidLink("O link pode ter expirado ou já ter sido utilizado.");
    }, 3000);
  }

  resetForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    hideFormMessage();

    if (!recoveryReady) {
      showFormMessage("Aguarde a validação do link antes de continuar.", "error");
      return;
    }

    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password.length < MIN_PASSWORD_LENGTH) {
      showFormMessage(
        "A senha deve ter pelo menos " + MIN_PASSWORD_LENGTH + " caracteres.",
        "error"
      );
      return;
    }

    if (password !== confirmPassword) {
      showFormMessage("As senhas não coincidem.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Salvando...";

    var updateResult = await supabaseClient.auth.updateUser({ password: password });

    submitButton.disabled = false;
    submitButton.textContent = "Salvar nova senha";

    if (updateResult.error) {
      showFormMessage(
        updateResult.error.message || "Não foi possível atualizar a senha.",
        "error"
      );
      return;
    }

    await supabaseClient.auth.signOut();
    showView(successView);
  });

  validateRecoveryLink();
})();
