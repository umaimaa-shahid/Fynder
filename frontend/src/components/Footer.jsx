import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex-row gap-3">
        <div className="logo-icon" style={{width: 32, height: 32}}>F</div>
        <span>© 2026 Fynder. FAST-NU Lahore.</span>
      </div>
      <div className="footer-nav">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/support">Support</Link>
      </div>
    </footer>
  );
}
