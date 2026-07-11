/**
 * Configuração de releases do Ponto Maré.
 * Atualize os arquivos no bucket Supabase e ajuste esta lista ao publicar novas versões.
 * Guia completo: RELEASES.md (nesta pasta).
 */
(function () {
  "use strict";

  var SUPABASE_PROJECT_REF = "nvfrjjoktlkpuuwxaxqv";
  var BUCKET = "pontomare-releases";

  function buildUrl(fileName) {
    return (
      "https://" +
      SUPABASE_PROJECT_REF +
      ".supabase.co/storage/v1/object/public/" +
      BUCKET +
      "/" +
      encodeURI(fileName)
    );
  }

  window.PONTO_MARE_RELEASES = {
    playStoreId: "com.gelsonschikorski.pontomare",
    supabaseBucket: BUCKET,
    releases: [
      {
        version: "1.0.0+18",
        date: "2026-07-11",
        latest: true,
        windows: {
          fileName: "PontoMare-Setup-1.0.0+18.exe",
          url: "https://nvfrjjoktlkpuuwxaxqv.supabase.co/storage/v1/object/public/pontomare-releases/PontoMare-Setup-1.0.0+18.exe"
        }
      }
    ]
  };
})();
