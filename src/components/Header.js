import React from "react";
import { Link } from "react-router";

export function Header({ activePath }) {
  Header.propTypes = {
    activePath: React.PropTypes.string
  };

  return (
    <nav className="navbar navbar-inverse navbar-tall navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="navbar-header">
              <button className="navbar-toggle" style={{ marginRight: "0px" }} type="button" data-toggle="collapse" data-target="#navigator">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <Link id="name" to="/" style={{ marginLeft: "0px", paddingLeft: "0px" }} className="navbar-brand">Karthik M A M</Link>
            </div>

            <div className="collapse navbar-collapse" id="navigator">
              <ul className="nav navbar-nav navbar-right">
                <li className={activePath === "/projects" && "active"}><Link to="/projects">Projects</Link></li>
                <li className={activePath === "/blog" && "active"}><Link to="/blog">Blog</Link></li>
                <li className={activePath === "/about" && "active"}><Link to="/about">About</Link></li>
                <li className={activePath === "/contact" && "active"}><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}