import { FastifyRequest, FastifyReply } from "fastify"
import { successResponse } from "../../pkg/request/response.handler"
import { ErrorBadRequest } from "../../pkg/errors/errors"
import slotService from "./slot.service"

class SlotController {

  async findByDate(req: FastifyRequest, reply: FastifyReply) {
    const { date } = req.query as { date?: string }

    if (!date) {
      throw new ErrorBadRequest("date query parameter is required")
    }

    const slots = await slotService.getSlotsByDate(date)

    return successResponse("success", { slots }, reply)
  }

  async create(req: FastifyRequest<{ Body: { title: string, startTime: string, endTime: string } }>, reply: FastifyReply) {
    const { title, startTime, endTime } = req.body

    const slot = await slotService.createSlot({ title, startTime, endTime })

    return successResponse("success", { slot }, reply)
  }
}

export default new SlotController()