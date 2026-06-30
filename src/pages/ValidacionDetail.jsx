import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock data — luego vendrá del backend
const mockDetalle = {
  "V-012": {
    nombre: "María García López",
    institucion: "UACJ",
    correo: "maria.garcia@uacj.mx",
    pago: {
      monto: "1,500.00",
      comprobante: "comprobante_v012.pdf",
      fecha_pago: "14/05/2026",
      estado: "verificado",
    },
    academico: {
      titulo: "Diseño de sistema inteligente para monitoreo de puentes",
      resumen:
        "Este trabajo presenta el diseño de un sistema basado en sensores IoT para el monitoreo estructural de puentes vehiculares, con el objetivo de detectar fallas tempranas mediante análisis de vibraciones...",
      palabras_clave: ["IoT", "Monitoreo", "Sensores", "Estructuras", "Mantenimiento"],
      estado: "pendiente",
    },
  },
}

export default function ValidacionDetail() {
  const { id } = useParams()
  const data = mockDetalle[id] || mockDetalle["V-012"]

  const [obsPago, setObsPago] = useState("")
  const [obsAcademico, setObsAcademico] = useState("")

  return (
    <div className="p-8">
      <Link to="/" className="text-sm text-slate-500 hover:text-navy">
        ← Volver a la lista
      </Link>

      <h1 className="text-2xl font-bold text-navy mt-2 mb-1">Revisar participante</h1>
      <p className="text-slate-500 mb-6">{data.nombre} · {data.institucion}</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Card de pago */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy text-lg">Comprobante de pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Monto</span>
              <span className="font-medium">${data.pago.monto} MXN</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Fecha de pago</span>
              <span className="font-medium">{data.pago.fecha_pago}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-slate-500">Archivo</span>
              <a href="#" className="text-blue-600 underline text-sm">
                {data.pago.comprobante}
              </a>
            </div>
            <Separator />
            <Textarea
              placeholder="Observaciones sobre el pago..."
              value={obsPago}
              onChange={(e) => setObsPago(e.target.value)}
            />
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700 flex-1">Verificar pago</Button>
              <Button variant="outline" className="border-red-300 text-red-700 flex-1">Rechazar pago</Button>
            </div>
          </CardContent>
        </Card>

        {/* Card académica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy text-lg">Información académica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-slate-500 text-sm">Título</span>
              <p className="font-medium text-sm">{data.academico.titulo}</p>
            </div>
            <div>
              <span className="text-slate-500 text-sm">Resumen</span>
              <p className="text-sm text-slate-700 leading-relaxed">{data.academico.resumen}</p>
            </div>
            <div>
              <span className="text-slate-500 text-sm block mb-1">Palabras clave</span>
              <div className="flex gap-1.5 flex-wrap">
                {data.academico.palabras_clave.map((p) => (
                  <Badge key={p} variant="outline" className="text-navy border-navy/30">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <Textarea
              placeholder="Observaciones sobre los datos académicos..."
              value={obsAcademico}
              onChange={(e) => setObsAcademico(e.target.value)}
            />
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700 flex-1">Validar datos</Button>
              <Button variant="outline" className="border-red-300 text-red-700 flex-1">Rechazar datos</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-gold text-navy font-semibold hover:bg-gold/90">
          Guardar revisión
        </Button>
      </div>
    </div>
  )
}