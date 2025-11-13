const splashScreen = document.getElementById('splash-screen');
const tempoDeCarregamento = 2000; // 2000 milissegundos = 2 segundos

// A função será executada após o tempo definido
setTimeout(() => {
    // 1. Opcional: Adiciona a classe 'hidden' para iniciar a transição
    splashScreen.classList.add('hidden');

    // 2. Espera a transição do CSS terminar (0.5s) e esconde o elemento
    setTimeout(() => {
        splashScreen.style.display = 'none';
  
        // 4. Se fosse um *redirecionamento real* para outra página:
        window.location.href = 'login.html';
        

    }, 500); // 500ms é o tempo da transição 'opacity' no CSS

}, tempoDeCarregamento);