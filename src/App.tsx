import { Header } from '@/components/layout/header';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { NewReferralPage } from '@/pages/referral/new';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Independent Medical Examinations
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Professional, timely, and accurate independent medical examinations for legal professionals.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      href="/portal/register"
                      className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Get started
                    </a>
                    <a href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </main>
          } />
          <Route path="/portal/login" element={<LoginPage />} />
          <Route path="/portal/register" element={<RegisterPage />} />
          <Route path="/portal/referral/new" element={<NewReferralPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;