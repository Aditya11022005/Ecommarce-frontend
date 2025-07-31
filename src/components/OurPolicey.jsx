import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.22,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
  hover: {
    scale: 1.07,
    rotate: '-2deg',
    boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.18), 0 1.5px 8px 0 rgba(59, 130, 246, 0.10)',
    borderColor: '#38bdf8', // sky-400
    transition: { type: 'spring', stiffness: 350 },
  },
};

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange',
    desc: 'Hassle-free 7-day exchange on all products.',
  },
  {
    icon: assets.quality_icon,
    title: '7-Day Return',
    desc: 'Return items within 7 days with no questions asked.',
  },
  {
    icon: assets.support_img,
    title: '24/7 Support',
    desc: 'We’re here to help you anytime, anywhere.',
  },
];

const OurPolicey = () => {
  return (
    <section className="relative py-20 px-4 sm:px-10 bg-gradient-to-br from-white via-blue-50 to-yellow-50 overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-200 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-100 opacity-20 rounded-full blur-2xl z-0" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-800 tracking-tight">
          Why Shop with <span className="text-gray-700">Aruzz?</span>
        </h2>
        <div className="flex justify-center mb-10">
          <span className="block w-24 h-1 rounded-full bg-gray-300 opacity-70" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {policies.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="w-full sm:w-80 bg-white border border-gray-200 shadow-md p-6 rounded-2xl transition-all text-center cursor-pointer select-none"
              style={{ willChange: 'transform, box-shadow, border-color' }}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-14 h-14 mx-auto mb-5 drop-shadow-md"
              />
              <h3 className="text-lg font-bold text-gray-700 mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicey;
