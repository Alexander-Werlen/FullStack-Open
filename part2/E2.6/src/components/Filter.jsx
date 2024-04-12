const Filter = ({filterWord, setFilterWord}) => {
    return (
        <>
        <h2>Phonebook</h2>
        filter shown with: <input value={filterWord} onChange={(e) => setFilterWord(e.target.value)}/>
        </>
    )
}
export default Filter