import { generateShoppingList } from './generateShoppingList.js';
import { MEALS, CATEGORY_ORDER } from '../resources/ingredients.js';

// Group meals by category
const categoryMeals = {};
Object.entries(MEALS).forEach(([mealName, { category }]) => {
  if (!categoryMeals[category]) categoryMeals[category] = [];
  categoryMeals[category].push(mealName);
});

// Build meal cards in explicit category order
const container = document.getElementById('meal-options');
CATEGORY_ORDER.forEach((category) => {
  const meals = (categoryMeals[category] || []).sort();

  const heading = document.createElement('h2');
  heading.textContent = category;
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'grid-container';

  meals.forEach((meal) => {
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.dataset.value = meal;

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = `images/meals/${meal}.jpg`;
    img.alt = meal;

    const title = document.createElement('div');
    title.className = 'meal-title';
    title.textContent = meal;

    card.appendChild(img);
    card.appendChild(title);
    grid.appendChild(card);
  });

  container.appendChild(grid);
});

// Wire up event handlers on the generated cards
document.querySelectorAll('.meal-card').forEach((card) => {
  card.dataset.count = '0';

  const deselectBtn = document.createElement('button');
  deselectBtn.className = 'deselect-btn';
  deselectBtn.innerHTML = 'x';
  deselectBtn.title = 'Deselect meal';
  deselectBtn.setAttribute('aria-label', 'Deselect meal');
  card.appendChild(deselectBtn);

  const counterBadge = document.createElement('div');
  counterBadge.className = 'counter-badge';
  counterBadge.textContent = '2';
  counterBadge.title = 'Click to add more people';
  card.appendChild(counterBadge);

  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('deselect-btn')) return;
    let count = parseInt(card.dataset.count);
    count = count === 0 ? 2 : count + 1;
    card.dataset.count = count;
    counterBadge.textContent = count;
    card.classList.add('selected');
    generateShoppingList();
  });

  deselectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.remove('selected');
    card.dataset.count = '0';
    counterBadge.textContent = '2';
    generateShoppingList();
  });
});
