const installScreen = document.getElementById("installScreen");
const loginScreen = document.getElementById("loginScreen");
const iosCard = document.getElementById("iosCard");
const androidCard = document.getElementById("androidCard");

const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isAndroid = /android/i.test(navigator.userAgent);
const isMobile = isIOS || isAndroid;

const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

function showInstall() {
  installScreen.style.display = "flex";
  loginScreen.style.display = "none";
  iosCard.hidden = !isIOS;
  androidCard.hidden = !isAndroid;
}

function showLogin() {
  installScreen.style.display = "none";
  loginScreen.style.display = "flex";
}

if (isMobile && !isStandalone) showInstall();
else showLogin();

/* Android install */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");
const installHint = document.getElementById("installHint");

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.disabled = false;
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) {
    installHint.hidden = false;
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt = null;
});