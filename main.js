// Filters, search and "Show more" for the Projects and Publications pages.
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-item]'));
  if (!items.length) return;

  var search = document.getElementById('search');
  var year = document.getElementById('year');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var more = document.getElementById('more');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs a'));

  var PAGE = 24;
  var limit = more ? PAGE : Infinity;

  function apply(reset) {
    if (reset && more) limit = PAGE;

    var slug = location.hash.replace('#', '') || 'all';
    var q = search ? search.value.trim().toLowerCase() : '';
    var y = year ? year.value : '';
    var matched = [];

    items.forEach(function (el) {
      var sectorOk = slug === 'all' || !el.dataset.sector || el.dataset.sector === slug;
      var yearOk = !y || el.dataset.year === y;
      var textOk = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
      if (sectorOk && yearOk && textOk) matched.push(el);
      el.hidden = true;
    });

    matched.forEach(function (el, i) { el.hidden = i >= limit; });

    var shown = Math.min(matched.length, limit);
    tabs.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + slug); });
    if (count) count.textContent = matched.length === 0 ? '' :
      (shown < matched.length ? 'Showing ' + shown + ' of ' + matched.length : matched.length + (matched.length === 1 ? ' result' : ' results'));
    if (empty) empty.hidden = matched.length !== 0;
    if (more) {
      more.hidden = matched.length <= limit;
      more.textContent = 'Show more (' + (matched.length - limit) + ' left)';
    }
  }

  window.addEventListener('hashchange', function () { apply(true); });
  if (search) search.addEventListener('input', function () { apply(true); });
  if (year) year.addEventListener('change', function () { apply(true); });
  if (more) more.addEventListener('click', function () { limit += PAGE; apply(false); });
  apply(true);
})();