import { useState } from "react"
import { Plus, Clock } from "lucide-react"

type SlotFormProps = {
  onSubmit: (data: { title: string; startTime: string; endTime: string }) => Promise<any>
  date: string
}

export default function SlotForm({ onSubmit, date }: SlotFormProps) {
  const [title, setTitle] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !startTime || !endTime) return
    setSubmitting(true)
    try {
      await onSubmit({
        title,
        startTime: `${date}T${startTime}:00`,
        endTime: `${date}T${endTime}:00`,
      })
      setTitle("")
      setStartTime("")
      setEndTime("")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-violet-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
          <Plus className="w-4 h-4 text-violet-600" />
        </div>
        <h3 className="text-zinc-900 font-semibold text-sm">Новый слот</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
            Название
          </label>
          <input
            type="text"
            placeholder="Например: Созвон с командой"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-violet-200 bg-violet-50/50 text-zinc-900 text-sm outline-none placeholder:text-zinc-400 transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
              Начало
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-violet-200 bg-violet-50/50 text-zinc-900 text-sm outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
              Конец
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-violet-200 bg-violet-50/50 text-zinc-900 text-sm outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || !title || !startTime || !endTime}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-600 text-white font-medium text-sm transition-all hover:bg-violet-700 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Создание...
          </span>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Создать слот
          </>
        )}
      </button>
    </form>
  )
}
