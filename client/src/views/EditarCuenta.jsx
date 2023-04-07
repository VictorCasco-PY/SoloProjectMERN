import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditarCuenta = () => {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const { id, idCuenta } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cliente/${id}/cuentas/${idCuenta}`)
      .then((res) => {
        const cuenta = res.data;
        console.log(res.data);
        setDescripcion(cuenta.descripcion);
        setMonto(cuenta.monto);
        setVencimiento(cuenta.vencimiento);
      })
      .catch((err) => console.error(err));
  }, [id, idCuenta]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/cliente/${id}/cuentas/${idCuenta}`, {
        descripcion,
        monto,
        vencimiento,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/cliente/${id}/detalle`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <a href={`/cliente/${id}/detalle`} className="btn btn-primary mb-2">
        {" "}
        Atras
      </a>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="monto" className="form-label">Monto</label>
          <input
            type="number"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="vencimiento" className="form-label">Vencimiento</label>
          <input
            type="date"
            id="vencimiento"
            value={vencimiento}
            onChange={(e) => setVencimiento(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </div>
      </form>
    </>
  );
};

export default EditarCuenta;
