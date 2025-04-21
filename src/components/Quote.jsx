import React from 'react'

const Quote = () => {
  return (
    <>
      <div className='quote'>
        The journey of thousand miles begins with a single step
      </div>
      <StyleSheet />
    </>
  )
}
const StyleSheet = () => {
  return <style>
    {`
    .quote{
       height:auto;
       width:100%;
       min-width:300px;
       padding:5px;
       display:flex;
       font-size:clamp(1rem,2vw,2.5rem);
       align-items:center;
       justify-content:center;
       background-color:var(--color-primary);
       margin-top:20px;
       margin-bottom:20px;
       border-radius:25px;
       font-weight:bold;
    }
      
      `}
  </style>
}

export default Quote

