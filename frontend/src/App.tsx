import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import NotFound from "./pages/NotFound"
import MainPage from "./pages/Main"

function MainApp() {
  return <>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        success: {
          style: {
            background: "#34D399",
            color: "#FFFFFF",
          },
        },
        error: {
          style: {
            background: "#F43F5E",
            color: "#FFFFFF",
          },
        },
      }}
    />
    <div className="min-h-screen bg-white">
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  </>
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}