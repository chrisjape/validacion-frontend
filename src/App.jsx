import { Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import ValidacionList from "@/pages/ValidacionList"
import ValidacionDetail from "@/pages/ValidacionDetail"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ValidacionList />} />
        <Route path="/validacion/:id" element={<ValidacionDetail />} />
      </Routes>
    </Layout>
  )
}

export default App