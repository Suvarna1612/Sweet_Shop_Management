
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="main-content">
      <div className="container">
        <div className="text-center" style={{ padding: '6rem 0' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            marginBottom: '2rem', 
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🍭 Welcome to Sweet Shop
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '3rem', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Your one-stop destination for the finest selection of sweets, candies, and confections. 
            Discover delicious treats and manage your sweet inventory with ease.
          </p>

          <div className="d-flex justify-center gap-2" style={{ flexWrap: 'wrap' }}>
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Browse Sweets
                </Link>
                <Link to="/admin" className="btn btn-secondary btn-lg">
                  Admin Panel
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>



        {!isAuthenticated() && (
          <div className="card text-center" style={{ marginTop: '4rem', padding: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Join our sweet community and start exploring delicious treats today!
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Your Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;