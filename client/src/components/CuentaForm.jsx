import React from 'react'
import { Field, Form, Formik } from 'formik';

const CuentaForm = ({ initialValues, onSubmit }) => {
    return (
        <div className='row'>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form className='row'>
                    <div className='col-2'>
                        <h3>Cuenta</h3>
                        <hr />
                        <label htmlFor="descripcion">Descripcion</label>
                        <Field type="text" name="descripcion" className="form-control mt-2" />


                        <label htmlFor="monto">Monto</label>
                        <Field type="number" name="monto" className="form-control mt-2" />


                        <label htmlFor="vencimiento">Vencimiento</label>
                        <Field type="date" name="vencimiento" className="form-control mt-2" />
                    </div>

                    <p>
                        <a href="/dashboard" className='btn btn-secondary mt-5 me-2'>Cancelar</a>
                        <button type="submit" className='btn btn-primary mt-5'>Agregar</button>
                    </p>
                </Form>
            </Formik>
        </div>
    )
}

export default CuentaForm;