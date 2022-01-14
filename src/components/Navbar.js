import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { authContext } from "../contexts/authContext";

function Navbar() {
  const { loggedInUser, logout } = useContext(authContext);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-primary'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/projetos'>
          Project.io
        </NavLink>

        <div
          className='collapse navbar-collapse  d-flex justify-content-between'
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName='active'
                exact
                to='/projetos'
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName='active'
                exact
                to='/projeto/criar'
              >
                Novo Projeto
              </NavLink>
            </li>
            {loggedInUser.user._id ? (
              <li
                className='nav-item d-flex align-items-center'
                onClick={logout}
                style={{ cursor: "pointer" }}
              >
                <span>Sair</span>
              </li>
            ) : null}
          </ul>

          {/* Só exibe foto do avatar e nome do usuário se o mesmo estiver logado */}
          {loggedInUser.user._id ? (
            <div>
              <span className='me-4'>Olá, {loggedInUser.user.name}</span>
              <img
                style={{ width: "45px", height: "45px", objectFit: "cover" }}
                className='img-fluid rounded-circle'
                src={loggedInUser.user.pictureUrl}
                alt='O usuário'
              />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
