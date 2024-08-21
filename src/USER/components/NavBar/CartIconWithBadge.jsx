import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchCartItems } from '../../store/slices/cartSlice';
import { setCartItemCount } from '../../store/slices/cartCountSlice';
import GlobalAxios from '../../../../Global/GlobalAxios';

const CartIconWithBadge = () => {
  const itemsCount = useSelector((state) => state.cartCount.count);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialCartItems = async () => {
      const response = await GlobalAxios.get("/cart");
      const carts = response.data.data.carts;
      console.log(carts);
    };

    fetchInitialCartItems();
  }, [dispatch]);

  return (
    <div className="relative">
      <FaShoppingCart size={24} />
      {itemsCount > 0 && (
        <span className="absolute w-[18px] h-[18px] top-[-5px] right-[-10px] bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
          {itemsCount}
        </span>
      )}
    </div>
  );
};

export default CartIconWithBadge;