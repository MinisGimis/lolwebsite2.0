import { useEffect, useState } from "react";



const Statistics = ({}) => {

    const [errorMessage, setErrorMessage] = useState(() => {
        return ('loading...');
    });

    const username = sessionStorage.getItem('username');
    const region = sessionStorage.getItem('region');
    const apiKey = sessionStorage.getItem('apiKey');
    var encryptedSummonerId = '';

    const getStatInfo = async(region, encryptedSummonerId, apiKey) => {
        try {
            await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${apiKey}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setErrorMessage(null);
                console.log("stat info")
                console.log(data);
            })
        } catch (error) {
            console.error(error);
            setErrorMessage("failed to get mastery info");
        }
    }

    return (

        <div>
            <p>statistics</p>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}
export default Statistics