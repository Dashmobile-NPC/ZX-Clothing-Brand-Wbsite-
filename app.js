const DEFAULT_PRODUCTS = [
 {id:"ZX-001",name:"ZX Core Tee",description:"A clean heavyweight streetwear tee with the official ZX identity. Built for everyday rotation.",category:"T-Shirts",price:699,sizes:["S","M","L","XL"],stock:24,collection:"ZX Essentials",featured:true,newDrop:true,soldOut:false},
 {id:"ZX-002",name:"After Dark Hoodie",description:"Heavyweight hoodie with a minimal front identity and premium oversized feel.",category:"Hoodies",price:1199,sizes:["S","M","L","XL"],stock:15,collection:"After Dark",featured:true,newDrop:true,soldOut:false},
 {id:"ZX-003",name:"ZX Track Jacket",description:"Structured black outer layer with a sharp monochrome finish.",category:"Jackets",price:1499,sizes:["S","M","L","XL"],stock:9,collection:"Outer Limits",featured:true,newDrop:false,soldOut:false},
 {id:"ZX-004",name:"Utility Cargo Pant",description:"Relaxed cargo silhouette with understated ZX detailing.",category:"Pants",price:1099,sizes:["S","M","L","XL"],stock:12,collection:"After Dark",featured:false,newDrop:false,soldOut:false},
 {id:"ZX-005",name:"ZX Cap",description:"Minimal six-panel cap carrying the ZX mark.",category:"Accessories",price:499,sizes:["OS"],stock:30,collection:"ZX Essentials",featured:false,newDrop:true,soldOut:false},
 {id:"ZX-006",name:"Statement Tee",description:"Monochrome graphic tee for the louder side of the brand.",category:"T-Shirts",price:749,sizes:["S","M","L","XL"],stock:20,collection:"ZX Essentials",featured:false,newDrop:false,soldOut:false}
];

const KEY="zx_products_v1", CART="zx_cart_v1", DROP="zx_drop_v1", NEWS="zx_news_v1";
let products=JSON.parse(localStorage.getItem(KEY)||"null")||DEFAULT_PRODUCTS;
let cart=JSON.parse(localStorage.getItem(CART)||"[]");
let activeCategory="ALL", sortMode="featured";

