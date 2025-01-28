document.getElementById('form-calorias').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coletar os dados do formulário
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const treinamento = document.getElementById('treinamento').value;
    const batimento = parseInt(document.getElementById('batimento').value);
    const tempo = parseInt(document.getElementById('tempo').value);

    // Função para calcular o metabolismo basal
    function calcularMetabolismoBasal(peso, altura, idade, sexo) {
        if (idade >= 0 && idade <= 3) {
            if (sexo === 'masculino') {
                return (59.512 * peso) - 30.4;
            } else if (sexo === 'feminino') {
                return (58.317 * peso) - 31.1;
            }
        } else if (idade >= 3 && idade <= 10) {
            if (sexo === 'masculino') {
                return (22.706 * peso) + 504.3;
            } else if (sexo === 'feminino') {
                return (20.315 * peso) + 485.9;
            }
        } else if (idade >= 10 && idade <= 18) {
            if (sexo === 'masculino') {
                return (17.686 * peso) + 658.2;
            } else if (sexo === 'feminino') {
                return (13.384 * peso) + 692.6;
            }
        } else if (idade >= 18 && idade <= 30) {
            if (sexo === 'masculino') {
                return (15.057 * peso) + 692.2;
            } else if (sexo === 'feminino') {
                return (14.818 * peso) + 486.6;
            }
        } else if (idade >= 30 && idade <= 60) {
            if (sexo === 'masculino') {
                return (11.472 * peso) + 873.1;
            } else if (sexo === 'feminino') {
                return (8.126 * peso) + 845.6;
            }
        } else if (idade > 60) {
            if (sexo === 'masculino') {
                return (11.711 * peso) + 587.7;
            } else if (sexo === 'feminino') {
                return (9.082 * peso) + 658.5;
            }
        } else {
            return "Idade ou sexo inválido";  // Caso a idade ou sexo não estejam dentro dos limites válidos
        }
    }
        
    

    // Função para calcular as calorias queimadas durante o exercício
    function caloriasQueimadas(treinamento, tempo, batimento) {
        const baseCalorias = {
            'corrida': 10,
            'musculacao': 6,
            'natacao': 8,
            'caminhada': 4,
            'ciclismo': 7,
            'hiit': 12,
            'dança': 7,
            'boxe': 11,
            'treinamento_funcional': 9,
            'yoga': 3,
            'pilates': 4,
            'escalada': 8,
            'futebol': 9,
            'basquete': 10,
            'volei': 7,
            'ski': 10,
            'surf': 9,
            'futevolei': 9,
            'beach tennis': 8,
        };

        let caloriasPorMinuto = baseCalorias[treinamento] || 0;

        if (batimento > 120) {
            caloriasPorMinuto *= 1.2;
        } else if (batimento < 60) {
            caloriasPorMinuto *= 0.8;
        }

        return caloriasPorMinuto * tempo;
    }

    const metabolismoBasal = calcularMetabolismoBasal(peso, altura, idade, sexo);
    const caloriasExercicio = caloriasQueimadas(treinamento, tempo, batimento);
    const totalCalorias = metabolismoBasal + caloriasExercicio;

    // Atualizando os resultados na tela
    document.getElementById('metabolismo').textContent = metabolismoBasal.toFixed(2);
    document.getElementById('calorias-exercicio').textContent = caloriasExercicio.toFixed(2);
    document.getElementById('total-calorias').textContent = totalCalorias.toFixed(2);
});

// Evento de reset do formulário e resultados
document.getElementById('reset-btn').addEventListener('click', function() {
    // Limpar os campos de entrada do formulário
    document.getElementById('form-calorias').reset();

    // Limpar os resultados na tela
    document.getElementById('metabolismo').textContent = '';
    document.getElementById('calorias-exercicio').textContent = '';
    document.getElementById('total-calorias').textContent = '';
});


