import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface propsNav {
  setIsAuth: (val: boolean) => void;
  setLog: (val: boolean) => void;
}

const Navbar: React.FC<propsNav> = ({setIsAuth, setLog}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenDos, setDropdownOpenDos] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">
              GestionEquipos
            </span>
          </div>

          {/* Enlaces */}
          <div className="hidden md:flex items-center space-x-6 relative">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Inicio
            </Link>

            {/* Dropdown Editorial */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setDropdownOpenDos(false);
                }}
                className="text-gray-700 hover:text-indigo-600 transition focus:outline-none"
              >
                Equipos ▾
              </button>
              {dropdownOpen && (
                <div className="absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="/equipos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Ver equipos
                  </Link>
                  <Link
                    to="/formularioEquipos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Agregar equipos
                  </Link>
                </div>
              )}
            </div>
            {/* Dropdown libros */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownOpenDos(!dropdownOpenDos);
                  setDropdownOpen(false);
                }}
                className="text-gray-700 hover:text-indigo-600 transition focus:outline-none"
              >
                Presidentes ▾
              </button>
              {dropdownOpenDos && (
                <div className="absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="/presidentes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpenDos(false)}
                  >
                    Ver presidentes
                  </Link>
                  <Link
                    to="/formularioPresidentes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpenDos(false)}
                  >
                    Agregar presidentes
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Botón acción */}
          <div className="hidden md:flex items-center">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              onClick={() => {
                localStorage.clear();
                setIsAuth(false);
                setLog(false);
                navigate("/");
              }}
            >
              Salir
            </button>
          </div>

          {/* Menú móvil (puedes implementar hamburguesa más adelante) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
