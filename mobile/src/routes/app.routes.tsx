import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Habit } from '../pages/Habit';
import { Home } from '../pages/Home';
import { New } from '../pages/New';

const {Navigator,Screen} = createNativeStackNavigator()


export const AppRoutes = () => {

    return(
      <Navigator
        screenOptions={{
          headerShown:false
        }}
      >
          <Screen
            name='home'
            component={Home}
          />
          <Screen
            name='new'
            component={New}
          />
          <Screen
            name='habit'
            component={Habit}
          />
        </Navigator>
    );
}
