/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';

function App() {
    const initialAppointments =
        JSON.parse(localStorage.getItem('appointments')) || [];
    const [appointments, setAppointments] = useState(initialAppointments);

    useEffect(() => {
        if (initialAppointments) {
            localStorage.setItem('appointments', JSON.stringify(appointments));
        } else {
            localStorage.setItem('appointments', JSON.stringify([]));
        }
    }, [appointments]);

    const addAppointment = (appointment) => {
        setAppointments([...appointments, appointment]);
    };

    const deleteAppointment = (appointmentId) => {
        const newAppointments = appointments.filter(
            (appointment) => appointment.id !== appointmentId
        );
        setAppointments(newAppointments);
    };

    const title =
        appointments.length === 0
            ? 'There are no appointments'
            : 'Administrate your appointments';

    return (
        <>
            <h1>Patients Administration</h1>
            <div className='container'>
                <div className='row'>
                    <div className='one-half column'>
                        <Form addAppointment={addAppointment} />
                    </div>
                    <div className='one-half column'>
                        <h2>{title}</h2>
                        {appointments.map((appointment) => (
                            <Appointment
                                key={appointment.id}
                                appointment={appointment}
                                deleteAppointment={deleteAppointment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
