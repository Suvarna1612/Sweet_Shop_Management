
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="main-content">
      <div className="container">
        <div className="text-center" style={{ padding: '6rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <img src="/image.png" alt="Sri Krishna Sweets Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <h1 style={{ 
              fontSize: '4rem', 
              color: 'white',
              margin: 0,
              fontWeight: '800',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}>
              Sri Krishna Sweets
            </h1>
          </div>
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '1.5rem', 
            maxWidth: '800px', 
            margin: '0 auto 1.5rem',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Specializing in authentic traditional sweets with a legacy of 30 years
          </p>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-muted)', 
            marginBottom: '3rem', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            From classic Bengali sweets to premium dry fruit delicacies, we craft every sweet with 
            traditional recipes passed down through generations. Experience the perfect blend of 
            authentic flavors, quality ingredients, and time-honored craftsmanship.
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
              Experience Our Sweet Legacy
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Join thousands of satisfied customers who trust Sri Krishna Sweets for authentic, 
              premium quality traditional sweets made with love and expertise.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Your Sweet Journey
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;