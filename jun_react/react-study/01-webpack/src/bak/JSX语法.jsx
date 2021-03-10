import React from 'react';
import ReactDOM from 'react-dom';

let name = 'Reno Chou';
let flag = false;
let water = ['矿泉水', '自来水', '污水'];

let jsx = (
    <div>
        {/*条件判断*/}
        {
            flag ? <div>I am {name}</div> : <div>I am not {name}</div>
        }
        {/*循环*/}
        {
            water.map((t, index) => <p key={index}>This is {t}</p>)
        }
    </div>
);

ReactDOM.render(
    jsx,
    document.getElementById('app')
);