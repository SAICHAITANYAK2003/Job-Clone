import './index.css'

const SkillsCard = props => {
  const {eachSkill} = props
  const {imageUrl, name} = eachSkill
  return (
    <li className="each-skill-container">
      <img src={imageUrl} className="skill-image" alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsCard
