import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

// Datos de prueba — luego vendrán del backend
const participantes = [
  {
    id: "V-012",
    nombre: "María García López",
    institucion: "UACJ",
    pago: "verificado",
    academico: "pendiente",
    estado: "pendiente",
    fecha: "15/05/2026",
  },
  {
    id: "V-011",
    nombre: "Carlos Mendoza Ruiz",
    institucion: "UNAM",
    pago: "pendiente",
    academico: "pendiente",
    estado: "pendiente",
    fecha: "14/05/2026",
  },
  {
    id: "V-010",
    nombre: "Laura Torres Vega",
    institucion: "IPN",
    pago: "rechazado",
    academico: "verificado",
    estado: "rechazado",
    fecha: "12/05/2026",
  },
  {
    id: "V-009",
    nombre: "José Ramírez Flores",
    institucion: "TEC MTY",
    pago: "verificado",
    academico: "verificado",
    estado: "aprobado",
    fecha: "10/05/2026",
  },
]

// Colores según el estado
const estadoStyles = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  aprobado: "bg-green-100 text-green-800 border-green-300",
  verificado: "bg-green-100 text-green-800 border-green-300",
  rechazado: "bg-red-100 text-red-800 border-red-300",
}

function EstadoBadge({ estado }) {
  return (
    <Badge className={estadoStyles[estado]} variant="outline">
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </Badge>
  )
}

export default function ValidacionList() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
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
              <TableHead>Participante</TableHead>
              <TableHead>Institución</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead>Datos académicos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participantes.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>{p.nombre}</TableCell>
                <TableCell className="text-slate-500">{p.institucion}</TableCell>
                <TableCell><EstadoBadge estado={p.pago} /></TableCell>
                <TableCell><EstadoBadge estado={p.academico} /></TableCell>
                <TableCell><EstadoBadge estado={p.estado} /></TableCell>
                <TableCell className="text-slate-500">{p.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}