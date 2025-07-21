import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import { useTheme } from './context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import ThemeToggle from './components/ThemeToggle'; // botão de alternância

function App() {
  const { dark } = useTheme();

  return (
    <StyledThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <ThemeToggle /> {/* botão de tema visível em todas as rotas */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </StyledThemeProvider>
  );
}

export default App;

