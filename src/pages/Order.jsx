import React from 'react';

// Demo orders data (replace with real data from backend or context)
const demoOrders = [
  {
    id: 'ORD123456',
    date: '2025-07-30',
    status: 'Delivered',
    total: 2499,
    currency: '₹',
    items: [
      { name: 'Premium T-shirt', size: 'L', qty: 2, price: 799, image: '/src/assets/p_img1.png' },
      { name: 'Denim Jeans', size: '32', qty: 1, price: 899, image: '/src/assets/p_img2.png' },
    ],
    address: 'Pune, Maharashtra',
    payment: 'UPI',
  },
  {
    id: 'ORD123457',
    date: '2025-07-25',
    status: 'Shipped',
    total: 999,
    currency: '₹',
    items: [
      { name: 'Casual Shirt', size: 'M', qty: 1, price: 999, image: '/src/assets/p_img3.png' },
    ],
    address: 'Mumbai, Maharashtra',
    payment: 'COD',
  },
];

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const Order = () => {
  // In real app, fetch orders from backend or context
  const orders = demoOrders; // Replace with real data

  return (
    <div className="min-h-[70vh] w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-10 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-tight">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-gray-400 text-center py-20 text-lg">No orders found.</div>
        ) : (
          <div className="flex flex-col gap-8">
            {orders.map(order => (
              <div key={order.id} className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-gray-700">Order ID:</span>
                    <span className="text-gray-500">{order.id}</span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span className="font-semibold text-gray-700">Date:</span>
                    <span className="text-gray-500">{order.date}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>{order.status}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Product Thumbnails */}
                  <div className="flex flex-row md:flex-col gap-2 md:gap-3 items-center md:items-start md:justify-center min-w-[60px] md:min-w-[80px]">
                    {order.items.map((item, idx) => (
                      <img key={item.name + idx} src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-xl border bg-gray-50 shadow" />
                    ))}
                  </div>
                  {/* Order Details */}
                  <div className="flex-1 flex flex-col gap-3">
                    {order.items.map((item, idx) => (
                      <div key={item.name + idx} className="flex items-center gap-3 border-b pb-2 last:border-b-0 last:pb-0">
                        <div className="flex-1">
                          <div className="font-semibold text-base truncate text-gray-800" title={item.name}>{item.name}</div>
                          <div className="text-xs text-gray-500">Size: {item.size}</div>
                        </div>
                        <div className="font-semibold text-base whitespace-nowrap text-gray-700">{order.currency}{item.price} <span className="text-xs text-gray-400">x {item.qty}</span></div>
                      </div>
                    ))}
                  </div>
                  {/* Order Summary & Track */}
                  <div className="flex flex-col gap-3 min-w-[200px] md:border-l md:pl-6 border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Delivery Address</div>
                      <div className="text-sm text-gray-700 font-semibold mb-2">{order.address}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Payment</div>
                      <div className="text-sm text-gray-700 font-semibold mb-2">{order.payment}</div>
                    </div>
                    <div className="text-base font-bold text-gray-900 mt-2">Total: {order.currency}{order.total}</div>
                    <button className="mt-3 bg-gradient-to-r from-blue-700 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-800 hover:to-purple-700 transition-all text-sm" onClick={() => window.alert('Order tracking coming soon!')}>Track Order</button>
                    {/* Status Stepper */}
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${order.status==='Delivered' ? 'bg-green-500' : order.status==='Shipped' ? 'bg-blue-500' : order.status==='Processing' ? 'bg-yellow-400' : 'bg-gray-300'}`}></span>
                        <span className="text-xs font-medium">{order.status}</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 rounded-full">
                        <div className={`h-1 rounded-full transition-all duration-500 ${order.status==='Delivered' ? 'bg-green-500 w-full' : order.status==='Shipped' ? 'bg-blue-500 w-2/3' : order.status==='Processing' ? 'bg-yellow-400 w-1/3' : 'bg-gray-300 w-1/6'}`}></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                        <span>Processing</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
