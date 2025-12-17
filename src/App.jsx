import { AuthProvider } from "./context/AuthContext"
import MainRouter from "./routes/MainRouter"

function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  )
}

export default App
