import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShoppingBag, MessageSquare, Plus, Trash2, Edit2, LogOut, CheckCircle, 
  Clock, ArrowRight, UserCheck, Shield, Sparkles, Phone, Mail, Key, 
  FileText, Search, Package, AlertCircle, Calendar, MapPin, CreditCard, TrendingUp, Tag
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

// --- Preset Categories for Products ---
const CATEGORIES = ['Todos', 'Peluches', 'Ropa', 'Libros', 'Accesorios', 'Regalos'];

// --- Preset Image Options to Select From ---
const IMAGE_PRESETS = [
  { name: 'Mercancía General', url: '/assets/banners/mercha.webp' },
  { name: 'Libros y Cuadernos', url: '/assets/banners/books.webp' },
  { name: 'Dibujos y Arte', url: '/assets/banners/pintar.png' },
];

const CRM = () => {
  useSEO({
    title: 'Portal de Clientes y Vendedor - CRM',
    description: 'Portal interactivo oficial de Bumsy Go. Registro de compradores, consultas de catálogo y CRM privado para vendedores.',
    image: '/assets/branding/shop_bg_next.webp'
  });

  // --- Core State ---
  const [portal, setPortal] = useState('gateway'); // gateway, buyer_login, buyer_register, buyer_dashboard, seller_login, seller_dashboard
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(null); // active buyer
  const [isSellerAuthenticated, setIsSellerAuthenticated] = useState(false);
  
  // Database states loaded from localStorage
  const [clients, setClients] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [sales, setSales] = useState([]);
  const [stockOverrides, setStockOverrides] = useState({});
  const [sellerPassword, setSellerPassword] = useState('bumsyking');
  
  // UI Tabs
  const [buyerTab, setBuyerTab] = useState('catalog'); // catalog, my_profile, my_purchases, my_inquiries
  const [sellerTab, setSellerTab] = useState('summary'); // summary, sales, clients, products, inquiries, settings

  // Form states - Auth
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regInterest, setRegInterest] = useState('Peluches');
  const [sellerPassInput, setSellerPassInput] = useState('');

  // Form states - Products Upload
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('Peluches');
  const [prodDescription, setProdDescription] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState(IMAGE_PRESETS[0].url);
  const [prodStock, setProdStock] = useState('25');
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states - Buyer Profile Update
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileAddress, setProfileAddress] = useState('');
  const [profileBirthday, setProfileBirthday] = useState('');

  // Checkout Modal states
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState(null);
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutBirthday, setCheckoutBirthday] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');

  // Filter/Search States
  const [clientSearch, setClientSearch] = useState('');
  const [salesSearch, setSalesSearch] = useState('');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [activeCatalogCategory, setActiveCatalogCategory] = useState('Todos');

  // Popup / Alert Notification States
  const [notification, setNotification] = useState(null);

  // --- Database Initialization ---
  useEffect(() => {
    // Clients (with shipping address and birthdays)
    const savedClients = localStorage.getItem('bumsy_crm_clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      const defaultClients = [
        { 
          id: 1, 
          name: 'Juan Pérez', 
          email: 'juan@perez.com', 
          phone: '+52 55 1234 5678', 
          password: 'buyer123', 
          interest: 'Peluches', 
          registeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'Cliente premium sumamente interesado en el Peluche Bumsy Fox XXL.',
          address: 'Av. Reforma 123, Colonia Centro, Ciudad de México',
          birthday: '1995-04-12'
        },
        { 
          id: 2, 
          name: 'María Gómez', 
          email: 'maria@gomez.com', 
          phone: '+52 55 8765 4321', 
          password: 'buyer123', 
          interest: 'Libros', 
          registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'Prefiere libros de colorear interactivos para sus hijos.',
          address: 'Calle 50 #456, Monterrey, Nuevo León',
          birthday: '1998-08-24'
        }
      ];
      localStorage.setItem('bumsy_crm_clients', JSON.stringify(defaultClients));
      setClients(defaultClients);
    }

    // Custom Products (with initial stock)
    const savedProducts = localStorage.getItem('bumsy_crm_products');
    if (savedProducts) {
      setCustomProducts(JSON.parse(savedProducts));
    } else {
      const defaultProducts = [
        { 
          id: 'custom_1', 
          name: 'Taza Mágica Bumsy (CRM)', 
          price: 14.99, 
          category: 'Accesorios', 
          description: 'Taza de cerámica premium que cambia de color al verter líquidos calientes.', 
          image: '/assets/banners/mercha.webp',
          status: 'Activo',
          createdAt: new Date().toISOString(),
          stock: 45
        }
      ];
      localStorage.setItem('bumsy_crm_products', JSON.stringify(defaultProducts));
      setCustomProducts(defaultProducts);
    }

    // Stock overrides to manage static products' inventory
    const savedOverrides = localStorage.getItem('bumsy_crm_stock_overrides');
    if (savedOverrides) {
      setStockOverrides(JSON.parse(savedOverrides));
    } else {
      const defaultOverrides = {
        'static_1': 15,
        'static_2': 8,
        'static_3': 20,
        'static_4': 12,
      };
      localStorage.setItem('bumsy_crm_stock_overrides', JSON.stringify(defaultOverrides));
      setStockOverrides(defaultOverrides);
    }

    // Inquiries
    const savedInquiries = localStorage.getItem('bumsy_crm_inquiries');
    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries));
    } else {
      const defaultInquiries = [
        { 
          id: 1, 
          buyerEmail: 'juan@perez.com', 
          buyerName: 'Juan Pérez', 
          productName: 'Peluche Bumsy Fox (XXL)', 
          message: '¿Tienen existencias disponibles para enviar a Ciudad de México hoy mismo?', 
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Pendiente'
        }
      ];
      localStorage.setItem('bumsy_crm_inquiries', JSON.stringify(defaultInquiries));
      setInquiries(defaultInquiries);
    }

    // Sales (Simulated purchase history)
    const savedSales = localStorage.getItem('bumsy_crm_sales');
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    } else {
      const defaultSales = [
        {
          id: 'sale_1',
          buyerEmail: 'juan@perez.com',
          buyerName: 'Juan Pérez',
          productName: 'Peluche Bumsy Fox (XXL)',
          price: 29.99,
          address: 'Av. Reforma 123, Colonia Centro, Ciudad de México',
          birthday: '1995-04-12',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem('bumsy_crm_sales', JSON.stringify(defaultSales));
      setSales(defaultSales);
    }

    // Seller Settings
    const savedPass = localStorage.getItem('bumsy_crm_seller_password');
    if (savedPass) {
      setSellerPassword(savedPass);
    }
  }, []);

  // Sync profile form when tab changes
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfilePhone(currentUser.phone || '');
      setProfileAddress(currentUser.address || '');
      setProfileBirthday(currentUser.birthday || '');
    }
  }, [buyerTab, currentUser]);

  // Sync checkout modal fields when checkout product changes
  useEffect(() => {
    if (activeCheckoutProduct && currentUser) {
      setCheckoutAddress(currentUser.address || '');
      setCheckoutBirthday(currentUser.birthday || '');
      setCheckoutPhone(currentUser.phone || '');
    }
  }, [activeCheckoutProduct, currentUser]);

  // Show a disappearing auto-dismiss banner
  const triggerNotification = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Auth Handlers ---
  const handleBuyerRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regPassword) {
      triggerNotification('Por favor completa todos los campos del registro.', 'error');
      return;
    }

    const emailExists = clients.some(c => c.email.toLowerCase() === regEmail.toLowerCase());
    if (emailExists) {
      triggerNotification('Este correo ya está registrado.', 'error');
      return;
    }

    const newClient = {
      id: Date.now(),
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      interest: regInterest,
      registeredAt: new Date().toISOString(),
      notes: '',
      address: '',
      birthday: ''
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem('bumsy_crm_clients', JSON.stringify(updatedClients));
    
    setCurrentUser(newClient);
    triggerNotification('¡Registro exitoso! Bienvenido a tu Portal de Comprador.');
    setPortal('buyer_dashboard');
    
    // Clear form
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegPassword('');
  };

  const handleBuyerLogin = (e) => {
    e.preventDefault();
    const user = clients.find(c => c.email.toLowerCase() === loginEmail.toLowerCase() && c.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      triggerNotification(`¡Bienvenido de vuelta, ${user.name}!`);
      setPortal('buyer_dashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      triggerNotification('Correo o contraseña incorrectos.', 'error');
    }
  };

  const handleSellerLogin = (e) => {
    e.preventDefault();
    if (sellerPassInput === sellerPassword || sellerPassInput === 'bumsyking') {
      setIsSellerAuthenticated(true);
      triggerNotification('Autenticación de Vendedor correcta. Acceso al CRM concedido.');
      setPortal('seller_dashboard');
      setSellerPassInput('');
    } else {
      triggerNotification('PIN o Contraseña incorrectos. Acceso denegado.', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsSellerAuthenticated(false);
    setPortal('gateway');
    triggerNotification('Sesión cerrada con éxito.');
  };

  // --- Buyer Dashboard Handlers ---
  const handleInquirySubmit = (product, customMessage = '') => {
    if (!currentUser) return;

    const newInquiry = {
      id: Date.now(),
      buyerEmail: currentUser.email,
      buyerName: currentUser.name,
      productName: product.name,
      message: customMessage || `Me gustaría recibir información de precio y disponibilidad de: ${product.name}.`,
      createdAt: new Date().toISOString(),
      status: 'Pendiente'
    };

    const updated = [...inquiries, newInquiry];
    setInquiries(updated);
    localStorage.setItem('bumsy_crm_inquiries', JSON.stringify(updated));
    triggerNotification('¡Consulta enviada! El vendedor responderá muy pronto.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: profileName,
      phone: profilePhone,
      address: profileAddress,
      birthday: profileBirthday
    };

    const updatedClients = clients.map(c => c.id === currentUser.id ? updatedUser : c);
    setClients(updatedClients);
    localStorage.setItem('bumsy_crm_clients', JSON.stringify(updatedClients));
    setCurrentUser(updatedUser);

    triggerNotification('¡Perfil actualizado con éxito! Tus datos se auto-completarán en tu próxima compra.');
  };

  const handleConfirmPurchase = (e) => {
    e.preventDefault();
    if (!currentUser || !activeCheckoutProduct) return;

    const stockVal = getProductStock(activeCheckoutProduct);
    if (stockVal <= 0) {
      triggerNotification('Lo sentimos, este producto está agotado.', 'error');
      return;
    }

    // Deduct stock in override state & localStorage
    const newStock = stockVal - 1;
    const updatedOverrides = {
      ...stockOverrides,
      [activeCheckoutProduct.id]: newStock
    };
    setStockOverrides(updatedOverrides);
    localStorage.setItem('bumsy_crm_stock_overrides', JSON.stringify(updatedOverrides));

    // Also deduct stock in customProducts if it's dynamic
    if (activeCheckoutProduct.id.toString().startsWith('custom_')) {
      const updatedCustoms = customProducts.map(p => {
        if (p.id === activeCheckoutProduct.id) {
          return { ...p, stock: newStock };
        }
        return p;
      });
      setCustomProducts(updatedCustoms);
      localStorage.setItem('bumsy_crm_products', JSON.stringify(updatedCustoms));
    }

    // Create new global sales record
    const newSale = {
      id: `sale_${Date.now()}`,
      buyerEmail: currentUser.email,
      buyerName: currentUser.name,
      productName: activeCheckoutProduct.name,
      price: activeCheckoutProduct.price,
      address: checkoutAddress,
      birthday: checkoutBirthday,
      date: new Date().toISOString()
    };

    const updatedSales = [newSale, ...sales];
    setSales(updatedSales);
    localStorage.setItem('bumsy_crm_sales', JSON.stringify(updatedSales));

    // Save profile details to user session
    const updatedUser = {
      ...currentUser,
      phone: checkoutPhone,
      address: checkoutAddress,
      birthday: checkoutBirthday
    };
    setCurrentUser(updatedUser);

    const updatedClients = clients.map(c => c.id === currentUser.id ? updatedUser : c);
    setClients(updatedClients);
    localStorage.setItem('bumsy_crm_clients', JSON.stringify(updatedClients));

    triggerNotification(`¡Compra de "${activeCheckoutProduct.name}" simulada con éxito!`);
    setActiveCheckoutProduct(null);
    setBuyerTab('my_purchases'); // direct to purchases history
  };

  // --- Seller Dashboard Handlers ---
  const handleSaveNotes = (clientId, notes) => {
    const updatedClients = clients.map(c => {
      if (c.id === clientId) {
        return { ...c, notes };
      }
      return c;
    });
    setClients(updatedClients);
    localStorage.setItem('bumsy_crm_clients', JSON.stringify(updatedClients));
    triggerNotification('Notas del cliente actualizadas en el CRM.');
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice) {
      triggerNotification('Nombre y Precio son requeridos.', 'error');
      return;
    }

    const stockParsed = parseInt(prodStock) || 0;

    if (editingProduct) {
      // Edit mode
      const updated = customProducts.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: prodName,
            price: parseFloat(prodPrice),
            category: prodCategory,
            description: prodDescription,
            image: prodImageUrl,
            stock: stockParsed
          };
        }
        return p;
      });
      setCustomProducts(updated);
      localStorage.setItem('bumsy_crm_products', JSON.stringify(updated));

      // Update override
      const updatedOverrides = {
        ...stockOverrides,
        [editingProduct.id]: stockParsed
      };
      setStockOverrides(updatedOverrides);
      localStorage.setItem('bumsy_crm_stock_overrides', JSON.stringify(updatedOverrides));

      triggerNotification('Producto y stock actualizados correctamente en el catálogo.');
      setEditingProduct(null);
    } else {
      // Create mode
      const newId = `custom_${Date.now()}`;
      const newProduct = {
        id: newId,
        name: prodName,
        price: parseFloat(prodPrice),
        category: prodCategory,
        description: prodDescription,
        image: prodImageUrl,
        status: 'Activo',
        createdAt: new Date().toISOString(),
        stock: stockParsed
      };

      const updated = [...customProducts, newProduct];
      setCustomProducts(updated);
      localStorage.setItem('bumsy_crm_products', JSON.stringify(updated));

      // Register override
      const updatedOverrides = {
        ...stockOverrides,
        [newId]: stockParsed
      };
      setStockOverrides(updatedOverrides);
      localStorage.setItem('bumsy_crm_stock_overrides', JSON.stringify(updatedOverrides));

      triggerNotification('¡Nuevo producto subido con éxito con stock inicial!');
    }

    // Reset Form
    setProdName('');
    setProdPrice('');
    setProdCategory('Peluches');
    setProdDescription('');
    setProdImageUrl(IMAGE_PRESETS[0].url);
    setProdStock('25');
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdPrice(product.price);
    setProdCategory(product.category);
    setProdDescription(product.description || '');
    setProdImageUrl(product.image);
    setProdStock(product.stock !== undefined ? product.stock.toString() : '25');
    setSellerTab('products'); // Switch tab to see form
  };

  const handleDeleteProduct = (prodId) => {
    const updated = customProducts.filter(p => p.id !== prodId);
    setCustomProducts(updated);
    localStorage.setItem('bumsy_crm_products', JSON.stringify(updated));
    triggerNotification('Producto removido del catálogo.');
  };

  const handleInquiryStatusChange = (inquiryId, newStatus) => {
    const updated = inquiries.map(i => {
      if (i.id === inquiryId) {
        return { ...i, status: newStatus };
      }
      return i;
    });
    setInquiries(updated);
    localStorage.setItem('bumsy_crm_inquiries', JSON.stringify(updated));
    triggerNotification(`Estado de consulta cambiado a: ${newStatus}`);
  };

  const handleDeleteInquiry = (inquiryId) => {
    const updated = inquiries.filter(i => i.id !== inquiryId);
    setInquiries(updated);
    localStorage.setItem('bumsy_crm_inquiries', JSON.stringify(updated));
    triggerNotification('Consulta archivada.');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const newPass = e.target.newPass.value;
    if (!newPass) return;
    setSellerPassword(newPass);
    localStorage.setItem('bumsy_crm_seller_password', newPass);
    triggerNotification('PIN / Contraseña de vendedor actualizada con éxito.');
    e.target.reset();
  };

  // Combine static shop products + custom CRM uploaded products for Catalog Viewers
  const allProductsList = [
    // Pre-populated catalog items
    { id: 'static_1', name: 'Peluche Bumsy Fox (XXL)', price: 29.99, category: 'Peluches', image: '/assets/banners/mercha.webp', description: 'Peluche gigante ultra suave ideal para abrazos mágicos.' },
    { id: 'static_2', name: 'Camiseta Arcoíris Uni', price: 19.99, category: 'Ropa', image: '/assets/banners/mercha.webp', description: 'Camiseta infantil colorida de algodón orgánico.' },
    { id: 'static_3', name: 'Cuento: Aventuras en el Bosque', price: 14.99, category: 'Libros', image: '/assets/banners/books.webp', description: 'Cuento de pasta dura con ilustraciones a todo color.' },
    { id: 'static_4', name: 'Mochila Tarta Turtle', price: 34.99, category: 'Accesorios', image: '/assets/banners/mercha.webp', description: 'Mochila escolar resistente y súper cómoda.' },
    // Custom uploaded products
    ...customProducts
  ];

  // Helper to extract stock level for any product dynamically
  const getProductStock = (p) => {
    if (p.id in stockOverrides) {
      return stockOverrides[p.id];
    }
    return p.stock !== undefined ? p.stock : 25;
  };

  // Filtering products for buyer viewer
  const filteredCatalog = allProductsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(catalogSearch.toLowerCase()));
    const matchesCategory = activeCatalogCategory === 'Todos' || p.category === activeCatalogCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats calculation for Admin
  const totalSalesRevenue = sales.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const totalUnitsSold = sales.length;

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none relative overflow-hidden">
      
      {/* Dynamic Glass Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl max-w-md w-[90%]"
            style={{
              backgroundColor: notification.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(236, 72, 153, 0.15)',
              borderColor: notification.type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(236, 72, 153, 0.4)',
              color: notification.type === 'error' ? '#fca5a5' : '#fbcfe8'
            }}
          >
            {notification.type === 'error' ? <AlertCircle size={22} className="text-red-400 shrink-0" /> : <Sparkles size={22} className="text-pink-400 shrink-0" />}
            <span className="font-semibold text-sm leading-tight">{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Neon Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none"></div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-7xl z-10">
        
        {/* HEADER BRANDING */}
        <div className="text-center mb-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center justify-center gap-2 mb-2">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Users size={24} className="text-white" />
            </span>
            <span className="text-sm font-black text-pink-500 tracking-[0.3em] uppercase">Portal Administrativo</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
            CRM & Catálogo <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Bumsy Go</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            Registra clientes, gestiona consultas en tiempo real y actualiza tu stock desde un único portal interno inteligente.
          </p>
        </div>

        {/* ── GATEWAY PAGE ──────────────────────────────────────────────────────── */}
        {portal === 'gateway' && (
          <div className="flex-1 flex items-center justify-center py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
              
              {/* Card 1: Buyers Portal */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setPortal('buyer_login')}
                className="bg-slate-900/40 border border-slate-800 hover:border-pink-500/50 rounded-3xl p-8 cursor-pointer flex flex-col items-center text-center backdrop-blur-lg shadow-xl group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>Soy Comprador</h3>
                <p className="text-slate-400 text-sm font-semibold mb-8 leading-relaxed">
                  Ingresa o regístrate para ver productos mágicos cargados por el vendedor, consultar precios y guardar tu historial.
                </p>
                <span className="mt-auto bg-pink-600 group-hover:bg-pink-500 text-white font-black text-xs px-8 py-3 rounded-full flex items-center gap-2 uppercase tracking-wider shadow-lg transition-colors">
                  Ingresar al Portal <ArrowRight size={14} />
                </span>
              </motion.div>

              {/* Card 2: Seller Portal */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setPortal('seller_login')}
                className="bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-8 cursor-pointer flex flex-col items-center text-center backdrop-blur-lg shadow-xl group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <Shield size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>Soy Vendedor</h3>
                <p className="text-slate-400 text-sm font-semibold mb-8 leading-relaxed">
                  Acceso privado para administrar clientes registrados (CRM), subir productos al catálogo y dar seguimiento a consultas de venta.
                </p>
                <span className="mt-auto bg-slate-800 group-hover:bg-indigo-900 text-slate-200 border border-slate-700 font-black text-xs px-8 py-3 rounded-full flex items-center gap-2 uppercase tracking-wider transition-all">
                  Acceso Restringido <Key size={14} />
                </span>
              </motion.div>

            </div>
          </div>
        )}

        {/* ── BUYER LOGIN ──────────────────────────────────────────────────────── */}
        {portal === 'buyer_login' && (
          <div className="max-w-md w-full mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl font-black uppercase mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>Ingreso Comprador</h2>
            <p className="text-slate-400 text-xs font-semibold text-center mb-6">Explora y realiza compras en la tienda</p>
            
            <form onSubmit={handleBuyerLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Contraseña</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <button type="submit" className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black text-sm py-4 rounded-xl shadow-lg mt-3 uppercase tracking-wider transition-colors">
                Iniciar Sesión
              </button>
            </form>

            <div className="text-center mt-6 flex flex-col gap-2">
              <span className="text-xs text-slate-400 font-semibold">
                ¿No tienes cuenta?{' '}
                <button onClick={() => setPortal('buyer_register')} className="text-pink-500 hover:underline font-bold">Regístrate gratis aquí</button>
              </span>
              <button onClick={() => setPortal('gateway')} className="text-xs text-slate-500 hover:text-slate-300 font-bold uppercase tracking-wider mt-4">
                Volver
              </button>
            </div>
          </div>
        )}

        {/* ── BUYER REGISTER ───────────────────────────────────────────────────── */}
        {portal === 'buyer_register' && (
          <div className="max-w-md w-full mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl font-black uppercase mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>Registro de Comprador</h2>
            <p className="text-slate-400 text-xs font-semibold text-center mb-6">Crea tu cuenta para guardar tus datos y compras</p>
            
            <form onSubmit={handleBuyerRegister} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Tu Nombre"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Teléfono Móvil</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-3.5 text-slate-500" />
                  <input 
                    type="tel" 
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Contraseña</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Tu Mayor Interés</label>
                <select
                  value={regInterest}
                  onChange={(e) => setRegInterest(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-300 transition-colors"
                >
                  <option value="Peluches">Peluches Mágicos</option>
                  <option value="Ropa">Ropa y Gorras</option>
                  <option value="Libros">Libros de Aventuras</option>
                  <option value="Accesorios">Accesorios y Pegatinas</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black text-sm py-4 rounded-xl shadow-lg mt-3 uppercase tracking-wider transition-colors">
                Completar Registro
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-xs text-slate-400 font-semibold">
                ¿Ya tienes una cuenta?{' '}
                <button onClick={() => setPortal('buyer_login')} className="text-pink-500 hover:underline font-bold">Inicia Sesión aquí</button>
              </span>
              <button onClick={() => setPortal('gateway')} className="text-xs text-slate-500 hover:text-slate-300 font-bold uppercase tracking-wider mt-4 block mx-auto">
                Volver
              </button>
            </div>
          </div>
        )}

        {/* ── SELLER LOGIN ─────────────────────────────────────────────────────── */}
        {portal === 'seller_login' && (
          <div className="max-w-md w-full mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
            <div className="flex justify-center mb-4 text-indigo-500">
              <Shield size={44} className="animate-pulse" />
            </div>
            <h2 className="text-2xl font-black uppercase mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>Consola Vendedor</h2>
            <p className="text-slate-400 text-xs font-semibold text-center mb-6 leading-relaxed">
              Ingresa el PIN / Contraseña seguro para administrar la base de datos interna.
            </p>
            
            <form onSubmit={handleSellerLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1">Nombre de Usuario</label>
                <input 
                  type="text" 
                  value="admin"
                  disabled
                  className="w-full bg-slate-950/70 text-slate-550 border border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-black text-slate-400 uppercase">PIN / Contraseña de Acceso</label>
                  <span className="text-[10px] text-slate-500 font-mono">Defecto: `bumsyking`</span>
                </div>
                <input 
                  type="password" 
                  value={sellerPassInput}
                  onChange={(e) => setSellerPassInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors font-mono"
                  required
                  autoFocus
                />
              </div>
              
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm py-4 rounded-xl shadow-lg mt-3 uppercase tracking-wider transition-colors">
                Verificar Credenciales
              </button>
            </form>

            <div className="text-center mt-6">
              <button onClick={() => setPortal('gateway')} className="text-xs text-slate-500 hover:text-slate-300 font-bold uppercase tracking-wider">
                Volver
              </button>
            </div>
          </div>
        )}

        {/* ── BUYER DASHBOARD ───────────────────────────────────────────────────── */}
        {portal === 'buyer_dashboard' && currentUser && (
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Header info bar */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center font-black text-white text-lg">
                  {currentUser.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-black text-lg uppercase tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    ¡Hola, {currentUser.name}!
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 mt-0.5 text-left">
                    <UserCheck size={12} className="text-pink-400" /> Comprador Registrado · {currentUser.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <button 
                  onClick={() => setBuyerTab('catalog')} 
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${buyerTab === 'catalog' ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'}`}
                >
                  Catálogo
                </button>
                <button 
                  onClick={() => setBuyerTab('my_profile')} 
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${buyerTab === 'my_profile' ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'}`}
                >
                  Mi Perfil
                </button>
                <button 
                  onClick={() => setBuyerTab('my_purchases')} 
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${buyerTab === 'my_purchases' ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'}`}
                >
                  Mis Compras ({sales.filter(s => s.buyerEmail === currentUser.email).length})
                </button>
                <button 
                  onClick={() => setBuyerTab('my_inquiries')} 
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${buyerTab === 'my_inquiries' ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'}`}
                >
                  Consultas ({inquiries.filter(i => i.buyerEmail === currentUser.email).length})
                </button>
                <button onClick={handleLogout} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-full transition-colors" title="Cerrar Sesión">
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            {/* TAB: CATALOG EXPLORER */}
            {buyerTab === 'catalog' && (
              <div className="flex-1 flex flex-col gap-6">
                
                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 hide-scrollbar">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCatalogCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap ${activeCatalogCategory === cat ? 'bg-slate-100 text-slate-950 font-black' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="w-full md:w-80 relative flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-2">
                    <Search size={16} className="text-slate-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Buscar en el catálogo..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      className="bg-transparent text-xs w-full focus:outline-none font-semibold text-slate-200 placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Grid */}
                {filteredCatalog.length === 0 ? (
                  <div className="bg-slate-900/20 border border-slate-850 rounded-3xl p-12 text-center text-slate-500 font-semibold flex flex-col items-center justify-center">
                    <Package size={48} className="mb-4 text-slate-700" />
                    No se encontraron productos en el catálogo con los filtros seleccionados.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCatalog.map(p => {
                      const stockLevel = getProductStock(p);
                      const isOutOfStock = stockLevel <= 0;

                      return (
                        <div key={p.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 flex flex-col group hover:border-pink-500/30 transition-all duration-300 relative overflow-hidden">
                          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-slate-850 relative">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            
                            {/* Stock status badge */}
                            <span className={`absolute top-3 left-3 font-black text-[9px] uppercase px-3 py-1 rounded-full tracking-wider ${
                              isOutOfStock 
                                ? 'bg-red-500/90 text-white shadow-md' 
                                : stockLevel <= 5 
                                  ? 'bg-amber-500/90 text-slate-950 shadow-md' 
                                  : 'bg-slate-900/80 text-slate-300'
                            }`}>
                              {isOutOfStock ? 'Agotado' : `Stock: ${stockLevel} u.`}
                            </span>

                            <span className="absolute top-3 right-3 bg-pink-600/90 text-white font-black text-[9px] uppercase px-3 py-1 rounded-full tracking-wider">
                              {p.category}
                            </span>
                          </div>
                          <h4 className="font-black text-lg text-slate-200 mb-1 leading-tight group-hover:text-pink-400 transition-colors uppercase text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {p.name}
                          </h4>
                          <p className="text-slate-400 text-xs font-semibold mb-4 flex-1 line-clamp-2 text-left">
                            {p.description || 'Sin descripción adicional disponible.'}
                          </p>
                          <div className="flex items-center justify-between border-t border-slate-850 pt-4 mt-auto">
                            <span className="text-pink-500 font-black text-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                              ${p.price} <span className="text-xs text-slate-500 font-bold font-sans">USD</span>
                            </span>
                            
                            <div className="flex items-center gap-1.5">
                              <button 
                                onClick={() => handleInquirySubmit(p)}
                                className="bg-slate-800 hover:bg-slate-755 border border-slate-700 text-slate-300 font-black text-[10px] uppercase tracking-wider px-3 py-2 rounded-full transition-all flex items-center gap-1"
                                title="Enviar consulta de preventa"
                              >
                                <MessageSquare size={12} />
                              </button>
                              <button 
                                onClick={() => {
                                  if (isOutOfStock) {
                                    triggerNotification('Producto agotado.', 'error');
                                    return;
                                  }
                                  setActiveCheckoutProduct(p);
                                }}
                                disabled={isOutOfStock}
                                className={`font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all flex items-center gap-1 shadow-lg ${
                                  isOutOfStock 
                                    ? 'bg-slate-800 text-slate-600 border border-slate-850 cursor-not-allowed' 
                                    : 'bg-pink-600 hover:bg-pink-500 text-white'
                                }`}
                              >
                                <ShoppingBag size={12} /> Comprar
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: MY PROFILE (birthday, shipping address, details) */}
            {buyerTab === 'my_profile' && (
              <div className="max-w-2xl w-full mx-auto bg-slate-900/30 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-4">
                  <UserCheck className="text-pink-400" size={24} />
                  <h3 className="text-xl font-black uppercase text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>Configuración de mi Perfil</h3>
                </div>

                <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-slate-200 font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Teléfono Móvil</label>
                      <input 
                        type="tel" 
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-slate-200 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Correo Electrónico (No editable)</label>
                      <input 
                        type="email" 
                        value={currentUser.email}
                        disabled
                        className="w-full bg-slate-950/50 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-500 cursor-not-allowed font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Fecha de Cumpleaños</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-3.5 text-slate-500" />
                        <input 
                          type="date" 
                          value={profileBirthday}
                          onChange={(e) => setProfileBirthday(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none text-slate-300 font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Dirección de Envío Completa</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-4 top-3.5 text-slate-500" />
                      <input 
                        type="text" 
                        value={profileAddress}
                        onChange={(e) => setProfileAddress(e.target.value)}
                        placeholder="Calle, Número, Colonia, Ciudad, Estado, Código Postal"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none text-slate-200 font-semibold"
                        required
                      />
                    </div>
                  </div>

                  {/* Informational Offer Tracking Notice */}
                  <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl p-4 flex gap-3 text-left">
                    <Sparkles className="text-pink-400 shrink-0" size={18} />
                    <p className="text-[11px] text-pink-300 leading-relaxed font-semibold">
                      ¡Al guardar tus datos, estos se autocompletarán de forma segura en todas tus compras futuras para agilizar el proceso! Además, te enviaremos regalos y ofertas sorpresas en tu mes de cumpleaños.
                    </p>
                  </div>

                  <button type="submit" className="bg-pink-600 hover:bg-pink-500 text-white font-black text-xs py-4 rounded-xl shadow-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                    <UserCheck size={14} /> Guardar Perfil Seguro
                  </button>
                </form>
              </div>
            )}

            {/* TAB: MY PURCHASES (simulated history) */}
            {buyerTab === 'my_purchases' && (
              <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 backdrop-blur-md text-left">
                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <ShoppingBag size={20} className="text-pink-400" /> Mi Historial de Compras
                </h3>
                
                {sales.filter(s => s.buyerEmail === currentUser.email).length === 0 ? (
                  <div className="py-12 text-center text-slate-500 font-semibold flex flex-col items-center justify-center">
                    <ShoppingBag size={40} className="mb-3 text-slate-750" />
                    Aún no tienes compras simuladas registradas.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {sales.filter(s => s.buyerEmail === currentUser.email).map(order => (
                      <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-mono text-pink-400 font-black uppercase">Pedido: #{order.id.toUpperCase()}</span>
                          <h4 className="font-black text-base text-slate-200 uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>{order.productName}</h4>
                          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1"><MapPin size={12} className="text-slate-550" /> Enviado a: {order.address}</span>
                          <span className="text-[10px] text-slate-500 font-mono mt-1">{new Date(order.date).toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col md:items-end gap-2 shrink-0">
                          <span className="font-mono text-pink-500 font-black text-xl">${order.price.toFixed(2)} USD</span>
                          <span className="text-[9px] font-black uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle size={10} /> Procesado & Enviado
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: MY INQUIRIES */}
            {buyerTab === 'my_inquiries' && (
              <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 backdrop-blur-md text-left">
                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <FileText size={20} className="text-pink-400" /> Historial de Consultas
                </h3>
                
                {inquiries.filter(i => i.buyerEmail === currentUser.email).length === 0 ? (
                  <div className="py-12 text-center text-slate-500 font-semibold flex flex-col items-center justify-center">
                    <MessageSquare size={40} className="mb-3 text-slate-750" />
                    Aún no has realizado ninguna consulta sobre productos.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {inquiries.filter(i => i.buyerEmail === currentUser.email).map(inq => (
                      <div key={inq.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1 text-left">
                          <div className="flex items-center gap-2.5">
                            <h4 className="font-black text-base text-slate-200 uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>{inq.productName}</h4>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              inq.status === 'Pendiente' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                              inq.status === 'En Seguimiento' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              'bg-green-500/20 text-green-400 border border-green-500/30'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs font-semibold max-w-xl italic">"{inq.message}"</p>
                          <span className="text-[10px] text-slate-500 mt-1 font-mono">{new Date(inq.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {inq.status === 'Pendiente' ? (
                            <span className="text-slate-500 text-xs font-bold flex items-center gap-1.5 bg-slate-950 px-4 py-2 rounded-full border border-slate-850">
                              <Clock size={12} className="text-orange-400 animate-spin" /> Esperando respuesta
                            </span>
                          ) : (
                            <span className="text-green-400 text-xs font-bold flex items-center gap-1.5 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                              <CheckCircle size={12} /> Contactado / Completado
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ── SELLER DASHBOARD ─────────────────────────────────────────────────── */}
        {portal === 'seller_dashboard' && isSellerAuthenticated && (
          <div className="flex flex-col lg:flex-row gap-8 flex-1">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 h-fit backdrop-blur-md flex flex-col gap-6">
              
              <div className="flex items-center gap-3 border-b border-slate-800 pb-5 text-left">
                <span className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/35 text-indigo-400">
                  <Shield size={20} />
                </span>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-tight leading-none text-slate-200">Consola CRM</h3>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Vendedor Conectado</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'summary', name: 'Resumen', icon: Sparkles },
                  { id: 'sales', name: 'Ventas / Pedidos', icon: CreditCard },
                  { id: 'clients', name: 'Clientes CRM', icon: Users },
                  { id: 'products', name: 'Subir/Stock', icon: Plus },
                  { id: 'inquiries', name: 'Bandeja Leads', icon: MessageSquare },
                  { id: 'settings', name: 'Seguridad', icon: Key }
                ].map(tab => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSellerTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        sellerTab === tab.id 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <IconComp size={16} /> {tab.name}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-4 flex items-center gap-3 px-4 py-3 border border-red-500/30 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
              >
                <LogOut size={16} /> Salir del CRM
              </button>
            </div>

            {/* Dashboard Workspace */}
            <div className="flex-1 flex flex-col gap-6">

              {/* TAB: SUMMARY / OVERVIEW */}
              {sellerTab === 'summary' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Grid Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 flex items-center justify-between backdrop-blur-md">
                      <div className="text-left">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Clientes CRM</span>
                        <span className="text-2xl font-black text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>{clients.length}</span>
                      </div>
                      <span className="p-2.5 bg-pink-500/10 text-pink-400 rounded-2xl"><Users size={20} /></span>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 flex items-center justify-between backdrop-blur-md">
                      <div className="text-left">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Total Ventas</span>
                        <span className="text-2xl font-black text-slate-100 font-mono" style={{ fontFamily: "'Poppins', sans-serif" }}>${totalSalesRevenue}</span>
                      </div>
                      <span className="p-2.5 bg-green-500/10 text-green-400 rounded-2xl"><TrendingUp size={20} /></span>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 flex items-center justify-between backdrop-blur-md">
                      <div className="text-left">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Artículos Vendidos</span>
                        <span className="text-2xl font-black text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>{totalUnitsSold} u.</span>
                      </div>
                      <span className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-2xl"><ShoppingBag size={20} /></span>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 flex items-center justify-between backdrop-blur-md">
                      <div className="text-left">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Leads Pendientes</span>
                        <span className="text-2xl font-black text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {inquiries.filter(i => i.status === 'Pendiente').length}
                        </span>
                      </div>
                      <span className="p-2.5 bg-orange-500/10 text-orange-400 rounded-2xl"><MessageSquare size={20} /></span>
                    </div>
                  </div>

                  {/* Activity Feeds */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    
                    {/* Recent Sales log */}
                    <div className="xl:col-span-7 bg-slate-900/30 border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-black text-base uppercase tracking-tight flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          <CreditCard size={18} className="text-green-400" /> Ventas Recientes
                        </h3>
                        <button onClick={() => setSellerTab('sales')} className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                          Ver todas
                        </button>
                      </div>

                      {sales.length === 0 ? (
                        <div className="py-8 text-center text-slate-600 font-semibold text-xs">
                          Sin transacciones registradas todavía.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {sales.slice(0, 3).map(sale => (
                            <div key={sale.id} className="bg-slate-950/60 border border-slate-850 rounded-xl p-3 flex items-center justify-between gap-3 text-left">
                              <div>
                                <span className="text-[9px] font-mono text-slate-500 block uppercase">Pedido: #{sale.id.slice(5, 12)}</span>
                                <h4 className="font-black text-xs text-slate-200 uppercase mt-0.5 leading-none">{sale.productName}</h4>
                                <span className="text-[10px] text-slate-450 block mt-1 font-semibold">{sale.buyerName} ({sale.buyerEmail})</span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-mono text-green-400 font-bold text-sm block">${sale.price.toFixed(2)}</span>
                                <span className="text-[8px] text-slate-500 block">{new Date(sale.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Inquiries Feed */}
                    <div className="xl:col-span-5 bg-slate-900/30 border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-black text-base uppercase tracking-tight flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          <MessageSquare size={18} className="text-orange-400" /> Leads / Mensajes
                        </h3>
                        <button onClick={() => setSellerTab('inquiries')} className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                          Ver todos
                        </button>
                      </div>

                      {inquiries.length === 0 ? (
                        <div className="py-8 text-center text-slate-600 font-semibold text-xs">
                          Sin consultas de clientes registradas.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {inquiries.slice(0, 2).map(inq => (
                            <div key={inq.id} className="bg-slate-950/60 border border-slate-850 rounded-xl p-3 flex flex-col text-left gap-1.5">
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-black text-indigo-400 uppercase">{inq.buyerName}</span>
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${inq.status === 'Pendiente' ? 'bg-orange-500/15 text-orange-400' : 'bg-green-500/15 text-green-400'}`}>
                                  {inq.status}
                                </span>
                              </div>
                              <h4 className="font-black text-xs text-slate-200 uppercase leading-none">{inq.productName}</h4>
                              <p className="text-slate-400 text-[10px] italic">"{inq.message}"</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              )}

              {/* TAB: SALES MANAGEMENT (global transactions dashboard) */}
              {sellerTab === 'sales' && (
                <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <CreditCard size={20} className="text-indigo-400" /> Registro de Ventas & Pedidos
                    </h3>
                    
                    <div className="relative flex items-center bg-slate-955 border border-slate-855 rounded-full px-4 py-2 w-full sm:w-64">
                      <Search size={14} className="text-slate-500 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Buscar por comprador o producto..."
                        value={salesSearch}
                        onChange={(e) => setSalesSearch(e.target.value)}
                        className="bg-transparent text-xs w-full focus:outline-none text-slate-200 placeholder-slate-600 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto w-full border border-slate-850 rounded-2xl">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                      <thead>
                        <tr className="bg-slate-950/70 border-b border-slate-850 text-slate-400 font-black text-[10px] uppercase tracking-wider">
                          <th className="p-4">Pedido / ID</th>
                          <th className="p-4">Comprador</th>
                          <th className="p-4">Cumpleaños</th>
                          <th className="p-4">Producto</th>
                          <th className="p-4">Dirección de Envío</th>
                          <th className="p-4">Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.filter(s => 
                          s.buyerName.toLowerCase().includes(salesSearch.toLowerCase()) || 
                          s.productName.toLowerCase().includes(salesSearch.toLowerCase())
                        ).map(sale => (
                          <tr key={sale.id} className="border-b border-slate-850 hover:bg-slate-900/30 transition-colors">
                            <td className="p-4 font-mono text-[10px] text-slate-500 font-bold">
                              #{sale.id.toUpperCase()}
                              <span className="block text-[8px] text-slate-600">{new Date(sale.date).toLocaleDateString()}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col text-left">
                                <span className="font-black text-slate-200 text-xs uppercase">{sale.buyerName}</span>
                                <span className="text-[10px] text-slate-550 font-mono">{sale.buyerEmail}</span>
                              </div>
                            </td>
                            <td className="p-4 text-[10px] font-mono font-bold text-pink-400">
                              {sale.birthday ? (
                                <span className="flex items-center gap-1">
                                  <Calendar size={11} /> {sale.birthday}
                                </span>
                              ) : '--'}
                            </td>
                            <td className="p-4 font-black text-xs text-slate-300 uppercase">
                              {sale.productName}
                            </td>
                            <td className="p-4 text-xs text-slate-450 font-semibold max-w-[200px] truncate" title={sale.address}>
                              {sale.address}
                            </td>
                            <td className="p-4 font-mono font-black text-sm text-green-400">
                              ${sale.price.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: CLIENTS CRM TABLE */}
              {sellerTab === 'clients' && (
                <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <Users size={20} className="text-indigo-400" /> Directorio de Clientes (CRM)
                    </h3>
                    
                    <div className="relative flex items-center bg-slate-955 border border-slate-855 rounded-full px-4 py-2 w-full sm:w-64">
                      <Search size={14} className="text-slate-500 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Buscar cliente..."
                        value={clientSearch}
                        onChange={(e) => setClientSearch(e.target.value)}
                        className="bg-transparent text-xs w-full focus:outline-none text-slate-200 placeholder-slate-600 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto w-full border border-slate-850 rounded-2xl">
                    <table className="w-full text-left border-collapse min-w-[850px]">
                      <thead>
                        <tr className="bg-slate-950/70 border-b border-slate-850 text-slate-400 font-black text-[10px] uppercase tracking-wider">
                          <th className="p-4">Cliente / Contacto</th>
                          <th className="p-4">Cumpleaños</th>
                          <th className="p-4">Dirección Guardada</th>
                          <th className="p-4">Fecha Registro</th>
                          <th className="p-4">Notas Internas CRM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.filter(c => c.name.toLowerCase().includes(clientSearch.toLowerCase()) || c.email.toLowerCase().includes(clientSearch.toLowerCase())).map(client => (
                          <tr key={client.id} className="border-b border-slate-850 hover:bg-slate-900/30 transition-colors">
                            <td className="p-4">
                              <div className="flex flex-col gap-0.5 text-left">
                                <span className="font-black text-slate-200 uppercase text-xs">{client.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1"><Mail size={10} /> {client.email}</span>
                                <span className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1"><Phone size={10} /> {client.phone}</span>
                              </div>
                            </td>
                            <td className="p-4 text-[11px] font-mono font-bold text-pink-400 whitespace-nowrap">
                              {client.birthday ? (
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} /> {client.birthday}
                                </span>
                              ) : (
                                <span className="text-slate-600">No provisto</span>
                              )}
                            </td>
                            <td className="p-4 text-xs text-slate-450 font-semibold max-w-[200px] truncate" title={client.address || 'Sin dirección registrada'}>
                              {client.address ? (
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} className="text-slate-600 shrink-0" /> {client.address}
                                </span>
                              ) : (
                                <span className="text-slate-600">Sin dirección</span>
                              )}
                            </td>
                            <td className="p-4 text-[10px] text-slate-500 font-mono font-bold">
                              {new Date(client.registeredAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <textarea 
                                  defaultValue={client.notes}
                                  placeholder="Notas comerciales... (ej. VIP, le gustan peluches)"
                                  onBlur={(e) => handleSaveNotes(client.id, e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700 focus:border-indigo-500 rounded-lg p-2 text-xs focus:outline-none transition-colors text-slate-300 resize-none h-12 leading-tight"
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: PRODUCTS UPLOADER & LIST */}
              {sellerTab === 'products' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  
                  {/* Upload Form */}
                  <div className="xl:col-span-5 bg-slate-900/30 border border-slate-800 rounded-3xl p-6 h-fit backdrop-blur-md">
                    <h3 className="font-black text-lg uppercase tracking-tight flex items-center gap-2 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <Plus size={20} className="text-indigo-400" /> {editingProduct ? 'Editar Producto' : 'Subir Nuevo Producto'}
                    </h3>

                    <form onSubmit={handleProductSubmit} className="flex flex-col gap-4">
                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Nombre del Producto</label>
                        <input 
                          type="text" 
                          placeholder="Peluche Bumsy Gold, Taza, etc."
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors text-slate-200 font-semibold"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Precio ($)</label>
                          <input 
                            type="number" 
                            step="0.01"
                            placeholder="19.99"
                            value={prodPrice}
                            onChange={(e) => setProdPrice(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs focus:outline-none transition-colors text-slate-200 font-mono font-bold"
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Stock Físico</label>
                          <input 
                            type="number" 
                            placeholder="25"
                            value={prodStock}
                            onChange={(e) => setProdStock(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs focus:outline-none transition-colors text-slate-200 font-mono font-bold"
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Categoría</label>
                          <select 
                            value={prodCategory}
                            onChange={(e) => setProdCategory(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs focus:outline-none transition-colors text-slate-300 font-semibold"
                          >
                            {CATEGORIES.slice(1).map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Descripción Corta</label>
                        <textarea 
                          placeholder="Escribe los detalles mágicos de este producto oficial..."
                          value={prodDescription}
                          onChange={(e) => setProdDescription(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-855 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors text-slate-300 resize-none h-20 leading-snug font-semibold text-left"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase block mb-2 text-left">Preset Gráfico Oficial (Pre-diseños)</label>
                        <div className="grid grid-cols-3 gap-2">
                          {IMAGE_PRESETS.map((p, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setProdImageUrl(p.url)}
                              className={`aspect-video rounded-xl overflow-hidden border-2 relative ${prodImageUrl === p.url ? 'border-indigo-500 shadow-md scale-102' : 'border-slate-850 opacity-60 hover:opacity-100 transition-opacity'}`}
                            >
                              <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-[8px] uppercase tracking-wider font-black text-white text-center">
                                {p.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs py-3.5 rounded-xl shadow-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5">
                          <CheckCircle size={14} /> {editingProduct ? 'Confirmar Edición' : 'Subir Producto'}
                        </button>
                        {editingProduct && (
                          <button 
                            type="button" 
                            onClick={() => {
                              setEditingProduct(null);
                              setProdName('');
                              setProdPrice('');
                              setProdCategory('Peluches');
                              setProdDescription('');
                              setProdImageUrl(IMAGE_PRESETS[0].url);
                              setProdStock('25');
                            }}
                            className="bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-4 rounded-xl text-xs font-black uppercase transition-colors"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Custom Products List */}
                  <div className="xl:col-span-7 bg-slate-900/30 border border-slate-800 rounded-3xl p-6 backdrop-blur-md flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-lg uppercase tracking-tight flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <ShoppingBag size={20} className="text-indigo-400" /> Catálogo de Productos CRM
                      </h3>
                      <span className="text-[10px] bg-slate-950 px-3 py-1 border border-slate-850 text-indigo-400 font-black rounded-full uppercase">
                        {customProducts.length} subidos
                      </span>
                    </div>

                    {customProducts.length === 0 ? (
                      <div className="py-16 text-center text-slate-600 font-semibold flex flex-col items-center justify-center">
                        <ShoppingBag size={40} className="text-slate-800 mb-3 animate-bounce" />
                        No has subido ningún producto personalizado todavía.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 hide-scrollbar">
                        {customProducts.map(p => {
                          const stockLevel = getProductStock(p);

                          return (
                            <div key={p.id} className="bg-slate-955/60 border border-slate-855 rounded-2xl p-4 flex items-center justify-between gap-4 text-left">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-850 shrink-0">
                                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[8px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase font-black tracking-wider">
                                      {p.category}
                                    </span>
                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                      stockLevel <= 0 
                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                        : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    }`}>
                                      Stock: {stockLevel}
                                    </span>
                                  </div>
                                  <h4 className="font-black text-sm text-slate-200 uppercase mt-1 leading-tight">{p.name}</h4>
                                  <span className="font-mono text-indigo-400 font-bold text-xs">${p.price} USD</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleEditProductClick(p)}
                                  className="bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 p-2.5 rounded-xl transition-colors"
                                  title="Editar"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="bg-slate-900 border border-slate-800 text-red-400 hover:text-red-300 p-2.5 rounded-xl transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB: LEADS INBOX */}
              {sellerTab === 'inquiries' && (
                <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 backdrop-blur-md">
                  <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <MessageSquare size={20} className="text-indigo-400" /> Bandeja de Consultas de Clientes (Leads)
                  </h3>

                  {inquiries.length === 0 ? (
                    <div className="py-16 text-center text-slate-600 font-semibold">
                      Sin consultas ni leads de clientes registrados todavía.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {inquiries.map(inq => (
                        <div key={inq.id} className="bg-slate-950/60 border border-slate-855 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex flex-col gap-1.5 text-left">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-xs text-indigo-400 uppercase tracking-wider">{inq.buyerName}</span>
                              <span className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1"><Mail size={8} /> {inq.buyerEmail}</span>
                            </div>
                            <div>
                              <h4 className="font-black text-sm text-slate-200 uppercase leading-none">{inq.productName}</h4>
                              <p className="text-slate-400 text-xs italic mt-2 font-semibold">"{inq.message}"</p>
                            </div>
                            <span className="text-[9px] text-slate-555 font-mono font-bold mt-1">Recibido: {new Date(inq.createdAt).toLocaleString()}</span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                              className="bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-300 focus:outline-none transition-colors"
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="En Seguimiento">En Seguimiento</option>
                              <option value="Completado">Completado</option>
                            </select>
                            <button 
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-400 p-2 rounded-lg transition-all"
                              title="Archivar lead"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SETTINGS & SECURITY */}
              {sellerTab === 'settings' && (
                <div className="max-w-md bg-slate-900/30 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
                  <h3 className="font-black text-lg uppercase tracking-tight flex items-center gap-2 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <Key size={18} className="text-indigo-400" /> Seguridad del Vendedor
                  </h3>

                  <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Nombre de Usuario Administrador</label>
                      <input 
                        type="text" 
                        value="admin"
                        disabled
                        className="w-full bg-slate-950/50 text-slate-555 border border-slate-855 rounded-xl px-4 py-3 text-xs cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Nuevo PIN / Contraseña de Vendedor</label>
                      <input 
                        type="password" 
                        name="newPass"
                        placeholder="Ingresa tu nueva clave de acceso privado..."
                        className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors text-slate-200 font-mono"
                        required
                      />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs py-4 rounded-xl shadow-lg mt-2 uppercase tracking-wider transition-colors">
                      Guardar Clave de Acceso
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* ── SIMULATED QUICK CHECKOUT MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {activeCheckoutProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-slate-950/60 px-6 py-5 border-b border-slate-850 flex items-center justify-between text-left">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-pink-500" size={20} />
                  <h3 className="font-black text-base uppercase tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Formulario de Compra Rápida
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveCheckoutProduct(null)}
                  className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-wider bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full"
                >
                  Cerrar
                </button>
              </div>

              {/* Modal Body / Scrollable */}
              <div className="p-6 overflow-y-auto flex flex-col gap-5">
                
                {/* Product details mini-card */}
                <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 flex items-center gap-4 text-left">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-950 border border-slate-850 shrink-0">
                    <img src={activeCheckoutProduct.image} alt={activeCheckoutProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-200 uppercase leading-tight">{activeCheckoutProduct.name}</h4>
                    <span className="font-mono text-pink-500 font-bold text-sm block mt-0.5">${activeCheckoutProduct.price} USD</span>
                  </div>
                </div>

                {/* Pre-fill autofill notice banner */}
                <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-3 flex gap-2.5 text-left">
                  <Sparkles size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-indigo-300 leading-tight font-semibold">
                    ¡Autocompletado Activo! Hemos pre-cargado tus datos personales y dirección de envío desde tu perfil de usuario registrado.
                  </p>
                </div>

                <form onSubmit={handleConfirmPurchase} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={currentUser.name} 
                        disabled
                        className="w-full bg-slate-950/50 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-500 cursor-not-allowed font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Teléfono de Contacto</label>
                      <input 
                        type="tel" 
                        value={checkoutPhone} 
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        placeholder="+52 55 1234 5678"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-slate-200 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Email del Comprador</label>
                      <input 
                        type="email" 
                        value={currentUser.email} 
                        disabled
                        className="w-full bg-slate-950/50 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-500 cursor-not-allowed font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Fecha de Cumpleaños</label>
                      <input 
                        type="date" 
                        value={checkoutBirthday} 
                        onChange={(e) => setCheckoutBirthday(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-slate-300 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase block mb-1 text-left">Dirección de Envío Completa</label>
                    <input 
                      type="text" 
                      value={checkoutAddress} 
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      placeholder="Calle, Número, Colonia, Ciudad, Estado, Código Postal"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-slate-200 font-semibold"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black text-sm py-4 rounded-xl shadow-lg mt-3 uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CreditCard size={14} /> Confirmar Compra (${activeCheckoutProduct.price} USD)
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CRM;
