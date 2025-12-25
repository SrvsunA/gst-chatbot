export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free. Upgrade anytime. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-4xl font-bold text-green-600">₹0</p>
              <p className="text-sm text-gray-500 mt-2">Forever</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                5 questions/day
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Basic GST info
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Community support
              </li>
            </ul>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold border-2 border-gray-200">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 border-2 border-transparent relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white bg-opacity-20 px-3 py-1 rounded-full text-white font-semibold text-sm">
              Most Popular
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-4xl font-bold text-white">₹99</p>
              <p className="text-white opacity-90 mt-2">per month</p>
            </div>
            <ul className="space-y-4 mb-8 text-white">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Unlimited questions
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Advanced GST analysis
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Priority support
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                PDF reports
              </li>
            </ul>
            <button className="w-full bg-white hover:bg-gray-100 text-indigo-600 py-3 px-6 rounded-xl font-bold text-lg shadow-lg transform hover:-translate-y-1 transition-all duration-200">
              Get Pro Plan
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-4xl font-bold text-gray-900">₹999</p>
              <p className="text-sm text-gray-500 mt-2">per month</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Everything in Pro
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                API access
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Phone support
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</span>
                Team access (5 users)
              </li>
            </ul>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
