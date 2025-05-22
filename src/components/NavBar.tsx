import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenDos, setDropdownOpenDos] = useState(false);
  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">Biblioteca</span>
          </div>

          {/* Enlaces */}
          <div className="hidden md:flex items-center space-x-6 relative">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Inicio
            </Link>

            {/* Dropdown Editorial */}
            <div className="relative">
              <button
                onClick={() =>{ setDropdownOpen(!dropdownOpen); setDropdownOpenDos(false)}}
                className="text-gray-700 hover:text-indigo-600 transition focus:outline-none"
              >
                Editorial ▾
              </button>
              {dropdownOpen && (
                <div className="absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="/editoriales"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Ver editoriales
                  </Link>
                  <Link
                    to="/formularioEditorial"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Agregar editorial
                  </Link>
                </div>
              )}
            </div>
            {/* Dropdown libros */}
            <div className="relative">
              <button
                onClick={() => {setDropdownOpenDos(!dropdownOpenDos); setDropdownOpen(false)}}
                className="text-gray-700 hover:text-indigo-600 transition focus:outline-none"
              >
                Libros ▾
              </button>
              {dropdownOpenDos && (
                <div className="absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="/libros"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpenDos(false)}
                  >
                    Ver libros
                  </Link>
                  <Link
                    to="/formulariolibro"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpenDos(false)}
                  >
                    Agregar libros
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Botón acción */}
          <div className="hidden md:flex items-center">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Ingresar
            </button>
          </div>

          {/* Menú móvil (puedes implementar hamburguesa más adelante) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
