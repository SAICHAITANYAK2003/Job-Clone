import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header ">
      <div className="nav-content">
        <div className="navbar-large-container">
          <Link to='/'>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="nav-lg-website-logo"
            />
          </Link>

          <ul className="nav-large-items-list">
            <li className="nav-lg-item">
              <Link className="nav-lg-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-lg-item">
              <Link className="nav-lg-link" to="/jobs">
                Jobs
              </Link>
            </li>
          </ul>
          <button className="nav-large-button" onClick={onLogOut}>
            Logout
          </button>
        </div>
        <div className="navbar-mobile-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="nav-mobile-website-logo"
          />
          <ul className="nav-mobile-items-list">
            <li className="nav-mobile-item">
              <Link to="/">
                <AiFillHome className="nav-mobile-icons" />
              </Link>
            </li>
            <li className="nav-mobile-item">
              <Link to="/jobs">
                <BsBriefcaseFill className="nav-mobile-icons" />
              </Link>
            </li>
          </ul>
          <button className="nav-mobile-button">
            <FiLogOut className="nav-mobile-icons" onClick={onLogOut} />
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
