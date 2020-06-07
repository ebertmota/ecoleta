import React, { useEffect, useState, ChangeEvent } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RnPickerSelect from 'react-native-picker-select';
import axios from 'axios';

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
  SelectItem,
  SelectContainer,
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => {
          return {
            label: uf.sigla,
            value: uf.sigla,
          };
        });
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        const cityNames = res.data.map((city) => {
          return {
            label: city.nome,
            value: city.nome,
          };
        });

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleUfSelect(value) {
    setSelectedUf(value);
  }

  function handleCitySelect(value) {
    setSelectedCity(value);
  }

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
    });
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
        <SelectContainer>
          <SelectItem>
            <RnPickerSelect
              onValueChange={(value) => handleUfSelect(value)}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroidContainer: {
                  justifyContent: 'center',
                },
                inputAndroid: { fontSize: 16, lineHeight: 60 },
              }}
              placeholder={{ label: 'Selecione o estado', value: 0 }}
              items={ufs}
              Icon={() => {
                return (
                  <FontAwesome name="angle-down" color="#6c6c80" size={20} />
                );
              }}
            />
          </SelectItem>
          <SelectItem>
            <RnPickerSelect
              onValueChange={(value) => handleCitySelect(value)}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroidContainer: {
                  justifyContent: 'center',
                },
                inputAndroid: { fontSize: 16, lineHeight: 60 },
              }}
              placeholder={{ label: 'Selecione a cidade', value: 0 }}
              items={cities}
              Icon={() => {
                return (
                  <FontAwesome name="angle-down" color="#6c6c80" size={20} />
                );
              }}
            />
          </SelectItem>
        </SelectContainer>

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
