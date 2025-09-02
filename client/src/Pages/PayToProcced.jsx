import React, { useState } from "react";

const PayToProceed = () => {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        name: "",
    });

    const [language, setLanguage] = useState("English");
    const [showDropdown, setShowDropdown] = useState(false);

    // Language text dictionary
    const translations = {
        English: {
            title: "AI Fiesta",
            email: "Email *",
            phone: "Phone *",
            name: "Name *",
            pay: "Proceed to Pay",
            secured: "Secured by Razorpay",
        },
        हिन्दी: {
            title: "एआई फिएस्टा",
            email: "ईमेल *",
            phone: "फ़ोन *",
            name: "नाम *",
            pay: "भुगतान करें",
            secured: "रज़ोरपे द्वारा सुरक्षित",
        },
        Español: {
            title: "AI Fiesta",
            email: "Correo *",
            phone: "Teléfono *",
            name: "Nombre *",
            pay: "Proceder al Pago",
            secured: "Seguro por Razorpay",
        },
        Français: {
            title: "AI Fiesta",
            email: "E-mail *",
            phone: "Téléphone *",
            name: "Nom *",
            pay: "Procéder au Paiement",
            secured: "Sécurisé par Razorpay",
        },
        Deutsch: {
            title: "AI Fiesta",
            email: "E-Mail *",
            phone: "Telefon *",
            name: "Name *",
            pay: "Zur Kasse",
            secured: "Gesichert durch Razorpay",
        },
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLanguageSelect = (lang) => {
        setLanguage(lang);
        setShowDropdown(false);
    };

    const handlePay = () => {
        alert(`Payment started for ${formData.name} in ${language}`);
    };

    const t = translations[language]; // pick current language texts

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 bg-black text-white px-4 py-3">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
                        alt="AI Fiesta"
                        className="w-10 h-10 rounded-md"
                    />
                    <h2 className="text-lg font-semibold">{t.title}</h2>

                    {/* Language Button */}
                    <div className="ml-auto relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="px-2 py-1 bg-green-600 rounded-md text-sm"
                        >
                            {language}
                        </button>
                        {showDropdown && (
                            <ul className="absolute right-0 mt-2 w-32 bg-amber-300 text-black shadow-md rounded-md border z-10">
                                {Object.keys(translations).map((lang) => (
                                    <li
                                        key={lang}
                                        onClick={() => handleLanguageSelect(lang)}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Form */}
                <div className="p-5 space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder={t.email}
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder={t.phone}
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder={t.name}
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-5 py-4 border-t">
                    <span className="font-semibold text-lg">₹ 999.00</span>
                    <button
                        onClick={handlePay}
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                        {t.pay}
                    </button>
                </div>

                <div className="text-center text-xs text-gray-500 pb-3">{t.secured}</div>
            </div>
        </div>
    );
};

export default PayToProceed;
