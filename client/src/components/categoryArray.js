export default function (data) {
  const array = [];
  const totalArray = [];

  const getArray = () => {
    data &&
      data.map((category, index) => {
        const included = array.includes(category.category);
        const image = category.categoryImg;
        !included
          ? (array.push(category.category),
            totalArray.push({ category: category.category, img: image }))
          : null;
      });
  };
  getArray();

  return totalArray ? totalArray : array;
}
