(function () {
  var hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  var queryParams = new URLSearchParams(window.location.search);

  function getParam(name) {
    return hashParams.get(name) || queryParams.get(name);
  }

  function show(id) {
    ['state-loading', 'state-success', 'state-error'].forEach(function (sectionId) {
      document.getElementById(sectionId).hidden = sectionId !== id;
    });
    document.title = id === 'state-success'
      ? 'E-mail confirmado — Ponto Maré'
      : id === 'state-error'
        ? 'Erro na confirmação — Ponto Maré'
        : 'Confirmação de e-mail — Ponto Maré';
  }

  var error = getParam('error');
  var errorDescription = getParam('error_description');
  var accessToken = getParam('access_token');
  var type = getParam('type');

  if (error) {
    show('state-error');
    if (errorDescription) {
      var detail = document.getElementById('error-detail');
      detail.textContent = decodeURIComponent(errorDescription.replace(/\+/g, ' '));
      detail.hidden = false;
    }
    return;
  }

  if (accessToken || type === 'signup' || type === 'email_change') {
    show('state-success');
    return;
  }

  if (type === 'recovery') {
    window.location.replace('reset-password.html' + window.location.search + window.location.hash);
    return;
  }

  show('state-success');
})();
