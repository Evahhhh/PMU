export default function Racetrack ({lengthRun, useRef, useEffect, cardsData, cardPackage}) {
    const stages = Array.from({ length: lengthRun }, (_, index) => index).reverse();
    const trackRef = useRef(null); // Référence à la div de piste de course
    const horseRef = useRef(null);
    useEffect(() => {
      // Faire défiler vers le bas après le rendu initial
      if (trackRef.current) {
        trackRef.current.scrollTop = trackRef.current.scrollHeight;
      }
    }, []);
    console.log(cardPackage);
    return (
        <div className='racetrack'>
        <div className='track' ref={trackRef}>
          {stages.map((index, stageIndex) => (
          <div 
          key={index} 
          className='stage' 
          id={"position" + index}
          style={
            index === stages.length - 1 
            ? { backgroundColor: "#B79530", borderRadius: "16px 0 0 0" } 
            : index === 0 
                ? { borderRadius: "0 0 0 16px" } 
                : {}
            }
          >
            {(index !== stages.length - 1 && index !== 0) && (
                <div className="cardInconvenient"></div>
            )}
            {index === 0 && cardsData.map((horse, horseIndex) => (
              <img key={horseIndex} src={horse.img} alt={horse.type} id={"horse" + horse.id} ref={horseRef}/>
            ))}
            {index === stages.length - 1 && (
              <div className="finish-line" style={{backgroundImage: "url('/media/finish-line.png')"}}></div>
            )}
          </div>
          ))}
        </div>
      </div>
    )
  
}