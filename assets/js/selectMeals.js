import { generateShoppingList } from './generateShoppingList.js';

const mealCards = document.querySelectorAll('.meal-card');

mealCards.forEach(card => {
  // Initialize count data attribute
  card.dataset.count = '0';

  // Create and add deselect button
  const deselectBtn = document.createElement('button');
  deselectBtn.className = 'deselect-btn';
  deselectBtn.innerHTML = 'x';
  deselectBtn.title = 'Deselect meal';
  card.appendChild(deselectBtn);

  // Create counter badge
  const counterBadge = document.createElement('div');
  counterBadge.className = 'counter-badge';
  counterBadge.textContent = '2';
  counterBadge.title = 'Click to add more people';
  card.appendChild(counterBadge);

  // Handle card click to select/increment
  card.addEventListener('click', (e) => {
    // Don't handle if clicking deselect button
    if (e.target.classList.contains('deselect-btn')) {
      return;
    }
    
    let count = parseInt(card.dataset.count);
    if (count === 0) {
      // First selection, start at 2
      count = 2;
    } else {
      // Already selected, increment
      count++;
    }
    card.dataset.count = count;
    counterBadge.textContent = count;
    card.classList.add('selected');
    generateShoppingList();
  });

  // Handle deselect button click
  deselectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.remove('selected');
    card.dataset.count = '0';
    counterBadge.textContent = '2';
    generateShoppingList();
  });
});
