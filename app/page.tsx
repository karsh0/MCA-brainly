import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="p-4 bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BRAINLY</h1>
          <nav className="flex space-x-4">
            <Link href="/api/auth/signin">
              <button className="hover:underline">Sign In</button>
            </Link>
            <Link href="/signup">
              <button className="hover:underline">Sign Up</button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Welcome to BRAINLY</h2>
          <p className="text-lg mb-6">
            Simplify learning with a collaborative platform for asking and
            answering questions.
          </p>
          <Link href="/signup">
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">Why Choose BRAINLY?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold">Collaborative Learning</h4>
              <p>Ask and answer questions in a community-driven environment.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold">Intelligent Suggestions</h4>
              <p>Get the most relevant answers quickly and efficiently.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold">User-Friendly Interface</h4>
              <p>Simple, responsive design accessible from any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h3 className="text-2xl font-semibold mb-4">Ready to Start Learning?</h3>
        <Link href="/signup">
          <button className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-200">
            Sign Up Now
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-gray-800 text-white text-center">
        <p>&copy; 2025 BRAINLY. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
