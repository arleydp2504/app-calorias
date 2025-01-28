document.getElementById('form-calorias').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegando os valores dos campos do formulário
    let peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value);
    let idade = parseInt(document.getElementById('idade').value);
    let sexo = document.getElementById('sexo').value;
    let tipoExercicio = document.getElementById('treinamento').value;
    let batimento = parseInt(document.getElementById('batimento').value);
    let tempo = parseInt(document.getElementById('tempo').value);
    let caloriasIngeridas = parseFloat(document.getElementById('calorias-ingeridas').value);

    // Calculando o metabolismo basal (MB)
    let metabolismoBasal;
    if (sexo === 'masculino') {
        metabolismoBasal = 66 + (13.75 * peso) + (5 * altura) - (6.75 * idade);
    } else {
        metabolismoBasal = 655 + (9.56 * peso) + (1.85 * altura) - (4.68 * idade);
    }

    // Definindo o fator de queima calórica dependendo do tipo de exercício
    let caloriasExercicio;
    switch (tipoExercicio) {
        case 'corrida':
            caloriasExercicio = 0.1 * peso * tempo; // Exemplo para corrida
            break;
        case 'musculacao':
            caloriasExercicio = 0.05 * peso * tempo; // Exemplo para musculação
            break;
        // Adicione os outros exercícios de acordo com sua fórmula de queima calórica
        default:
            caloriasExercicio = 0;
    }

    // Calculando as calorias gastas totais
    let caloriasGastasTotais = metabolismoBasal + caloriasExercicio;

    // Calculando o déficit calórico (ou superávit, dependendo do caso)
    let deficitCalorico = caloriasGastasTotais - caloriasIngeridas;

    // Atualizando o resultado no HTML
    document.getElementById('metabolismo').textContent = metabolismoBasal.toFixed(2);
    document.getElementById('calorias-exercicio').textContent = caloriasExercicio.toFixed(2);
    document.getElementById('calorias-gastas-totais').textContent = caloriasGastasTotais.toFixed(2);
    document.getElementById('deficit-calorico').textContent = deficitCalorico.toFixed(2);

    // Aplicando a cor no déficit calórico
    let deficitElement = document.getElementById('deficit-calorico');
    if (deficitCalorico >= 0) {
        deficitElement.style.color = 'green'; // Deficit positivo, cor verde
    } else {
        deficitElement.style.color = 'red';   // Deficit negativo, cor vermelha
    }
});

// Resetando os campos do formulário
document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('form-calorias').reset();
    document.getElementById('metabolismo').textContent = '0';
    document.getElementById('calorias-exercicio').textContent = '0';
    document.getElementById('calorias-gastas-totais').textContent = '0';
    document.getElementById('deficit-calorico').textContent = '0';
    // Resetando a cor do texto para a cor padrão (preta)
    document.getElementById('deficit-calorico').style.color = 'black';
});




