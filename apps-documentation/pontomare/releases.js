(function () {
  "use strict";

  function getConfig() {
    return window.PONTO_MARE_RELEASES || null;
  }

  function getLatestRelease(config) {
    if (!config || !Array.isArray(config.releases) || !config.releases.length) {
      return null;
    }
    return config.releases.find(function (release) {
      return release.latest;
    }) || config.releases[0];
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value) {
      el.textContent = value;
    }
  }

  function applyLatestDownload() {
    var config = getConfig();
    var latest = getLatestRelease(config);
    if (!latest) {
      return;
    }

    setText("latest-version", latest.version);
    setText("latest-date", latest.date);
    setText("latest-windows-filename", latest.windows && latest.windows.fileName);

    var windowsLink = document.getElementById("download-windows-latest");
    if (windowsLink && latest.windows) {
      windowsLink.href = latest.windows.url || "#";
      windowsLink.setAttribute(
        "download",
        latest.windows.fileName || ""
      );
    }

    var playStoreLink = document.getElementById("download-play-store");
    if (playStoreLink && config.playStoreId) {
      playStoreLink.href =
        "https://play.google.com/store/apps/details?id=" +
        encodeURIComponent(config.playStoreId);
    }
  }

  function applyHistoryDownloads() {
    var config = getConfig();
    if (!config || !Array.isArray(config.releases)) {
      return;
    }

    document.querySelectorAll("[data-release-version]").forEach(function (row) {
      var version = row.getAttribute("data-release-version");
      var release = config.releases.find(function (item) {
        return item.version === version;
      });
      if (!release || !release.windows) {
        return;
      }

      var link = row.querySelector("[data-release-download]");
      if (link) {
        link.href = release.windows.url || "#";
        link.setAttribute("download", release.windows.fileName || "");
      }
    });
  }

  function init() {
    applyLatestDownload();
    applyHistoryDownloads();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
