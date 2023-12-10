"use client";

import axios from "axios";

export default async function dummyToMongodb() {
  const dummyRes = await axios.get("https://dummyjson.com/products?limit=100");
  console.log("dummy products:", dummyRes.data.products);

  const handlePost = async (p, i) => {
    const randomNum = Math.floor(Math.random() * 500);
    const randomRating = Math.random() * (5 - 2) + 2;
    const randomDecimal = Math.floor(Math.random() * (99 - 89) + 89);
    const isOnSale = Math.floor(Math.random() * 4) === 2 ? true : false;
    const onetwo = Math.floor(Math.random() * 10) < 5 ? 1 : 2;
    const xtraBio =
      "                Dit is een bio die u persoonlijk kan veranderen als u mij inhuurt :)              " +
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima inventore ullam non quis, consequatur illum doloremque omnis repudiandae quasi, beatae, facere repellendus saepe officia asperiores? Aliquam eligendi et animi libero omnis laborum facilis! Laborum rem accusamus cupiditate repellat vitae quae tempore iusto voluptate sed itaque nam amet neque optio porro, quod perspiciatis animi tenetur dolorem natus doloremque. Voluptatum nam libero beatae magni atque quis inventore aliquam ad? Placeat, nesciunt saepe expedita ut sit, praesentium corporis, consequuntur possimus fugiat cupiditate provident. Saepe deserunt necessitatibus alias doloribus eum, asperiores soluta cumque aperiam labore repellat inventore esse magnam, qui dolorum? Quibusdam nobis consequatur odit autem distinctio quidem magnam totam eveniet aliquam. Deleniti dicta omnis incidunt, earum sequi iste autem, magni nemo eveniet molestiae quibusdam nisi modi! Nesciunt perspiciatis laborum doloribus hic corrupti, autem nisi amet architecto necessitatibus numquam. Possimus, recusandae! Fugiat, officia, non, quidem libero molestiae esse voluptates expedita minima dolorum accusamus ducimus.";

    const product = {
      title: p.title,
      price: p.price,
      priceDecimal: randomDecimal,
      desc: p.description + xtraBio,
      category: p.category,
      categoryImg:
        "https://s.s-bol.com/nl/upload/images/visual-categories/14035.jpg",
      thumbnail: p.thumbnail,
      images: p.images,
      reviewsAmnt: randomNum,
      starRating: randomRating,
      brand: p.brand,
      onSale: isOnSale
        ? {
            newPrice: Math.floor(p.price - p.price / 10),
            newPriceDecimal: randomDecimal,
            percent: 10,
          }
        : undefined,
      stock: p.stock,
      deliveryTime: onetwo,
      extraInfo: ["extra", "informatie", "over", "product"],
    };
    const mongodbRes = await axios.post(
      "http://localhost:3001/api/v1/products",
      product
    );
    console.log("mongoDB response " + i + ":", mongodbRes);
  };

  dummyRes.data &&
    dummyRes.data.products.map((product, index) => handlePost(product, index));

  return;
}
