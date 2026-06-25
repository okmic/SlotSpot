import { FastifyInstance } from 'fastify'
import slotController from './slot.controller'

export default class SlotModule {
    constructor(server: FastifyInstance) {
        this.getRoutes(server)
    }

    private getRoutes(server: FastifyInstance) {

        server.get('/api/slots', {
            handler: slotController.findByDate,
        })

        server.post('/api/slots', {
            handler: slotController.create,
        })
    }
}