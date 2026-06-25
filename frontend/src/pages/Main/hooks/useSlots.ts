import { useState, useCallback } from "react"
import toast from "react-hot-toast"
import type { Slot, SlotFormData } from "../../../pkg/types/slot"
import apiSlotService from "../../../pkg/api/api.slot.service"

export function useSlots() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSlots = useCallback(async (date: string) => {
    setLoading(true)
    try {
      const data = await apiSlotService.findByDate(date)
      setSlots(data)
    } catch {
      toast.error("Не удалось загрузить слоты")
    } finally {
      setLoading(false)
    }
  }, [])

  const createSlot = useCallback(async (data: SlotFormData) => {
    try {
      const slot = await apiSlotService.create(data)
      setSlots(prev =>
        [...prev, slot].sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )
      )
      toast.success("Слот создан")
      return slot
    } catch (e: any) {
      const message = e?.response?.data?.message || "Не удалось создать слот"
      toast.error(message)
      throw new Error(message)
    }
  }, [])

  const deleteSlot = useCallback(async (id: string) => {
    try {
      await apiSlotService.delete(id)
      setSlots(prev => prev.filter(s => s.id !== id))
      toast.success("Слот удалён")
    } catch (e: any) {
      const message = e?.response?.data?.message || "Не удалось удалить слот"
      toast.error(message)
      throw new Error(message)
    }
  }, [])

  return { slots, loading, fetchSlots, createSlot, deleteSlot }
}
