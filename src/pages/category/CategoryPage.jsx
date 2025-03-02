import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import MyContext from '../../context/myContext';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';

const CategoryPage = () => {
    const navigate = useNavigate();
    const { categoryname } = useParams();
    const context = useContext(MyContext);
    const { getAllProduct, loading } = context;

    // Filter Product
    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart")
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])
    return (
        <Layout>
            <div>
                {/* Heading */}
                <div className='mt-10'>
                    <h1 className="text-center mb-5 text-2xl font-semibold">{categoryname}</h1>
                </div>
                {
                    loading ?
                        <div className='flex justify-center'>
                            <Loader />
                        </div>
                        :
                        < section >
                            <div className="container px-5 py-5 mx-auto">
                                <div className="flex flex-wrap -m-4 justify-center">
                                    {filterProduct.length > 0 ?
                                        <>
                                            {filterProduct.map((item, index) => {
                                                const { id, title, price, productImageUrl } = item;
                                                return (
                                                    <div key={index} className="p-4 w-full md:w-1/4">
                                                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                            <img
                                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                                className="h-96 lg:h-80 w-full" src={productImageUrl} alt="img" />
                                                            <div className="p-6">
                                                                <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">E-Bharat</h2>
                                                                <h1 className="text-lg font-medium text-gray-900 mb-3">{title.slice(0, 25)}</h1>
                                                                <h1 className="text-lg font-medium text-gray-900 mb-3"> ₹{price}</h1>

                                                                <div className='flex justify-center'>
                                                                    {cartItems.some((p) => p.id === item.id) ?
                                                                        <button
                                                                            onClick={() => deleteCart(item)}
                                                                            className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px]"
                                                                        >
                                                                            Delete From Cart
                                                                        </button>
                                                                        :
                                                                        <button
                                                                            onClick={() => addCart(item)}
                                                                            className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px]"
                                                                        >
                                                                            Add To Cart
                                                                        </button>
                                                                    }
                                                                </div>
                                                                {/* <div className="flex justify-center">
                                                                    <button className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                                        Add To Cart
                                                                    </button>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                        :
                                        <>
                                            <div>
                                                <div className="flex justify-center">
                                                    <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                                </div>
                                                <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        </section>
                }
            </div>
        </Layout >
    )
}

export default CategoryPage