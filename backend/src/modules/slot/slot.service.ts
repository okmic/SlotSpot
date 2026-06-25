import { and, lt, gte, eq } from "drizzle-orm"
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
      throw new ErrorBadRequest("Название, время начала и время окончания обязательны")
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new ErrorBadRequest("Неверный формат даты")
    }

    if (start >= end) {
      throw new ErrorBadRequest("Время начала должно быть раньше времени окончания")
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
      throw new ErrorBadRequest("Слот пересекается с уже существующей бронью")
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

  async deleteSlot(id: string) {
    const [existing] = await db
      .select()
      .from(slots)
      .where(eq(slots.id, id))

    if (!existing) {
      throw new ErrorBadRequest("Слот не найден")
    }

    const [deleted] = await db
      .delete(slots)
      .where(eq(slots.id, id))
      .returning()

    return deleted
  }
}

export default new SlotService()