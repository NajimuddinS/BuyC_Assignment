import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Car, ShieldCheck, UserCircle, LogOut } from 'lucide-react';
import { AuthForm } from './components/auth/AuthForm';
import { CarForm } from './components/car/CarForm';
import { CarList } from './components/car/CarList';
import { CarFilters } from './components/car/CarFilters';
import { useAuth } from './context/AuthContext';
import { useCars } from './context/CarContext';

function App() {
  const { user, logout } = useAuth();
  const { cars, deleteCars, filterCars } = useCars();

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
                {user ? (
                  <>
                    <span className="text-gray-600">Welcome, {user.name}</span>
                    {user.role === 'dealer' && (
                      <Link
                        to="/add-car"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Add Car
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <LogOut className="h-5 w-5 mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/signup" element={<AuthForm mode="signup" />} />
            <Route
              path="/add-car"
              element={
                user?.role === 'dealer' ? (
                  <CarForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                user ? (
                  user.role === 'buyer' ? (
                    // Buyer view with filters
                    <div className="grid grid-cols-4 gap-8">
                      <div className="col-span-1">
                        <CarFilters onFilterChange={filterCars} />
                      </div>
                      <div className="col-span-3">
                        <CarList
                          cars={cars}
                          onEdit={console.log}
                          onDelete={deleteCars}
                          isDealer={false}
                        />
                      </div>
                    </div>
                  ) : (
                    // Dealer view without filters
                    <div className="w-full">
                      <CarList
                        cars={cars}
                        onEdit={console.log}
                        onDelete={deleteCars}
                        isDealer={true}
                      />
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Welcome to BUYC Corp
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Please sign in to view and filter available cars
                    </p>
                    <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Sign In to Continue
                    </Link>
                  </div>
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;