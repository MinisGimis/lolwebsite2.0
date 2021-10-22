import { useParams } from "react-router"
import { useEffect, useState } from "react";
import './Profile.css'


const Profile = ({ setData, setMasteryData, masteryData, data, apiKey }) => {

    const [playerInfo, setPlayerInfo] = useState(()=>{
        return(0)
    })

    const [masteryInfo, setMasteryInfo] = useState(() => {
        return(0)
    })

    const [check, setCheck] = useState(() => {
        return(0)
    })


    const getPlayerInfo = async (region, name, apiKey) => {
        if (data === 0) {
            try {
            const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`, {mode:'cors'});
            const data = await response.json();
            setPlayerInfo(data)
            console.log(data)
            }
            catch (e) {
            console.log(e)
            }
        }

        else {
            setPlayerInfo(data)
        }
    }

    const getMasteryInfo = async (encryptedSummonerId, apiKey) => {
        if (masteryData === 0) {
            try {
            const response = await fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}?api_key=${apiKey}`, {mode:'cors'});
            const data = await response.json();
            setMasteryInfo(data)
            setCheck(1)
            console.log(data)
            }
            catch (e) {
            console.log(e)
            }
        }

        else {
            setMasteryInfo(masteryData)
            setCheck(1)
        }
    }

    const { region, name } = useParams()


    useEffect(() =>{
        getPlayerInfo(region, name, apiKey)
    }, [])


    useEffect(() => {
        if (playerInfo) {
            getMasteryInfo(playerInfo.id, apiKey)
        }
    }, [playerInfo])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (check) {
        setData(playerInfo)
        setMasteryData(masteryInfo)
        console.log(playerInfo)
        return(
            <div>
                <div className='profileDisplay'>
                    <h3>{playerInfo.name}</h3>
                    <h4>LEVEL {playerInfo.summonerLevel}</h4>
                    <img className="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${playerInfo.profileIconId}.jpg`}></img>
                </div>
                <div className='masteryDisplay'>
                    {masteryInfo.map((champion) => (
                        <div className="championList">
                            <img className="championIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.championId}.png`}></img>
                            <p className="championLevel">MASTERY {champion.championLevel}</p>
                            <p className="championPoints">{numberWithCommas(champion.championPoints)} POINTS</p>
                        </div>
                    ))
                    }
                </div>
            </div>

        )
    }

    else {

        return (
            <div className="error">
                <h2>Error</h2>
                <h3>Player not found, or API Key is incorrect</h3>
            </div>
        )
    }
    

}
export default Profile