// Bu yerda tashqi elementlarni o'zgaruvchilarga tayinlab belgilab olamiz
import { category, products } from "./json.js";
const body = document.querySelector("body")
const leatesCategory = document.querySelector(".leates__category")
const leatesCard = document.querySelector(".leates__tabs")
const switchMode = document.querySelector(".switchMode")

// Local storagega malumotlarni set qilish va get qilish uchun ishlayabdi bu yerda
const saveStorege = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStorege = (key) => {
  const data = JSON.parse(localStorage.getItem(key))
  return data
}

let newArr = getStorege("wishlist") || [];


// Bu yerda saytda bir marta ishlatiladigan kodlar yozilgan buning vazifasi localStrogedan thame statusini olish uchun ishlatilyabdi
(() => {
  const theme = getStorege("theme");
  if (theme) {
    body.classList.add(theme)
  }
})();
//  Bu yerda switch button dark light modeni 
switchMode.addEventListener("click", () => {
  const data = body.classList.toggle("dark")
  if (data) {
    saveStorege("theme", "dark")
  } else {
    saveStorege("theme", "light")
  }

})
/// Saytdagi sablarni dinamik qilish uchun ishlatilyabdi
const render = () => {
  leatesCategory.innerHTML = category.map((item) =>
    `<li class="category__item" data-key="${item}">${item}</li>`
  ).join("")
}
render()
/// Tanlangan productlarni html ga chizish uchun ishlatilyabdi
let data;
const renderProduct = (key) => {
  const found = products.find((item) => item.title === key);
  // bu yerda find elementni tekshiryabdi
  if (!found) return;
  data = found.product
  leatesCard.innerHTML = data.map((item) => {
    return `
    <a href="#" class="addEvent">
<div class="leates__card">
  <img src="${item.img}" alt="Leates category img" />
                <div class="leates__card-content">
                  <span class="leates__card-title">${item.name}</span>
                  <span class="addWish" data-key="${item.id}">+</span>
                  <span class="leates__card-cost"
                    >$${item.priceSale} <span class="sale">$${item.totalPrice}</span></span
                  >
                </div> 
</div>
  </a>
`
  }).join("")

  updateWishlistClass()
};
///Bu yerda tabdagi buttonlarni bosganda osha malumotlar  chiqishi uchun  ishlatilyabdi
const findClick = function () {
  leatesCategory.addEventListener("click", (e) => {
    const targetBtn = e.target.getAttribute("data-key");
    if (!targetBtn) return;
    document.querySelectorAll(".category__item").forEach(el => el.classList.remove("tabActive"));
    e.target.classList.add("tabActive");

    renderProduct(targetBtn)
  })
}
findClick()
// Buyerda bosilgan elementga active class qo'shiladi


render()
renderProduct(category[0]);
/// bu yerda bosilgan elementlarni newArr ga push qiladi

leatesCard.addEventListener("click", (e) => {  /// bu yerda funcsiya event bo'lganda ishlaydi
  const wishBtn = e.target.closest(".addWish"); /// bosilgan elementni tanib olyabdi
  if (!wishBtn) return; /// egar boshqa joyni bosgan bo'lsa ishlamaydi bu
  const id = wishBtn.getAttribute("data-key");   // data keyini olib olyabdi bu takrorlanmas qiymat
  // ID wishlistda borligini tekshiramiz
  const alreadyExists = newArr.some(obj => obj.id == id);

  if (alreadyExists) {
    ///borbo'lsa ochiradi 
    newArr = newArr.filter(obj => obj.id != id);
    wishBtn.classList.remove("wishActive");
  } else {
    //yo'q bo'lsa qo'shamiz
    newArr.push({ id });
    wishBtn.classList.add("wishActive");
  }
  saveStorege("wishlist", newArr);

  // wishBtn.classList.add("wishActive"); ///  bu active class qo'shyabdi 
  // newArr.push({ id }) /// bu yerda bosilgan elementni arrayga push qilyabdi yani keyinchalik ishlashi uchun ham
  // saveStorege("wishlist", newArr); ///local storega saqlab qo'yyabdi 
  // if (e.target.classList === "wishActive") {
  //   newArr = newArr.filter((obj) => obj.id !== Number(e.target.getAttribute("data-key")));
  //   wishBtn.classList.remove("wishActive");
  //   render()
  // }

});
function updateWishlistClass() {
  const addWish = document.querySelectorAll(".addWish")
  for (let i = 0; i < newArr.length; i++) {
    const arrId = newArr[i].id;
    for (let a = 0; a < data.length; a++) {
      const defArrId = data[a].id;
      if (defArrId == arrId) {
        addWish.forEach(btn => {
          if (btn.getAttribute("data-key") == defArrId) {
            btn.classList.add("wishActive")
          }
        })
      }
    }
  }

};