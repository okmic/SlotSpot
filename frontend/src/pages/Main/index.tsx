import { useEffect, useState } from "react"
import DatePicker from "./components/DatePicker"
import SlotForm from "./components/SlotForm"
import SlotList from "./components/SlotList"
import { useSlots } from "./hooks/useSlots"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

function todayString() {
  return format(new Date(), "yyyy-MM-dd")
}

export default function MainPage() {
  const [date, setDate] = useState(todayString())
  const { slots, loading, fetchSlots, createSlot, deleteSlot } = useSlots()

  useEffect(() => {
    fetchSlots(date)
  }, [date])

  const formattedDate = format(new Date(date), "d MMMM yyyy", { locale: ru })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-violet-50/30">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">SlotSpot</h1>
              <p className="text-zinc-500 text-sm">Бронирование встреч и звонков</p>
            </div>
          </div>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <DatePicker value={date} onChange={setDate} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <SlotForm date={date} onSubmit={createSlot} />
          </div>

          <div className="lg:col-span-7">
            <div className="mb-4">
              <h3 className="text-zinc-900 font-semibold text-sm">
                Слоты за {formattedDate}
              </h3>
              <p className="text-zinc-400 text-xs mt-0.5">
                {slots.length} {slots.length === 1 ? "слот" : slots.length < 5 ? "слота" : "слотов"}
              </p>
            </div>
            <SlotList slots={slots} loading={loading} onDelete={deleteSlot} />
          </div>
        </div>
      </div>
    </div>
  )
}
