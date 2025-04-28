import { useEffect, useState } from 'react';
import './App.css';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loginData, setLoginData] = useState({ UserName: '', Password: '' });


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
            console.log(token);
        }
    }, [token]);



    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:7081/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: loginData.UserName,
                    Password: loginData.Password
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка входа');
            }

            const data = await response.json();
            setToken(data.token);
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        }
        catch (error) {
            console.error('Ошибка:', error);
            alert('Неверный логин или пароль');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "UserName" || name === "Password") {
            setLoginData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };




    if (!isAuthenticated) {
        return (
            <div>
                <h2>Добро пожаловать!</h2>
                <input
                    type="text"
                    name="UserName"
                    placeholder="Логин"
                    value={loginData.UserName}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="password"
                    name="Password"
                    placeholder="Пароль"
                    value={loginData.Password}
                    onChange={handleChange}
                />
                <br />
                <br />
                <button onClick={handleLogin}>Войти</button>
            </div>
        );
    } else {
        return (
            <div>
                <h1 id="tableLabel">Домашняя страница</h1>
                <button onClick={handleLogout}>Выйти</button>

            </div>
        );
    }
}

export default App;
