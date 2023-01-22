import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Feather} from '@expo/vector-icons'
import colors from 'tailwindcss/colors';

interface CheckBoxProps extends TouchableOpacityProps{
  checked?: boolean
  title?:string
}

export const CheckBox = ({ checked=false,title,...rest }: CheckBoxProps) => {


    return(
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row mb-2 items-center"
        {...rest}
      >
        {checked ? (
            <View className='h-8 w-8 transition-colors bg-zinc-800 rounded-lg items-center justify-center border-2 border-violet-900/70'>
              <Feather
                name='check'
                size={20}
                color={colors.violet[500]}
              />
            </View>
          )
        :
          (
            <View className='h-8 w-8 bg-zinc-800 rounded-lg' />
          )
        }
        <Text className='text-zinc-300 ml-3 font-semibold'>
            {title}
        </Text>

      </TouchableOpacity>
    );
}
