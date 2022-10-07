import './App.css';
import { startBingo } from './helpers';

function App() {
    const ticket = startBingo();
    return (
        <div className="App">
            {ticket.map((strip: boolean[][]) => (
                <div className="strip-container">
                    {strip.map((row: boolean[]) => (
                        <div className="row-container">
                            {row.map((num: boolean, i: number) => (
                                <div
                                    className={`num-container ${
                                        num
                                            ? 'num-container--filled'
                                            : undefined
                                    }`}
                                    key={i}
                                >
                                    <span>{num}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
