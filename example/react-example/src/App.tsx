import Swiper from '@swiper'
import './App.css'

const sample: Swiper.Data[] = [
  {
    id: 1,
    image: "/sample/cat1.jpg",
    order: 1,
  },
  {
    id: 2,
    image: "/sample/cat2.jpg",
    order: 2
  },
  {
    id: 3,
    image: "/sample/cat3.jpg",
    order: 3
  },
  {
    id: 4,
    image: "/sample/cat4.jpg",
    order: 4
  },
  {
    id: 5,
    image: "/sample/cat5.jpg",
    order: 5
  },
   {
    id: 6,
    image: "/sample/cat6.jpg",
    order: 6
  },
   {
    id: 7,
    image: "/sample/cat7.jpg",
    order: 7
  },
    {
    id: 8,
    image: "/sample/cat8.jpg",
    order: 8
  }
]


function App() {

  return (
    <main>
     <Swiper width={300} height={300} data={sample}/> 
    </main>
  )
}

export default App
