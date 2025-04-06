import "./VaultCard.css"
import { selectVaults } from "../../../public/data/supabase/supabaseFunctions";
import { Link } from "react-router-dom";
import React ,{ useState, useEffect } from "react";
const VaultCard = ({}) =>{
    const [vaults, setVaults] = useState([]);
        useEffect(() => {
        selectVaults().then(setVaults);
        
        }, []);
    
    return(
        
    <div className="div-container-VC">
        <p style={{fontSize: "20px"}}>Vaults</p>
        <div className="div-vault-lists">
            {vaults.map((vault) => (
                <div key={vault} style={{margin: "0px", width: '125px',overflow: 'hidden'}}>
                    <Link to={`/library/${vault.name}`}>
                        <span className="vault-text">{vault.name}</span>
                    </Link>
                    
                </div>
            ))}
        </div>
    </div>
    )
}
export default VaultCard;