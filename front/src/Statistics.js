import { useEffect, useState } from "react";
import './Statistics.css'



const Statistics = ({playerInfo, getChampionName, statisticInfo, setStatisticInfo}) => {

    const [errorMessage, setErrorMessage] = useState(() => {
        return ('loading...');
    });

    const username = sessionStorage.getItem('username');
    const region = sessionStorage.getItem('region');
    const apiKey = sessionStorage.getItem('apiKey');
    var encryptedSummonerId = '';

    const getQueueType= (queue) => {
        var type = queue.queueType;
        if (type === "RANKED_SOLO_5x5") {
            return ("Ranked Solo/Duo");
        } else if (type === "RANKED_FLEX_SR") {
            return ("Ranked Flex");
        } else {
            return type;
        }
    }

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
                setStatisticInfo(data);
            })
        } catch (error) {
            console.error(error);
            setErrorMessage("failed to get statistic info");
        }
    }

    useEffect(() => {
        if (playerInfo && apiKey) {
            if (!statisticInfo || username != statisticInfo[0].summonerName.toLowerCase()) {
                encryptedSummonerId = playerInfo.id;
                getStatInfo(region, encryptedSummonerId, apiKey);
            } else {
                setErrorMessage(null);
            }
        } 
    }, [])

    return (

        <div className="statistics">
            {errorMessage && <p>{errorMessage}</p>}
            <div className="display">
                {playerInfo && <div className='profileDisplay'>
                    <h3>{playerInfo.name}</h3>
                    <h4>LEVEL {playerInfo.summonerLevel}</h4>
                    <img className="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${playerInfo.profileIconId}.jpg`}></img>
                </div>}
                {statisticInfo && <div className="statisticsDisplay">
                    {statisticInfo.map((queue) => (
                        <div className="queueType">
                            <h1 className="queueName">{getQueueType(queue)}</h1>
                            <img className="rankIcon" src={`../${queue.tier.toLowerCase()}.png`}></img>
                            <div className="rankInfo">
                                <h2 className="rankTier">{queue.tier}</h2>
                                <h2 className="rankRank">{queue.rank}</h2>
                                <h2 className="rankLp">{queue.leaguePoints} LP</h2>
                            </div>
                            <div className="winsAndLosses">
                                <p className="winrate">Winrate: {Math.floor((queue.wins/(queue.wins + queue.losses))*100)}%</p>
                                <p className="wins">Wins: {queue.wins}</p>
                                <p className="losses">Losses: {queue.losses}</p>
                            </div>  
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}
export default Statistics