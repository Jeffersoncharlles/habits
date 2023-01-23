import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from "./routers";

const app = Fastify()

app.register(cors, {
  origin:true
})
app.register(appRoutes)


app.listen({
  host: '0.0.0.0',
  port:3333
}).then(() => {
  console.log('HTTP Server running!')
})
