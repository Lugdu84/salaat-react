import {useState, useEffect} from 'react'
import RowSalaat from './RowSalaat'
import "./Salaat.scss"

export default function Salaat() {
  const [salaats, setSalaats] = useState([])

  useEffect(() => {

    fetch("https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2")
    .then(response => response.json())
    .then(data => setSalaats(data.data.timings))

    console.log(salaats);

    return () => {

    }
  },[])

  return (
    <div className="container">
      <h1>Horaires des prières</h1>
      <div className="card-salaat">
        <RowSalaat name={"Fajr"} times={salaats?.Fajr} />
        <RowSalaat name={"Chourouq"} times={salaats?.Sunrise} />
        <RowSalaat name={"Dohr"} times={salaats?.Dhuhr} />
        <RowSalaat name={"Asr"} times={salaats?.Asr} />
        <RowSalaat name={"Maghrib"} times={salaats?.Maghrib} />
        <RowSalaat name={"Icha"} times={salaats?.Isha} />
      </div>
    </div>
  );
}
