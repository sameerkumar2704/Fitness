import { useEffect, useMemo, useState } from 'react'

import { Button } from './components/ui/button'

import { isBefore, isToday } from 'date-fns'
import clsx from 'clsx'

export function Calendar(){
    const getCurrentMonthCalendar = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // 0-based index (0 = January)
    
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
    
        let dates = [];
        let week = new Array(7).fill(null); // Create an empty week
    
        let startDayIndex = firstDay.getDay(); // Get the index of the first day (0 = Sunday)
        let dayCounter = 1;
    
        // Fill the first week (prefix empty slots before the first date)
        for (let i = 0; i < 7; i++) {
          if (i >= startDayIndex) {
            week[i] = new Date(year, month, dayCounter);
            dayCounter++;
          }
        }
        dates.push(week);
    
        // Fill the rest of the calendar
        while (dayCounter <= lastDay.getDate()) {
          week = new Array(7).fill(null);
          for (let i = 0; i < 7 && dayCounter <= lastDay.getDate(); i++) {
            week[i] = new Date(year, month, dayCounter);
            dayCounter++;
          }
          dates.push(week);
        }
    
        return { month: month + 1, year, weeks: dates };
      };
    
    
      const [currentCalender, setCalender] = useState(getCurrentMonthCalendar())
      const weeksDay = useMemo(() => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
      const months = useMemo(()=>['January', 'Feburary' ,'March' , 'April' , 'May' ,'June' , 'July' , 'Augus' ,'September' , 'Octobere', 'November' , 'December']);
      const [map , setMap] = useState({})
      const currentDate = useMemo(()=>new Date())
      console.log(map)
      return (
        <>
       
       
        <div className=' m-2 w-fit'>
        <div className=' flex justify-center'>
        <h1 className=' font-semibold'> { months[currentDate.getMonth()]+" "+currentDate.getFullYear()}</h1>
        </div>
          <div className='  border w-fit p-3 rounded-md  shadow-md'>
            <div className=' flex max-sm:gap-2 gap-3 text-gray-400  font-sans justify-evenly'>
              {
                weeksDay.map((day) => <h1 key={day}>{day}</h1>)
              }
            </div>
            <div className='  w-fit gap-4 max-sm:gap-2 grid grid-cols-7 '>
    
              {
                currentCalender.weeks.map((currWeek) => (
                  currWeek.map((curr) => {
                    if(!curr) return <h1 key={ curr}></h1>
                    const todayDate = new Date();
                    const date = todayDate.getDate()+'-'+todayDate.getDay()+'-'+todayDate.getMonth()
                    const calenderDate = curr.getDate()+'-'+curr.getDay()+'-'+curr.getMonth()
               
                  
                    if(map[calenderDate]) return <h1 className=' border-b-2 ' key={curr}>✔️</h1>
    
                    switch(date){
                      case calenderDate:
                      return <button className=' border-b-2 border-yellow-400' key={curr}>{curr != null ? curr.getDate() : ""}</button>
                      default :
                      return <button key = {curr} className=' border-b-2 border-white' onClick={()=>{
                        console.log(map)
                        setMap((curr)=>({...curr , calenderDate:1}))
                        map[calenderDate] = 1;
                      
                      }}>{curr != null ? curr.getDate() : ""}</button>
                    }
                  })
    
                ))
              }
    
    
            </div>
          </div>
    
    
        </div>
        </>
      )
}