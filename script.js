document.getElementById('form-calorias').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores do formulário de calorias para exercício
    var peso = parseFloat(document.getElementById('peso').value);
    var altura = parseFloat(document.getElementById('altura').value);
    var idade = parseFloat(document.getElementById('idade').value);
    var sexo = document.getElementById('sexo').value;
    var treinamento = document.getElementById('treinamento').value;
    var batimento = parseFloat(document.getElementById('batimento').value);
    var tempoExercicio = parseFloat(document.getElementById('tempo-exercicio').value);
    var caloriasIngeridas = parseFloat(document.getElementById('calorias-ingeridas').value);

    // Verificar se os campos estão preenchidos corretamente
    if (isNaN(peso) || isNaN(altura) || isNaN(idade) || isNaN(batimento) || isNaN(tempoExercicio) || isNaN(caloriasIngeridas)) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    // Cálculo do metabolismo basal utilizando a fórmula de Harris-Benedict
    var metabolismoBasal;
    if (sexo === 'masculino') {
        metabolismoBasal = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
        metabolismoBasal = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }

    // Tabela de METs para atividades físicas
    const mets = {
        "corrida": 9.8,
        "musculacao": 3.5,
        "natacao": 7.0,
        "caminhada": 3.8,
        "ciclismo": 7.5,
        "hiit": 12.0,
        "danca": 6.0,
        "boxe": 8.0,
        "treinamento_funcional": 6.5,
        "yoga": 2.5,
        "pilates": 3.0,
        "escalada": 7.5,
        "futebol": 7.0,
        "basquete": 6.0,
        "volei": 4.0,
        "ski": 7.5,
        "surf": 5.0,
        "futevolei": 7.0,
        "beach tennis": 6.5
    };

    // Obter o MET da atividade selecionada
    var met = mets[treinamento];

    // Estimar calorias queimadas no exercício com base no MET
    var tempoExercicioHoras = tempoExercicio / 60; // Convertendo minutos para horas
    var caloriasExercicio = met * peso * tempoExercicioHoras;

    // Exibir os resultados parciais
    document.getElementById('metabolismo').innerText = metabolismoBasal.toFixed(2);
    document.getElementById('calorias-exercicio').innerText = caloriasExercicio.toFixed(2);

    // Cálculo de calorias gastas no trabalho
    var atividade = parseFloat(document.getElementById('atividade').value);
    var tempoTrabalho = parseFloat(document.getElementById('tempo-trabalho').value);

    var caloriasTrabalho = atividade * peso * tempoTrabalho;

    // Calcular calorias gastas totais
    var caloriasGastasTotais = metabolismoBasal + caloriasExercicio + caloriasTrabalho;
    var deficitCalorico = caloriasGastasTotais - caloriasIngeridas;

    // Exibir o resultado final
    document.getElementById('calorias-trabalho').innerText = caloriasTrabalho.toFixed(2);
    document.getElementById('calorias-exercicio').innerText = caloriasExercicio.toFixed(2);
    document.getElementById('calorias-gastas-totais').innerText = caloriasGastasTotais.toFixed(2);
    document.getElementById('deficit-calorico').innerText = deficitCalorico.toFixed(2);

    // Alterar a cor do déficit calórico baseado no valor
    var deficitElement = document.getElementById('deficit-calorico');
    if (deficitCalorico < 0) {
        deficitElement.style.color = 'red'; // Déficit negativo (vermelho)
    } else {
        deficitElement.style.color = 'green'; // Déficit positivo (verde)
    }
});

// Função de reset para limpar os campos e resultados
document.getElementById('reset-btn').addEventListener('click', function() {
    // Resetar os campos do formulário de calorias
    document.getElementById('form-calorias').reset();
    
    // Resetar os resultados na tela para '0'
    document.getElementById('metabolismo').innerText = '0';
    document.getElementById('calorias-exercicio').innerText = '0';
    document.getElementById('calorias-trabalho').innerText = '0';
    document.getElementById('calorias-gastas-totais').innerText = '0';
    document.getElementById('deficit-calorico').innerText = '0';

    // Resetar a cor do déficit calórico para o estado inicial (preto)
    document.getElementById('deficit-calorico').style.color = 'black';
});





