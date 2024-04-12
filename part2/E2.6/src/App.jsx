import { useState, useEffect } from 'react'
import List from "./components/List"
import AddPerson from "./components/AddPerson"
import Filter from "./components/Filter"
import ErrorNotification from "./components/ErrorNotification"
import SuccessNotification from "./components/SuccessNotification"
import personServices from "./services/persons"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  useEffect(() => {
    personServices.getAll().then(persons => {
      setPersons(persons)
    }).catch(handleGeneralCatchError)
    
  }, [])
  
  const personsToShow = filterWord ? persons.filter((p) => p.name.toLowerCase().includes(filterWord.toLowerCase())) : persons

  const handleGeneralCatchError = () => {
    setErrorMessage('Error. Something went wrong.')
    setTimeout(() => {
      setErrorMessage('')
    },3000)
  }

  const handleSent = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}

    if(persons.map((p)=>p.name).includes(newName)){ //person already in list
      if(!window.confirm(`${newName} is already on the list. Do you want to update their last number with this new one?`)) return

      const idOfExistingPerson = persons.find(p => p.name === newName).id
      personServices.update(idOfExistingPerson, newPerson).then(newPersonResponse => {
        setPersons(persons.map(person => person.id !== idOfExistingPerson ? person : newPersonResponse))
        setNewName('')
        setNewNumber('')

        setSuccessMessage(`Updated ${newPersonResponse.name}'s number`)
        setTimeout(() => {
          setSuccessMessage(``)
        }, 2000)
      }).catch(handleGeneralCatchError)
    }

    personServices.create(newPerson).then(newPersonResponse => {
      setPersons(persons.concat(newPersonResponse))
      setNewName('')
      setNewNumber('')
      
      setSuccessMessage(`Added ${newPersonResponse.name}`)
      setTimeout(() => {
        setSuccessMessage(``)
      }, 2000)
    }).catch(handleGeneralCatchError)
  }

  const handleDeletePerson = (id) => {
    if(!window.confirm(`Are you sure you want to delete the person?`)) return

    personServices.deletePerson(id).then((delPerson) => {
      setPersons(persons.filter(person => person.id !== delPerson.id))
    }).catch(handleGeneralCatchError)
  }

  return (
    <div>
      <Filter filterWord={filterWord} setFilterWord={setFilterWord}></Filter>
      <AddPerson handleSent={handleSent} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}></AddPerson>
      <ErrorNotification message={errorMessage}></ErrorNotification>
      <SuccessNotification message={successMessage}></SuccessNotification>
      <List persons={personsToShow} handleDeletePerson={handleDeletePerson}></List>
    </div>
  )
}

export default App