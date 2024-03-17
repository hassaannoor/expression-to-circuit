interface BaseCircuitElement {
  guid: string;
  circutType: string;
}

interface InputNode extends BaseCircuitElement {
  inputVariable?: string;
}

interface GateNode extends BaseCircuitElement {
  output?: BaseCircuitElement;
  leftInput?: BaseCircuitElement;
  rightInput?: BaseCircuitElement;
  input?: BaseCircuitElement;
}

interface OutputNode extends BaseCircuitElement {
  circutType: "OUTPUT"
}

type CircuitNode = InputNode | GateNode | OutputNode;

const circuitData: CircuitNode[] = [
  // ... your data here
];

// Additional logic to ensure only one OutputNode exists in circuitData
const outputNodes = circuitData.filter(node => node.circutType === 'OUTPUT');
if (outputNodes.length > 1) {
  throw new Error("Only one OutputNode is allowed.");
}
