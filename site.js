/* Mojo — shared DE/EN toggle. Used by index.html and support.html. */
(function(){
  var body = document.body;

  function apply(lang){
    body.classList.toggle('en-mode', lang === 'en');
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });
    document.querySelectorAll('img.shot').forEach(function(img){
      var src = img.getAttribute('data-' + lang);
      if (src) img.src = src;
      var alt = img.getAttribute('data-alt-' + lang);
      if (alt) img.alt = alt;
    });
    try { localStorage.setItem('mojo_lang', lang); } catch(e) {}
  }

  document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
    btn.addEventListener('click', function(){
      apply(btn.getAttribute('data-lang-btn'));
    });
  });

  var saved = null;
  try { saved = localStorage.getItem('mojo_lang'); } catch(e) {}
  if (saved === 'de' || saved === 'en') apply(saved);
})();
