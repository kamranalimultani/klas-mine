import { useState, useEffect } from "react";

export default function OrderSummary() {
  const [showModal, setShowModal] = useState(false);
  const [autoAddress, setAutoAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  useEffect(() => {
    if (showModal) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const { road, city, state, postcode, country } = data.address;
            setAutoAddress(
              `${road || ""}, ${city || ""}, ${state || ""} - ${postcode || ""}, ${country || ""}`
            );
          } catch {
            setAutoAddress("Unable to fetch location.");
          }
        },
        () => setAutoAddress("Location access denied.")
      );
    }
  }, [showModal]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSaveAddress = () => {
    const { name, phone, address, city, state, pin } = formData;
    const fullAddress = `${name} (${phone}) — ${address}, ${city}, ${state} - ${pin}. ${autoAddress}`;
    setSavedAddress(fullAddress);
    setShowModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex pt-20 justify-center px-20">
        <div className="max-w-md w-full p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

          <div className="border-t border-b border-gray-300 text-sm text-gray-600">
            <div className="flex justify-between py-3">
              <span>Item Total</span>
              <span className="font-medium text-gray-800">₹16,497.00</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Delivery Charge</span>
              <span className="font-medium text-gray-800">₹00.00</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Discount</span>
              <span className="font-medium text-gray-800">₹00.00</span>
            </div>
          </div>

          <div className="flex justify-between pt-4 text-base font-semibold text-gray-800">
            <span>Total Pay</span>
            <span>₹16,497.00</span>
          </div>

          <div className="flex flex-col items-center mt-10">
            <img src="assets/images/icon/cart-map.svg" alt="map" />
            <p className="mt-3 text-gray-700 text-sm mb-6 text-center">
              {savedAddress || "Enter your delivery address"}
            </p>
          {savedAddress ? (
            <>
               <button
                onClick={() => setShowModal(true)}
                className="mt-4 text-blue-600 hover:underline text-sm"
                >
                ✏️ Edit Address
                </button>
                <button
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg shadow-lg text-[18px] font-medium hover:from-blue-500 hover:to-purple-500 transition-all"
                >
                Continue to Payment
                </button>

             
            </>
            ) : (
            <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg shadow-lg text-[18px] font-medium hover:from-blue-500 hover:to-purple-500 transition-all"
            >
                Add address to Proceed
            </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-xl relative">
            <h3 className="text-xl font-semibold mb-3">Add Delivery Address</h3>
            <p className="text-sm text-gray-600 mb-4">
              Auto Detected: <span className="font-medium">{autoAddress}</span>
            </p>

            <div className="space-y-3">
              <input
                name="name"
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                name="phone"
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <textarea
                name="address"
                onChange={handleChange}
                placeholder="Full Address"
                className="w-full border border-gray-300 p-2 rounded"
              ></textarea>
              <div className="flex gap-3">
                <input
                  name="city"
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  name="state"
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <input
                name="pin"
                onChange={handleChange}
                placeholder="PIN Code"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
