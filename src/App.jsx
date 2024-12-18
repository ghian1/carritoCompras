import { useEffect, useState } from 'react'
import Header from "./components/Header"
import Product from "./components/Product"
import { db } from "./data/db"

function App() {
    
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1
    //State
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(db)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    })

    const [cart, setCart] = useState([])

    function addToCart(product) {
        const productExists = cart.findIndex(p => p.id === product.id);
        if (productExists >= 0) {
            const newCart = [...cart];
            newCart[productExists].quantity++;
            setCart(newCart);
        } else {
            setCart([...cart, {...product, quantity: 1}]);
        }
    }    
    function removeFromCart (id) {
        setCart(prevCart => prevCart.filter(product => product.id !== id))
    }
    function increaseQuantity(id){
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS){
             return {
                ...item,
                quantity: item.quantity + 1
             }
            }
            return item
        })
        setCart(updatedCart)
    }
    function decreaseQuantity(id){
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS){
             return {
                ...item,
                quantity: item.quantity - 1
             }   
            }
            return item
        })
        setCart(updatedCart)
    }
    function clearCart(){
        setCart([])
    }
    return (
    <>         
        <Header 
            cart = {cart}
            removeFromCart = {removeFromCart}
            increaseQuantity= {increaseQuantity}
            decreaseQuantity= {decreaseQuantity}
            clearCart= {clearCart}
        />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            
            {products.map((product) => (
                <Product 
                key = {product.id}
                product = {product}
                setCart = {setCart}
                addToCart={addToCart}
                />               
            ))}
             
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
