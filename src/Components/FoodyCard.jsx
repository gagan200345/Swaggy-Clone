function FoodyCard({FoodyCard}){
  return(
    <div className="flex-none">
   <a href="{FoodyCard?.action.link}">
    <img className="w-40 h-50 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+FoodyCard.imageId}></img>
    </a> 
<h2 className="text-center font-bold">{FoodyCard?.action.text}</h2>
    </div>
  )
}
export default FoodyCard;