// src/pages/Home.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

// 🧪 Mock do fetch para simular retorno da API
global.fetch = vi.fn((url) => {
  if (url.includes('pikachu')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 25,
          name: 'pikachu',
          sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          },
          types: [{ type: { name: 'electric' } }],
        }),
    });
  }

  // retorno padrão para lista ou outros
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [], // <- importante: evita erro no .map do Home.jsx
      }),
  });
});

test('realiza busca por nome e mostra o resultado', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/digite o nome/i);
  const select = screen.getByDisplayValue(/buscar por nome/i);

  await userEvent.selectOptions(select, ['nome']);
  await userEvent.type(input, 'pikachu');

  await waitFor(() => {
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    expect.stringContaining('25.png')
  );
});