function money(n){return new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR",maximumFractionDigits:0}).format(n)}
function save(){localStorage.setItem(KEY,JSON.stringify(products));localStorage.setItem(CART,JSON.stringify(cart));}
function logoImage(){return "assets/zx-mark.jpg"}

function renderTabs(){
 const tabs=["ALL","T-Shirts","Hoodies","Jackets","Pants","Accessories"];
 document.querySelector("#category-tabs").innerHTML=tabs.map(x=>`<button class="${activeCategory===x?"active":""}" data-cat="${x}">${x.toUpperCase()}</button>`).join("");
 document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderProducts()});
}
function renderProducts(){
 renderTabs();
 let list=products.filter(p=>activeCategory==="ALL"||p.category===activeCategory);
 if(sortMode==="newest")list=[...list].sort((a,b)=>b.newDrop-a.newDrop);
 if(sortMode==="low")list.sort((a,b)=>a.price-b.price);
 if(sortMode==="high")list.sort((a,b)=>b.price-a.price);
 if(sortMode==="featured")list.sort((a,b)=>b.featured-a.featured);
 document.querySelector("#product-grid").innerHTML=list.map(p=>`
  <article class="product-card reveal visible">
   ${p.newDrop?'<span class="new-badge">NEW</span>':""}
   <button class="product-image" data-view="${p.id}" aria-label="View ${p.name}">
    <img src="${logoImage()}" alt="${p.name}">
   </button>
   <div class="product-info"><div class="product-name">${p.name}</div>
   <div class="product-meta"><span>${money(p.price)}</span><span>${p.soldOut?"SOLD OUT":p.category}</span></div>
   <div class="sizes">${p.sizes.map(s=>`<span>${s}</span>`).join("")}</div>
   <div class="product-actions"><button class="mini-btn" data-add="${p.id}" ${p.soldOut?"disabled":""}>QUICK ADD</button><button class="mini-btn" data-view="${p.id}">VIEW PRODUCT</button></div></div>
  </article>`).join("");
 document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>addToCart(b.dataset.add));
 document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>openProduct(b.dataset.view));
}
function addToCart(id,size){
 const p=products.find(x=>x.id===id); if(!p||p.soldOut)return;
 size=size||p.sizes[0];
 const item=cart.find(x=>x.id===id&&x.size===size);
 if(item)item.qty++; else cart.push({id,size,qty:1});
 save();updateCart();openPanel("cart-panel");
}
function updateCart(){
 document.querySelector("#cart-count").textContent=cart.reduce((a,b)=>a+b.qty,0);
 const box=document.querySelector("#cart-items");
 if(!cart.length){box.innerHTML='<p class="small">Your bag is empty.</p>';document.querySelector("#cart-subtotal").textContent=money(0);return}
 let subtotal=0;
 box.innerHTML=cart.map((item,i)=>{const p=products.find(x=>x.id===item.id);const line=p.price*item.qty;subtotal+=line;return `
  <div class="cart-item"><img src="${logoImage()}" alt=""><div><h4>${p.name}</h4><p>SIZE ${item.size} · QTY ${item.qty}</p><p>${money(line)}</p></div><button class="remove" data-remove="${i}">REMOVE</button></div>`}).join("");
 document.querySelector("#cart-subtotal").textContent=money(subtotal);
 document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);save();updateCart();});
}
function openPanel(id){document.querySelector("#overlay").classList.add("open");document.querySelector("#"+id).classList.add("open")}
function closePanel(id){document.querySelector("#"+id).classList.remove("open");if(!document.querySelector(".side-panel.open")&&!document.querySelector(".mobile-menu.open"))document.querySelector("#overlay").classList.remove("open")}
function openProduct(id){
 const p=products.find(x=>x.id===id); if(!p)return;
 let selected=p.sizes[0],qty=1;
 const detail=document.querySelector("#product-detail");
 detail.innerHTML=`<div class="detail-image"><img src="${logoImage()}" alt="${p.name}"></div><div class="detail-copy"><p class="eyebrow">${p.category} / ${p.collection}</p><h2>${p.name}</h2><div class="price">${money(p.price)}</div><p>${p.description}</p><p><b>SIZE GUIDE</b><br>Choose your usual size for a standard fit. For a relaxed streetwear fit, consider sizing up.</p><div class="size-select">${p.sizes.map(s=>`<button data-size="${s}" class="${s===selected?"active":""}">${s}</button>`).join("")}</div><div class="qty"><button id="qminus">−</button><span id="qvalue">1</span><button id="qplus">+</button></div><div class="detail-actions"><button class="btn btn-light" id="detail-add">ADD TO CART</button><button class="btn btn-outline" id="detail-buy">BUY NOW</button></div><p class="small">Shipping: South African delivery options are calculated at checkout. Returns: unused items should be returned in original condition. Connect your live policy and carrier rules before launch.</p></div>`;
 document.querySelectorAll("[data-size]").forEach(b=>b.onclick=()=>{selected=b.dataset.size;document.querySelectorAll("[data-size]").forEach(x=>x.classList.toggle("active",x===b))});
 document.querySelector("#qminus").onclick=()=>{qty=Math.max(1,qty-1);document.querySelector("#qvalue").textContent=qty};
 document.querySelector("#qplus").onclick=()=>{qty=Math.min(10,qty+1);document.querySelector("#qvalue").textContent=qty};
 document.querySelector("#detail-add").onclick=()=>{for(let i=0;i<qty;i++)addToCart(p.id,selected);document.querySelector("#product-modal").classList.remove("open")};
 document.querySelector("#detail-buy").onclick=()=>{for(let i=0;i<qty;i++)addToCart(p.id,selected);document.querySelector("#product-modal").classList.remove("open");openCheckout()};
 document.querySelector("#product-modal").classList.add("open");
}
function openCheckout(){
 if(!cart.length){alert("Your bag is empty.");return}
 const sum=document.querySelector("#checkout-summary");
 let subtotal=cart.reduce((t,i)=>t+products.find(p=>p.id===i.id).price*i.qty,0);
 sum.innerHTML=`<p class="eyebrow">ORDER SUMMARY</p>`+cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="summary-row"><span>${p.name} · ${i.size} × ${i.qty}</span><span>${money(p.price*i.qty)}</span></div>`}).join("")+`<div class="summary-row"><span>SHIPPING</span><span>CALCULATED</span></div><div class="summary-row summary-total"><span>TOTAL</span><span>${money(subtotal)}</span></div>`;
 document.querySelector("#checkout-modal").classList.add("open");
}
function countdown(){
 let target=localStorage.getItem(DROP);
 if(!target){const d=new Date();d.setDate(d.getDate()+14);d.setHours(20,0,0,0);target=d.toISOString();localStorage.setItem(DROP,target)}
 const diff=Math.max(0,new Date(target)-new Date());
 const days=Math.floor(diff/86400000),hrs=Math.floor(diff/3600000)%24,min=Math.floor(diff/60000)%60,sec=Math.floor(diff/1000)%60;
 document.querySelector("#countdown").textContent=`${String(days).padStart(2,"0")} DAYS : ${String(hrs).padStart(2,"0")} HOURS : ${String(min).padStart(2,"0")} MINUTES : ${String(sec).padStart(2,"0")} SECONDS`;
}
function initSearch(){
 const input=document.querySelector("#search-input"),out=document.querySelector("#search-results");
 input.oninput=()=>{const q=input.value.toLowerCase();out.innerHTML=products.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)).map(p=>`<button class="search-result" data-view="${p.id}"><span>${p.name}</span><span>${money(p.price)}</span></button>`).join("")||'<p class="small">No matches.</p>';document.querySelectorAll("#search-results [data-view]").forEach(b=>b.onclick=()=>{closePanel("search-panel");openProduct(b.dataset.view)})};
}
document.addEventListener("click",e=>{
 const open=e.target.closest("[data-open]"); if(open)openPanel(open.dataset.open+"-panel");
 const close=e.target.closest("[data-close]"); if(close){if(close.dataset.close==="mobile-menu"){document.querySelector("#mobile-menu").classList.remove("open");document.querySelector("#overlay").classList.remove("open")}else{document.querySelector("#"+close.dataset.close).classList.remove("open");if(!document.querySelector(".side-panel.open"))document.querySelector("#overlay").classList.remove("open")}}
});
document.querySelector("#overlay").onclick=()=>{document.querySelectorAll(".side-panel,.mobile-menu").forEach(x=>x.classList.remove("open"));document.querySelector("#overlay").classList.remove("open")};
document.querySelector("#menu-toggle").onclick=()=>{document.querySelector("#mobile-menu").classList.add("open");document.querySelector("#overlay").classList.add("open")};
document.querySelector("#sort-products").onchange=e=>{sortMode=e.target.value;renderProducts()};
document.querySelector("#shop-new").onclick=()=>{activeCategory="ALL";sortMode="newest";document.querySelector("#sort-products").value="newest";document.querySelector("#shop").scrollIntoView();renderProducts()};
document.querySelectorAll(".collection-card").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.category;document.querySelector("#shop").scrollIntoView();renderProducts()});
document.querySelector("#checkout-btn").onclick=()=>openCheckout();
document.querySelector("#checkout-form").onsubmit=e=>{e.preventDefault();const order="ZX-"+Date.now().toString().slice(-7);alert(`Order ${order} received in demo mode. Connect your payment/order backend before accepting real orders.`);cart=[];save();updateCart();document.querySelector("#checkout-modal").classList.remove("open");document.querySelector("#cart-panel").classList.remove("open");document.querySelector("#overlay").classList.remove("open")};
document.querySelector("#contact-form").onsubmit=e=>{e.preventDefault();document.querySelector("#contact-status").textContent="Message saved in demo mode. Connect your email service to send it.";e.target.reset()};
document.querySelector("#newsletter-form").onsubmit=e=>{e.preventDefault();let list=JSON.parse(localStorage.getItem(NEWS)||"[]");list.push(e.target.querySelector("input").value);localStorage.setItem(NEWS,JSON.stringify(list));document.querySelector("#newsletter-status").textContent="You're on the list.";e.target.reset()};
document.querySelector("#account-demo").onclick=()=>alert("Demo account screen. Connect Supabase, Firebase, Shopify, WooCommerce, or your own auth backend for live accounts.");
window.addEventListener("scroll",()=>document.querySelector(".site-header").classList.toggle("scrolled",scrollY>20));
const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.08});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
window.addEventListener("load",()=>{setTimeout(()=>document.querySelector("#loader").classList.add("hide"),500);renderProducts();updateCart();initSearch();countdown();setInterval(countdown,1000)});
