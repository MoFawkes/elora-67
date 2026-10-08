(function () {
  'use strict';

  var theme = window.theme || { routes: {}, strings: {} };

  /* Auto-submit forms (filters, sort, localization) */
  document.addEventListener('change', function (event) {
    var input = event.target.closest('[data-autosubmit]');
    if (input && input.form) input.form.submit();
  });

  /* Quantity steppers */
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-qty]');
    if (!button) return;
    var input = button.closest('[data-quantity]').querySelector('input');
    var min = parseInt(input.min || '0', 10);
    var next = (parseInt(input.value, 10) || 0) + parseInt(button.dataset.qty, 10);
    input.value = Math.max(min, next);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* Close mobile navigation with Escape */
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('[data-mobile-nav][open]').forEach(function (nav) {
      nav.removeAttribute('open');
      nav.querySelector('summary').focus();
    });
  });

  /* Toast */
  var toastTimer;
  function showToast(message) {
    var toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3000);
  }

  function updateCartCount() {
    return fetch(theme.routes.cart_url + '.js', { headers: { Accept: 'application/json' } })
      .then(function (res) { return res.json(); })
      .then(function (cart) {
        document.querySelectorAll('[data-cart-count]').forEach(function (el) {
          el.textContent = cart.item_count;
          el.hidden = cart.item_count === 0;
        });
      });
  }

  /* Product page */
  document.querySelectorAll('[data-product]').forEach(function (section) {
    var dataEl = section.querySelector('[data-product-json]');
    var form = section.querySelector('[data-product-form]');
    if (!dataEl || !form) return;

    var data = JSON.parse(dataEl.textContent);
    var select = form.querySelector('[data-variant-select]');
    var addButton = form.querySelector('[data-add-to-cart]');
    var priceEl = section.querySelector('[data-product-price]');
    var errorEl = form.querySelector('[data-form-error]');

    section.classList.add('has-js-picker');

    function setActiveMedia(mediaId) {
      if (!mediaId) return;
      section.querySelectorAll('[data-media-id]').forEach(function (el) {
        el.classList.toggle('is-active', el.dataset.mediaId === String(mediaId));
      });
      section.querySelectorAll('[data-thumb]').forEach(function (el) {
        el.classList.toggle('is-active', el.dataset.thumb === String(mediaId));
      });
    }

    function selectedOptions() {
      return Array.prototype.map.call(section.querySelectorAll('[data-option-index]'), function (fieldset) {
        var checked = fieldset.querySelector('input:checked');
        return checked ? checked.value : null;
      });
    }

    function onOptionChange() {
      var options = selectedOptions();
      section.querySelectorAll('[data-option-index]').forEach(function (fieldset, i) {
        fieldset.querySelector('[data-option-value]').textContent = options[i] || '';
      });

      var variant = data.variants.find(function (v) {
        return v.options.every(function (value, i) { return value === options[i]; });
      });

      if (!variant) {
        addButton.disabled = true;
        addButton.textContent = theme.strings.unavailable;
        return;
      }

      select.value = variant.id;
      priceEl.innerHTML = variant.price_html;
      addButton.disabled = !variant.available;
      addButton.textContent = variant.available ? theme.strings.addToCart : theme.strings.soldOut;
      setActiveMedia(variant.featured_media_id);

      var url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
    }

    section.querySelectorAll('[data-option-input]').forEach(function (input) {
      input.addEventListener('change', onOptionChange);
    });

    section.querySelectorAll('[data-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () { setActiveMedia(thumb.dataset.thumb); });
    });

    form.addEventListener('submit', function (event) {
      if (!window.fetch) return;
      event.preventDefault();
      errorEl.hidden = true;
      addButton.setAttribute('aria-busy', 'true');
      addButton.disabled = true;

      fetch(theme.routes.cart_add_url, {
        method: 'POST',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: new FormData(form)
      })
        .then(function (res) {
          return res.json().then(function (body) {
            if (!res.ok) throw new Error(body.description || body.message || theme.strings.error);
            return body;
          });
        })
        .then(function () {
          showToast(theme.strings.addedToCart);
          return updateCartCount();
        })
        .catch(function (err) {
          errorEl.textContent = err.message || theme.strings.error;
          errorEl.hidden = false;
        })
        .finally(function () {
          addButton.removeAttribute('aria-busy');
          addButton.disabled = false;
        });
    });
  });
})();
