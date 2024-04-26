import { useState } from 'react';
import { useMutation } from '@apollo/client';

const EmergencyDriveForm = ({ onAdd }) => {
    const [emergencyDrive, setEmergencyDrive] = useState({
        dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
    });

    // const [addAnnual, { loading, error }] = useMutation(ADD_ANNUAL);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmergencyDrive((prevEmergencyDrive) => ({
            ...prevEmergencyDrive,
            [name]: value,
        }))
    };

    // const submit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await addAnnual({
    //             variables: {
    //                 ...annual,
    //             }
    //         });
    //     } catch (error) {
    //         console.error("and error has occured while adding an annual")
    //     }
    // };

    return (
        <div className='form-container'>
            <form className="annualForm" 
            // onSubmit={submit}
            >
                <label className='label'>DATE COMPLETED:</label>
                <input className="input" type="text" name="dateCompleted" value={emergencyDrive.dateCompleted} onChange={handleChange} require />
                <label className="label">REASON:</label>
                <input className="input" type="text" name="reason" value={emergencyDrive.reason} onChange={handleChange} require />
                <label className="label">WORK DESCRIPTION:</label>
                <input className="input" type="text" name="workDescription" value={emergencyDrive.workDescription} onChange={handleChange} require />
                <label className="label">PARTS USED:</label>
                <input className="input" type="text" name="notes" value={emergencyDrive.partsUsed} onChange={handleChange} require />
                <label className="label">COMPLETED BY:</label>
                <input className="input" type="text" name="completedBy" value={emergencyDrive.completedBy} onChange={handleChange} require />
                {/* {recipe.ingredients.map((ingredient, index) => (
                    <input
                        className="input"
                        key={index}
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleChange(index, e.target.value)}
                        required
                    />
                ))} */}
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EmergencyDriveForm;