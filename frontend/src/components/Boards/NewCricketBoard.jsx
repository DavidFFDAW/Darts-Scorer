import { FaSlash, FaSkullCrossbones } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';


export default function NewCricketBoard ({ scoreboard, addPoints, cricketService }) {

    const parser = {
      ' ': ' ',
      '/': <FaSlash/>,
      'X': <ImCross/>,
      '⦻': <FaSkullCrossbones/>
    }

    return (
        <div className="down cricket-board">
            <table>
                <thead>
                    <tr>
                        { cricketService.getNamesSplitted(scoreboard).map((it,index) => <th key={ index }>{ it }</th>) }
                    </tr>
                </thead>
                <tbody>
                {
                    cricketService.getBoardWithScoresInMiddle(scoreboard).map((item,ind) => {
                        return (
                            <tr key={ind}>
                                { item.st.map((it,id) => (<td key={id}>{ parser[it] }</td> )) }
                                <td>
                                    <button onClick={ _ => addPoints(item.pt) } className="pt-btn">{ item.pt }</button>
                                    <button onClick={ _ => addPoints(item.pt, 2) } className="pt-btn double">D{ item.pt }</button>
                                    { item.pt !== '25' && <button onClick={ _ => addPoints(item.pt,3) } className="pt-btn triple">T{ item.pt }</button> }
                                </td>
                                { item.nd.map((el,ix) => (<td key={ ix }>{ parser[el] }</td>)) }
                            </tr>
                        );
                    })
                }
                <tr>
                    <td colSpan={ cricketService.getNamesSplitted(scoreboard).length + 1 }>
                        <button onClick={ _ => addPoints(0) } className="pt-btn">OUT</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}