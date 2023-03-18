// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tauri::command]
fn fetch_from_game_client_api(url: &str) -> String {
    return attohttpc::get(url)
        .danger_accept_invalid_certs(true)
        .send()
        .expect("ERROR")
        .text()
        .expect("ERROR")
}


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            fetch_from_game_client_api
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
