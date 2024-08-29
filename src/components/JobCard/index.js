import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {eachJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachJobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item-container">
        <div className="company-logo-role-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="job details company logo"
          />
          <div className="company-role-details">
            <h1 className="company-role">{title}</h1>
            <p className="rating">
              <FaStar color="#fbbf24" />
              <span className="rating-count">{rating}</span>
            </p>
          </div>
        </div>
        <div className="company-location-package-container">
          <div className="company-location-details">
            <p className="company-location">
              <span>
                <MdLocationOn size="20" color="#fff" />
              </span>
              {location}
            </p>
            <p className="employee-type">
              <span className="span-icon">
                <BsBriefcaseFill size="20" color="#fff" />
              </span>
              {employmentType}
            </p>
          </div>
          <p className="company-package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div className="company-description-container">
          <h1 className="description-title">Description</h1>
          <p className="company-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
