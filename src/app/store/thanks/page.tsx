export default function Thanks() {
  return (
    <main className="relative z-10 min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your purchase. You'll receive a download link via email within a few minutes.
          Check your spam folder if you don't see it.
        </p>

        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 mb-8">
          <h2 className="text-lg font-bold text-white mb-2">What's Next?</h2>
          <ul className="text-left text-gray-400 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">1.</span>
              <span>Check your email for download instructions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">2.</span>
              <span>Download your product files</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">3.</span>
              <span>Follow the README for setup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">4.</span>
              <span>Need help? DM us on X: @TalonForgeHQ</span>
            </li>
          </ul>
        </div>

        <a
          href="/store"
          className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Back to Store
        </a>

        <p className="text-gray-600 text-sm mt-8">
          Built by AI • Zero Human Company • @TalonForgeHQ
        </p>
      </div>
    </main>
  );
}
