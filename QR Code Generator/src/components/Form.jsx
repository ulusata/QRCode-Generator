import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";

function Form(prop) {
  const [textInput, setText] = useState("");
  const [isVisible, setVisible] = useState(false);

  return (
    <div>
      <form
        onSubmit={(e) => {
          prop.generate(textInput);
          e.preventDefault();
          setText("");
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter the URL"
          onChange={(e) => {
            const value = e.target.value;
            setText(value);
          }}
          onClick={() => setVisible(true)}
          value={textInput}
        />
        <Zoom in={isVisible}>
          <button type="submit">
            <AddIcon></AddIcon>
          </button>
        </Zoom>
      </form>
    </div>
  );
}

export default Form;
