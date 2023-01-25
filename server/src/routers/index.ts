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
    }) // faz 2 chamadas aqui

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
    }) ?? []

    return {
      posableHabits,
      completedHabits
    }
  })
//================================================================//
  app.patch('/habits/:id/toggle', async (req,res) => {
    const getToggleParams = z.object({
      id:z.string().uuid()
    })

    const { id } = getToggleParams.parse(req.params)
    const today = dayjs().startOf('day').toDate()


    let day = await prisma.day.findUnique({
      where: {
        date:today
      }
    })
    if (!day) {
      day = await prisma.day.create({
        data: {
          date:today,
        }
      })
    }

    //buscando ver se ja tinha marcado
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })
    if (dayHabit) {
      //remover a marcação de completo
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    } else {
      // completar o habito
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }



  })
  //================================================================//
  app.get('/summary', async (req, res) => {
    // Query mais complexa , mais condições , relacionamentos => SQL na mao (RAW)
    // PRISMA ORM : RAW SQL => SQLLite


    //SELECT D.id , D.date FROM days D  => alias D para trazer oque eu quero com apelidos
    // (sub query) , um query dentro de outra
    // DH => alias para DayHabits
    // contar quantos days tem em day_habits => ou seja
    // as completed => e o alias para saber qual e o resultado completado na segunda query
    // cast( as float) // converter de BigInt para float => SqlLite Cria em bigInt e o prisma tem um bug de nao entender
    // () novamente outra subQuery amount => trazer todos os hábitos que estão disponível que estão disponível nesse dia da semana
    // strftime função do SQLLite para trabalhar com datas
    // date/1000.0 => pq e mil milissegundos
    // fazer um join para trazer so os que estão disponível partir daquela date
    // AND H.created_at <= D.date => menor ou igual

    const summary = await prisma.$queryRaw`
      SELECT
        D.id ,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%W',D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `
    //SQL Date => epoch timestamp

    return summary

  })
  //================================================================//
}
