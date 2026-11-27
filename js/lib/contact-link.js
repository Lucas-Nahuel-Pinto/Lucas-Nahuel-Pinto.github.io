/**
 * Anti-scraping contact address: it never appears in the HTML source, it is
 * assembled at runtime when the user asks for it.
 */
export function contactMailto() {
  return (
    ['pinto', 'lucas', 'nahuel'].join('.') +
    String.fromCharCode(64) +
    ['gmail', 'com'].join('.')
  );
}

/** Wires every [data-contact] element to open the assembled mailto address. */
export function initContactLinks(root = document) {
  root.querySelectorAll('[data-contact]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'mailto:' + contactMailto();
    });
  });
}
