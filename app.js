// ---------- helpers ----------
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const isAndroid = () => /android/i.test(navigator.userAgent);

// Standalone detection (iOS + modern browsers)
const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)')?.matches ||
  window.navigator.standalone === true;

const isMobile = () => /iphone|ipad|ipod|android/i.test(navigator.userAgent);

// ---------- elements ----------
const installScreen = document.getElementById('installScreen');
const loginScreen = document.getElementById('loginScreen');
const iosCard = document.getElementById('iosCard');
const androidCard = document.getElementById('androidCard');

const installBtn = document.getElementById('installBtn');
const installHint = document.getElementById('installHint');

// ---------- screen switching ----------
function showInstall() {
  installScreen.style.display = 'flex';
  installScreen.setAttribute('aria-hidden', 'false');
  loginScreen.style.display = 'none';
  loginScreen.setAttribute('aria-hidden', 'true');

  // OS-specific card
  if (isIOS()) {
    iosCard.hidden = false;
    androidCard.hidden = true;
  } else {
    // Android + fallback mobile browsers
    iosCard.hidden = true;
    androidCard.hidden = false;
  }
}

function showLogin() {
  installScreen.style.display = 'none';
  installScreen.setAttribute('aria-hidden', 'true');
  loginScreen.style.display = 'flex';
  loginScreen.setAttribute('aria-hidden', 'false');
}

// ---------- routing rules ----------
// Mobile browser -> Install screen (stop)
// Desktop browser -> Login
// Mobile standalone (installed PWA) -> Login
function route() {
  const mobile = isMobile();
  const standalone = isStandalone();

  if (mobile && !standalone) showInstall();
  else showLogin();
}

// ---------- Android install prompt ----------
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (installBtn) {
    installBtn.disabled = false;
    installHint.hidden = true;
  }
});

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) {
    installHint.hidden = false;
    return;
  }

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;
  installBtn.disabled = true;
});

// Run
route();

// Re-route if display-mode changes
window.matchMedia?.('(display-mode: standalone)')?.addEventListener?.('change', route);