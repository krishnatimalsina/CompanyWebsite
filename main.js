// Filters and search for the Projects and Publications pages.
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-item]'));
  if (!items.length) return;

  var search = document.getElementById('search');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs a'));

  function apply() {
    var slug = location.hash.replace('#', '') || 'all';
    var q = search ? search.value.trim().toLowerCase() : '';
    var shown = 0;

    items.forEach(function (el) {
      var sectorOk = slug === 'all' || !el.dataset.sector || el.dataset.sector === slug;
      var textOk = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
      el.hidden = !(sectorOk && textOk);
      if (!el.hidden) shown++;
    });

    tabs.forEach(function (a) {
      a.classList.toggle('on', a.getAttribute('href') === '#' + slug);
    });
    if (count) count.textContent = shown + (shown === 1 ? ' result' : ' results');
    if (empty) empty.hidden = shown !== 0;
  }

  window.addEventListener('hashchange', apply);
  if (search) search.addEventListener('input', apply);
  apply();
})();
