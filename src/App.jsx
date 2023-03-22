import { useState } from "react";
import "./App.css";
export default function App() {
  const [state, setState] = useState({
    inputs: [
      {
        title: "",
        children: [
          {
            subtitle: "",
            value: "",
          },
          {
            subtitle: "",
            value: "",
          },
        ],
      },
    ],
    specifications: [],
  });

  const addMore = () => {
    const newInput = {
      title: "",
      children: [],
    };
    setState((currentState) => ({
      ...currentState,
      inputs: [...currentState.inputs, newInput],
    }));
  };

  const addChild = (inputId) => {
    const newChild = {
      subtitle: "",
      value: "",
    };
    const newInputs = state.inputs;
    newInputs[inputId].children.push(newChild);
    setState((currentState) => ({ ...currentState, inputs: newInputs }));
  };

  const deleteChild = (inputId, subtitleId) => {
    const updatedInputs = state.inputs;
    updatedInputs[inputId].children = updatedInputs[inputId].children.filter(
      (subtitle, index) => index !== subtitleId
    );
    setState((currentState) => ({ ...currentState, inputs: updatedInputs }));
  };

  const updateTitle = (inputId, newValue) => {
    const updatedInputs = state.inputs;
    updatedInputs[inputId].title = newValue;
    setState((currentState) => ({ ...currentState, inputs: updatedInputs }));
  };

  const updateSubtitle = (inputId, subtitleId, param, newValue) => {
    const updatedInputs = state.inputs;
    updatedInputs[inputId].children[subtitleId][param] = newValue;
    setState((currentState) => ({ ...currentState, inputs: updatedInputs }));
  };

  const addSpecification = (inputId) => {
    const updatedSpecifications = state.specifications;
    updatedSpecifications[inputId] = {
      ...state.inputs[inputId],
      children: state.inputs[inputId].children.map((item) => ({ ...item })),
    };
    setState((currentState) => ({
      ...currentState,
      specifications: updatedSpecifications,
    }));
  };

  return (
    <div className="container-main">
      <div className="container-left">
        <button className="btn btn-green" onClick={addMore}>
          Add More
        </button>
        {state.inputs.map((input, inputId) => {
          return (
            <div className="container-inputs" key={inputId}>
              <div className="container-title-input">
                <input
                  type="text"
                  value={input.title}
                  onChange={(e) => updateTitle(inputId, e.target.value)}
                  placeholder="Title"
                />
                <button
                  className="btn btn-gray"
                  onClick={() => addChild(inputId)}
                >
                  Add Child
                </button>
                <button
                  className="btn btn-green"
                  onClick={() => addSpecification(inputId)}
                >
                  Submit
                </button>
              </div>
              {input.children.map((subtitle, subtitleId) => {
                return (
                  <div className="container-subtitle" key={subtitleId}>
                    <input
                      type="text"
                      onChange={(e) =>
                        updateSubtitle(
                          inputId,
                          subtitleId,
                          "subtitle",
                          e.target.value
                        )
                      }
                      value={subtitle.subtitle}
                      placeholder="Subtitle"
                    />
                    <input
                      type="text"
                      onChange={(e) =>
                        updateSubtitle(
                          inputId,
                          subtitleId,
                          "value",
                          e.target.value
                        )
                      }
                      value={subtitle.value}
                      placeholder="value"
                    />
                    <button
                      className="btn btn-red"
                      onClick={() => deleteChild(inputId, subtitleId)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="container-right">
        <h1>SPECIFICATIONS</h1>

        {state.specifications.map((title) => {
          if (!title) return;

          return (
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>{title.title}</th>
                </tr>
              </thead>
              <tbody>
                {title.children.map((subtitle) => {
                  return (
                    <tr>
                      <td>{subtitle.subtitle}</td>
                      <td>{subtitle.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}
