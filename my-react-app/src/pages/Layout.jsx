import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="fixed top-0 w-full bg-black text-white p-4 z-1000 border-b-2 border-white z-30">
        <ul className="list-none m-0 p-0 flex justify-around">
          <li className="inline">
            <Link to="/" className="text-white no-underline p-2 hover:bg-gray-800 rounded">Register</Link>
          </li>
          <li className="inline">
            <Link to="/printcheque" className="text-white no-underline p-2 hover:bg-gray-800 rounded">Printcheque</Link>
          </li>
          <li className="inline">
            <Link to="/Report" className="text-white no-underline p-2 hover:bg-gray-800 rounded">Report</Link>
          </li>
        </ul>
      </nav>
      <main className="mt-16 p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;