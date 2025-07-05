import React from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Eye,
  TrendingUp,
  Home,
  Navigation,
  Star,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts, useOrders } from '../../hooks/useSupabase';
import ProductsManagement from './ProductsManagement';
import ProductForm from './ProductForm';
import NavigationManagement from './NavigationManagement';
import FeaturedProductsManagement from './FeaturedProductsManagement';
import OrdersManagement from './OrdersManagement';
import NewsletterManagement from './NewsletterManagement';

const AdminDashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { orders } = useOrders();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Няма достъп</h2>
          <p className="text-gray-600 mb-4">Нямате администраторски права</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Върнете се към началната страница
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    {
      title: 'Общо продукти',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Активни поръчки',
      value: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
      icon: ShoppingCart,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Общо поръчки',
      value: orders.length,
      icon: BarChart3,
      color: 'bg-purple-500',
      change: '+23%'
    },
    {
      title: 'Приходи този месец',
      value: `${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} лв`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ];

  const quickActions = [
    {
      title: 'Добави продукт',
      description: 'Създай нов продукт в магазина',
      icon: Plus,
      link: '/admin/products/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Препоръчани продукти',
      description: 'Управлявай препоръчаните продукти',
      icon: Star,
      link: '/admin/featured',
      color: 'bg-yellow-500'
    },
    {
      title: 'Прегледай поръчки',
      description: 'Управлявай клиентски поръчки',
      icon: Eye,
      link: '/admin/orders',
      color: 'bg-green-500'
    },
    {
      title: 'Изпрати бюлетин',
      description: 'Изпрати бюлетин до абонатите',
      icon: Mail,
      link: '/admin/newsletter',
      color: 'bg-purple-500'
    }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Табло', path: '/admin' },
    { icon: Package, label: 'Продукти', path: '/admin/products' },
    { icon: Star, label: 'Препоръчани', path: '/admin/featured' },
    { icon: Navigation, label: 'Навигация', path: '/admin/navigation' },
    { icon: ShoppingCart, label: 'Поръчки', path: '/admin/orders' },
    { icon: Mail, label: 'Бюлетин', path: '/admin/newsletter' }
  ];

  const DashboardHome = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              <span className="text-gray-600 text-sm ml-2">от миналия месец</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Бързи действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <div className={`${action.color} p-2 rounded-lg mr-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {action.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Последни поръчки</h2>
            <Link to="/admin/orders" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Виж всички
            </Link>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.total.toFixed(2)} лв</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status === 'pending' ? 'Чакаща' :
                     order.status === 'processing' ? 'Обработва се' :
                     order.status === 'shipped' ? 'Изпратена' :
                     order.status === 'delivered' ? 'Доставена' : 'Отказана'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Продукти с нисък запас</h2>
            <Link to="/admin/products" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Управлявай
            </Link>
          </div>
          <div className="space-y-4">
            {products.filter(p => (p.stock_quantity || 0) <= 5).slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                </div>
                <span className="text-red-600 text-sm font-medium">
                  {product.stock_quantity || 0} бр.
                </span>
              </div>
            ))}
            {products.filter(p => (p.stock_quantity || 0) <= 5).length === 0 && (
              <p className="text-gray-500 text-center py-4">Всички продукти имат достатъчно наличност</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🐾</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">PetStore</h2>
              <p className="text-xs text-gray-500">Админ панел</p>
            </div>
          </Link>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500">Администратор</p>
            </div>
            <button
              onClick={handleSignOut}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Изход
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/featured" element={<FeaturedProductsManagement />} />
            <Route path="/navigation" element={<NavigationManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/newsletter" element={<NewsletterManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;