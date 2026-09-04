/* =====================================================
   PETCARE - ANIMACIONES DE INFORMACIÓN DEL PRODUCTO
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold:0.12
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const quantity = document.querySelector(".quantity");
    if (!quantity) return;
    const input = quantity.querySelector("input");
    const buttons = quantity.querySelectorAll("button");
    if (!input || buttons.length < 2) return;

    buttons[0].addEventListener("click", () => {
        let value = parseInt(input.value) || 1;
        if (value > 1) input.value = value - 1;
    });

    buttons[1].addEventListener("click", () => {
        let value = parseInt(input.value) || 1;
        input.value = value + 1;
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const fav = document.querySelector(".btn-favorite");
  if (!fav) return;
  fav.addEventListener("click", () => {
    const name = document.querySelector(".product-info h1")?.textContent.trim() || "Producto";
    const price = parseFloat((document.querySelector(".product-info .price")?.textContent || "0").replace(/[^0-9.]/g, "")) || 0;
    const image = document.querySelector(".product-img")?.getAttribute("src") || "";
    let list = JSON.parse(localStorage.getItem("petcareFavorites")) || [];
    const id = "product-" + name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!list.some(x => x.id === id)) list.push({id, name, category: "Productos", description: "Producto PetCare", price, image, rating: 5, reviews: 0});
    localStorage.setItem("petcareFavorites", JSON.stringify(list));
    fav.classList.toggle("active");
  });
});
