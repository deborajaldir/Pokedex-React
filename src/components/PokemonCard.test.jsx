import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { BrowserRouter } from 'react-router-dom';

test('renderiza o nome e imagem do pokémon', () => {
  render(
    <BrowserRouter>
      <PokemonCard
        name="pikachu"
        image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
      />
    </BrowserRouter>
  );

  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('25.png'));
});
