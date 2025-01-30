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

    // Definir o fator de calorias por batimento, de acordo com o sexo
    var fatorCaloriasPorBatimento;
    if (sexo === 'masculino') {
        fatorCaloriasPorBatimento = 0.6309; // Fator para homens
    } else {
        fatorCaloriasPorBatimento = 0.4472; // Fator para mulheres
    }

    // Calcular a queima calórica baseada nos batimentos cardíacos (fórmula anterior)
    var tempoExercicioHoras = tempoExercicio / 60; // Convertendo minutos para horas
    var caloriasExercicioPorBatimentos = batimento * peso * tempoExercicioHoras * fatorCaloriasPorBatimento;

    // Tabela MET para diferentes atividades
    const mets = {
        "corrida": 8.2,
        "musculacao": 4.7,
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
        "tenis": 7.0,
        "surf": 5.0,
        "futevolei": 7.0,
        "beach tennis": 6.5
    };

    // Obter o MET da atividade selecionada
    var met = mets[treinamento];

    // Calcular o gasto calórico com base no MET
    var caloriasExercicioComMET = met * peso * tempoExercicioHoras;

    var fcMax = 220 - idade; 
    var intensidade = (batimento / fcMax) * 100; 

    if (intensidade >= 80) {
        caloriasExercicioComMET *= 1.2;  // Aumento de 20% se a intensidade for maior que 80% da FCmáx
    } else if (intensidade >= 60) {
        caloriasExercicioComMET *= 1.1;  // Aumento de 10% se a intensidade for entre 60% e 80% da FCmáx
    }

    // Exibir os resultados parciais
    document.getElementById('metabolismo').innerText = metabolismoBasal.toFixed(2);
    document.getElementById('calorias-exercicio').innerText = caloriasExercicioComMET.toFixed(2);

    // Cálculo de calorias gastas no trabalho
    var atividade = parseFloat(document.getElementById('atividade').value);
    var tempoTrabalho = parseFloat(document.getElementById('tempo-trabalho').value);

    var caloriasTrabalho = atividade * peso * tempoTrabalho;

    // Calcular calorias gastas totais
    var caloriasGastasTotais = metabolismoBasal + caloriasExercicioComMET + caloriasTrabalho;
    var deficitCalorico = caloriasIngeridas - caloriasGastasTotais;

    // Exibir o resultado final
    document.getElementById('calorias-trabalho').innerText = caloriasTrabalho.toFixed(2);
    document.getElementById('calorias-exercicio').innerText = caloriasExercicioComMET.toFixed(2);
    document.getElementById('calorias-gastas-totais').innerText = caloriasGastasTotais.toFixed(2);
    document.getElementById('deficit-calorico').innerText = deficitCalorico.toFixed(2);

    // Alterar a palavra 'déficit calórico' para 'superávit calórico' se o valor for positivo
    var deficitElement = document.getElementById('deficit-calorico');
    if (deficitCalorico < 0) {
        deficitElement.style.color = 'red'; 
        deficitElement.innerText = 'Déficit Calórico: ' + deficitCalorico.toFixed(2);
    } else {
        deficitElement.style.color = 'green';
        deficitElement.innerText = 'Superávit Calórico: ' + deficitCalorico.toFixed(2);
    }

    // Cálculo do IMC
    var alturaEmMetros = altura / 100; // Convertendo altura para metros
    var imc = peso / (alturaEmMetros * alturaEmMetros); // Fórmula do IMC

    // Exibir o IMC
    var imcElement = document.getElementById('imc');
    imcElement.innerText = imc.toFixed(2);

    // Exibir a descrição do IMC
    var imcDescricao = document.getElementById('imc-descricao');
    if (imc < 18.5) {
        imcElement.style.color = 'blue'; // Abaixo do peso
        imcDescricao.innerText = 'Abaixo do peso (IMC < 18.5)';
        imcDescricao.style.color = 'blue';
    } else if (imc >= 18.5 && imc <= 24.9) {
        imcElement.style.color = 'green'; // Peso normal
        imcDescricao.innerText = 'Peso normal (IMC entre 18.5 e 24.9)';
        imcDescricao.style.color = 'green';
    } else if (imc >= 25 && imc <= 29.9) {
        imcElement.style.color = 'orange'; // Sobrepeso
        imcDescricao.innerText = 'Sobrepeso (IMC entre 25 e 29.9)';
        imcDescricao.style.color = 'orange';
    } else if (imc >= 30 && imc <= 34.9) {
        imcElement.style.color = 'red'; // Obesidade grau 1
        imcDescricao.innerText = 'Obesidade grau 1 (IMC entre 30 e 34.9)';
        imcDescricao.style.color = 'red';
    } else if (imc >= 35 && imc <= 39.9) {
        imcElement.style.color = 'darkred'; // Obesidade grau 2
        imcDescricao.innerText = 'Obesidade grau 2 (IMC entre 35 e 39.9)';
        imcDescricao.style.color = 'darkred';
    } else {
        imcElement.style.color = 'purple'; // Obesidade grau 3
        imcDescricao.innerText = 'Obesidade grau 3 (IMC >= 40)';
        imcDescricao.style.color = 'purple';
    }
});

// Função de reset para limpar os campos e resultados
document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('form-calorias').reset();
    
    document.getElementById('metabolismo').innerText = '0';
    document.getElementById('calorias-exercicio').innerText = '0';
    document.getElementById('calorias-trabalho').innerText = '0';
    document.getElementById('calorias-gastas-totais').innerText = '0';
    document.getElementById('deficit-calorico').innerText = '0';
    document.getElementById('imc').innerText = '0'; // Limpar o IMC
    document.getElementById('imc-descricao').innerText = ''; // Limpar a descrição do IMC

    document.getElementById('deficit-calorico').style.color = 'black';
    document.getElementById('imc').style.color = 'black'; // Limpar a cor do IMC
    document.getElementById('imc-descricao').style.color = 'black'; // Limpar a cor da descrição
});






