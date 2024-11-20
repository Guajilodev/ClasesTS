
import readline from 'readline-sync';

interface User {
    username: string;
    password: string;
    balance: currency[];
}

interface currency {
    id: string,
    code: string,
    name: string,
    balance: number,
    minimun?: number,
    maximun?: number,
}

// Inicialización de usuarios (puedes agregar más usuarios aquí)
let users: User[] = [
    {
        username: 'usuario1',
        password: 'password1',
        balance: [
            {
                id: '1',
                code: 'USD',
                name: 'Dollars',
                balance: 1000,
            },
            {
                id: '2',
                code: 'CLP',
                name: 'Pesos Chilenos',
                balance: 1000,
            },
            {
                id: '3',
                code: 'ARS',
                name: 'Pesos Argentinos',
                balance: 1000,
            },
            {
                id: '4',
                code: 'EUR',
                name: 'Euros',
                balance: 1000,
            },
            {
                id: '5',
                code: 'TRY',
                name: 'Lira Turca',
                balance: 1000,
            },
            {
                id: '6',
                code: 'GBP',
                name: 'Libras Esterlinas',
                balance: 1000,
            },
            {
                id: '7',
                code: 'VES',
                name: 'Bolívares',
                balance: 1000,
            },
        ]
    },
    {
        username: 'usuario2',
        password: 'password2',
        balance: [
            {
                id: '1',
                code: 'USD',
                name: 'Dollars',
                balance: 1000,
            },
            {
                id: '2',
                code: 'CLP',
                name: 'Pesos Chilenos',
                balance: 1000,
            },
            {
                id: '3',
                code: 'ARS',
                name: 'Pesos Argentinos',
                balance: 1000,
            },
            {
                id: '4',
                code: 'EUR',
                name: 'Euros',
                balance: 1000,
            },
            {
                id: '5',
                code: 'TRY',
                name: 'Lira Turca',
                balance: 1000,
            },
            {
                id: '6',
                code: 'GBP',
                name: 'Libras Esterlinas',
                balance: 1000,
            },
            {
                id: '7',
                code: 'VES',
                name: 'Bolívares',
                balance: 1000,
            },
        ]
    },
];

const currencies: currency[] = [
    {
        id: '1',
        code: 'USD',
        name: 'Dollars',
        balance: 1000,
    },
    {
        id: '2',
        code: 'CLP',
        name: 'Pesos Chilenos',
        balance: 1000,
    },
    {
        id: '3',
        code: 'ARS',
        name: 'Pesos Argentinos',
        balance: 1000,
    },
    {
        id: '4',
        code: 'EUR',
        name: 'Euros',
        balance: 1000,
    },
    {
        id: '5',
        code: 'TRY',
        name: 'Lira Turca',
        balance: 1000,
    },
    {
        id: '6',
        code: 'GBP',
        name: 'Libras Esterlinas',
        balance: 1000,
    },
    {
        id: '7',
        code: 'VES',
        name: 'Bolívares',
        balance: 1000,
    },
]

// Variable para almacenar al usuario actualmente logueado
let currentUser: User | null = null;
let currencyUserOut: currency | null = null;
let currencyUserIn: currency | null = null;


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

function showMenu(): void {
    console.log('--- Menú Exchange ---');
    currencies.forEach((currency: currency) => {
        let option: string = `${currency.id}. ${currency.name}`;
        console.log(option);
    });
}




function main(): void {
    console.log('=== Sistema Bancario en Línea ===\n');
    // login();
    showMenu();

    while (true) {

    }

}

main();