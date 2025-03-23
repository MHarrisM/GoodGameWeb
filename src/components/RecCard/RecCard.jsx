import "./RecCard.css"
import ScrollCard from "../ScrollCard/ScrollCard"
const RecCard = ({searchTerm, setSearchTerm,title,games}) => {
    return (
        <div className="background-card-rc" >
            <text>{title}</text>
            
            <ScrollCard games={games}></ScrollCard>
            
        </div>
    )
}
export default RecCard