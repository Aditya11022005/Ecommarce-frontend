import React from 'react';

const Contect = () => {
    const [form, setForm] = React.useState({ name: '', email: '', message: '' });
    const [sent, setSent] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setError('Please fill in all fields.');
            return;
        }
        // Simple email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        // Use mailto: to send email
        const mailto = `mailto:your@email.com?subject=Contact%20from%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
        window.location.href = mailto;
        setSent(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-yellow-50 flex flex-col items-center py-12 px-4 animate-fadeIn">
            {/* Hero Section */}
            <div className="w-full max-w-2xl text-center mb-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 shadow-lg animate-fadeInUp">
                    <span className="text-5xl text-blue-500 animate-bounce">✉️</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 animate-slideDown">Contact Us</h1>
                <p className="text-lg md:text-xl text-gray-600 animate-fadeIn delay-200">We'd love to hear from you! Fill out the form and we'll get back to you soon.</p>
            </div>

            {/* Contact Form Card with Glassmorphism */}
            <div className="w-full max-w-lg bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-blue-100 animate-scaleIn">
                {sent ? (
                    <div className="flex flex-col items-center gap-4 animate-fadeInUp">
                        <span className="text-green-500 text-5xl animate-bounce">✅</span>
                        <div className="text-green-700 text-lg font-bold text-center">Thank you! Your message has been sent.</div>
                        <div className="text-gray-500 text-sm">We appreciate your feedback and will reply soon.</div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Floating Label Input */}
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-transparent"
                                placeholder="Your Name"
                                autoComplete="off"
                            />
                            <label className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600 bg-white/80 px-1 rounded">Name</label>
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-transparent"
                                placeholder="you@email.com"
                                autoComplete="off"
                            />
                            <label className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600 bg-white/80 px-1 rounded">Email</label>
                        </div>
                        <div className="relative">
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition min-h-[100px] placeholder-transparent"
                                placeholder="Type your message..."
                            />
                            <label className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600 bg-white/80 px-1 rounded">Message</label>
                        </div>
                        {error && <div className="text-red-500 text-sm text-center animate-fadeInUp">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 active:scale-95 animate-bounceIn text-lg tracking-wide"
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </div>

            {/* Contact Info Highlights */}
            <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
                <div className="flex flex-col items-center bg-white/80 backdrop-blur rounded-xl shadow-md p-6 animate-fadeInUp">
                    <span className="text-blue-500 text-3xl mb-2 animate-bounce">📧</span>
                    <span className="font-medium text-gray-700">your@email.com</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 backdrop-blur rounded-xl shadow-md p-6 animate-fadeInUp delay-100">
                    <span className="text-green-500 text-3xl mb-2 animate-pulse">📞</span>
                    <span className="font-medium text-gray-700">+91 93224 65522</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 backdrop-blur rounded-xl shadow-md p-6 animate-fadeInUp delay-200">
                    <span className="text-yellow-500 text-3xl mb-2 animate-spin-slow">🏢</span>
                    <span className="font-medium text-gray-700">Pune, India</span>
                </div>
            </div>
        </div>
    );
}

export default Contect;
