const products=[
["Smash Classic","Burgers",850,"Double-seared beef, cheddar, pickles & house sauce.","photo-1568901346375-23c9450c58cd"],
["Mr Foodie Special","Burgers",1090,"Loaded beef burger with smoky special sauce.","photo-1550547660-d9450f859349"],
["Crispy Chicken Burger","Burgers",790,"Crunchy chicken, lettuce & creamy mayo.","photo-1606755962773-d324e0a13086"],
["BBQ Beef Burger","Burgers",990,"BBQ glazed beef, onion & melted cheese.","photo- burger"],
["Double Cheese Burger","Burgers",1190,"Two patties, extra cheese, extra happiness.","photo-1561758033-d89a9ad46330"],
["Classic Pepperoni Pizza","Pizza",1450,"Pepperoni, mozzarella & rich tomato sauce.","photo-1628840042765-356cda07504e"],
["Creamy Fajita Pizza","Pizza",1590,"Creamy sauce, chicken fajita & capsicum.","photo- pizza"],
["Four Cheese Pizza","Pizza",1690,"A cheesy mix with herbs and a golden crust.","photo-1571407970349-bc81e7e96d47"],
["BBQ Chicken Pizza","Pizza",1590,"Smoky BBQ chicken, onion & mozzarella.","photo- chickenpizza"],
["Crispy Chicken Bucket","Chicken",1390,"Golden crispy chicken pieces to share.","photo-1626082927389-6cd097cdc6ec"],
["Hot Wings (6 pcs)","Chicken",790,"Spicy, sticky and seriously satisfying.","photo-1608039829572-78524f79c4c7"],
["Chicken Strips","Chicken",690,"Tender strips with a crunchy coating.","photo-1562967914-608f82629710"],
["Loaded Fries","Sides",590,"Fries topped with cheese sauce & seasoning.","photo-1573080496219-bb080dd4f877"],
["Masala Fries","Sides",350,"Crispy fries with our signature masala.","photo-1630384060421-cb20d0e0649d"],
["Mozzarella Sticks","Sides",650,"Golden crumb with gooey mozzarella inside.","photo-1531749668029-2db88e4276c7"],
["Chicken Wrap","Wraps",690,"Grilled chicken, fresh salad & creamy sauce.","photo-1626700051175-6818013e1d4f"],
["Crispy Zinger Wrap","Wraps",750,"Crunchy chicken wrapped with fresh crunch.","photo-1626700051175-6818013e1d4f"],
["Chocolate Shake","Drinks",450,"Thick, cold and chocolatey.","photo-1572490122747-3968b75cc699"],
["Fresh Lemonade","Drinks",250,"A refreshing citrus cooler.","photo-1513558161293-cadef6efe4a9"],
["Cold Coffee","Drinks",390,"Chilled coffee with a creamy finish.","photo-146大"],
["Chocolate Brownie","Desserts",390,"Rich chocolate brownie, soft in the middle.","photo-1606313564200-e75d5e30476c"],
["Classic Sundae","Desserts",350,"Cool, creamy dessert with chocolate drizzle.","photo-1563805042-7684c019e1cb"]
];
const fallbackImages=["photo-1568901346375-23c9450c58cd","photo-1550547660-d9450f859349","photo-1626082927389-6cd097cdc6ec","photo-1573080496219-bb080dd4f877","photo-1628840042765-356cda07504e","photo-1606755962773-d324e0a13086"];
const imageMap={"photo- burger":"photo-1561758033-d89a9ad46330","photo- pizza":"photo-1571407970349-bc81e7e96d47","photo- chickenpizza":"photo-1571407970349-bc81e7e96d47","photo-146大":"photo-1461023058943-07fcbe16d735"};
let cart=[];
const grid=document.getElementById("menuGrid");
function render(category="All"){grid.innerHTML="";products.forEach((p,i)=>{if(category!=="All"&&p[1]!==category)return;let id=imageMap[p[4]]||p[4];let card=document.createElement("article");card.className="food-card";card.innerHTML=`<img loading="lazy" src="https://images.unsplash.com/${id}?auto=format&fit=crop&w=650&q=80" alt="${p[0]}" onerror="this.src='https://images.unsplash.com/${fallbackImages[i%fallbackImages.length]}?auto=format&fit=crop&w=650&q=80'"><div class="food-info"><span class="food-category">${p[1].toUpperCase()}</span><h3>${p[0]}</h3><p>${p[3]}</p><div class="food-bottom"><span class="food-price">Rs ${p[2].toLocaleString("en-PK")}</span><button class="add-btn" aria-label="Add ${p[0]}" data-add="${i}">+</button></div></div>`;grid.appendChild(card)})}
document.getElementById("filters").addEventListener("click",e=>{let b=e.target.closest("button[data-category]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.category)});
grid.addEventListener("click",e=>{let b=e.target.closest("[data-add]");if(!b)return;let i=Number(b.dataset.add),found=cart.find(x=>x.i===i);found?found.qty++:cart.push({i,qty:1});updateCart()});
function updateCart(){let count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+products[x.i][2]*x.qty,0);document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent="Rs "+total.toLocaleString("en-PK");document.getElementById("cartFab").classList.toggle("show",count>0);document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><span>${products[x.i][0]} × ${x.qty}</span><b>Rs ${(products[x.i][2]*x.qty).toLocaleString("en-PK")}</b><button data-remove="${x.i}">REMOVE</button></div>`).join(""):"<p>Your cart is empty. Add something delicious!</p>"}
document.getElementById("cartItems").addEventListener("click",e=>{let b=e.target.closest("[data-remove]");if(!b)return;cart=cart.filter(x=>x.i!==Number(b.dataset.remove));updateCart()});
const modal=document.getElementById("cartModal");function openCart(){modal.classList.add("open");modal.setAttribute("aria-hidden","false")}function closeCart(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("cartFab").addEventListener("click",openCart);document.getElementById("closeCart").addEventListener("click",closeCart);modal.addEventListener("click",e=>{if(e.target===modal)closeCart()});
document.getElementById("orderForm").addEventListener("submit",e=>{e.preventDefault();if(!cart.length){alert("Please add an item to your order first.");return}let f=new FormData(e.target),lines=cart.map(x=>`${products[x.i][0]} x ${x.qty} — Rs ${products[x.i][2]*x.qty}`).join("\n"),total=cart.reduce((s,x)=>s+products[x.i][2]*x.qty,0);let body=`NEW MR FOODIE ORDER\n\nCustomer: ${f.get("customer")}\nPhone: ${f.get("phone")}\nDelivery address: ${f.get("address")}\n\nORDER:\n${lines}\n\nEstimated total: Rs ${total}\n\nSpecial instructions: ${f.get("notes")||"None"}\n\nPlease contact the customer to confirm availability, delivery charges and final total.`;let url="https://mail.google.com/mail/?view=cm&fs=1&to=mrfoodieglobal%40gmail.com&su="+encodeURIComponent("New Mr Foodie Order")+"&body="+encodeURIComponent(body);window.open(url,"_blank","noopener");});
document.querySelector(".menu-toggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));document.getElementById("year").textContent=new Date().getFullYear();render();