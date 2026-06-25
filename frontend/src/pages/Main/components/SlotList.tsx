import { Clock, CalendarDays, Inbox, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import type { Slot } from "../../../pkg/types/slot"

type SlotListProps = {
  slots: Slot[]
  loading: boolean
  onDelete: (id: string) => Promise<void>
}

function formatTime(iso: string) {
  return format(new Date(iso), "HH:mm")
}

export default function SlotList({ slots, loading, onDelete }: SlotListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await onDelete(id)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-white border border-violet-100 rounded-2xl p-4 animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-violet-100 rounded-lg w-2/3" />
                <div className="h-3 bg-violet-50 rounded-lg w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-violet-300" />
        </div>
        <p className="text-zinc-500 text-sm font-medium">Нет слотов на этот день</p>
        <p className="text-zinc-400 text-xs mt-1">Создайте первый слот в форме слева</p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {slots.map((slot, i) => (
        <div
          key={slot.id}
          className="group bg-white border border-violet-100 rounded-2xl p-4 transition-all hover:border-violet-300 hover:shadow-md hover:shadow-violet-50 animate-slideUp"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0 group-hover:bg-violet-200 transition-colors">
              <CalendarDays className="w-4 h-4 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-zinc-900 font-medium text-sm truncate">
                {slot.title}
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="w-3 h-3 text-violet-400" />
                <p className="text-zinc-500 text-xs">
                  {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(slot.id)}
              disabled={deletingId === slot.id}
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 text-zinc-400 hover:text-rose-500 disabled:opacity-50"
            >
              {deletingId === slot.id ? (
                <span className="w-3.5 h-3.5 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
