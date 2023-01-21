import  './src/lib/dayjs'
import { StatusBar} from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold,Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import { Home } from './src/pages/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold,Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Home />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"transparent"} //color o fundo transparente
        translucent //deixar ela flutuando sobre a aplicação
      />
    </>
  );
}
