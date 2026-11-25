(function () {
  function formatCount(n) {
    if (n >= 1000000) {
      var m = n / 1000000;
      return (m >= 10 ? Math.round(m) : m.toFixed(1)) + 'M+';
    }
    if (n >= 1000) return Math.round(n / 1000) + 'K+';
    return String(n);
  }

  fetch('https://api.github.com/repos/twcclegg/libphonenumber-csharp')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (data && typeof data.stargazers_count === 'number') {
        document.getElementById('stat-stars').textContent = data.stargazers_count.toLocaleString();
      }
    })
    .catch(function () {});

  fetch('https://azuresearch-usnc.nuget.org/query?q=packageid:libphonenumber-csharp&prerelease=false')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      var pkg = data && data.data && data.data[0];
      if (pkg && typeof pkg.totalDownloads === 'number') {
        document.getElementById('stat-downloads').textContent = formatCount(pkg.totalDownloads);
      }
    })
    .catch(function () {});
})();
