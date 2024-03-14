import React from 'react';

function Modal({ active, setActive }) {
  const [loginData, setLoginData] = React.useState({ email: '', password: '' });
  const [registerData, setRegisterData] = React.useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = usersData.find(user => user.email === loginData.email && user.password === loginData.password);
    if (loggedInUser) {
      console.log('Вход выполнен успешно!');
      alert(`Добро пожаловать, ${loggedInUser.firstName} ${loggedInUser.lastName}!`);
      setActive(false);
    } else {
      console.log('Неверный e-mail или пароль');
      alert('Неверный e-mail или пароль. Попробуйте еще раз.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { ...registerData };
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...usersData, newUser]));
    console.log('Пользователь зарегистрирован:', newUser);
    alert(`Пользователь ${newUser.firstName} ${newUser.lastName} успешно зарегистрирован!`);
    setActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="E-mail" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          <input type="password" placeholder="Пароль" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          <button type="submit">Войти</button>
        </form>
        
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Имя" value={registerData.firstName} onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })} />
          <input type="text" placeholder="Фамилия" value={registerData.lastName} onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })} />
          <input type="email" placeholder="E-mail" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
          <input type="password" placeholder="Пароль" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
