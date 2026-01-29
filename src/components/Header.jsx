import { useMemo } from "react";

export default function Header({ cart, setCart, guitar, addGuitar }) {
    
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.cantidad * item.precio), 0), [cart]);

    // Funciones del carrito
    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => (item.id === id && item.cantidad < 10) ? { ...item, cantidad: item.cantidad + 1 } : item);
        setCart(updatedCart);
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => (item.id === id && item.cantidad > 1) ? { ...item, cantidad: item.cantidad - 1 } : item);
        setCart(updatedCart);
    };

    const removeItem = (id) => setCart(prevCart => prevCart.filter(g => g.id !== id));

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="/"><img className="img-fluid" src="/img/logo.svg" alt="logo" /></a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="carrito" />
                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? <p className="text-center m-0">El carrito está vacío</p> : (
                                    <>
                                        <table className="w-100 table">
                                            <thead><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cant.</th><th></th></tr></thead>
                                            <tbody>
                                                {cart.map(g => (
                                                    <tr key={g.id}>
                                                        <td><img className="img-fluid" src={`/img/${g.imagen}.jpg`} alt="guitarra" /></td>
                                                        <td>{g.nombre}</td>
                                                        <td className="fw-bold">${g.precio}</td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button type="button" className="btn btn-dark" onClick={() => decreaseQuantity(g.id)}>-</button>
                                                            {g.cantidad}
                                                            <button type="button" className="btn btn-dark" onClick={() => increaseQuantity(g.id)}>+</button>
                                                        </td>
                                                        <td><button className="btn btn-danger" onClick={() => removeItem(g.id)}>X</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                        <button className="btn btn-dark w-100 mt-3 p-2" onClick={() => setCart([])}>Vaciar Carrito</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 text-center text-md-start pt-5">
                        <h1 className="display-2 fw-bold">Modelo {guitar.nombre}</h1>
                        <p className="mt-5 fs-5 text-white">{guitar.descripcion}</p>
                        <p className="text-primary fs-1 fw-black">${guitar.precio}</p>
                        <button 
                            type="button"
                            className="btn fs-4 bg-primary text-white py-2 px-5"
                            onClick={() => addGuitar(guitar)}
                        >Agregar al Carrito</button>
                    </div>
                </div>
            </div>

            <img className="header-guitarra" src="/img/header_guitarra.png" alt="imagen header" />
        </header>
    );
}