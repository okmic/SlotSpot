import '@fastify/jwt'
import { IUser } from '../models/User.model'

declare module 'fastify' {
  interface FastifyInstance {
    jwt: {
      sign(payload: { id: string, role: IUser["role"], rate: IUser["rate"]}, options?: any): string
      verify(id: string): Promise<any>
    }
  }
  
  interface FastifyRequest {
    jwtVerify<T = { id: string, role: IUser["role"], rate: IUser["rate"] }>(): Promise<T>
  }
}

