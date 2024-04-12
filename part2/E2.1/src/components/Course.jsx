const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
  

const Content = ({ parts }) => {
    return (
        <>
            {
                parts.map((part) => <Part part={part} key={part.id} />)
            }    
        </>
    )
  
}

const Course = ({course}) => {
    const totalSum = course.parts.reduce((accumulator, currentCourse) => accumulator + currentCourse.exercises,0)
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={totalSum} />
        </div>
    )
}

export default Course
