import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PokemonCard from '../components/PokemonCard';

// ✅ ESTILOS

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LoadButton = styled.button`
  display: block;
  margin: 30px auto 0;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// ✅ COMPONENTE

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [busca, setBusca] = useState('');
  const [filtroPor, setFiltroPor] = useState('nome');
  const [resultadosBusca, setResultadosBusca] = useState(null);
  const [tiposDisponiveis, setTiposDisponiveis] = useState([]);

  const [todosDoTipo, setTodosDoTipo] = useState([]);
  const [exibidosDoTipo, setExibidosDoTipo] = useState([]);
  const passoBuscaTipo = 10;
  const limit = 10;

  const fetchPokemons = async (offsetAtual) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetAtual}`);
    const data = await response.json();

    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return await res.json();
      })
    );

    setPokemons((prev) => {
      const idsAtuais = new Set(prev.map((p) => p.id));
      const novos = detailedData.filter((p) => !idsAtuais.has(p.id));
      return [...prev, ...novos];
    });
  };

  useEffect(() => {
    const fetchTipos = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/type');
      const data = await res.json();
      setTiposDisponiveis(data.results.map((tipo) => tipo.name));
    };

    fetchTipos();
    fetchPokemons(0);
  }, []);

  const handleLoadMore = () => {
    if (resultadosBusca) return;
    const novoOffset = offset + limit;
    setOffset(novoOffset);
    fetchPokemons(novoOffset);
  };

  const carregarMaisDoTipo = async (todos = todosDoTipo, startIndex = exibidosDoTipo.length) => {
    const nextSlice = todos.slice(startIndex, startIndex + passoBuscaTipo);

    const detalhes = await Promise.all(
      nextSlice.map(async (item) => {
        const res = await fetch(item.pokemon.url);
        return await res.json();
      })
    );

    setExibidosDoTipo((prev) => [...prev, ...detalhes]);
  };

  const handleBuscar = async () => {
    if (busca.trim() === '') return;

    setResultadosBusca(null);
    setTodosDoTipo([]);
    setExibidosDoTipo([]);

    if (filtroPor === 'nome') {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${busca.toLowerCase()}`);
        const data = await res.json();
        setResultadosBusca([data]);
      } catch (error) {
        setResultadosBusca([]);
      }
    }

    if (filtroPor === 'tipo') {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${busca.toLowerCase()}`);
        const data = await res.json();

        setTodosDoTipo(data.pokemon);
        carregarMaisDoTipo(data.pokemon, 0);
      } catch (error) {
        setExibidosDoTipo([]);
      }
    }
  };

  // 🧠 Debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (busca.trim() !== '') {
        handleBuscar();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [busca, filtroPor]);

  const limparBusca = () => {
    setBusca('');
    setResultadosBusca(null);
    setTodosDoTipo([]);
    setExibidosDoTipo([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBuscar();
    }
  };

  const listaParaExibir =
    resultadosBusca ?? (todosDoTipo.length > 0 ? exibidosDoTipo : pokemons);

  return (
    <Wrapper>
      <Title>Pokemons</Title>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <select
          value={filtroPor}
          onChange={(e) => {
            setFiltroPor(e.target.value);
            setBusca('');
          }}
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        >
          <option value="nome">Buscar por Nome</option>
          <option value="tipo">Buscar por Tipo</option>
        </select>

        {filtroPor === 'nome' ? (
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <input
              type="text"
              placeholder="Digite o nome"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                padding: '10px 35px 10px 10px',
                fontSize: '16px',
                borderRadius: '8px',
                width: '250px'
              }}
            />
            {busca && (
              <span
                onClick={limparBusca}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: 'gray'
                }}
              >
                ×
              </span>
            )}
          </div>
        ) : (
          <select
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              width: '250px'
            }}
          >
            <option value="">Selecione o tipo</option>
            {tiposDisponiveis.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleBuscar}
          style={{
            padding: '10px 16px',
            marginLeft: '10px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Buscar
        </button>
      </div>

      <CardGrid>
        {listaParaExibir.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
          />
        ))}
      </CardGrid>

      {!resultadosBusca && (
        todosDoTipo.length > 0 && exibidosDoTipo.length < todosDoTipo.length ? (
          <LoadButton onClick={() => carregarMaisDoTipo()}>
            Carregar mais
          </LoadButton>
        ) : (
          <LoadButton onClick={handleLoadMore}>
            Carregar mais
          </LoadButton>
        )
      )}
    </Wrapper>
  );
}

export default Home;