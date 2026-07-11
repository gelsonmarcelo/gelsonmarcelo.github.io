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

  // Implicit flow: o link do e-mail costuma abrir em outro dispositivo/navegador que o app
  // que chamou resetPasswordForEmail. PKCE exige o code verifier no mesmo browser — falha aqui.
  var supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      detectSessionInUrl: true,
      flowType: "implicit",
      persistSession: true,
    },
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
    clearSensitiveUrlParams();
    showView(formView);
  }

  function parseAuthParams() {
    var hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    var searchParams = new URLSearchParams(window.location.search);
    return { hashParams: hashParams, searchParams: searchParams };
  }

  function getParam(name, params) {
    return params.hashParams.get(name) || params.searchParams.get(name);
  }

  function hasRecoveryHint(params) {
    var type = getParam("type", params);
    return (
      type === "recovery" ||
      params.searchParams.has("code") ||
      params.hashParams.has("access_token") ||
      getParam("token_hash", params) !== null ||
      getParam("token", params) !== null
    );
  }

  function clearSensitiveUrlParams() {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  function waitForAuthEvent(timeoutMs) {
    return new Promise(function (resolve, reject) {
      var finished = false;
      var subscription = null;

      var timeoutId = window.setTimeout(function () {
        if (finished) {
          return;
        }
        finished = true;
        if (subscription) {
          subscription.unsubscribe();
        }
        reject(new Error("timeout"));
      }, timeoutMs);

      var authListener = supabaseClient.auth.onAuthStateChange(function (event, session) {
        if (finished) {
          return;
        }

        if (event === "PASSWORD_RECOVERY" || (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION"))) {
          finished = true;
          window.clearTimeout(timeoutId);
          authListener.data.subscription.unsubscribe();
          resolve(session);
        }
      });

      subscription = authListener.data.subscription;
    });
  }

  async function establishRecoverySession() {
    var params = parseAuthParams();

    var authError = getParam("error", params);
    var authErrorDescription = getParam("error_description", params);
    if (authError) {
      throw new Error(
        decodeURIComponent((authErrorDescription || authError).replace(/\+/g, " "))
      );
    }

    var accessToken = getParam("access_token", params);
    var refreshToken = getParam("refresh_token", params);
    if (accessToken && refreshToken) {
      var setSessionResult = await supabaseClient.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      if (setSessionResult.error) {
        throw setSessionResult.error;
      }
      if (setSessionResult.data.session) {
        return;
      }
    }

    var tokenHash = getParam("token_hash", params) || getParam("token", params);
    var type = getParam("type", params);
    if (tokenHash && type === "recovery") {
      var verifyResult = await supabaseClient.auth.verifyOtp({
        token_hash: tokenHash,
        type: "recovery",
      });
      if (verifyResult.error) {
        throw verifyResult.error;
      }
      if (verifyResult.data.session) {
        return;
      }
    }

    var code = getParam("code", params);
    if (code) {
      throw new Error(
        "Este link de redefinição usa código PKCE e precisa ser gerado em fluxo implícito para abrir no navegador."
      );
    }

    var sessionResult = await supabaseClient.auth.getSession();
    if (sessionResult.error) {
      throw sessionResult.error;
    }
    if (sessionResult.data.session) {
      return;
    }

    try {
      await waitForAuthEvent(8000);
      return;
    } catch (waitError) {
      if (waitError && waitError.message === "timeout") {
        throw new Error("Não foi possível validar o link de redefinição de senha.");
      }
      throw waitError;
    }
  }

  async function validateRecoveryLink() {
    var params = parseAuthParams();

    if (!hasRecoveryHint(params)) {
      showInvalidLink("Abra esta página pelo link enviado no e-mail de redefinição de senha.");
      return;
    }

    try {
      await establishRecoverySession();
      showRecoveryForm();
    } catch (error) {
      var message =
        (error && error.message) ||
        "O link pode ter expirado ou já ter sido utilizado.";
      showInvalidLink(message);
    }
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
    clearSensitiveUrlParams();
    showView(successView);
  });

  validateRecoveryLink();
})();
