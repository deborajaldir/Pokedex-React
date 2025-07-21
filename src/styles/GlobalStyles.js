import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: sans-serif;
    transition: background 0.3s, color 0.3s;
  }

  button {
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    cursor: pointer;
  }
`;
