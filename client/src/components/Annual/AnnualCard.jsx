import { useState } from 'react';
import { useMutation } from '@apollo/client';

const AnnualForm = ({ onAdd }) => {
    const [annual, setAnnual] = useState({
        task: '', dateCompleted: '', completedBy: '', testValues: '', notes: '', procedureLocations: ''
    });

    // const [addAnnual, { loading, error }] = useMutation(ADD_ANNUAL);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnual((prevAnnual) => ({
            ...prevAnnual,
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
            <form className="form" 
            // onSubmit={submit}
            >
                <label className='label'>TASK:</label>
                <input className="input" type="text" name="task" value={annual.task} onChange={handleChange} require />
                <label className='label'>DATE COMPLETED:</label>
                <input className="input" type="text" name="dateCompleted" value={annual.dateCompleted} onChange={handleChange} require />
                <label className="label">COMPLETED BY:</label>
                <input className="input" type="text" name="completedBy" value={annual.completedBy} onChange={handleChange} require />
                <label className="label">TEST VALUES (If Applicable):</label>
                <input className="input" type="text" name="testValues" value={annual.testValues} onChange={handleChange} require />
                <label className="label">NOTES:</label>
                <input className="input" type="text" name="notes" value={annual.notes} onChange={handleChange} require />
                <label className="label">PROCEDURE LOCATIONS:</label>
                <input className="input" type="text" name="procedureLocations" value={annual.notes} onChange={handleChange} require />
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
                {/* <button className="button" type="submit">Add Annual</button> */}
            </form>
        </div>
    );
};

export default AnnualForm;