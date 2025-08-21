import React, { useState } from "react";
import Avatar from "./images/image-avatar.png";
import Cart from "./images/icon-cart.svg";
import Product1 from "./images/image-product-1.jpg";
import Product2 from "./images/image-product-2.jpg";
import Product3 from "./images/image-product-3.jpg";
import Product4 from "./images/image-product-4.jpg";
import minus from "./images/icon-minus.svg";
import plus from "./images/icon-plus.svg";
import ham from "./images/icon-menu.svg";
import logo from "./images/logo.svg";
import close from "./images/icon-close.svg";
import trash from "./images/icon-delete.svg";
import { Toaster, toast } from "sonner";

const App: React.FC = () => {
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const product = {
    name: "Fall Limited Edition Sneakers",
    price: 125,
    thumbnail: Product1,
  };

  const productImages = [
    { src: Product1, alt: "Sneaker view 1" },
    { src: Product2, alt: "Sneaker view 2" },
    { src: Product3, alt: "Sneaker view 3" },
    { src: Product4, alt: "Sneaker view 4" },
  ];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));

  const addToCart = () => {
    if (quantity > 0) {
      setCartItems([{ ...product, quantity }]);
      toast("Item added to cart", {
        style: {
          background: "#f97316",
          color: "white",
        },
      });
    } else {
      toast("Please select at least 1 item ❌", {
        style: {
          background: "#f97316",
          color: "white",
        },
      });
    }
  };

  const removeFromCart = () => setCartItems([]);

  const checkout = () => {
    toast("Checkout successful 🎉", {
      style: {
        background: "#f97316",
        color: "white",
      },
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sonner */}
      <Toaster position="top-center" />

      {/* Overlay for menu (mobile only) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar menu (mobile only) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 space-y-6">
          <img
            src={close}
            alt="Close Menu"
            onClick={() => setIsMenuOpen(false)}
            className="w-6 h-6 inline-block ml-2 cursor-pointer"
          />
          <nav className="flex flex-col space-y-4 font-medium text-gray-800">
            <a href="#">Collections</a>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              {/* Mobile menu button */}
              <img
                src={ham}
                alt="Menu"
                onClick={() => setIsMenuOpen(true)}
                className="w-6 h-6 cursor-pointer md:hidden"
              />
              <img src={logo} alt="Logo" className="w-auto h-6" />

              {/* Desktop nav */}
              <nav className="hidden md:flex space-x-6 font-medium text-gray-600">
                <a href="#" className="hover:text-gray-900">
                  Collections
                </a>
                <a href="#" className="hover:text-gray-900">
                  Men
                </a>
                <a href="#" className="hover:text-gray-900">
                  Women
                </a>
                <a href="#" className="hover:text-gray-900">
                  About
                </a>
                <a href="#" className="hover:text-gray-900">
                  Contact
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4 relative">
              {/* Cart with badge */}
              <div
                className="relative cursor-pointer"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <img src={Cart} className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <img src={Avatar} className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="absolute right-4 top-16 w-[420px] bg-white shadow-xl rounded-lg z-50">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold">Cart</span>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <img src={close} alt="Close Cart" className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between space-x-4"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-12 h-12 rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-gray-600 text-sm">{item.name}</p>
                        <p className="text-gray-600 text-sm">
                          ${item.price.toFixed(2)} x {item.quantity}{" "}
                          <span className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <img
                        src={trash}
                        alt="Remove"
                        className="w-4 h-4 cursor-pointer"
                        onClick={removeFromCart}
                      />
                    </div>
                  ))}
                  <button
                    onClick={checkout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg mt-4"
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="w-full max-w-[445px] space-y-6">
            <img
              src={productImages[selectedImage].src}
              alt={productImages[selectedImage].alt}
              className="w-full rounded-xl"
            />
            <div className="grid grid-cols-4 gap-6">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-white opacity-50"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Sneaker Company
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              Fall Limited Edition Sneakers
            </h2>
            <p className="text-gray-600">
              These low-profile sneakers are your perfect casual wear
              companion. Featuring a durable rubber outer sole, they'll
              withstand everything the weather can offer.
            </p>

            <div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  $125.00
                </span>
                <span className="bg-black text-white px-2 py-1 rounded text-sm font-medium">
                  50%
                </span>
              </div>
              <p className="text-gray-500 line-through">$250.00</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:space-x-4">
                <div className="flex items-center justify-between bg-gray-100 rounded-lg flex-1 sm:flex-none">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-gray-200"
                  >
                    <img src={minus} className="w-auto h-auto" />
                  </button>
                  <span className="px-4 py-3 font-medium text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-gray-200"
                  >
                    <img src={plus} className="w-auto h-auto" />
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
                >
                  <img src={Cart} className="w-6 h-6" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
