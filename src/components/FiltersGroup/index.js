import ProfileDetails from '../ProfileDetails'
import './index.css'
const FiltersGroup = props => {
  const renderTypeOfEmployement = () => {
    const {employmentTypesList} = props

    return (
      <div className="employment-type-container">
        <h1 className="employment-title">Type of Employement</h1>
        <ul className="employment-types-list">
          {employmentTypesList.map(eachType => {
            const {changeEmployeList} = props
            const onChangeEmployeType = () => {
              changeEmployeList(eachType.employmentTypeId)
            }
            return (
              <li
                className="employment-item"
                key={eachType.employmentTypeId}
                onChange={onChangeEmployeType}
              >
                <input
                  type="checkbox"
                  className="check-input"
                  id={eachType.employmentTypeId}
                  value={eachType.employmentTypeId}
                />
                <label
                  htmlFor={eachType.employmentTypeId}
                  className="eachtype-label"
                >
                  {eachType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalayRange = () => {
    const {salaryRangesList} = props

    return (
      <div className="salary-range-container">
        <h1 className="salary-title">Salary Range</h1>
        <ul className="salary-types-list">
          {salaryRangesList.map(eachType => {
            const {onChangeSalaryRange} = props
            const onClickSalary = () => {
              onChangeSalaryRange(eachType.salaryRangeId)
            }
            return (
              <li
                className="employment-item"
                key={eachType.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  className="radio-input"
                  id={eachType.salaryRangeId}
                  value={eachType.employmentTypeId}
                  name="RadioButton"
                />
                <label
                  htmlFor={eachType.salaryRangeId}
                  className="eachtype-label"
                >
                  {eachType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return (
    <div className="filter-group-container">
      <ProfileDetails />
      <hr />
      {renderTypeOfEmployement()}
      <hr />
      {renderSalayRange()}
    </div>
  )
}

export default FiltersGroup
