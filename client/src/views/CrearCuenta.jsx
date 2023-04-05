import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AgregarCuenta = () => {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        descripcion: "",
        monto: "",
        vencimiento: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post(`http://localhost:8000/api/cliente/${id}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response);
            setFormData({ descripcion: '', monto: '', vencimiento: '' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <p><a href="/dashboard" className="btn btn-primary">Inicio</a></p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <input type="text" className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="monto" className="form-label">Monto(Gs):</label>
                    <input type="number" className="form-control" id="monto" name="monto" value={formData.monto} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="vencimiento" className="form-label">Vencimiento:</label>
                    <input type="date" className="form-control" id="vencimiento" name="vencimiento" value={formData.vencimiento} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Agregar cuenta</button>
            </form>
        </div>
    );
};

export default AgregarCuenta;
