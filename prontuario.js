function calcularIdade() {
    const dataNascimento = document.getElementById("dataNascimento").value;
    const dataAtual = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = dataAtual.getFullYear() - nascimento.getFullYear();
    const mes = dataAtual.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && dataAtual.getDate() < nascimento.getDate())) {
        idade--;
    }

    document.getElementById("idade").textContent = `Idade: ${idade} anos`;
}

function buscarEndereco() {
    const cep = document.getElementById("cep").value.replace(/\D/g, '');

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => {
                alert("Erro ao buscar o endereço.");
                console.error(error);
            });
    } else {
        alert("CEP inválido.");
    }
}

function adicionarMedicamento() {
    const medicamentoInput = document.getElementById("medicamento");
    const medicamentoValue = medicamentoInput.value.trim();
    if (medicamentoValue) {
        const lista = document.getElementById("listaMedicamentos");
        
        // Cria um novo item de medicamento
        const item = document.createElement("div");
        item.className = "medicamento-item";
        item.textContent = medicamentoValue;

        // Adiciona o novo item à lista
        lista.appendChild(item);

        // Limpa o campo de entrada
        medicamentoInput.value = "";
    } else {
        alert("Por favor, insira o nome do medicamento.");
    }
}

function adicionarTratamento() {
    const tratamentoInput = document.getElementById("tratamento");
    const tratamentoValue = tratamentoInput.value.trim();
    if (tratamentoValue) {
        const lista = document.getElementById("listaTratamentos");
        
        // Cria um novo item de tratamento
        const item = document.createElement("div");
        item.className = "tratamento-item";
        item.textContent = tratamentoValue;

        // Adiciona o novo item à lista
        lista.appendChild(item);

        // Limpa o campo de entrada
        tratamentoInput.value = "";
    } else {
        alert("Por favor, insira o tratamento.");
    }
}


function addData() {
    const name = document.getElementById('nome').value;
    const nascimento = document.getElementById('nascimento').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const telefone = document.getElementById('telefone').value;
    const nomePai = document.getElementById('nomePai').value;
    const nomeMae = document.getElementById('nomeMae').value;
    const nomeResponsavel = document.getElementById('nomeResponsavel').value;
    const condicoesPassadas = document.getElementById('condicoesPassadas').value;
    const condicoesAtuais = document.getElementById('condicoesAtuais').value;
    const cirurgiasAnteriores = document.getElementById('cirurgiasAnteriores').value;
    const alergias = document.getElementById('alergias').value;
    const historicoFamiliar = document.getElementById('historicoFamiliar').value;
    const dataConsulta = document.getElementById('dataConsulta').value;
    const especialista = document.getElementById('especialista').value;
    const motivoConsulta = document.getElementById('motivoConsulta').value;
    const observacoesMedicas = document.getElementById('observacoesMedicas').value;
    const medicamento = document.getElementById('medicamento').value;
    const tratamento = document.getElementById('tratamento').value;
    const nota = document.getElementById('nota').value;
    
    let data = localStorage.getItem('formData');
    data = data ? JSON.parse(data) : [];
    
    data.push({ 
        name, 
        nascimento, 
        cep, 
        rua,
        numero, 
        complemento, 
        bairro,
        cidade, 
        estado,
        telefone, 
        nomePai, 
        nomeMae, 
        nomeResponsavel, 
        condicoesPassadas, 
        condicoesAtuais, 
        cirurgiasAnteriores, 
        alergias, 
        historicoFamiliar, 
        dataConsulta, 
        especialista, 
        motivoConsulta, 
        observacoesMedicas, 
        medicamento, 
        tratamento, 
        nota
    });
    
    localStorage.setItem('formData', JSON.stringify(data));
    
    alert('Dados adicionados com sucesso!');
    document.getElementById('addForm').reset();
}
function saveData() {
    addData();
    alert('Dados salvos com sucesso!');
}

// Função para pesquisar dados no localStorage
function searchData() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    let data = localStorage.getItem('formData');
    data = data ? JSON.parse(data) : [];
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm));
    
    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const result = document.createElement('div');
            result.innerHTML = `
                <strong>Nome:</strong> ${item.name}<br>
                <strong>Data de Nascimento:</strong> ${item.nascimento}<br>
                <strong>CEP:</strong> ${item.cep}<br>
                <strong>Rua:</strong> ${item.rua}, ${item.numero}<br>
                <strong>Complemento:</strong> ${item.complemento}<br>
                <strong>Bairro:</strong> ${item.bairro}<br>
                <strong>Cidade:</strong> ${item.cidade}<br>
                <strong>Estado:</strong> ${item.estado}<br>
                <strong>Telefone:</strong> ${item.telefone}<br>
                <strong>Nome do Pai:</strong> ${item.nomePai}<br>
                <strong>Nome da Mãe:</strong> ${item.nomeMae}<br>
                <strong>Nome do Responsável:</strong> ${item.nomeResponsavel}<br>
                <strong>Condições Passadas:</strong> ${item.condicoesPassadas}<br>
                <strong>Condições Atuais:</strong> ${item.condicoesAtuais}<br>
                <strong>Cirurgias Anteriores:</strong> ${item.cirurgiasAnteriores}<br>
                <strong>Alergias:</strong> ${item.alergias}<br>
                <strong>Histórico Familiar:</strong> ${item.historicoFamiliar}<br>
                <strong>Data da Consulta:</strong> ${item.dataConsulta}<br>
                <strong>Especialista:</strong> ${item.especialista}<br>
                <strong>Motivo da Consulta:</strong> ${item.motivoConsulta}<br>
                <strong>Observações Médicas:</strong> ${item.observacoesMedicas}<br>
                <strong>Medicamento:</strong> ${item.medicamento}<br>
                <strong>Tratamento:</strong> ${item.tratamento}<br>
                <strong>Nota:</strong> ${item.nota}<br>
                <hr>
            `;
            resultsDiv.appendChild(result);
        });
    } else {
        resultsDiv.innerHTML = 'Nenhum resultado encontrado.';
    }
}