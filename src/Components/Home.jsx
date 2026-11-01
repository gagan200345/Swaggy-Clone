import Header from "./Header"
import FoodOption  from "./FoodOption"
import FoodyOption  from "./FoodyOption"
import CardOption  from "./CardOption"
import Container   from "./Container"
import City  from "./City"
import Footer  from "./Footer"

function Home(){
  return(
    <>
     <Header />
      <FoodOption />
      <FoodyOption />
      <CardOption />
      <Container />
      <City/>
     <Footer/>
    </>
  )
}
export default Home;