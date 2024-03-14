const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementsByClassName('close')[0];
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Функция для чтения данных из JSON файла
function getUsersData() {
    return fetch('users.json')
        .then(response => response.json())
        .catch(error => console.error('Error reading users data:', error));
}

// Функция для записи данных в JSON файл
function saveUsersData(users) {
    fetch('users.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    })
    .catch(error => console.error('Error saving users data:', error));
}

openModal.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

registerBtn.addEventListener('click', async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const newUser = { firstName, lastName, username, password };

    const usersData = await getUsersData();
    usersData.push(newUser);
    saveUsersData(usersData);

    console.log('Registered user:', newUser);
});

loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usersData = await getUsersData();
    const user = usersData.find(user => user.username === username && user.password === password);

    if (user) {
        console.log('User logged in');
    } else {
        console.log('Invalid username or password');
    }
});
