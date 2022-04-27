import { Rnd } from "react-rnd";

const TwitchStream = ({data, onDrag, onClose}) => {

    return (
        <>

        <Rnd
        //size={{ width: data.x,  height: data.x }}
        position={{ x: data.x, y: data.y }}
        onDragStop={(e, d) => { onDrag(data, d.x, d.y) }}
        // onResizeStop={(e, direction, ref, delta, position) => {
        //     this.setState({
        //     width: ref.style.width,
        //     height: ref.style.height,
        //     ...position,
        //     });
        // }}
        >
            
        <iframe className="TwitchPlayer" 
            src = {data.url}
            width="450"
            height='300'
            frameborder="0" 
            scrolling="no">
        </iframe>
        
        <button onClick={() => onClose(data)}>Close</button>

        </Rnd>

        </>
    )
}

export default TwitchStream