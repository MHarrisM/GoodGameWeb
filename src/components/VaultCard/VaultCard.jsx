import "./VaultCard.css"
import { getVaults } from "../../data/supabase/supabaseFunctions";
import React ,{ useState, useEffect } from "react";
const VaultCard = ({}) =>{
    const [vaults, setVaults] = useState([]);
        useEffect(() => {
        getVaults().then(setVaults);
        
        }, []);
    return(
        
    <div className="div-container-VC">
        <p style={{fontSize: "20px"}}>Vaults</p>
        <div className="div-vault-lists">
            {vaults.map((vault) => (
                <p key={vault} style={{margin: "0px"}}>{vault.name}</p>
            ))}
        </div>
    </div>
    )
}
export default VaultCard;