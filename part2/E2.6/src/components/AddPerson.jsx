
const AddPerson = ({handleSent, newName, setNewName, newNumber, setNewNumber}) => {
    return (
        <>
        <h2>Add a new</h2>
        <form onSubmit={handleSent}>
            <div>
            name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default AddPerson