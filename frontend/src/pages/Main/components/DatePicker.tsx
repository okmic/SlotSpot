import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { format, parse } from "date-fns"
import { ru } from "date-fns/locale"
import { Calendar } from "lucide-react"
import "react-day-picker/dist/style.css"

type DatePickerProps = {
  value: string
  onChange: (date: string) => void
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const selected = parse(value, "yyyy-MM-dd", new Date())

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-violet-200 text-zinc-900 text-sm font-medium transition-all hover:border-violet-400 hover:shadow-lg hover:shadow-violet-100/50 focus:outline-none focus:ring-2 focus:ring-violet-200"
      >
        <Calendar className="w-4 h-4 text-violet-500 group-hover:text-violet-600 transition-colors" />
        <span>{format(selected, "d MMMM yyyy", { locale: ru })}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 left-0 z-50 animate-scaleIn">
            <div className="bg-white rounded-2xl border border-violet-100 shadow-xl shadow-violet-100/30 p-3">
              <style>{`
                .rdp-day_selected {
                  background-color: #7C3AED !important;
                  color: white !important;
                  border-radius: 8px !important;
                }
                .rdp-day_selected:hover {
                  background-color: #6D28D9 !important;
                }
                .rdp-day_today {
                  color: #7C3AED !important;
                  font-weight: 700 !important;
                }
                .rdp-day:hover:not(.rdp-day_selected) {
                  background-color: #F5F3FF !important;
                  border-radius: 8px !important;
                }
                .rdp-nav_button:hover {
                  background-color: #F5F3FF !important;
                }
                .rdp-caption_label {
                  font-size: 14px !important;
                  font-weight: 600 !important;
                  color: #18181B !important;
                }
                .rdp-head_cell {
                  font-size: 11px !important;
                  font-weight: 500 !important;
                  color: #A1A1AA !important;
                  text-transform: uppercase !important;
                  letter-spacing: 0.05em !important;
                }
              `}</style>
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={day => {
                  if (day) {
                    onChange(format(day, "yyyy-MM-dd"))
                    setOpen(false)
                  }
                }}
                locale={ru}
                showOutsideDays
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
