import style from './App.module.scss';
import { useEffect, useState, useContext } from 'react'
import { info } from '../../Contexts/Info';
import WeatherTab from '../components/WeatherTab';
import NotificationScreen from '../NotificationScreen';


function App() {

  const { fact, weather } = useContext(info)
  const [date, setDate] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [screen, setScreen] = useState('home')

  function verifyDate() {
    const hms = new Date().toTimeString()
    const days = new Date().toDateString()
    setDate('')
    setDate(`${days} ${hms.split(" ")[0].substring(0, hms.split(" ")[0].length - 3)}`)
  }

  useEffect(() => {
    verifyDate()

    const interval = setInterval(() => {
      const milliseconds = Date.now()
      const seconds = Math.round(milliseconds / 1000) % 60
      setSeconds(seconds)

      if(seconds == 0) verifyDate()
    }, 1000)

    return () => {
      clearInterval(interval)
      setDate('')
      setSeconds(0)
    } 
  }, [])

  return (
    <>
      {
        screen == 'home' ?
        <div className={style.outer} >
          <div>
            <div>
              <h2>{`${date}:${seconds}`}</h2>
            </div>
            <div>
              <h3 ref={ref => ref ? ref.innerHTML = fact : null} ></h3>
            </div>
          </div>
          <div>
              <WeatherTab />
          </div>
        </div>
        :
        <NotificationScreen />
      }
      <button className={style.changeScreen} onClick={() => { setScreen(screen == "home" ? "notifications" : "home") }}>Exit</button>
    </>
  );
}

export default App;
