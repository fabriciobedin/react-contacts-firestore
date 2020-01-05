import React from 'react'
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="panel-heading">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/"><span className="navbar-brand bg-dark">Contacts</span></Link>
          <Link to="/create"><button className="btn btn-outline-primary my-2 my-sm-0" >Add contact</button></Link>
        </div>
      </nav>
    </div>
  )
}

export default Header;

