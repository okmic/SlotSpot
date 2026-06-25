import '@fastify/jwt'
import { IUser } from '../models/User.model'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string, role: IUser["role"], rate: IUser["rate"] }
    user: { id: string, role: IUser["role"], rate: IUser["rate"] }
  }
}