import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Phone, Mail, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { state, dispatch } = useCart();
  const { currencySymbol } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'pickup',
    discountCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Load user profile data
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUserProfile(data);
        setFormData(prev => ({
          ...prev,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          postalCode: data.postal_code || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const applyDiscountCode = async () => {
    if (!formData.discountCode.trim()) return;

    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', formData.discountCode.trim().toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error checking discount code:', error);
        setError('Грешка при проверка на кода');
        return;
      }

      if (!data) {
        setError('Невалиден код за отстъпка');
        return;
      }

      // Check if code is expired
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setError('Кодът за отстъпка е изтекъл');
        return;
      }

      setDiscountApplied(true);
      setDiscountAmount(data.discount_percent);
      setError('');
    } catch (err) {
      console.error('Error applying discount:', err);
      setError('Грешка при проверка на кода');
    }
  };

  const removeDiscount = () => {
    setDiscountApplied(false);
    setDiscountAmount(0);
    setFormData(prev => ({ ...prev, discountCode: '' }));
  };

  const calculateTotal = () => {
    const subtotal = state.total;
    const shipping = formData.paymentMethod === 'pickup' ? 0 : 0; // No shipping for pickup
    const cashFee = formData.paymentMethod === 'cash' ? 5 : 0;
    const discount = discountApplied ? (subtotal * discountAmount / 100) : 0;
    
    return {
      subtotal,
      shipping,
      cashFee,
      discount,
      total: subtotal + shipping + cashFee - discount
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const totals = calculateTotal();

      // Create order in database
      const orderData = {
        user_id: user?.id || null,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        items: state.items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        total: totals.total,
        payment_method: formData.paymentMethod
      };

      const { error: orderError } = await supabase
        .from('orders')
        .insert([orderData]);

      if (orderError) throw orderError;

      // If discount was applied, mark it as used
      if (discountApplied && formData.discountCode) {
        await supabase
          .from('discount_codes')
          .update({ is_active: false })
          .eq('code', formData.discountCode.trim().toUpperCase());
      }

      // Clear cart and redirect
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-success');
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Възникна грешка при създаването на поръчката. Моля, опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Финализиране на поръчката</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  <h3 className="text-xl font-semibold">Лични данни</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Име *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имейл *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address - Only show if not pickup */}
              {formData.paymentMethod === 'cash' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-6">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    <h3 className="text-xl font-semibold">Адрес за доставка</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Адрес *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={formData.paymentMethod === 'cash'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Град *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required={formData.paymentMethod === 'cash'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Пощенски код *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required={formData.paymentMethod === 'cash'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Discount Code */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Код за отстъпка</h3>
                
                {!discountApplied ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="discountCode"
                      value={formData.discountCode}
                      onChange={handleInputChange}
                      placeholder="Въведете код за отстъпка"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={applyDiscountCode}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Приложи
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <span className="text-green-700 font-medium">
                        Код "{formData.discountCode}" приложен - {discountAmount}% отстъпка
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeDiscount}
                      className="text-red-500 hover:text-red-700"
                    >
                      Премахни
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6">Начин на получаване</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pickup"
                      checked={formData.paymentMethod === 'pickup'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <Store className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <span className="font-medium">Вземи от нашия магазин</span>
                      <p className="text-sm text-gray-500">бул. "Витоша" 15, София (безплатно)</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                    <div>
                      <span className="font-medium">Наложен платеж</span>
                      <p className="text-sm text-gray-500">Плащане при доставка (+5 лв такса)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Вашата поръчка</h3>
                
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-xs text-gray-500">Количество: {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        {(item.product.price * item.quantity).toFixed(2)} {currencySymbol}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Междинна сума:</span>
                    <span className="font-medium">{totals.subtotal.toFixed(2)} {currencySymbol}</span>
                  </div>
                  {totals.cashFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Такса наложен платеж:</span>
                      <span className="font-medium">{totals.cashFee.toFixed(2)} {currencySymbol}</span>
                    </div>
                  )}
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Отстъпка ({discountAmount}%):</span>
                      <span className="font-medium">-{totals.discount.toFixed(2)} {currencySymbol}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Общо:</span>
                    <span>{totals.total.toFixed(2)} {currencySymbol}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Обработване...' : 'Завърши поръчката'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;