import { useState } from 'react';
import { Application } from 'react-rainbow-components';
import { CheckboxToggle } from 'react-rainbow-components';
import { TodoList } from "./components/TodoList";


const themes = {
    light: {
        rainbow: {
            palette: {
                brand: "#fa9a4c",
                success: "#f2707a",
                warning: "#F7DB62",
                error: "#f2707a"
            }
        }
    },
    dark: {
        rainbow: {
            palette: {
                mainBackground: "#212121",
                brand: "#4dc9cb",
                success: "#98D38C",
                warning: "#F7DB62",
                error: "#f2707a"
            }
        }
    }
};

function App() {
    const [theme, setTheme] = useState('dark')
    const [value, setValue] = useState('true')
    const [backgroundColor, setBackgroundColor] = useState('#212121')

    function changeTheme() {
        if (theme === 'dark') {
            setTheme('light')
            setValue(false)
            setBackgroundColor('white')
        } else {
            setTheme('dark')
            setValue(true)
            setBackgroundColor('#212121')
        }
    }

    return (
        <Application className="app" style={{ background: backgroundColor }} theme={themes[theme]}>
            <CheckboxToggle
                style={{ position: 'absolute', top: 20, right: 100 }}
                label="Switch Theme"
                value={value}
                onChange={changeTheme}
            />
            <TodoList />
        </Application>
    );
}

export default App;

