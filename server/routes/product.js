import { getProductByCondition, sendProductToDB, getAllProducts, getExactProductByCategory, getExactProductByCategorySlug, searchProduct, likeProduct, dislikeProduct, getIsFeaturedProducts, getSavedProducts, deleteProduct, createNewProduct } from "../controllers/product.js";
import express from 'express'
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router()

router.post('/sendproducts', sendProductToDB)

router.get('/condition', getProductByCondition)
router.get('/', getAllProducts)
router.get('/:categoryName', getExactProductByCategory)
router.get('/title/:slugTitle', getExactProductByCategorySlug)
router.get('/search/product', searchProduct)
router.get('/featured/product', getIsFeaturedProducts)
router.put('/:productId/like', verifyToken, likeProduct)
router.put('/:productId/dislike', verifyToken, dislikeProduct)
router.get('/usersaved/:username', verifyToken, getSavedProducts)
//delete
router.delete('/delete/:id', verifyToken, deleteProduct)
//create product
router.post('/create', verifyToken, createNewProduct)


export default router