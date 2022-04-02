import {useState, useEffect, useRef} from 'react'
import RowSalaat from './RowSalaat'
import "./Salaat.scss"

export default function Salaat() {
  const [salaats, setSalaats] = useState([])
  const cityRef = useRef()

  const searchSalaat = (city = "Paris") => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=France&method=12`
    )
      .then((response) => response.json())
      .then((data) => {
        setSalaats(data.data.timings)
      });
  }

  useEffect(() => {

    searchSalaat()

  },[])

  const handleClick = () => {
    const cityToSearch = `${cityRef.current.value
      .charAt(0)
      .toUpperCase()}${cityRef.current.value.substring(1).toLowerCase()}`;
    searchSalaat(cityToSearch)
    window.localStorage.setItem("citySalaat", cityToSearch);
    cityRef.current.value=""
  }

  return (
    <div className="container">
      <h1>Horaires des prières</h1>
      <h2>{window.localStorage.getItem("citySalaat") ?? "Paris"}</h2>
      <form>
        <label
          htmlFor=""
          type="text"
          text="Chechez les horaires de prières pour : "
        >
          Cherchez une ville :
        </label>
        <input type="text" name="city" ref={cityRef} />
        <input className='button' type="button" value={"Validez"} onClick={handleClick} />
      </form>
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
