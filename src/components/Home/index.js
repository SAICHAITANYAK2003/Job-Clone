 
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'
const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            Find The Job That
            <br /> Fits Your Life
          </h1>
          <p className="home-description">
            Millions of people are searching for jobs,salary <br />
            information,company reviews.Find the job that fits your <br />
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button className="home-find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
