import React from "react"
import Option from "./Option"

export default function Question(props){

  const [objects, setObjects] = React.useState([])
  
  const [elements, setElements] = React.useState()

  const [picked, setPicked] = React.useState()

  const [answer, setAnswer] = React.useState(false)

  React.useEffect(() => {
    if(picked === props.correct_answer){
      if(answer === false){
        setAnswer(true)
      }
    }else{
      if(answer === true){
        setAnswer(false)
      }
    }
  }, [picked]) 

  React.useEffect(() => {
    props.answer(answer)
  }, [answer])

  React.useEffect(() => {
    setElements(objects.map(item =>
      <Option
        option={item.option}
        picked={item.picked}
        handleClick={handleClick}
        finish={item.finish}
        correct={item.correct}
        key={item.option}
        />
      ))
  }, [objects])

  React.useEffect(() => {
    
    const incorrect_answers = props.incorrect_answers
    
    const correctAnswer = props.correct_answer
    
    incorrect_answers.splice(Math.floor(Math.random() * (incorrect_answers.length + 1)), 0, correctAnswer)
   
      
      incorrect_answers.forEach(item => {
       setObjects(prevArray => (
      [...prevArray, {option: item, picked : false, finish : false, correct : props.correct_answer}]
    ))
    })
  }, [])

  function handleClick(option){
    if(!props.finish){
    const newArray = objects.map(item => {
      return item.option === option ? {...item, picked: true} : {...item, picked: false}
      })


    newArray.forEach(item => {
      if(item.picked === true){
        setPicked(item.option)
      }
    })
    
    setObjects(newArray)
    }
  }

  React.useEffect(() => {
    if(props.finish){
      const newArray = objects.map(item => ({...item, finish : true}))
    setObjects(newArray)
    }
  }, [props.finish])
  
  
  return (
    <div className="m-3">
      <h1 className="text-sm">{props.question}</h1>
      <div className="flex flex-wrap">
      {elements}
      </div>
    </div>
  )
}