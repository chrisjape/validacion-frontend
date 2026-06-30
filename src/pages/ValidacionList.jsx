import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import api from "@/lib/api"

// Colores según el estado
const estadoStyles = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  aprobado: "bg-green-100 text-green-800 border-green-300",
  verificado: "bg-green-100 text-green-800 border-green-300",
  rechazado: "bg-red-100 text-red-800 border-red-300",
}

function EstadoBadge({ estado }) {
  if (!estado) return null
  return (
    <Badge className={estadoStyles[estado]} variant="outline">
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </Badge>
  )
}

export default function ValidacionList() {
  const [validaciones, setValidaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("/validacion")
      .then((response) => {
        setValidaciones(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error al cargar validaciones:", err)
        setError("No se pudo conectar con el servidor")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="p-8 text-slate-500">Cargando participantes...</div>
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-navy mb-1">Validación</h1>
      <p className="text-slate-500 mb-6">Lista de participantes pendientes de revisión</p>

      {/* Filtros */}
      <div className="flex gap-3 mb-4">
        <Input placeholder="Buscar participante..." className="max-w-xs" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="aprobado">Aprobado</SelectItem>
            <SelectItem value="rechazado">Rechazado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ID Participante</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead>Actualizado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validaciones.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">{v.id}</TableCell>
                <TableCell>{v.idParticipante}</TableCell>
                <TableCell><EstadoBadge estado={v.estado} /></TableCell>
                <TableCell className="text-slate-500">{v.creadoEn}</TableCell>
                <TableCell className="text-slate-500">{v.actualizadoEn}</TableCell>
                <TableCell>
                  <Link to={`/validacion/${v.id}`}>
                    <Button size="sm" className="bg-gold text-navy font-semibold hover:bg-gold/90">
                      Revisar
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}