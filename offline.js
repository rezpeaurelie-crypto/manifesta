if ('serviceWorker' in navigator && window.isSecureContext) {
  const worker = navigator.serviceWorker;
  const report = (status) => {
    document.documentElement.dataset.horsLigne = status;
    window.dispatchEvent(new Event('manifesta-offline-ready'));
  };
  const ready = () => {
    if (!worker.controller) return;
    report('pret');
    navigator.storage?.persist?.().catch(() => {});
  };
  worker.addEventListener('controllerchange', ready);
  worker.register('./sw.js').then((registration) => {
    const installing = registration.installing;
    installing?.addEventListener('statechange', () => {
      if (!worker.controller && installing.state === 'redundant') report('erreur');
    });
    ready();
  }).catch(() => {
    if (worker.controller) ready();
    else report('erreur');
  });
}
