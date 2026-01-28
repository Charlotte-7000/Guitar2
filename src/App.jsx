import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitarra from './components/Guitarra'
import Footer from './components/Footer'
import { db } from './data/guitarras'

function App() {


  const initialCart = () => {
    const localStorageCart = localStorage.getItem('carrito')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)


  const addGuitar = (guitar) => {
    console.log('Agregar Guitarra al Carrito', guitar.nombre)
    const idExist = cart.findIndex(g => g.id === guitar.id)
    if (idExist >= -1) {
      const newCart = [...cart]
      newCart.push({
        ...guitar, 
        cantidad: 1})
        setCart(newCart)
    } else {
      const newCart = [...cart]
      newCart[idExist].cantidad ++
      setCart(newCart)
      }
  }
  


  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExists].cantidad++
      setCart(updatedCart)
    } else {
      item.cantidad = 1
      setCart([...cart, item])
    }
  }

  return (
    <>
      <Header
        cart={cart}
        setCart={setCart}
      />
      
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitarra 
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
              addGuitar={addGuitar}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App