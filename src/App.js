import './App.css';
import { useState, useEffect } from "react"

function App() {

  const apiKey = process.env.REACT_APP_API_KEY;

  // prefix the url with https://cors-anywhere.herokuapp.com/
  // be sure to visit https://cors-anywhere.herokuapp.com/corsdemo to request temporary access
  const url = process.env.REACT_APP_URL;
  console.log({apiKey, url})
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${apiKey}`,
    }
  };
  const [items, setItems] = useState(null)
  const [solo, setSolo] = useState(null)

  
  useEffect(() => {
    fetchData()
  },[])

  // function to retrieve yelp data
  const fetchData = () => {
    fetch(process.env.REACT_APP_URL, options)
    .then(res => res.json())

    .then(json => {

      // here is where we are setting the items state
      setItems(json.businesses)
    }) 

    .catch(err => console.error('error:' + err))
  }

  // function to get a single item returned from our inital fetchData function
  const handleItem = (businessId) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${businessId}`, options)
      .then(response => response.json())
      .then(response => {

        // here we set the solo item
        setSolo(response)

        // reset the items state to null
        setItems(null)
      })
      .catch(err => console.error(err));
  }

  // handle back button
  const handleBack = () => {
    fetchData()
    setSolo(null)
  }
  
  const loading = () => <h1>Loading...</h1>

  const Item = ({item}) => {
    return (
      <div>
        <h1>{item.name}</h1>
        <p onClick={() => {handleItem(item.id)}}>{item.id}</p>
      </div>
    )
  }

  console.log(solo)
  return (
    <div className="App">
      {
      items ? 
        items.map((item, idx) => {
          return <div key={idx}>
              <Item item={item}/>    
          </div>
        })
      : 
        solo ? 
        "" 
        :
        loading()
      }
      {
        solo ? 
          <div>
            <h1>{solo.name}</h1>
            <p>{solo.id}</p>
            <button onClick={handleBack}>Back</button>
          </div>
        :
        null
      }
    </div>
  );
}

export default App;
