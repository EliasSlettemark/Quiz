import React from "react"

export default function Option(props){

  const [style, setStyle] = React.useState()

    React.useEffect(() => {
      if(props.option === props.correct && props.finish){
      setStyle("bg-[#4287f5]")
      }else if(props.picked){
        setStyle("bg-[#BFCDB9]")
    }else{
      setStyle("bg-white")
    }
    }, [props.finish, props.picked])
  
  return (
    <div onClick={() => props.handleClick(props.option)}>
      <small className={`${style} border-4 border-black rounded-full px-2 m-[1px] text-xs`}>{props.option}</small>
    </div>
  )
}