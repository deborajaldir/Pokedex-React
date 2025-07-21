import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 10px;
  width: 130px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const PokeImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
`;

const Name = styled.p`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 16px;
`;

function PokemonCard({ name, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <Card onClick={handleClick}>
      <PokeImage src={image} alt={name} />
      <Name>{name}</Name>
    </Card>
  );
}

export default PokemonCard;
