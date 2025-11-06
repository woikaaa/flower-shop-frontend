import { API_BASE } from './config.js';

const catalogEl = document.getElementById('catalog');
const cartEl = document.getElementById('cart');
const btnCatalog = document.getElementById('btn-catalog');
const btnCart = document.getElementById('btn-cart');
const cartCount = document.getElementById('cart-count');

let cart = {};

function show(view) {
  catalogEl.hidden = view !== 'catalog';
  cartEl.hidden = view !== 'cart';
}

btnCatalog.addEventListener('click', () => show('catalog'));
btnCart.addEventListener('click', () => { renderCart(); show('cart'); });

async function fetchCatalog() {
  // If API_BASE is empty, return a small mock list.
  if (!API_BASE) {
    return [
      { id: 1, name: "Букет 'Перлина любові'", price: 1000, image: "./public/images/tulip_white.jpg" },
      { id: 4, name: "Букет 'Сапфір'", price: 4800, image: "./public/images/hydrangea_blue.jpg" },
      { id: 16, name: "Червона троянда (шт)", price: 70, image: "./public/images/rose_red.jpg" },
    ];
  }
  const res = await fetch(`${API_BASE}/products`);
  return await res.json();
}

function addToCart(id, product) {
  cart[id] = (cart[id] || 0) + 1;
  cartCount.textContent = Object.values(cart).reduce((a,b)=>a+b,0);
}

function renderCard(p) {
  const div = document.createElement('div');
  div.className = 'card';
  const img = document.createElement('img');
  img.alt = p.name;
  img.src = p.image;
  const h3 = document.createElement('h3');
  h3.textContent = p.name;
  const price = document.createElement('div');
  price.textContent = `${p.price} ₴`;
  const actions = document.createElement('div');
  actions.className = 'actions';
  const btn = document.createElement('button');
  btn.className = 'primary';
  btn.textContent = 'Add to cart';
  btn.onclick = () => addToCart(p.id, p);
  actions.appendChild(btn);
  div.append(img, h3, price, actions);
  return div;
}

async function renderCatalog() {
  catalogEl.innerHTML = '<p>Loading…</p>';
  const products = await fetchCatalog();
  const grid = document.createElement('div');
  grid.className = 'grid';
  products.forEach(p => grid.appendChild(renderCard(p)));
  catalogEl.innerHTML = '';
  catalogEl.appendChild(grid);
}

function renderCart() {
  const entries = Object.entries(cart);
  if (entries.length === 0) { cartEl.innerHTML = '<p>Your cart is empty.</p>'; return; }
  const list = document.createElement('div');
  list.className = 'grid';
  entries.forEach(([id, qty]) => {
    const item = document.createElement('div');
    item.className = 'card';
    item.textContent = `Product #${id} × ${qty}`;
    list.appendChild(item);
  });
  cartEl.innerHTML = '';
  cartEl.appendChild(list);
}

renderCatalog();
show('catalog');
