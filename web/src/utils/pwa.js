// Utilidades para PWA
export const installPWA = () => {
  if ('serviceWorker' in navigator) {
    const deferredPrompt = window.deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó instalar la PWA');
        } else {
          console.log('Usuario rechazó instalar la PWA');
        }
        window.deferredPrompt = null;
      });
    } else {
      alert('La app ya está instalada o no está disponible para instalación');
    }
  } else {
    alert('Tu navegador no soporta PWA');
  }
};

export const isPWAInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
};

export const canInstallPWA = () => {
  return window.deferredPrompt !== null && window.deferredPrompt !== undefined;
};

