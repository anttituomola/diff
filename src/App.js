import './App.css';
import { patienceDiff } from "./diff.js"
import { useState } from 'react';

function App() {
    const [initialContent, setInitialContent] = useState("Hello World \n\nThis is the second line");
    const [editedContent, setEditedContent] = useState("Hello again \n\nThis is the second line");
    const initialContentArray = initialContent.split("\n");
    const editedContentArray = editedContent.split("\n");
    const results = patienceDiff(initialContentArray, editedContentArray, true);
    console.log(initialContentArray);

    const tarea = {
        margin: "10px",
        padding: "10px",
        height: "200px",
    }

    return (
        <div className="App">
            <textarea style={tarea} placeholder="Initial value" value={initialContent} onChange={(event) => setInitialContent(event.target.value)} />
            <textarea style={tarea} placeholder='Edited content' value={editedContent} onChange={(event) => setEditedContent(event.target.value)} />
            <div>
                {/* Render every element in resultsRender */}
                {results.lines.map((result, index) => {
                    if (result.aIndex === -1) {
                        return <span key={index} style={{ color: "green" }}>{result.line}&nbsp;</span>
                    }
                    if (result.bIndex === -1) {
                        return <span key={index} style={{ color: "red", textDecoration: "line-through" }}>{result.line}&nbsp;</span>
                    }
                    return <span key={index}>{result.line}&nbsp;</span>
                })}

            </div>
        </div>
    );
}

export default App;
