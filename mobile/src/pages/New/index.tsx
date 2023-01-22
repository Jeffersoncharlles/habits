import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { Feather } from '@expo/vector-icons'
import { BackButton } from '../../components/BackButton';
import { CheckBox } from '../../components/CheckBox';

interface NewProps{

}

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']

export const New = ({ }: NewProps) => {
  const [weekDays, setWeekDays] = useState<number[]>([])

  const handleToggleWeekDay = (weekDayIndex:number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState =>prevState.filter(day=> day !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }

  }

    return(
      <View className='flex-1 bg-background px-8 pt-16'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackButton />
          <Text className='mt-6 text-zinc-200 font-extrabold text-3xl'>
            Criar Hábito
          </Text>
          <Text className='mt-6 text-zinc-400 font-extrabold text-base'>
            Qual seu comprometimento?
          </Text>
          <TextInput
            className='h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-zinc-200 focus:border-2 focus:border-violet-800'
            placeholder='ex.: Execícios,dormir bem, etc...'
            placeholderTextColor={colors.zinc[500]}
          />
          <Text
            className='font-semibold mt-4 mb-3 text-zinc-300 text-base'
          >
            Qual a recorrência
          </Text>
          {availableWeekDays.map((day, i) => (
            <CheckBox
              key={`${day}-${i}`}
              title={day}
              checked={weekDays.includes(i)}
              onPress={() => handleToggleWeekDay(i)}
            />
          ))}
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full h-14 flex-row items-center justify-center bg-green-700 rounded-lg mt-6"
          >
            <Feather
              name='check'
              size={20}
              color={colors.white}
            />
            <Text className='font-semibold text-base ml-2 text-white'>
              Confirmar
            </Text>
          </TouchableOpacity>


        </ScrollView>
      </View>
    );
}
