import { useEffect, useState } from "react"
import { MdOutlineCalendarToday } from "react-icons/md"

export default function NotFound() {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }, 3000)

    return () => {
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1
            className={`text-6xl lg:text-8xl font-black mb-4 tracking-tighter text-text-primary ${
              isGlitching ? "animate-pulse" : ""
            }`}
          >
            404
          </h1>

          <div className="space-y-3">
            <h2 className="text-xl lg:text-2xl font-semibold text-text-primary mb-2">
              Страница не найдена
            </h2>
            <p className="text-text-secondary text-sm lg:text-base max-w-md mx-auto">
              К сожалению, запрашиваемая страница не существует или была
              перемещена. Проверьте правильность URL или вернитесь на главную.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="px-3 py-1.5 rounded-lg bg-surface-secondary border border-primary-100">
            <code className="text-xs text-text-secondary font-mono">
              404 Not Found
            </code>
          </div>
          <div className="w-1 h-1 rounded-full bg-primary-300" />
          <div className="px-3 py-1.5 rounded-lg bg-surface-secondary border border-primary-100">
            <code className="text-xs text-text-secondary font-mono flex items-center gap-1">
              <MdOutlineCalendarToday className="text-xs" />
              SlotSpot
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}