import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import api from "@/lib/api"

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

export default function ValidacionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [validacion, setValidacion] = useState(null)
  const [pago, setPago] = useState(null)
  const [academica, setAcademica] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [procesando, setProcesando] = useState(false)

  const cargarTodo = () => {
    Promise.all([
      api.get(`/validacion/${id}`),
      api.get(`/validacion-pago/validacion/${id}`),
      api.get(`/validacion-academica/validacion/${id}`),
    ])
      .then(([resValidacion, resPago, resAcademica]) => {
        setValidacion(resValidacion.data)
        setPago(resPago.data)
        setAcademica(resAcademica.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error al cargar datos:", err)
        setError("No se pudo cargar la información del participante")
        setLoading(false)
      })
  }

  useEffect(() => {
    cargarTodo()
  }, [id])

  const handleAprobar = () => {
    setProcesando(true)
    api
      .put(`/validacion/${id}/aprobar`)
      .then((response) => {
        setValidacion(response.data)
        setProcesando(false)
      })
      .catch((err) => {
        console.error("Error al aprobar:", err)
        setProcesando(false)
      })
  }

  const handleRechazar = () => {
    setProcesando(true)
    api
      .put(`/validacion/${id}/rechazar`)
      .then((response) => {
        setValidacion(response.data)
        setProcesando(false)
      })
      .catch((err) => {
        console.error("Error al rechazar:", err)
        setProcesando(false)
      })
  }

  if (loading) {
    return <div className="p-8 text-slate-500">Cargando...</div>
  }

  if (error || !validacion) {
    return <div className="p-8 text-red-600">{error || "Participante no encontrado"}</div>
  }

  const palabrasClave = academica
    ? [
        academica.palabraClave1,
        academica.palabraClave2,
        academica.palabraClave3,
        academica.palabraClave4,
        academica.palabraClave5,
      ].filter(Boolean)
    : []

  return (
    <div className="p-8">
      <Link to="/" className="text-sm text-slate-500 hover:text-navy">
        ← Volver a la lista
      </Link>

      <div className="flex items-center justify-between mt-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-1">Revisar participante</h1>
          <p className="text-slate-500">
            Validación #{validacion.id} · Participante #{validacion.idParticipante}
          </p>
        </div>
        <EstadoBadge estado={validacion.estado} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Card de pago */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy text-lg">Comprobante de pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pago ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Monto</span>
                  <span className="font-medium">${pago.monto} MXN</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Fecha de pago</span>
                  <span className="font-medium">{pago.fechaPago}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-500">Archivo</span>
                  <span className="text-blue-600 underline text-sm">
                    {pago.comprobantePago}
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-500">Estado</span>
                  <EstadoBadge estado={pago.estadoPago} />
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400">Sin comprobante de pago registrado</p>
            )}
          </CardContent>
        </Card>

        {/* Card académica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy text-lg">Información académica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {academica ? (
              <>
                <div>
                  <span className="text-slate-500 text-sm">Título</span>
                  <p className="font-medium text-sm">{academica.titulo}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Resumen</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{academica.resumen}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-sm block mb-1">Palabras clave</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {palabrasClave.map((p) => (
                      <Badge key={p} variant="outline" className="text-navy border-navy/30">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400">Sin información académica registrada</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle className="text-navy text-lg">Decisión final</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="Observaciones generales sobre esta validación..." />
          <div className="flex gap-2">
            <Button
              onClick={handleAprobar}
              disabled={procesando}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              {procesando ? "Procesando..." : "Aprobar participante"}
            </Button>
            <Button
              onClick={handleRechazar}
              disabled={procesando}
              variant="outline"
              className="border-red-300 text-red-700 flex-1"
            >
              {procesando ? "Procesando..." : "Rechazar participante"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => navigate("/")}>
          Volver a la lista
        </Button>
      </div>
    </div>
  )
}