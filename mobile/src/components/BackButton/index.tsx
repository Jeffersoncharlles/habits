import { TouchableOpacity } from 'react-native';
import { Feather} from '@expo/vector-icons'
import colors from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps{

}

export const BackButton = ({ }: BackButtonProps) => {
  const {goBack } = useNavigation()

  const handleBack = () => {
    goBack()
  }

    return(
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleBack}
      >
        <Feather
          name='arrow-left'
          size={32}
          color={colors.zinc[400]}
        />
      </TouchableOpacity>
    );
}
