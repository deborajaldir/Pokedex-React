# 🔍 Pokédex - React Avançado

Uma Pokédex interativa feita com **React**, que permite visualizar, buscar e explorar informações sobre diversos Pokémon, consumindo dados diretamente da **PokéAPI**.

---

## 🎯 Propósito da aplicação

O objetivo deste projeto foi aplicar conhecimentos avançados de React na construção de uma SPA (Single Page Application) realista, utilizando requisições assíncronas, roteamento, estilização com `styled-components`, testes automatizados e boas práticas de organização de código.

---

## 🧠 Funcionalidades

- ✅ **Listagem de Pokémon** com carregamento incremental
- ✅ **Busca por nome** com debounce e Enter
- ✅ **Busca por tipo**, utilizando um `<select>` com opções disponíveis
- ✅ **Botão "X" dentro da barra de busca** para limpar o campo facilmente
- ✅ **Página de detalhes** com habilidades, tipos e movimentos
- ✅ **Responsividade total** para dispositivos móveis
- ✅ **Testes automatizados** com cobertura das principais páginas e componentes

---

## 🛠️ Tecnologias Utilizadas

| Ferramenta | Motivo da escolha |
|-----------|-------------------|
| **React** | Biblioteca principal para construção da interface |
| **React Router** | Navegação entre páginas (SPA) |
| **Styled-components** | Estilização em CSS-in-JS, com escopo local e dinâmico |
| **PokéAPI** | Fonte de dados oficial e gratuita da franquia Pokémon |
| **Vitest** | Framework de testes moderno, rápido e com integração com Vite |
| **React Testing Library** | Abordagem de testes focada no comportamento do usuário |

---

## 💡 Decisões de planejamento e execução

- Optou-se por **Styled-components** para garantir modularidade de estilos e facilidade em aplicar temas.
- A busca por **tipo de Pokémon foi implementada com dropdown (`<select>`)** para evitar erros de digitação e melhorar a usabilidade.
- Adotado o uso de **debounce** para otimizar a performance das requisições durante a digitação.
- O botão "Limpar" foi substituído por um **ícone "X" clicável dentro da barra de busca**, tornando a interface mais moderna.
- Implementação de **testes automatizados** para garantir a confiabilidade das principais funcionalidades, especialmente as que envolvem busca e renderização de dados dinâmicos.
- O projeto foi estruturado com separação clara de **componentes e páginas**, seguindo boas práticas para facilitar manutenção e escalabilidade.

---

## 🚀 Como rodar o projeto localmente

### 🔄 Pré-requisitos
- Node.js v18 ou superior
- npm ou yarn

### 📦 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/deborajaldir/Pokedex-React.git
cd pokedex

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Executar os testes
npm run test
