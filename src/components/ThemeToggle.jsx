import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px 20px',
        borderRadius: '8px',
        zIndex: 1000
      }}
    >
      {dark ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
    </button>
  );
}

export default ThemeToggle;
