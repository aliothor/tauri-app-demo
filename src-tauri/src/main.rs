// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu,Manager};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Create the command:
// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "打开");
    let close = CustomMenuItem::new("close".to_string(), "关闭");
    let submenu = Submenu::new("文件", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new()
        .add_submenu(submenu)
        .add_item(CustomMenuItem::new("hide", "关于"));

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![greet,close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
