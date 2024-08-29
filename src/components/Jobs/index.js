import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdSearch} from 'react-icons/io'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    jobsList: [],
    employeeType: [],
    minimumSalary: 0,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiConstants.inProgress,
    })
    const {searchInput, employeeType, minimumSalary} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employeeType.join()}&minimum_package=${minimumSalary}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJobItem => ({
        companyLogoUrl: eachJobItem.company_logo_url,
        employmentType: eachJobItem.employment_type,
        id: eachJobItem.id,
        jobDescription: eachJobItem.job_description,
        location: eachJobItem.location,
        packagePerAnnum: eachJobItem.package_per_annum,
        rating: eachJobItem.rating,
        title: eachJobItem.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const jobsListLength = jobsList.length > 0
    return jobsListLength ? (
      <div className="all-jobs-container">
        <ul className="job-list">
          {jobsList.map(eachJobList => (
            <JobCard eachJobDetails={eachJobList} key={eachJobList.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-contaier">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-image"
          alt="no jobs"
        />
        <h1 className="no-jobs-title">No Jobs Found</h1>
        <h1 className="no-jobs-text">
          We could not find any jobs.Try others filters
        </h1>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="nojobs-image"
        alt="failure view"
      />
      <h1 className="nojobs-title">Oops! Something Went Wrongs</h1>
      <p className="nojobs-text">
        we cannot seem to find the page you are looking for
      </p>
      <button
        className="nojobs-button"
        type="button"
        data-testid="button"
        onClick={this.getJobsList}
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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  changeEmployeList = type => {
    this.setState(
      prev => ({employeeType: [...prev.employeeType, type]}),
      this.getJobsList,
    )
  }

  onChangeSalaryRange = range => {
    this.setState({minimumSalary: range}, this.getJobsList)
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobsListView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    console.log(searchInput)
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="job-content">
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmployeList={this.changeEmployeList}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
            <div className="search-input-jobs-list-container">
              <div className="search-input-desktop-container">
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                  value={searchInput}
                  className="jobs-search-input"
                />
                <button
                  className="search-button"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.getJobsList}
                >
                  <IoMdSearch className="search-icon" aria-label="search" />
                </button>
              </div>
              {this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
