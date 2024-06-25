let products = [];

function toCheck() {
    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const value = document.getElementById("value").value.trim();
    const available = document.getElementById("available").value;

    if (!name) {
        alert("O nome do produto é obrigatório.");
        return false;
    }
    if (!value || isNaN(value) || value <= 0) {
        alert("O valor do produto deve ser um número positivo.");
        return false;
    }
    if (!available) {
        alert("Por favor, selecione a disponibilidade do produto.");
        return false;
    }

    return true;
}

function truncateDescription(description) {
    const maxLength = 10; // Apenas os primeiros 10 caracteres visíveis na tabela
    if (description.length > maxLength) {
        return `${description.slice(0, maxLength)}... <span class="show-more" onclick="expandDescription(this)">Ver Mais</span>`;
    }
    return description;
}

function expandDescription(element) {
    const tr = element.closest('tr');
    const descriptionCell = tr.querySelector('.description-cell');
    const fullDescription = products.find(product => product.id === tr.dataset.productId).description;
    descriptionCell.innerHTML = `${fullDescription} <span class="show-less" onclick="collapseDescription(this)">Ver Menos</span>`;
}

function collapseDescription(element) {
    const tr = element.closest('tr');
    const descriptionCell = tr.querySelector('.description-cell');
    const truncatedDescription = truncateDescription(products.find(product => product.id === tr.dataset.productId).description);
    descriptionCell.innerHTML = truncatedDescription;
}

function productRender() {
    const table = document.getElementById("prod-tbody");
    table.innerHTML = "";

    if (products.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Sem itens";
        tr.appendChild(td);
        table.appendChild(tr);
        return;
    }

    products.sort((a, b) => a.value - b.value);

    products.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.dataset.productId = item.id;
        tr.classList.add(index % 2 === 0 ? 'even-row' : 'odd-row');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td class="description-cell">
                ${truncateDescription(item.description)}
            </td>
            <td >R$ ${item.value.toFixed(2)}</td>
            <td><button class="delete-button" onclick="deleteProduct('${item.id}')">Excluir</button></td>
        `;
        table.appendChild(tr);
    });
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    productRender();
}

function addProduct() {
    if (!toCheck()) {
        return;
    }
    const product = {
        id: Math.floor(Math.random() * 1000).toString(),
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        value: parseFloat(document.getElementById("value").value),
        available: document.getElementById("available").value
    };

    products.push(product);
    productRender();
    document.getElementById("form-produto").reset();
}
