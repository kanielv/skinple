export const addToList = (product: any) => {
  try {
    // Retrieve the existing list from localStorage
    const existingList = JSON.parse(localStorage.getItem('selectedProducts') || '[]');

    // Check if the product is already in the list
    const isAlreadyInList = existingList.some(
      (item: any) => item.product_id === product.product_id
    );

    if (isAlreadyInList) {
      alert(`${product.product_name} is already in your list.`);
      return;
    }

    // Add the new product to the list
    const updatedList = [...existingList, product];
    localStorage.setItem('selectedProducts', JSON.stringify(updatedList));

    // Notify the user
    alert(`${product.product_name} has been added to your list!`);
  } catch (error) {
    console.error('Error adding product to list:', error);
    alert('An error occurred while adding the product to your list.');
  }
};