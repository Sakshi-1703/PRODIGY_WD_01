//SAKSHI<*_*>
// NAVIGATION
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});



// BUY NOW NAVIGATION
const buyButtons = document.querySelectorAll('#features .btn');

buyButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        const pricingSection = document.querySelector('#pricing');
        const headerHeight = document.querySelector('header').offsetHeight;

        window.scrollTo({
            top: pricingSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});


// ORDER SUMMARY
const productSelect = document.querySelector('#buyers .buyer-form select');
const productName = document.querySelector('#buyers .buyer-summary .product-name');
const productPrice = document.querySelector('#buyers .buyer-summary .product-price');
const totalPrice = document.querySelector('#buyers .buyer-summary .total-price');

const pricingCards = Array.from(document.querySelectorAll('#pricing .pricing-card'));

productSelect.addEventListener('change', () => {
    const selectedProduct = productSelect.value;
    const selectedPricingCard = pricingCards.find(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        return cardTitle === selectedProduct;
    });

    if (selectedPricingCard) {
        const productPriceValue = selectedPricingCard.querySelector('.price').textContent.replace('$', '');
        productName.textContent = selectedProduct === 'veg' ? 'Organic Vegetables' : selectedProduct === 'fruit' ? 'Fresh Fruits' : 'Dairy Products';
        productPrice.textContent = `$${productPriceValue}`;
        totalPrice.textContent = `$${productPriceValue}`;
    } else {
        productName.textContent = '-';
        productPrice.textContent = '-';
        totalPrice.textContent = '-';
    }
});


//REVIEWS
const stars = document.querySelectorAll('.star');
const reviewForm = document.querySelector('.review-form');
const reviewList = document.querySelector('.review-list');

let currentRating = 0;

//STARS
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    currentRating = index + 1;
    updateStars();
  });

  star.addEventListener('mouseover', () => {
    highlightStars(index);
  });

  star.addEventListener('mouseout', () => {
    updateStars();
  });
});

function updateStars() {
  stars.forEach((star, index) => {
    if (index < currentRating) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
}

function highlightStars(index) {
  stars.forEach((star, starIndex) => {
    if (starIndex <= index) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
}

//SUBMIT
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const reviewText = reviewForm.querySelector('textarea').value.trim();

  if (reviewText) {
    const review = createReviewElement(currentRating, reviewText);
    reviewList.appendChild(review);
    reviewForm.reset();
    currentRating = 0;
    updateStars();
  }
});

//CREATE REVIEW                                            .....................BUYERS PAGE
function createReviewElement(rating, text) {
  const reviewElement = document.createElement('div');
  reviewElement.classList.add('review');

  const ratingElement = document.createElement('div');
  ratingElement.classList.add('rating');

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = '&#9733;';
    if (i <= rating) {
      star.classList.add('filled');
    }
    ratingElement.appendChild(star);
  }

  const reviewTextElement = document.createElement('p');
  reviewTextElement.classList.add('review-text');
  reviewTextElement.textContent = text;

  const reviewAuthorElement = document.createElement('p');
  reviewAuthorElement.classList.add('review-author');
  reviewAuthorElement.textContent = 'by Anonymous';

  reviewElement.appendChild(ratingElement);
  reviewElement.appendChild(reviewTextElement);
  reviewElement.appendChild(reviewAuthorElement);

  return reviewElement;
}