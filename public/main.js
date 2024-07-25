const socket = io();

// Escucha mensajes del servidor
socket.on("message", (message) => {
    console.log("Mensaje del servidor:", message);
});
// Escuchar la lista actualizada de productos del servidor
socket.on("productsUpdated", (products) => {
    console.log("Lista actualizada de productos:", products);
    renderProductList(products); // Llama a una función para renderizar la lista de productos
});

// Manejar el envío del formulario
document.getElementById("productForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío del formulario de la manera tradicional

    // Capturar los valores de los campos del formulario
    const title = document.getElementById("title").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value || null;
    const description = document.getElementById("description").value || null;
    const stock = document.getElementById("stock").value || null;

    const productData = {
        title,
        code,
        price,
        category,
        description,
        stock,
    };

    console.log("productData", productData);
    // Enviar los datos al servidor mediante socket
    socket.emit("newProduct", productData);

    // Limpiar el formulario después de enviar
    document.getElementById("productForm").reset();
});

// Escuchar la lista actualizada de productos del servidor
socket.on("productsUpdated", (products) => {
    console.log("Lista actualizada de productos:", products);
});

// Enviar mensaje al servidor (ejemplo de chat)
document.getElementById("sendMessage").addEventListener("click", () => {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    socket.emit("chatMessage", message);
    messageInput.value = "";
});

function renderProductList(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Limpiar la tabla antes de agregar los nuevos productos

    products.products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product._id}</td>
            <td>${product.title}</td>
            <td>${product.code}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.available ? "Activo" : "Inactivo"}</td>
            <td>${product.thumbnails}</td>
        `;
        productList.appendChild(row);
    });

    updatePaginationUI(products.pagination);
}

function updatePaginationUI(pagination) {
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = "";

    const { currentPage, totalPages, prevLink, nextLink } = pagination;

    if (totalPages > 1) {
        const prevButton = createPaginationButton(
            "Anterior",
            prevLink,
            currentPage > 1
        );
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createPaginationButton(
                i.toString(),
                `?page=${i}`,
                true,
                currentPage === i
            );
            paginationContainer.appendChild(pageButton);
        }

        const nextButton = createPaginationButton(
            "Siguiente",
            nextLink,
            currentPage < totalPages
        );
        paginationContainer.appendChild(nextButton);
    }
}

function createPaginationButton(text, link, isEnabled, isActive = false) {
    const button = document.createElement("button");
    button.className = `page-link ${isActive ? "active" : ""}`;
    button.textContent = text;

    if (isEnabled) {
        button.addEventListener("click", () => {
            window.location.href = link;
        });
    } else {
        button.disabled = true;
    }

    return button;
}
