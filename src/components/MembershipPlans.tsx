import React, { useState } from "react";

const plans = [
  {
    id: "freemium",
    title: "Freemium (2 Months)",
    price: "Free",
    features: ["Basic platform access"],
  },
  {
    id: "premium",
    title: "Premium Member (Project Creators)",
    price: "X Birr / Month",
    features: [
      "List investment opportunities",
      "Meet capital providers",
      "Track deal flow",
      "Apply to pitch in events",
    ],
  },
  {
    id: "capital",
    title: "Capital Provider",
    price: "X Birr / Month",
    features: [
      "Engage with deals directly",
      "Access full platform features",
      "Track pipeline",
      "Real-time deal notifications",
    ],
  },
  {
    id: "service",
    title: "Service Provider",
    price: "X Birr / Month",
    features: [
      "List services for private capital ecosystem",
      "Showcase expertise at events",
      "Generate referrals",
      "Direct regional leads",
    ],
  },
];

const MembershipPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!res.ok) throw new Error("Failed to join membership");

      setMessage("Successfully joined the membership!");
      setSelectedPlan(null);
      setFormData({ name: "", email: "" });
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen py-16 px-6"
      style={{
        backgroundImage: `url('/images/image1.jpg')`, // Put this image in /public folder
      }}
    >
      <div className="bg-transparent  rounded-xl max-w-7xl mx-auto py-10 px-6 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Choose Your Membership Plan
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-soft-gold border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.title}
                </h3>
                <p className="text-lg text-blue-500 font-bold">{plan.price}</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button
                className="mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                onClick={() => setSelectedPlan(plan.id)}
                disabled={isSubmitting}
              >
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Join {plans.find((p) => p.id === selectedPlan)?.title}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 rounded-md text-sm"
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 rounded-md text-sm"
              disabled={isSubmitting}
            />
            {message && <p className="mb-3 text-red-600 text-sm">{message}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-4 py-2 border rounded text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPlans;
