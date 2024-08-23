import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'
const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-item-container">
      <div className="similar-logo-title">
        <img src={companyLogoUrl} className="similar-company-logo" />
        <div className="similar-job-info">
          <h1 className="similar-title">{title}</h1>
          <p className="similar-rating">
            <span>
              <BsStarFill color="#fbbf24" />
            </span>
            {rating}
          </p>
        </div>
      </div>
      <h1 className="description-title">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>

      <ul className="location-type-container">
        <li className="location-item">
          <MdLocationOn color="#fff" />
          <p className="location-name">{location}</p>
        </li>
        <li className="type-item">
          <BsFillBriefcaseFill color="#fff" />
          <p className="employement-type">{employmentType}</p>
        </li>
      </ul>
    </li>
  )
}
export default SimilarJobItem
