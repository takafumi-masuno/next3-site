import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b flex items-center h-14 px-4">
      <nav>
        <Link href="/" className="text-2xl font-logo">Home</Link>
        <Link href="/ripple" className="text-2xl font-logo">Ripple</Link>
      </nav>
    </header>
  );
};

export default Header;