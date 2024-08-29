import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company?.description,
      imageUrl: data.life_at_company?.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills?.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getFormattedSimilarData = similarData => ({
    companyLogoUrl: similarData.company_logo_url,
    employmentType: similarData.employment_type,
    id: similarData.id,
    jobDescription: similarData.job_description,
    location: similarData.location,
    rating: similarData.rating,
    title: similarData.title,
  })

  getJobsData = async () => {
    this.setState({
      apiStatus: apiConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updateData = this.getFormattedJobData(fetchedData.job_details)
      const updatedSimilarData = fetchedData.similar_jobs.map(eachsimilarJob =>
        this.getFormattedSimilarData(eachsimilarJob),
      )

      this.setState({
        jobData: updateData,
        similarJobsData: updatedSimilarData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="jobs-error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="nojobs-image"
        alt="failure view"
      />
      <h1 className="nojobs-title">Oops! Something Went Wrong</h1>
      <p className="nojobs-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="nojobs-button"
        type="button"
        data-testid="button"
        onClick={this.getJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="60" width="60" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobData

    return (
      <div className="job-item-details-container">
        <div className="job-item">
          <div className="job-logo-title-location-container">
            <div className="job-logo-title-container">
              <img
                src={companyLogoUrl}
                className="job-compay-logo"
                alt="website logo"
              />
              <div className="job-rating-title-container">
                <h1 className="job-title">{title}</h1>
                <div className="job-rating-container">
                  <BsStarFill color="#fbbf24" />
                  <p className="rating-count">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-salary-container">
              <div className="location-employee-container">
                <div className="location-container">
                  <IoLocationSharp color="#fff" size="30" />
                  <p className="job-location">{location}</p>
                </div>
                <div className="employee-container">
                  <BsFillBriefcaseFill color="#fff" size="25" />
                  <p className="employee-location">{employmentType}</p>
                </div>
              </div>
              <p className="package-per-annum">{packagePerAnnum}</p>
            </div>

            <hr className="line" />
            <div className="description-link">
              <h1 className="description">Description</h1>
              <div className="link-container">
                <a
                  href={companyWebsiteUrl}
                  className="visit-heading"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="link-title">Visit</p>
                  <FaExternalLinkAlt color="#4f46e5" />
                </a>
              </div>
            </div>
            <p className="job-description">{jobDescription}</p>
            <div className="skills-container">
              <h1 className="skills-title">Skills</h1>
              <ul className="skills-list-container">
                {skills.map(eachSkill => (
                  <SkillsCard eachSkill={eachSkill} key={eachSkill.name} />
                ))}
              </ul>
            </div>
            <div className="life-company-container">
              <h1 className="life-company-title">Life at Company</h1>
              <div className="life-description-image">
                <p className="life-company-description">
                  {lifeAtCompany.description}
                </p>
                <img
                  src={lifeAtCompany.imageUrl}
                  className="life-company-image"
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="similar-job-items">
          <h1 className="similar-title">Similar jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(eachJob => (
              <SimilarJobItem jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobItemDetails()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-items-details-container">{this.renderAllJobs()}</div>
    )
  }
}

export default JobItemDetails
