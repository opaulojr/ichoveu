import Swal from 'sweetalert2';

const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = async (city) => {
  const URL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${city}`;

  try {
    const response = await fetch(URL);
    const result = await response.json();

    if (result.length > 0) return result;

    Swal.fire({
      title: 'Nenhuma cidade encontrada',
      text: 'Tente outro nome',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#0097db',
    });

    return [];
  } catch (error) {
    Swal.fire({
      title: 'Ocorreu um erro ao buscar as cidades',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#0097db',
    });

    return [];
  }
};

export const getWeatherByCity = async (cityURL) => {
  const URL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`;

  try {
    const response = await fetch(URL);
    const result = await response.json();

    const { temp_c: temp, condition } = result.current;
    return { temp, condition: condition.text, icon: condition.icon };
  } catch (error) {
    Swal.fire({
      title: 'Ocorreu um erro ao obter informações de tempo para a cidade',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#0097db',
    });

    return null;
  }
};
