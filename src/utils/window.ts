import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";

export function initAppWindowToolBar() {
  document.getElementById("titlebar-minimize")?.addEventListener("click", () => appWindow.minimize());
  document.getElementById("titlebar-maximize")?.addEventListener("click", () => appWindow.toggleMaximize());
  document.getElementById("titlebar-close")?.addEventListener("click", () => appWindow.close());
}

export function mockWindowLoading() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event end");

    setTimeout(() => {
      // invoke('close_splashscreen')
    }, 0);
  });
}
