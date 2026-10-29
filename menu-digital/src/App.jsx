import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import './App.css';
import { categories, deliveryZones, products, restaurantInfo } from './data/menuData';
const money = (amount) => `$${amount.toFixed(2)}`;

export default function App() {
  const [categoriaSel, setCategoriaSel] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [productoModal, setProductoModal] = useState(null);
  const [opcionesSel, setOpcionesSel] = useState([]);
  const [verCarritoModal, setVerCarritoModal] = useState(false);
  const [pedidoSimulado, setPedidoSimulado] = useState(false);
  const [checkout, setCheckout] = useState({
    nombre: '',
    zonaEnvio: deliveryZones[0],
    direccion: '',
    metodoPago: 'Pago Móvil',
    notas: '',
  });

  useEffect(() => {
    if (!productoModal && !verCarritoModal) return undefined;

    const cerrarConEscape = (event) => {
      if (event.key === 'Escape') {
        setProductoModal(null);
        setVerCarritoModal(false);
      }
    };

    document.addEventListener('keydown', cerrarConEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', cerrarConEscape);
      document.body.style.overflow = '';
    };
  }, [productoModal, verCarritoModal]);

  const productosFiltrados = products.filter((producto) => {
    const coincideCategoria =
      categoriaSel === 'todos' || producto.categoria === categoriaSel;
    const termino = busqueda.trim().toLowerCase();
    const coincideBusqueda =
      !termino ||
      `${producto.nombre} ${producto.descripcion}`.toLowerCase().includes(termino);

    return coincideCategoria && coincideBusqueda;
  });

  const subtotalCarrito = carrito.reduce(
    (total, item) => total + item.precioFinal * item.cantidad,
    0,
  );
  const costoEnvio = checkout.zonaEnvio?.precio ?? 0;
  const totalFinal = subtotalCarrito + costoEnvio;
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const extrasSeleccionados = opcionesSel.reduce(
    (total, opcion) => total + opcion.precio,
    0,
  );

  const abrirProducto = (producto) => {
    setOpcionesSel([]);
    setProductoModal(producto);
  };

  const toggleOpcion = (opcion) => {
    setOpcionesSel((actuales) =>
      actuales.some((seleccionada) => seleccionada.nombre === opcion.nombre)
        ? actuales.filter((seleccionada) => seleccionada.nombre !== opcion.nombre)
        : [...actuales, opcion],
    );
  };

  const agregarAlCarrito = () => {
    if (!productoModal) return;

    setCarrito((actual) => [
      ...actual,
      {
        idUnico: `${productoModal.id}-${Date.now()}-${Math.random()}`,
        id: productoModal.id,
        nombre: productoModal.nombre,
        precioBase: productoModal.precio,
        precioFinal: productoModal.precio + extrasSeleccionados,
        opciones: opcionesSel,
        cantidad: 1,
      },
    ]);
    setPedidoSimulado(false);
    setProductoModal(null);
    setOpcionesSel([]);
  };

  const cambiarCantidad = (idUnico, delta) => {
    setPedidoSimulado(false);
    setCarrito((actual) =>
      actual
        .map((item) => {
          if (item.idUnico !== idUnico) return item;
          const cantidad = item.cantidad + delta;
          return cantidad > 0 ? { ...item, cantidad } : null;
        })
        .filter(Boolean),
    );
  };

  const cambiarZona = (idZona) => {
    const zonaEnvio = deliveryZones.find((zona) => zona.id === idZona);
    if (zonaEnvio) {
      setCheckout((actual) => ({ ...actual, zonaEnvio }));
    }
  };

  const simularPedido = (event) => {
    event.preventDefault();
    if (carrito.length === 0) return;
    setPedidoSimulado(true);
  };

  return (
    <div className="app-shell">
      <header className="cover">
        <img
          className="cover__image"
          src={restaurantInfo.bannerUrl}
          alt=""
          fetchPriority="high"
        />
        <div className="cover__shade" />
        <nav className="topbar" aria-label="Navegación principal">
          <a className="wordmark" href="#inicio" aria-label="Ir al inicio">
            <span className="wordmark__icon">B</span>
            <span>MENÚ<span className="wordmark__accent">DIGITAL</span></span>
          </a>
          <a className="topbar__link" href="#menu">
            Ver menú <ArrowRight size={16} />
          </a>
        </nav>
        <div className="cover__content">
          <span className="eyebrow"><Sparkles size={14} /> HECHO PARA ANTOJARSE</span>
          <h1>Tu próximo favorito<br />está a un clic.</h1>
          <p>Elige, personaliza y simula tu pedido.</p>
          <a className="cover__cta" href="#menu">Explorar el menú <ArrowRight size={17} /></a>
        </div>
        <span className="cover__caption">ANTOJOS PARA COMPARTIR · DEMO INTERACTIVA</span>
      </header>

      <main id="inicio" className="storefront">
        <section className="restaurant-card" aria-label="Información del restaurante">
          <img className="restaurant-card__logo" src={restaurantInfo.logoUrl} alt={`Logo de ${restaurantInfo.nombre}`} />
          <div className="restaurant-card__details">
            <span className="restaurant-card__kicker">BIENVENIDO A</span>
            <h2>{restaurantInfo.nombre}</h2>
            <p>{restaurantInfo.subtitulo}</p>
            <div className="restaurant-card__status">
              <Clock3 size={14} />
              <span>Horario:</span>
              <span>{restaurantInfo.horario}</span>
            </div>
          </div>
        </section>

        <section className="service-highlights" aria-label="Ventajas del servicio">
          <div className="service-highlight">
            <span className="service-highlight__icon"><Truck size={18} /></span>
            <span><strong>Delivery y retiro</strong><small>A tu manera</small></span>
          </div>
          <div className="service-highlight">
            <span className="service-highlight__icon"><Clock3 size={18} /></span>
            <span><strong>Rápido y sencillo</strong><small>Ordena en minutos</small></span>
          </div>
          <div className="service-highlight">
            <span className="service-highlight__icon"><ShoppingBag size={18} /></span>
            <span><strong>Pedido a tu medida</strong><small>Demo interactiva</small></span>
          </div>
        </section>

        <section id="menu" className="menu-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow eyebrow--dark">ELIGE, PERSONALIZA Y PIDE</span>
              <h2>Explora nuestro menú</h2>
              <p>Algo rico siempre queda bien.</p>
            </div>
            <label className="search-box">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Buscar en el menú</span>
              <input
                type="search"
                placeholder="¿Qué se te antoja?"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
              />
              {busqueda && (
                <button
                  className="search-box__clear"
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setBusqueda('')}
                >
                  <X size={16} />
                </button>
              )}
            </label>
          </div>

          <div className="category-list" aria-label="Filtrar por categoría">
            {categories.map((categoria) => (
              <button
                className={`category-chip${categoriaSel === categoria.id ? ' is-active' : ''}`}
                key={categoria.id}
                type="button"
                aria-pressed={categoriaSel === categoria.id}
                onClick={() => setCategoriaSel(categoria.id)}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="empty-state">
              <Search size={25} />
              <strong>No encontramos ese antojo</strong>
              <span>Prueba con otro nombre o cambia la categoría.</span>
              <button type="button" onClick={() => { setBusqueda(''); setCategoriaSel('todos'); }}>
                Ver todo el menú
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {productosFiltrados.map((producto) => (
                <article className="product-card" key={producto.id}>
                  <button
                    className="product-card__photo-button"
                    type="button"
                    onClick={() => abrirProducto(producto)}
                    aria-label={`Ver detalles de ${producto.nombre}`}
                  >
                    <img className="product-card__photo" src={producto.imagen} alt={producto.nombre} loading="lazy" />
                    {producto.tag && <span className="product-card__tag">{producto.tag}</span>}
                  </button>
                  <div className="product-card__body">
                    <button className="product-card__title" type="button" onClick={() => abrirProducto(producto)}>
                      {producto.nombre}
                    </button>
                    <p>{producto.descripcion}</p>
                    <div className="product-card__bottom">
                      <strong>{money(producto.precio)}</strong>
                      <button
                        className="add-button"
                        type="button"
                        aria-label={`Personalizar ${producto.nombre}`}
                        onClick={() => abrirProducto(producto)}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="store-footer">
          <div className="store-footer__brand">
            <span className="wordmark__icon">B</span>
            <span><strong>{restaurantInfo.nombre}</strong><small>{restaurantInfo.subtitulo}</small></span>
          </div>
          <p><MapPin size={14} /> Pide ahora, disfruta donde quieras.</p>
          <span className="store-footer__credit">Menú digital interactivo · Desarrollado por Carlos Moncada</span>
        </footer>
      </main>

      {carrito.length > 0 && (
        <div className="cart-dock">
          <button className="cart-dock__button" type="button" onClick={() => setVerCarritoModal(true)}>
            <span className="cart-dock__label">
              <span className="cart-dock__count">{totalItems}</span>
              <ShoppingBag size={18} />
              Ver mi pedido
            </span>
            <span>{money(subtotalCarrito)} <ArrowRight size={17} /></span>
          </button>
        </div>
      )}

      {productoModal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setProductoModal(null); }}>
          <section className="dialog product-dialog" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title">
            <button className="dialog__close" type="button" onClick={() => setProductoModal(null)} aria-label="Cerrar">
              <X size={20} />
            </button>
            <img className="product-dialog__image" src={productoModal.imagen} alt={productoModal.nombre} />
            <div className="product-dialog__content">
              <span className="eyebrow eyebrow--dark">RECIÉN PREPARADO</span>
              <h2 id="product-dialog-title">{productoModal.nombre}</h2>
              <p className="product-dialog__description">{productoModal.descripcion}</p>
              {productoModal.opciones.length > 0 && (
                <fieldset className="extras">
                  <legend>Hazlo todavía mejor <span>· Opcional</span></legend>
                  {productoModal.opciones.map((opcion) => {
                    const seleccionado = opcionesSel.some((item) => item.nombre === opcion.nombre);
                    return (
                      <button
                        className={`extra-option${seleccionado ? ' is-selected' : ''}`}
                        key={opcion.nombre}
                        type="button"
                        aria-pressed={seleccionado}
                        onClick={() => toggleOpcion(opcion)}
                      >
                        <span className="extra-option__check">{seleccionado && <Check size={13} />}</span>
                        <span>{opcion.nombre}</span>
                        <strong>+{money(opcion.precio)}</strong>
                      </button>
                    );
                  })}
                </fieldset>
              )}
              <button className="primary-action" type="button" onClick={agregarAlCarrito}>
                <span>Agregar al pedido</span>
                <strong>{money(productoModal.precio + extrasSeleccionados)}</strong>
              </button>
            </div>
          </section>
        </div>
      )}

      {verCarritoModal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setVerCarritoModal(false); }}>
          <section className="dialog checkout-dialog" role="dialog" aria-modal="true" aria-labelledby="checkout-dialog-title">
            <div className="checkout-dialog__header">
              <div>
                <span className="eyebrow eyebrow--dark">UN ÚLTIMO PASO</span>
                <h2 id="checkout-dialog-title">Tu pedido</h2>
                <p>{totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu bolsa</p>
              </div>
              <button className="dialog__close dialog__close--inline" type="button" onClick={() => setVerCarritoModal(false)} aria-label="Cerrar pedido">
                <X size={20} />
              </button>
            </div>

            <p className="demo-notice">
              Esta es una demo. Usa datos ficticios: los pedidos no se envían ni se registran.
            </p>

            <div className="cart-items">
              {carrito.length === 0 ? (
                <p className="cart-items__empty">Tu bolsa está vacía. Explora el menú para agregar algo rico.</p>
              ) : carrito.map((item) => (
                <article className="cart-item" key={item.idUnico}>
                  <div className="cart-item__description">
                    <strong>{item.nombre}</strong>
                    {item.opciones.map((opcion) => <span key={opcion.nombre}>+ {opcion.nombre}</span>)}
                    <b>{money(item.precioFinal * item.cantidad)}</b>
                  </div>
                  <div className="quantity-control" aria-label={`Cantidad de ${item.nombre}`}>
                    <button type="button" onClick={() => cambiarCantidad(item.idUnico, -1)} aria-label={`Quitar una unidad de ${item.nombre}`}>
                      <Minus size={14} />
                    </button>
                    <span>{item.cantidad}</span>
                    <button type="button" onClick={() => cambiarCantidad(item.idUnico, 1)} aria-label={`Agregar una unidad de ${item.nombre}`}>
                      <Plus size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {carrito.length > 0 && (
              <form className="checkout-form" onSubmit={simularPedido}>
                <div className="form-row">
                  <label className="form-field">
                    <span>Tu nombre</span>
                    <input
                      autoComplete="name"
                      type="text"
                      placeholder="Ej. María Pérez"
                      value={checkout.nombre}
                      onChange={(event) => setCheckout((actual) => ({ ...actual, nombre: event.target.value }))}
                      required
                    />
                  </label>
                  <label className="form-field">
                    <span>Entrega</span>
                    <select value={checkout.zonaEnvio.id} onChange={(event) => cambiarZona(event.target.value)}>
                      {deliveryZones.map((zona) => (
                        <option key={zona.id} value={zona.id}>
                          {zona.nombre} {zona.precio > 0 ? `(+${money(zona.precio)})` : '(Gratis)'}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {checkout.zonaEnvio.id !== 'retiro' && (
                  <label className="form-field">
                    <span>Dirección de entrega</span>
                    <input
                      autoComplete="street-address"
                      type="text"
                      placeholder="Calle, edificio, piso o referencia"
                      value={checkout.direccion}
                      onChange={(event) => setCheckout((actual) => ({ ...actual, direccion: event.target.value }))}
                      required
                    />
                  </label>
                )}

                <div className="form-row">
                  <label className="form-field">
                    <span>Forma de pago</span>
                    <select
                      value={checkout.metodoPago}
                      onChange={(event) => setCheckout((actual) => ({ ...actual, metodoPago: event.target.value }))}
                    >
                      <option value="Pago Móvil">Pago Móvil</option>
                      <option value="Efectivo $">Efectivo ($)</option>
                      <option value="Binance USDT">Binance USDT</option>
                    </select>
                  </label>
                  <label className="form-field">
                    <span>Nota <small>(opcional)</small></span>
                    <input
                      type="text"
                      placeholder="¿Alguna indicación?"
                      value={checkout.notas}
                      onChange={(event) => setCheckout((actual) => ({ ...actual, notas: event.target.value }))}
                    />
                  </label>
                </div>

                <div className="order-summary">
                  <div><span>Subtotal</span><span>{money(subtotalCarrito)}</span></div>
                  <div><span>Envío</span><span>{money(costoEnvio)}</span></div>
                  <div className="order-summary__total"><strong>Total a pagar</strong><strong>{money(totalFinal)}</strong></div>
                </div>
                <button className="demo-action" type="submit">
                  <ShoppingBag size={17} /> Simular pedido <strong>{money(totalFinal)}</strong>
                </button>
                {pedidoSimulado ? (
                  <p className="demo-result" role="status">
                    El número de WhatsApp de esta demo no sirve; no se podrá registrar el pedido.
                  </p>
                ) : (
                  <p className="checkout-note">El botón solo muestra el flujo de prueba; no abre WhatsApp.</p>
                )}
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
