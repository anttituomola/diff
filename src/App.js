import './App.css';
import { patienceDiff } from "./diff.js"
import { useState } from 'react';

function App() {
    const [initialContent, setInitialContent] = useState("Rivi 1");
    const [middleContent, setMiddleContent] = useState("Rivi 2");
    const [lastContent, setLastContent] = useState("Rivi 3");
    const [changes, setChanges] = useState([]);

    const middleResults = patienceDiff(initialContent.split(" "), middleContent.split(" "));
    const lastResults = patienceDiff(middleContent.split(" "), lastContent.split(" "), true);
    const allResults = patienceDiff(initialContent.split(" "), lastContent.split(" "), true);

    const tarea = {
        margin: "10px",
        padding: "10px",
        height: "200px",
    }

    const handleSave = () => {
        const nextContent = [];
        middleResults.lines.map((line, index) => {
            console.log(line);
            if(line.bIndex === -1) {
                nextContent.push(<span key={index} style={{ color: "red", textDecoration: "line-through" }}>{line.line}&nbsp;</span>)
            }
            if(line.aIndex === -1) {
                nextContent.push(<span key={index} style={{ color: "green" }}>{line.line}&nbsp;</span>)
            }
        })
        console.log(nextContent);
        
        setChanges(nextContent);
    }

    return (
        <div className="App">
            <textarea style={tarea} placeholder="Initial value" value={initialContent} onChange={(event) => setInitialContent(event.target.value)} />
            <textarea style={tarea} placeholder="Middle value" value={middleContent} onChange={(event) => setMiddleContent(event.target.value)} />
            <textarea style={tarea} placeholder='Edited content' value={lastContent} onChange={(event) => setLastContent(event.target.value)} />
            <div><button onClick={handleSave}>Save</button></div>
            <div id="changes">{changes}</div>
            <div>
                <h2>What has changed between first and middle versions?</h2>
                {console.log(middleResults)}
                {middleResults.lines.map((result, index) => {
                    if (result.aIndex === -1) {
                        return <span key={index} style={{ color: "green" }}>{result.line}&nbsp;</span>
                    }
                    if (result.bIndex === -1) {
                        return <span key={index} style={{ color: "red", textDecoration: "line-through" }}>{result.line}&nbsp;</span>
                    }
                    return <span key={index}>{result.line}&nbsp;</span>
                })}
                <h2>What has changed between middle and last versions?</h2>
                {lastResults.lines.map((result, index) => {
                    if (result.aIndex === -1) {
                        return <span key={index} style={{ color: "green" }}>{result.line}&nbsp;</span>
                    }
                    if (result.bIndex === -1) {
                        return <span key={index} style={{ color: "red", textDecoration: "line-through" }}>{result.line}&nbsp;</span>
                    }
                    return <span key={index}>{result.line}&nbsp;</span>
                })}
                <h2>What has changed between first and last versions?</h2>
                {allResults.lines.map((result, index) => {
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
