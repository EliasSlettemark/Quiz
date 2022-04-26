import React from 'react';
import Question from "./components/Question"

function App() {

  React.useEffect(() => {
    setMode(true)
    setRight(0)
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => makeQuestions(data.results))
  }, [])


  const [elements, setElements] = React.useState()

  const [objects, setObjects] = React.useState([])

  function makeQuestions(data){
    const newArray = []
    data.forEach(item => {
      newArray.push({
        question: item.question,
        incorrect_answers: item.incorrect_answers,
        correct_answer :item.correct_answer,
        answer: handleAnswer,
        finish: false,
        key: item.question
      })
    })

    setObjects(newArray) 
  }

  React.useEffect(() => {
    setElements(objects.map(item =>
      <Question 
        question={item.question}
        incorrect_answers={item.incorrect_answers}
        correct_answer={item.correct_answer}
        answer={handleAnswer}
        finish={item.finish}
        key={item.key}
     />
      ))
  }, [objects])

  let [right, setRight] = React.useState(0)

  function handleAnswer(answer){
    if(answer){
      setRight(prevState => prevState + 1)
    }else{
      setRight(prevState => prevState - 1)
    }
  }

  const [mode, setMode] = React.useState(true)

  function handleClick(){      setMode(false)
      checkAnswers()
  }

  function checkAnswers(){
      const newArray = objects.map(item => ({...item, finish : true}))
    setObjects(newArray)
  }
  
  return (
    <div className="min-h-screen">
      <div className="absolute lg:left-1/2 lg:translate-x-[-50%] lg:top-1/2 lg:translate-y-[-50%] flex flex-col items-center">
      <div className="max-w-[700px] border-4 border-black bg-[#BFCDB9]">{elements}
        </div>
        <button className="text-sm w-fit border-4 border-black rounded-full px-2 m-5" onClick={handleClick}>Show Answers</button>
      {!mode && <h1 className="text-sm">You got {right + 5}/5</h1>}
    </div>
    </div>
  );
}

export default App;