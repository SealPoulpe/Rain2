import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import { useInterval } from "./useInterval";

const Block = (props) => {
  const { xPercent, yPercent, keyZone } = props;
  return (
    <div
      className="block"
      key={keyZone}
      style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
    />
  );
};

const RainZone = (props) => {
  const [blocks, setBlocks] = useState([]);
  const keyIncr = useRef(1);

  const processTick = () => {
    //Update individual block Y values
    const updatedBlocks = blocks.map((block) => {
      return {
        ...block,
        yPercent:
          block.yPercent < 100
            ? block.yPercent + block.momentum <= 100
              ? block.yPercent + block.momentum
              : 100
            : block.yPercent,
        momentum: block.momentum * 1.005,
      };
    });

    // Delete blocks
    var culledBlocks = [];
    updatedBlocks.forEach((block) => {
      if (block.yPercent < 100) {
        culledBlocks.push(block);
      }
    });

    const addBlock = (i) => {
      culledBlocks.push({
        key: i,
        xPercent: Math.random() * 99,
        yPercent: 0,
        momentum: 0.1 + Math.random() * 0.2,
      });
    };

    //Add blocks randomly
    if (Math.random() > 0.2) {
      var incr = 1;
      addBlock(keyIncr.current + 1);

      if (Math.random() > 0.75) {
        incr = 2;
        addBlock(keyIncr.current + 2);

        if (Math.random() > 0.9) {
          incr = 3;
          addBlock(keyIncr.current + 3);
        }
      }

      keyIncr.current = keyIncr.current + incr;
    }

    setBlocks(culledBlocks);
  };

  useInterval(processTick, 10);

  return (
    <div className="RainZone" key="rainzone" id="text">
      {blocks.map((block) => {
        return (
          <Block
            key={block.key}
            keyZone={block.key}
            xPercent={block.xPercent}
            yPercent={block.yPercent}
          />
        );
      })}
    </div>
  );
};

const Thing = () => {
  return <>{console.log("Being called Now!")}</>;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RainZone />
      </header>
    </div>
  );
}

export default App;
