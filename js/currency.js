// Currency conversion rates (to be updated with real-time rates in production)
const conversionRates = {
    EUR: 1,
    USD: 1.18,
    GBP: 0.86,
    BTC: 0.000028
};

// Currency symbols
const currencySymbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    BTC: '₿'
};

// Store the selected currency in localStorage
let currentCurrency = localStorage.getItem('selectedCurrency') || 'EUR';

// Initialize currency handling
function initCurrencySelector() {
    const currencyToggle = document.querySelector('.currency-toggle');
    const currencyDropdown = document.querySelector('.currency-dropdown');
    const currencyOptions = document.querySelectorAll('.currency-option');
    const currentCurrencySpan = document.querySelector('.current-currency');

    // Set initial currency display
    currentCurrencySpan.textContent = currentCurrency;
    
    // Mark the currently selected currency in the dropdown
    updateSelectedCurrency(currentCurrency);
    
    // Initially update all prices
    updateAllPrices(currentCurrency);

    // Toggle dropdown
    currencyToggle.addEventListener('click', () => {
        const isExpanded = currencyToggle.getAttribute('aria-expanded') === 'true';
        currencyToggle.setAttribute('aria-expanded', !isExpanded);
        currencyDropdown.classList.toggle('hidden');
        
        // If we're opening the dropdown, focus the first option
        if (!isExpanded) {
            const firstOption = currencyDropdown.querySelector('.currency-option');
            if (firstOption) {
                firstOption.focus();
            }
        }
    });

    // Keyboard support for toggle
    currencyToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const isExpanded = currencyToggle.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded) {
                // Open dropdown and focus first/last item
                currencyToggle.setAttribute('aria-expanded', true);
                currencyDropdown.classList.remove('hidden');
                
                const options = currencyDropdown.querySelectorAll('.currency-option');
                const targetOption = e.key === 'ArrowUp' ? options[options.length - 1] : options[0];
                targetOption.focus();
            } else {
                // Close dropdown
                currencyToggle.setAttribute('aria-expanded', false);
                currencyDropdown.classList.add('hidden');
            }
        }
    });

    // Handle currency selection
    currencyOptions.forEach((option, index) => {
        // Add keyboard navigation between options
        option.addEventListener('keydown', (e) => {
            const options = Array.from(currencyOptions);
            
            // Handle arrow keys for navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                
                const currentIndex = options.indexOf(option);
                const direction = e.key === 'ArrowDown' ? 1 : -1;
                const nextIndex = (currentIndex + direction + options.length) % options.length;
                
                options[nextIndex].focus();
            }
            
            // Handle Escape to close dropdown
            if (e.key === 'Escape') {
                currencyToggle.setAttribute('aria-expanded', false);
                currencyDropdown.classList.add('hidden');
                currencyToggle.focus();
            }
            
            // Handle Enter or Space to select
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });
        
        option.addEventListener('click', () => {
            const newCurrency = option.dataset.currency;
            const newSymbol = option.dataset.symbol;
            
            // Update display
            currentCurrencySpan.textContent = newCurrency;
            currentCurrency = newCurrency;
            
            // Update selected class
            updateSelectedCurrency(newCurrency);
            
            // Save selection
            localStorage.setItem('selectedCurrency', newCurrency);
            
            // Update prices
            updateAllPrices(newCurrency);
            
            // Close dropdown
            currencyDropdown.classList.add('hidden');
            currencyToggle.setAttribute('aria-expanded', 'false');
            
            // Return focus to toggle button
            currencyToggle.focus();
            
            // Announce currency change to screen readers
            announceMessage(`Currency changed to ${newCurrency}`);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.currency-selector')) {
            currencyDropdown.classList.add('hidden');
            currencyToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Helper to update the visual indication of selected currency
function updateSelectedCurrency(currency) {
    const options = document.querySelectorAll('.currency-option');
    options.forEach(option => {
        if (option.dataset.currency === currency) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Update all prices on the page
function updateAllPrices(newCurrency) {
    const priceElements = document.querySelectorAll('[data-price-usd]');
    
    priceElements.forEach(element => {
        const usdPrice = parseFloat(element.dataset.priceUsd);
        if (!isNaN(usdPrice)) {
            // Convert USD price to EUR first (since our base prices are in USD)
            const eurPrice = usdPrice / conversionRates.USD;
            // Then convert EUR price to target currency
            const convertedPrice = convertPrice(eurPrice, newCurrency);
            element.textContent = formatPrice(convertedPrice, newCurrency);
        }
    });
}

// Convert price to selected currency
function convertPrice(amount, currency) {
    return amount * conversionRates[currency];
}

// Format price with currency symbol
function formatPrice(amount, currency) {
    const symbol = currencySymbols[currency];
    
    if (currency === 'BTC') {
        // Show more decimal places for BTC
        return `${symbol}${amount.toFixed(6)}`;
    }
    
    return `${symbol}${amount.toFixed(2)}`;
}

// Helper function to announce messages to screen readers
function announceMessage(message) {
    const announcer = document.getElementById('sr-announcer');
    
    // Create announcer element if it doesn't exist
    if (!announcer) {
        const newAnnouncer = document.createElement('div');
        newAnnouncer.id = 'sr-announcer';
        newAnnouncer.className = 'sr-only';
        newAnnouncer.setAttribute('aria-live', 'polite');
        newAnnouncer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(newAnnouncer);
    }
    
    // Populate announcer with message
    const live = document.getElementById('sr-announcer') || announcer;
    live.textContent = message;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCurrencySelector);

// Export functions for use in other scripts
window.currencyConverter = {
    convertPrice,
    formatPrice,
    updateAllPrices
}; 