'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { CloudSun, MapPin, MapPinned, Search } from "lucide-react";
import Loading from "@/components/loader/loading.js";
import CloudLoading from "@/components/loader/cloudLoading";
import SearchComponente from "@/components/search";
// import response from "@/components/data";

export default function Home() {
  const [weatherData, setWeatherData] = useState();
  const [renderKey, setRenderKey] = useState();
  const [searchLocationName, setSearchLocationName] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [FindindLocaton, setFindindLocaton] = useState(true);
  const [SearchVisibility, setSearchVisibility] = useState(false);

  let fetchData = async (location) => {
    setLoadingStatus(true);
    console.log("fetching weather data - form loacaton : ", location)
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c7b51b35b10049a088f75656241206&q=${location}&days=7`);
    let response = await res.json();
    // console.log(response);
    if (response.error) {
      alert(response.error.message)
    } else {
      setWeatherData(response);
    }
    setLoadingStatus(false);

  }


  useEffect(() => {
    setRenderKey(Math.random() * 1000)
  }, [weatherData]);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("Getting location....")

      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const location = `${lat},${lon}`
        console.log('Location found!');
        console.log(`Lat ${lat} Lon ${lon}`)
        fetchData(location);
        setFindindLocaton(false);
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            console.log('The request to get user location timed out.')
            break;
          case error.UNKNOWN_ERROR:
            console.log('An unknown error occurred.')
            break;
        }
        setFindindLocaton(false);

      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  let SearchBoxVisibility = () => {
    SearchVisibility === false ? setSearchVisibility(true) : setSearchVisibility(false);
  }

  let SearchLocation = (e) => {
    e.preventDefault();
    if (searchLocationName != '') {
      fetchData(searchLocationName);
      setSearchLocationName('')
      SearchBoxVisibility();
    }
  }

  let onSearchChange = (e) => {
    if (e.target.name == "search") {
      setSearchLocationName(e.target.value);
      console.log(e.target.value)
    }
  }



  return (
    <main key={renderKey} className="w-full md:w-[90vw] md:mt-7 bg-transparent backdrop-blur-lg  shadow-lg rounded-lg p-5 md:p-14">
      {FindindLocaton === true && <Loading />}

      {loadingStatus == true && <CloudLoading />}

      {FindindLocaton === false && loadingStatus == false && weatherData == undefined && <SearchComponente SearchLocation={SearchLocation} onSearchChange={onSearchChange} />}

      {FindindLocaton === false && loadingStatus == false && weatherData != undefined && <div className="w-full bg-transparent">
        <section className="mb-5 flex flex-row justify-between items-center">
          <div className={`text-white ${SearchVisibility == true ? 'hidden md:block' : 'block'}`}>
            <span className="text-xl flex flex-row items-center gap-1"><MapPin /> <h2 className="text-xl md:text-3xl">{weatherData ? weatherData.location.name : '--'}</h2></span>
          </div>

          <form onSubmit={SearchLocation} className={`${SearchVisibility == true ? 'flex' : 'hidden md:flex'} flex-row items-center text-white border rounded-md px-3 py-2 gap-2 text-[15px] w-full md:w-[304px] md:text-[16px] md:hover:border-purple-600 `}>
            <MapPinned />
            <input onChange={onSearchChange} id="search" name="search" type="text" className="bg-transparent outline-none w-full md:w-[216px]" placeholder="Enter the location"></input>
            <button type="submit"><Search className="cursor-pointer transition-colors duration-150 hover:text-blue-300" /></button>
          </form>
          <Search onClick={SearchBoxVisibility} className={`cursor-pointer text-white mx-3 my-2 ${SearchVisibility == true ? 'hidden' : 'flex md:hidden'}`} />
        </section>

        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:hidden w-full flex flex-col items-center text-white mb-10">

            <Image src={`https:${weatherData.current.condition.icon}`} width={100} height={100} alt="img" />
            <h2 className="text-2xl">{weatherData.current.condition.text}</h2>
            <p className="text-slate-200">{weatherData.current.last_updated}</p>
          </div>

          <div className="flex flex-row gap-3">
            <div className="flex flex-row text-white">
              <h1 className="font-normal text-4xl md:text-8xl">{weatherData ? weatherData.current.temp_c : '--'}</h1>
              <h3 className="md:text-xl">°C</h3>
            </div>
            <div className="text-gray-300">
              <p>Precipitation {weatherData ? weatherData.current.precip_mm : '--'} mm</p>
              <p>Humidity {weatherData ? weatherData.current.humidity : '--'}</p>
              <p>Wind {weatherData ? weatherData.current.wind_kph : '--'} kph</p>
            </div>
          </div>

          <div className="text-gray-300 hidden md:flex flex-col items-end">
            <h1 className="text-3xl text-white">Weather</h1>
            <p>{weatherData ? weatherData.current.last_updated : '--'}</p>
            <p>{weatherData ? weatherData.current.condition.text : '--'}</p>
          </div>
        </div>

        <section className="mt-5 mb-7">
          <h2 className="text-white mb-3">Hourly Weather report</h2>
          <div className="flex flex-row overflow-auto no-scrollbar">
            {weatherData ? weatherData.forecast.forecastday[0].hour.map((e) => {
              return <div key={e.time_epoch} className="text-slate-300 flex flex-col items-center w-fit p-3 md:p-5 rounded-md hover:shadow-md hover:cursor-pointer transform transition-transform duration-300 hover:translate-y-1 hover:backdrop:blur-3xl">
                <p>{e.time.slice(11, 15)}</p>
                <Image src={`https:${e.condition.icon}`} width={50} height={50} alt="img" />
                <p>{e.condition.text}</p>
                <p>{e.temp_c}°C</p>
              </div>
            }) : '--'}


          </div>
        </section>

        <section>
          <h2 className="text-white text-lg md:text-xl">7-Day Weather Reaport</h2>
          <table >
            <tbody className="text-sm">
              {weatherData ? weatherData.forecast.forecastday.map((e) => {
                let DATE = e.date.split('-');
                const dayMap = {
                  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
                  "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
                  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
                };
                const month = dayMap[DATE[1]] || '-';
                return <tr key={e.date_epoch} className=" text-slate-200 border-b border-neutral-200 dark:border-white/10 hover:backdrop-blur-3xl hover:cursor-pointer transform transition-transform duration-300 md:hover:translate-x-2 hover:text-white">
                  <td className="px-3 py-2 md:px-6 md:py-4">{DATE[2]} {month}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 hidden md:block">sat</td>
                  <td className="px-3 py-2 md:px-6 md:py-4"><Image src={`https:${e.day.condition.icon}`} width={40} height={40} alt="img" /></td>
                  <td className="px-3 py-2 md:px-6 md:py-4">{e.day.condition.text}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4">{e.day.mintemp_c}/{e.day.maxtemp_c}°C</td>
                </tr>
              }) : <tr>
                <td>--</td>
              </tr>}


            </tbody>

          </table>

        </section>
      </div>}

    </main>
  );
}
