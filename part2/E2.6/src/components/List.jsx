
const List = ({persons, handleDeletePerson}) => {
    
    return (
        <>
        <h2>Numbers</h2>
        {
            persons.map((person) => 
                <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => {handleDeletePerson(person.id)}}>delete</button>
                </div>
            )
        }
        </>
    )
}

export default List