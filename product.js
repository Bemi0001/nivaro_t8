
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        
        const productName = document.getElementById('product-name');
        productName.textContent = product.title.toUpperCase();

        
        const productImages = document.getElementById('product-images');
        productImages.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="main-image">
            <div class="additional-images">
                ${product.images.slice(1).map(img => `<img src="${img}" alt="${product.title}" class="extra-image">`).join('')}
            </div>
        `;

       
        const productDescription = document.getElementById('product-description');
        productDescription.textContent = product.description;
    })
    .catch(error => console.error('Error loading product:', error));