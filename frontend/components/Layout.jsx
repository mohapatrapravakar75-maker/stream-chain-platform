import WalletConnect from './WalletConnect';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            🎬 <span className="ml-2">StreamChain</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/upload" className="hover:text-blue-400">Upload</Link>
            <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <WalletConnect />
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
      
      <footer className="bg-gray-800 p-6 border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 StreamChain - Decentralized Video Streaming Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
