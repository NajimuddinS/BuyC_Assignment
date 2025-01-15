import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Car, ShieldCheck, UserCircle } from 'lucide-react';
import { AuthForm } from './components/auth/AuthForm';
import { CarForm } from './components/car/CarForm';
import { CarList } from './components/car/CarList';
import { CarFilters } from './components/car/CarFilters';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <Car className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">BUYC Corp</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <UserCircle className="h-5 w-5 mr-1" />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                >
                  <ShieldCheck className="h-5 w-5 mr-1" />
                  Register as Dealer
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/signup" element={<AuthForm mode="signup" />} />
            <Route path="/add-car" element={<CarForm onSubmit={console.log} />} />
            <Route
              path="/"
              element={
                <div className="grid grid-cols-4 gap-8">
                  <div className="col-span-1">
                    <CarFilters onFilterChange={console.log} />
                  </div>
                  <div className="col-span-3">
                    <CarList
                      cars={[]} // TODO: Add sample data
                      onEdit={console.log}
                      onDelete={console.log}
                    />
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;