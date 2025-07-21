import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Container = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;

const PokemonName = styled.h1`
  text-transform: capitalize;
  text-align: center;
`;

const Image = styled.img`
  display: block;
  margin: 1rem auto;
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: ${({ color }) => color || '#ccc'};
  color: #fff;
  padding: 5px 10px;
  border-radius: 8px;
  margin-right: 10px;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

function PokemonDetail() {
    const navigate = useNavigate();
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [habilidades, setHabilidades] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setPokemon(data);

            const habilidadesComDescricao = await Promise.all(
                data.abilities.map(async (item) => {
                    const res = await fetch(item.ability.url);
                    const detalhes = await res.json();

                    const descricao = detalhes.effect_entries.find(
                        (entry) => entry.language.name === 'en'
                    );

                    return {
                        nome: item.ability.name,
                        descricao: descricao ? descricao.short_effect : 'Descrição não encontrada',
                    };
                })
            );

            setHabilidades(habilidadesComDescricao);
        };

        fetchPokemon();
    }, [name]);

    if (!pokemon) return <p>Carregando...</p>;

    // 💡 Paleta de cores por tipo
    const typeColors = {
        grass: '#78C850',
        fire: '#F08030',
        water: '#6890F0',
        bug: '#A8B820',
        normal: '#A8A878',
        poison: '#A040A0',
        electric: '#F8D030',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        flying: '#A890F0'
    };

    return (
        <Container>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '10px 16px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    background: 'transparent',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                ← Voltar para a Home
            </button>
            <PokemonName>{pokemon.name}</PokemonName>
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} />

            <Section>
                <h2>Tipos</h2>
                {pokemon.types.map((type) => (
                    <Tag key={type.type.name} color={typeColors[type.type.name]}>
                        {type.type.name}
                    </Tag>
                ))}
            </Section>

            <Section>
                <h2>Habilidades</h2>
                {habilidades.map((habilidade) => (
                    <div key={habilidade.nome} style={{ marginBottom: '1rem' }}>
                        <strong style={{ textTransform: 'capitalize' }}>{habilidade.nome}:</strong>
                        <p>{habilidade.descricao}</p>
                    </div>
                ))}
            </Section>

            <Section>
                <h2>Movimentos</h2>
                <ul style={{ paddingLeft: '1.2rem' }}>
                    {pokemon.moves.slice(0, 5).map((move) => (
                        <li key={move.move.name}>{move.move.name}</li>
                    ))}
                </ul>
            </Section>
        </Container>
    );
}

export default PokemonDetail;
