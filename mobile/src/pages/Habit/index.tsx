import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { ScrollView, Text, View } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { CheckBox } from '../../components/CheckBox';
import { ProgressBar } from '../../components/ProgressBar';

interface HabitProps{

}

interface Params{
    date:string
}

export const Habit = ({ }: HabitProps) => {
    const route = useRoute()
    const { date } = route.params as Params

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')


    return(
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView
                className=""
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text
                    className='text-zinc-400 mt-6 font-semibold text-base lowercase'
                >
                    {dayOfWeek}
                </Text>
                <Text
                    className='text-zinc-200  font-extrabold text-3xl uppercase'
                >
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={40} />
                <View className='mt-6'>
                    <CheckBox title='Beber 2lt água' checked={false} />
                    <CheckBox title='Caminhada' checked={true} />
                </View>

            </ScrollView>
        </View>
    );
}
