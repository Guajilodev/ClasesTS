// banking.ts

import readline from 'readline-sync';

// Definición de la interfaz de Usuario
interface User {
    username: string;
    password: string;
    balance: number;
}

// Inicialización de usuarios (puedes agregar más usuarios aquí)
let users: User[] = [
    { username: 'usuario1', password: 'password1', balance: 2000 },
    { username: 'usuario2', password: 'password2', balance: 2000 },
];

// Variable para almacenar al usuario actualmente logueado
let currentUser: User | null = null;

// Función para autenticar al usuario
function login(): void {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        const username = readline.question('Ingrese su nombre de usuario: ');
        const password = readline.question('Ingrese su contraseña: ', { hideEchoBack: true });

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            currentUser = user;
            console.log(`\nBienvenido, ${currentUser.username}!\n`);
            return;
        } else {
            attempts++;
            console.log(`Credenciales incorrectas. Intento ${attempts} de ${maxAttempts}.\n`);
        }
    }

    console.log('Ha excedido el número máximo de intentos. Su cuenta ha sido bloqueada.');
    process.exit(0);
}

// Función para mostrar el menú principal
function showMenu(): void {
    console.log('--- Menú Bancario ---');
    console.log('1. Depositar dinero');
    console.log('2. Retirar dinero');
    console.log('3. Ver saldo');
    console.log('4. Transferir dinero');
    console.log('5. Salir');
}

// Función para depositar dinero
function deposit(): void {
    const amountStr = readline.question('Ingrese la cantidad a depositar: ');
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
        console.log('Cantidad inválida. Por favor, ingrese un número positivo.\n');
        return;
    }

    currentUser!.balance += amount;
    console.log(`Depósito exitoso. Nuevo saldo: $${currentUser!.balance.toFixed(2)}\n`);
}

// Función para retirar dinero
function withdraw(): void {
    const amountStr = readline.question('Ingrese la cantidad a retirar: ');
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
        console.log('Cantidad inválida. Por favor, ingrese un número positivo.\n');
        return;
    }

    if (amount > currentUser!.balance) {
        console.log('Fondos insuficientes.\n');
        return;
    }

    currentUser!.balance -= amount;
    console.log(`Retiro exitoso. Nuevo saldo: $${currentUser!.balance.toFixed(2)}\n`);
}

// Función para ver el saldo
function viewBalance(): void {
    console.log(`Su saldo actual es: $${currentUser!.balance.toFixed(2)}\n`);
}

// Función para transferir dinero
function transfer(): void {
    const targetUsername = readline.question('Ingrese el nombre de usuario al que desea transferir: ');

    if (targetUsername === currentUser!.username) {
        console.log('No puede transferirse dinero a sí mismo.\n');
        return;
    }

    const targetUser = users.find(u => u.username === targetUsername);

    if (!targetUser) {
        console.log('El usuario destinatario no existe.\n');
        return;
    }

    const amountStr = readline.question('Ingrese la cantidad a transferir: ');
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount <= 0) {
        console.log('Cantidad inválida. Por favor, ingrese un número positivo.\n');
        return;
    }

    if (amount > currentUser!.balance) {
        console.log('Fondos insuficientes para la transferencia.\n');
        return;
    }

    currentUser!.balance -= amount;
    targetUser.balance += amount;

    console.log(`Transferencia exitosa de $${amount.toFixed(2)} a ${targetUser.username}.`);
    console.log(`Su nuevo saldo: $${currentUser!.balance.toFixed(2)}\n`);
}

// Función principal
function main(): void {
    console.log('=== Sistema Bancario en Línea ===\n');
    login();

    while (true) {
        showMenu();
        const choice = readline.question('Seleccione una opción: ');

        switch (choice) {
            case '1':
                deposit();
                break;
            case '2':
                withdraw();
                break;
            case '3':
                viewBalance();
                break;
            case '4':
                transfer();
                break;
            case '5':
                console.log('Gracias por usar el sistema bancario. ¡Hasta luego!');
                process.exit(0);
                break;
            default:
                console.log('Opción inválida. Por favor, seleccione una opción válida.\n');
        }
    }
}

main();
