import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

/**
 * Checks if a product has a buybox on Amazon.
 *
 * @param {string} asin - ASIN of the product to check.
 * @returns {Promise<boolean} - Returns true if product has a buybox; false if no buybox.
 */

const hasBuyBox = async (asin) => {
  const url = `https://api.keepa.com/product?key=${API_KEY}&domain=1&asin=${asin}&stats=1`; // checks stats for last # of days.

  try {
    const response = await axios.get(url);
    const product = response.data.products[0];

    if (product && product.stats) {
      const buyBoxId = product.stats.buyBoxSellerId;

      return buyBoxId !== -1 && buyBoxId !== -2 && buyBoxId !== null;
    } else {
      console.log("Product data or stats not found.");
      return false;
    }
  } catch (err) {
    console.error(`Error fetching product data:`, err);
  }
};

hasBuyBox(process.env.ASIN).then((hasBox) => {
  console.log(`Has Buy Box: ${hasBox}`);
});

export default hasBuyBox;
