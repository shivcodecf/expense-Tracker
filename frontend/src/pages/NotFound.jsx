import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-6 text-center">
      <h1 className="text-[5rem] font-extrabold text-cyan-400 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
      <p className="text-slate-400 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <Link
        to="/"
        className="btn bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-6 py-2 rounded-xl font-semibold transition"
      >
        Go Home
      </Link>
    </div>
  );
}
