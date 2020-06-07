import React from 'react';

import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Main,
  Title,
  Description,
  Logo,
  Footer,
  Button,
  ButtonIcon,
  ButtonText,
} from './styles';

const Home = () => {
  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate('Points');
  }

  return (
    <Container source={require('../../assets/home-background.png')}>
      <Main>
        <Logo source={require('../../assets/logo.png')} />
        <Title>Seu marketplace de coleta de resíduos.</Title>
        <Description>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Description>
      </Main>

      <Footer>
        <Button onPress={handleNavigateToPoints}>
          <ButtonIcon>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
