const installScreen = document.getElementById('installScreen');
const loginScreen = document.getElementById('loginScreen');
const iosCard = document.getElementById('iosCard');
const androidCard = document.getElementById('androidCard');
const installBtn = document.getElementById('installBtn');

const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isAndroid = /android/i.test(navigator.userAgent);

const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

function showInstall() {
  installScreen.style.display = 'flex';
  loginScreen.style.display = 'none';

  iosCard.hidden = !isIOS;
  androidCard.hidden = !isAndroid;
}

function showLogin() {
  installScreen.style.display = 'none';
  loginScreen.style.display = 'flex';
}

if ((isIOS || isAndroid) && !isStandalone) {
  showInstall();
} else {
  showLogin();
}

/* Android install */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.disabled = false;
});

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt = null;
});