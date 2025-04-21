import React, { useState } from 'react'

const Tasks = () => {
  const [text,setText]=useState('')
  return (
    <div>
      <input style={{weight:'100%',height:'20px'}} onChange={(e)=>setText(e.target.value)} value={text}></input>
    </div>
  )
}

export default Tasks
