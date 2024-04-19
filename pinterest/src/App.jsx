
import './App.css'
import Header from './components/Header'
import { createApi } from "unsplash-js";
import { useState, useEffect, useRef } from 'react';



import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './components/Card';
import { useBookStore } from './store/bookStore.js';


const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  // accessKey: "tbuMblCxf0imk3e9G4kPlN8V0o_ihUrdZX4XrqlQ2VQ"
  accessKey: import.meta.env.VITE_ACCESKEY
});

function App() {

  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  let index = useRef(1)


  const val = useBookStore(state => state.value)
  console.log('val:', val);


  console.log('data:', data);

  useEffect(() => {
    index.current = 1;
    setHasMore(true);

    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then(result => {
        setData(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [val]);

  const moreData = () => {
    index.current = index.current + 1;
    if (index.current === 3) {
      setHasMore(false);
    }

    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then(result => {
        setData(data.concat(result.response.results));
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }


  return (
    <div className='container'>
      <Header />
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        next={moreData}
        loader={<h4>Loading...</h4>}
        style={{ overflow: 'none' }}


      >
        <Masonry
          columns={{ xs: 2, sm: 3, md: 5 }}
          spacing={{ xs: 1, sm: 2, md: 3 }}
          className='masonry'
        >
          {data.map((item) => (
            <Card key={item.id} item={item} />

          ))}


        </Masonry>

      </InfiniteScroll>



    </div>
  )
}

export default App
