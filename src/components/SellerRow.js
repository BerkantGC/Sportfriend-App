import {BiFootball, BiBasketball, BiTennisBall, BiBowlingBall, BiBall} from "react-icons/bi";
const baseUrl = "http://localhost:8080/"

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
        <a className="all-games-container1" href = "https://tr.wikipedia.org/wiki/Futbol">
          <BiFootball size={45} color="white"/>
        </a> 
        <a className="all-games-container" href ="https://tr.wikipedia.org/wiki/Basketbol">
          <BiBasketball size={45} color="white"/>
        </a> 
        <a className="all-games-container" href ="https://tr.wikipedia.org/wiki/Tenis">
          <BiTennisBall size={45} color="white"/>
        </a> 
        <a className="all-games-container" href ="https://tr.wikipedia.org/wiki/Bowling">
          <BiBowlingBall size={45} color="white"/>
        </a> 
        <a className="all-games-container2" href ="https://tr.wikipedia.org/wiki/Ragbi">
          <BiBall size={45} color="white"/>
        </a> 
        </div>
      </div>
    );
  }
  export default SellerRow;