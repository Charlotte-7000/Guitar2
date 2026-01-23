// src/components/Header.jsx

export default function Header({ cart, setCart }) {
    
    // Aquí van tus cálculos (puedes dejarlos así por ahora)
    const isEmpty = cart.length === 0;
    const cartTotal = cart.reduce((total, item) => total + (item.cantidad * item.precio), 0);

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    {/* ... resto del código del header ... */}
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <p>Tienes productos en el carrito</p> 
                                    /* Aquí puedes pegar la tabla que te pasé antes */
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}