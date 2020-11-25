export function html(html: string): Promise<void> {
  if (document.body) {
    document.body.innerHTML = html;
    return Promise.resolve();
  }

  return new Promise(resolve => {
    window.addEventListener('load', () => {
      document.body.innerHTML = html;
      resolve();
    }, false);
  });
}
