// Função para validar o email
function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var soma, resto;
    soma = 0;
    for (var i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Função para validar a senha
function validarSenha(senha) {
    var temLetraMaiuscula = /[A-Z]/.test(senha);
    var temCaractereEspecial = /[@$!%*?&.,]/.test(senha);
    var temTamanhoMinimo = senha.length >= 8;
    return temLetraMaiuscula && temCaractereEspecial && temTamanhoMinimo;
}

document.getElementById('email').addEventListener('blur', function() {
    var emailInput = document.getElementById('email');
    var emailStatus = document.getElementById('emailStatus');

    if (validarEmail(emailInput.value)) {
        emailStatus.innerText = 'Email válido';
        emailStatus.style.color = 'green';
    } else {
        emailStatus.innerText = 'Email inválido';
        emailStatus.style.color = 'red';
    }
});

document.getElementById('cpf').addEventListener('blur', function() {
    var cpfInput = document.getElementById('cpf');
    var cpfStatus = document.getElementById('cpfStatus');

    if (validarCPF(cpfInput.value)) {
        cpfStatus.innerText = 'CPF válido';
        cpfStatus.style.color = 'green';
    } else {
        cpfStatus.innerText = 'CPF inválido';
        cpfStatus.style.color = 'red';
    }
});

document.getElementById('senha').addEventListener('blur', function() {
    var senhaInput = document.getElementById('senha');
    var senhaStatus = document.getElementById('senhaStatus');

    if (validarSenha(senhaInput.value)) {
        senhaStatus.innerText = 'Senha válida';
        senhaStatus.style.color = 'green';
    } else {
        senhaStatus.innerText = 'Senha inválida';
        senhaStatus.style.color = 'red';
    }
});

// Verificação final ao submeter o formulário
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    var formValido = true;
    var emailInput = document.getElementById('email');
    var cpfInput = document.getElementById('cpf');
    var senhaInput = document.getElementById('senha');
    var errorMessage = document.getElementById('error-message');

    // Limpa a mensagem de erro
    errorMessage.textContent = '';

    // Verifica os campos individualmente
    if (!validarEmail(emailInput.value)) {
        formValido = false;
        emailInput.focus();
    }

    if (!validarCPF(cpfInput.value)) {
        formValido = false;
        cpfInput.focus();
    }

    if (!validarSenha(senhaInput.value)) {
        formValido = false;
        senhaInput.focus();
    }

    // Se o formulário for válido, redireciona para outra página
    if (!formValido) {
        event.preventDefault();
    } else {
        event.preventDefault();
        window.location.href = "consultageral.html"; // Redireciona para a página principal
    }
});