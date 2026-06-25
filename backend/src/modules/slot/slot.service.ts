import { and, lt, gte } from "drizzle-orm"
import { db } from "../../pkg/db"
import { slots } from "../../schemas/schemas"
import { ErrorBadRequest } from "../../pkg/errors/errors"

class SlotService {
  async getSlotsByDate(date: string) {
    const dayStart = new Date(date)
    const dayEnd = new Date(date)
    dayEnd.setDate(dayEnd.getDate() + 1)

    return db
      .select()
      .from(slots)
      .where(
        and(
          gte(slots.startTime, dayStart),
          lt(slots.startTime, dayEnd)
        )
      )
      .orderBy(slots.startTime)
  }

  async createSlot({ title, startTime, endTime }: {
    title: string
    startTime: string
    endTime: string
  }) {
    if (!title || !startTime || !endTime) {
      throw new ErrorBadRequest("title, startTime and endTime are required")
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    if (start >= end) {
      throw new ErrorBadRequest("startTime must be before endTime")
    }

    const overlapping = await db
      .select()
      .from(slots)
      .where(
        and(
          lt(slots.startTime, end),
          gte(slots.endTime, start)
        )
      )

    if (overlapping.length > 0) {
      throw new ErrorBadRequest("Slot overlaps with existing booking")
    }

    const [slot] = await db
      .insert(slots)
      .values({
        id: crypto.randomUUID(),
        title,
        startTime: start,
        endTime: end,
      })
      .returning()

    return slot
  }
}

export default new SlotService()