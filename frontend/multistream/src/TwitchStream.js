import { Rnd } from "react-rnd";

const TwitchStream = ({
  data,
  layout,
  onDrag,
  onResizeSmooth,
  onClose,
  onResize,
}) => {
  if (data.layout == layout) {
    return (
      <>
        <Rnd
          size={{ width: data.width, height: data.height }}
          position={{ x: data.x, y: data.y }}
          onDragStop={(e, d) => {
            onDrag(data, d.x, d.y);
          }}
          onResize={(e, direction, ref, delta, position) => {
            onResize(data, ref.style.width, ref.style.height, position);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            onResize(data, ref.style.width, ref.style.height, position);
          }}
        >
          <div id="window">
            <button onClick={() => onClose(data)}>x</button>
            <iframe
              className="TwitchPlayer"
              src={data.url}
              width={data.width}
              height={data.height}
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </Rnd>
      </>
    );
  }
};

export default TwitchStream;
