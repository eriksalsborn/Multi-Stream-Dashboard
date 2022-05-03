import { Rnd } from "react-rnd";

const TwitchStream = ({ data, onDrag, onClose, onResize }) => {
  return (
    <>
      <Rnd
        size={{ width: data.width, height: data.height }}
        position={{ x: data.x, y: data.y }}
        onDragStop={(e, d) => {
          onDrag(data, d.x, d.y);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          onResize(data, ref.style.width, ref.style.height, position);
        }}
      >
        <iframe className="TwitchPlayer" src={data.url} width={data.width} height={data.height} frameborder="0" scrolling="no"></iframe>'
        <button onClick={() => onClose(data)}>Close</button>
      </Rnd>
    </>
  );
};

export default TwitchStream;
