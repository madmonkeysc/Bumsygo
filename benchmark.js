const allProducts = Array.from({ length: 100000 }).map((_, i) => ({
  name: `Product ${i} XYZ ABC`,
  category: 'Category'
}));

const searchTerm = 'PRODUCT 500';
let activeCategory = 'Category';

console.time('Before');
for (let i = 0; i < 100; i++) {
  allProducts.filter(p => {
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}
console.timeEnd('Before');

console.time('After');
for (let i = 0; i < 100; i++) {
  const lowerSearchTerm = searchTerm.toLowerCase();
  allProducts.filter(p => {
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(lowerSearchTerm);
    return matchesCategory && matchesSearch;
  });
}
console.timeEnd('After');
