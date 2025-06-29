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

// Bu yerda saytda bir marta ishlatiladigan kodlar yozilgan buning vazifasi localStrogedan thame statusini olish uchun ishlatilyabdi
(() => {
  const theme = getStorege("theme")
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
const renderProduct = (key) => {
  const found = products.find((item) => item.title === key);
  // bu yerda find elementni tekshiryabdi
  if (!found) return;
  const data = found.product
  leatesCard.innerHTML = data.map((item) => {
    return `
    <a href="#">
<div class="leates__card">
  <img src="${item.img}" alt="Leates category img" />
                <div class="leates__card-content">
                  <span class="leates__card-title">${item.name}</span>
                  <span class="leates__card-cost"
                    >$${item.priceSale} <span class="sale">$${item.totalPrice}</span></span
                  >
                </div> 
</div>
  </a>
`
  }).join("")
}
///Bu yerda tabdagi buttonlarni bosganda osha malumotlar  chiqishi uchun  ishlatilyabdi
const findClick = function () {
  leatesCategory.addEventListener("click", (e) => {
    const targetBtn = e.target.getAttribute("data-key");
    renderProduct(targetBtn)
  })
}
findClick()

render()
renderProduct(category[0])