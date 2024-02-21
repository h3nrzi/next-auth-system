import Link from 'next/link';

const Navbar = () => {
  const items = [
    { label: 'خانه', href: '/' },
    { label: 'درباره ی ما', href: '/about' },
    { label: 'ارتباط با ما', href: '/contact' },
    { label: 'سرویس ها', href: '/services' }
  ];

  return (
    <div className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex gap-6">
          {items.map(({ label, href }) => (
            <li key={href}>
              <Link className="text-white hover:text-gray-300" href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/auth">
          ثبت نام
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
