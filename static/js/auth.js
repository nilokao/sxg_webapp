function toggleAuthMode() {
    const authTitle = document.getElementById('auth-title');
    const authAction = document.getElementById('auth-action');
    const submitBtn = document.querySelector('.submit-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    const emailField = document.getElementById('email-field');
    const checkPassword = document.getElementById('password-check'); 
    const emailInput = emailField.querySelector('input[name="email"]');

    // Limpa mensagens de erro
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');

    if (authAction.value === 'login') {
        authAction.value = 'register';
        authTitle.textContent = 'Registrar';
        submitBtn.textContent = 'Registrar';
        toggleBtn.textContent = 'Voltar para a tela de login';
        emailField.style.display = 'block';       
        checkPassword.style.display = 'block';   
        emailInput.required = true;                 
        checkPassword.required = true;           
    } else {
        authAction.value = 'login';
        authTitle.textContent = 'Login';
        submitBtn.textContent = 'Entrar';
        toggleBtn.textContent = 'Não tem login? Registre-se';
        emailField.style.display = 'none';         
        checkPassword.style.display = 'none';     
        emailInput.required = false;             
        checkPassword.required = false;              
    }
}

function validateForm() {
    const action = document.getElementById('auth-action').value;
    const username = document.querySelector('input[name="username"]');
    const password = document.querySelector('input[name="password"]');
    const errorMessages = document.querySelectorAll('.error-message');

    // Reset all error messages
    errorMessages.forEach(msg => msg.style.display = 'none');

    let isValid = true;

    // Verificação do campo usuário
    if (!username.value.trim()) {
        showError(username, 'Por favor, preencha o campo de usuário.');
        isValid = false;
    }

    // Verificação do campo senha para o login
    const passwordValue = password.value.trim();
    if (!passwordValue) {
        showError(password, 'Por favor, preencha o campo de senha.');
        isValid = false;
    }

    if (action === 'register') {
        const passwordCheck = document.querySelector('input[name="password-check"]');
        const email = document.querySelector('input[name="email"]');

        // Verificação de critérios adicionais de senha no registro
        if (passwordValue.length < 8 || !/\d.*\d/.test(passwordValue)) {
            showError(password, 'A senha deve ter no mínimo 8 caracteres e pelo menos 2 números.');
            isValid = false;
        }

        // Verificação do campo email com regex
        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            showError(email, 'Por favor, preencha o campo de email.');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(email, 'Por favor, insira um email válido.');
            isValid = false;
        }

        // Verificação da confirmação de senha
        if (passwordValue !== passwordCheck.value.trim()) {
            showError(passwordCheck, 'As senhas não coincidem.');
            isValid = false;
        }
    }

    return isValid;
}

function showError(inputElement, message) {
    const errorMessage = inputElement.parentElement.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function togglePasswordVisibility(fieldId) {
    const passwordInput = document.querySelector(`#${fieldId} input`);
    const toggleBtn = document.querySelector(`#${fieldId} .toggle-password`);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '👁️‍🗨️'; // Ícone de olho fechado
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️'; // Ícone de olho aberto
    }
}