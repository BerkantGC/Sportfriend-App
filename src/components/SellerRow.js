const baseUrl = "http://localhost:3000/"

const SellerRow = (props) =>{
  let sellers = [];

  props.data.map(it => sellers.push(it.sellerName));

    localStorage.setItem("@sellers", sellers);
    return(
      <div>
      <div className="seller-row-container">
          <section >
            <div href="https://gamesatis.com" className="seller-row-sellers">
            {sellers.map(it => {
              const link = baseUrl + "profile/" + it;
              return(
                <a href={link} className="each-seller">
                {it}
                </a>
                )
            })} 
            </div>
          </section>
      </div>
      <div className="all-games">
        <a className="all-games-container1" href ="https://www.gamesatis.com/tum-oyunlar/pubg-mobile">
          <img alt="pubg" className="all-games-image" src="https://img.gamesatis.com/showcase/5/pubg.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/valorant">
          <img alt="valo" className="all-games-image"  src="https://img.gamesatis.com/showcase/310/valorant.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/league-of-legends">
          <img alt="lol" className="all-games-image" src="https://img.gamesatis.com/showcase/311/league-of-legends.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/knight-online">
          <img alt="knightonline" className="all-games-image" src="https://img.gamesatis.com/showcase/929/knight-online.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/cs-go">
          <img alt="csgo" className="all-games-image" src="https://img.gamesatis.com/showcase/4/cs-go.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/mobile-legends">
          <img alt="mobilelegends" className="all-games-image" src="https://img.gamesatis.com/showcase/723/mobile-legends.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/black-desert-online">
          <img alt="blackdesert" className="all-games-image" src="https://img.gamesatis.com/showcase/725/black-desert-online.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img alt="metin2" className="all-games-image" src="https://img.gamesatis.com/showcase/8/metin2.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img alt="pointblank" className="all-games-image" src="https://img.gamesatis.com/showcase/743/point-blank.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img alt="wolfteam" className="all-games-image" src="https://img.gamesatis.com/showcase/731/wolfteam.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img alt="fifa22" className="all-games-image" src="https://img.gamesatis.com/showcase/850/fifa-22.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img alt="dota2" className="all-games-image" src="https://img.gamesatis.com/showcase/893/dota-2.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img alt="google" className="all-games-image" src="https://img.gamesatis.com/showcase/3/google.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container2" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img alt="rust" className="all-games-image" src="https://img.gamesatis.com/showcase/726/rust.svg" width="70" height="45"/>
        </a> 
        </div>
      </div>
    );
  }
  export default SellerRow;