import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "@/components/Layout"
import ValidacionList from "@/pages/ValidacionList"
import ValidacionDetail from "@/pages/ValidacionDetail"
import Login from "@/pages/LoginPage"
import ParticipanteView from "@/pages/ParticipanteView"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout><ValidacionList /></Layout>} />
      <Route path="/validacion/:id" element={<Layout><ValidacionDetail /></Layout>} />
      <Route path="/participante" element={<Layout><ParticipanteView /></Layout>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App