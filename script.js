document.getElementById("form-calorias").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("resultado").innerText = "Cálculo realizado com sucesso!";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
