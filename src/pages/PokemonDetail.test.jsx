import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetail from './PokemonDetail';

// 🧪 Mock do fetch com duas respostas diferentes
global.fetch = vi.fn((url) => {
  if (url.includes('ability')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          effect_entries: [
            {
              effect: 'Electric-type Pokémon move faster.',
              language: { name: 'en' },
            },
          ],
        }),
    });
  }

  return Promise.resolve({
    json: () =>
      Promise.resolve({
        name: 'pikachu',
        sprites: {
          front_default: 'https://pokeapi.co/media/sprites/pokemon/25.png',
        },
        types: [{ type: { name: 'electric' } }],
        abilities: [{ ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' } }],
        moves: [
          { move: { name: 'thunder-shock' } },
          { move: { name: 'quick-attack' } },
        ],
      }),
  });
});

test('renderiza os dados do pokémon corretamente', async () => {
  render(
    <MemoryRouter initialEntries={['/pokemon/pikachu']}>
      <Routes>
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('25.png'));
  expect(screen.getByText(/electric/i)).toBeInTheDocument();
  expect(screen.getByText(/static/i)).toBeInTheDocument();
  expect(screen.getByText(/thunder-shock/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();
});
