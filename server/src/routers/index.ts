import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import z from 'zod'
import dayjs from "dayjs"

export async function appRoutes(app:FastifyInstance) {
//================================================================//
  app.post('/habits', async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      )
    })

    const { title, weekDays } = createHabitBody.parse(req.body)

    const today= dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at:today,
        weekDays: {
          create: weekDays.map(day => {
            return {
              week_day:day
            }
          })
        }
      }
    })
  }),

//================================================================//
  app.get('/day', async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date()//converter em data e nao string
    })

    const { date } = getDayParams.parse(req.query)

    const parsedDate = dayjs(date).startOf('day')

    const weekDay = parsedDate.get('day')

    const posableHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date, //menor ou igual

        },// onde eu tenho dias da semana
        weekDays: {
          some: {
            //pelo menos algum dia
            week_day: weekDay,

          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date:parsedDate.toDate()//buscando o dia onde a data seja igual a data que enviei
      },
      include: {
        dayHabit:true,//trazer todos os day habits que estão completados nesse dia
      }
    })

    const completedHabits = day?.dayHabit.map(completed => {
      return completed.id //id dos hábitos completados
    })

    return {
      posableHabits,
      completedHabits
    }
  })
//================================================================//

}
