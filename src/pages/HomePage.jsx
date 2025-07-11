import React,{useState} from 'react'
import Pomodoro from '../components/Pomodoro'
import Quote from '../components/Quote'
import To_do from '../components/To_do'
import Time from '../components/Time'
const HomePage = () => {
    return (
        <>
            <div className='header'>
                <Pomodoro />
            </div>
            <div className='middle'>
                <Quote />
            </div>
            <div className='list_box'>
                <Time />
                <To_do/>
            </div>
            <StyleSheet />
        </>
    )
}
const StyleSheet = () => {
    return <style>
        {`
    .header {
       height: auto;
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       gap: min(20rem, 15%);
       flex-wrap: wrap;
       background-color: var(--color-primary);
       border-radius: 25px;
       padding: 0.5rem;
       margin-bottom: 1.5rem;
    }

    .middle {
       margin-bottom: 2rem;
    }

    .list_box {
       width: 100%;
       display: flex;
       align-items: flex-start;
       justify-content: center;
       flex-direction: row;
       gap: 2%;
       flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        .list_box {
            flex-direction: column;
            align-items: center;
        }
    }
    `}
    </style>;
};

export default HomePage