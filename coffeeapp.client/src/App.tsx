import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loginData, setLoginData] = useState({ UserName: '', Password: '' });
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
            console.log(token)
        }
    }, [token]);

    const handleLogin = async () => {
        setError(null);  
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
                throw new Error('Неверный логин или пароль!');
            }

            const data = await response.json();
            setToken(data.token);
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        }
        catch (error) {
            setError(error.message);  
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
                <input
                    type="password"
                    name="Password"
                    placeholder="Пароль"
                    value={loginData.Password}
                    onChange={handleChange}
                />
                {error && <p className="error">{error}</p>}
                <button onClick={handleLogin}>Войти</button>


            </div>
        );
    } else {
        return (
            <div>
                <h1 id="tableLabel">Домашняя страница</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Placerat in id cursus mi pretium tellus duis. Urna tempor pulvinar vivamus fringilla lacus nec metus. Integer nunc posuere ut hendrerit semper vel class. Conubia nostra inceptos himenaeos orci varius natoque penatibus. Mus donec rhoncus eros lobortis nulla molestie mattis. Purus est efficitur laoreet mauris pharetra vestibulum fusce. Sodales consequat magna ante condimentum neque at luctus. Ligula congue sollicitudin erat viverra ac tincidunt nam. Lectus commodo augue arcu dignissim velit aliquam imperdiet. Cras eleifend turpis fames primis vulputate ornare sagittis. Libero feugiat tristique accumsan maecenas potenti ultricies habitant. Cubilia curae hac habitasse platea dictumst lorem ipsum. Faucibus ex sapien vitae pellentesque sem placerat in. Tempus leo eu aenean sed diam urna tempor.</p>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        );
    }
}

export default App;
