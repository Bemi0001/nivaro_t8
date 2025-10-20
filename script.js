/******BURGERMENU*******/
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.menu-overlay').classList.add('active');
});

document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.menu-overlay').classList.remove('active');
});
/******BURGERMENU*******/

/*********productsite***********/
   
document.querySelector('header h1').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Get the category from the body data attribute
const category = document.body.getAttribute('data-category');
const apiUrl = `https://dummyjson.com/products/category/${category}`;

// DOM elements
const grid = document.getElementById('product-grid');
const filterLink = document.getElementById('filter-by-brand');
const pageHeading = document.querySelector('.page-heading');
let currentFilter = null;


fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const products = data.products;

        // Extract unique brands
        const brands = [...new Set(products.map(product => product.brand))];

        
        function displayProducts(filteredProducts = products) {
            grid.innerHTML = '';
            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="price">PRICE: ${product.price}€</div>
                    <img src="${product.images[0]}" alt="${product.title}">
                    <h3 class="product-name">${product.title.toUpperCase()}</h3>
                `;
                card.addEventListener('click', () => {
                    window.location.href = `product.html?id=${product.id}`;
                });
                grid.appendChild(card);
            });
        }

        
        filterLink.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = document.querySelector('.brand-filter');
            if (dropdown) {
                dropdown.remove(); 
                return;
            }
            if (document.querySelector('.brand-filter')) return; 

            const newDropdown = document.createElement('div');
            newDropdown.className = 'brand-filter';
            newDropdown.innerHTML = brands.map(brand => `
                <a href="#" class="brand-option" data-brand="${brand}">${brand}</a>
            `).join('');
            filterLink.parentNode.appendChild(newDropdown);

            document.querySelectorAll('.brand-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    const brand = e.target.getAttribute('data-brand');
                    currentFilter = brand;
                    filterLink.textContent = `FILTER BY BRAND: ${brand}`;
                    const filteredProducts = products.filter(p => p.brand === brand);
                    displayProducts(filteredProducts);
                    newDropdown.remove();
                });
            });

            
            const resetOption = document.createElement('a');
            resetOption.href = '#';
            resetOption.className = 'brand-option';
            resetOption.textContent = 'Reset';
            resetOption.addEventListener('click', (e) => {
                e.preventDefault();
                currentFilter = null;
                filterLink.textContent = 'FILTER BY BRAND';
                displayProducts();
                newDropdown.remove();
            });
            newDropdown.appendChild(resetOption);
        });

       
        pageHeading.addEventListener('click', () => {
            if (currentFilter !== null || document.querySelector('.brand-filter')) {
                currentFilter = null;
                filterLink.textContent = 'FILTER BY BRAND';
                displayProducts();
                const dropdown = document.querySelector('.brand-filter');
                if (dropdown) dropdown.remove();
            }
        });

        
        displayProducts();
    })
    .catch(error => console.error('Error loading products:', error));
    /*********productsite***********/