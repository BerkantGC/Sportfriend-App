const SellerRow = (props) =>{
    return(
      <div>
      <div className="seller-row-container">
          <section >
            <ol className="seller-row-sellers">
            {props.data.map(it => {return <a className="each-seller">{it.sellerName}</a>})} 
            </ol>
          </section>
      </div>
      <div className="all-games">
        <a className="all-games-container1" href ="https://www.gamesatis.com/tum-oyunlar/pubg-mobile">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/5/pubg.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/valorant">
          <img className="all-games-image"  src="https://img.gamesatis.com/showcase/310/valorant.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/league-of-legends">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/311/league-of-legends.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/knight-online">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/929/knight-online.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/cs-go">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/4/cs-go.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/mobile-legends">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/723/mobile-legends.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/black-desert-online">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/725/black-desert-online.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/8/metin2.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/743/point-blank.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/731/wolfteam.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/850/fifa-22.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/893/dota-2.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/3/google.svg" width="70" height="45"/>
        </a> 
        <a className="all-games-container2" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
          <img className="all-games-image" src="https://img.gamesatis.com/showcase/726/rust.svg" width="70" height="45"/>
        </a> 
    </div>
      </div>
    );
  }
  export default SellerRow;