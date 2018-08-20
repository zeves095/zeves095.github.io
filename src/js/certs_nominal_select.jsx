import React from 'react';
// import $ from 'jquery';
// !!!Stateless component!!!
export class CertsNominalSelect extends React.Component{
    constructor(props) {
        super(props);
        this.nominals = [15000,25000,50000];
    }

    increment(e){
        e.preventDefault();
        let intval = parseInt(this.state.value);
        if(!intval) intval = 1;
        intval = intval + 1;
        this.changeCount(intval);
    }

    decrement(e){
        e.preventDefault();
        let intval = parseInt(this.state.value);
        if(!intval) intval = 1;
        intval = intval - 1;
        this.changeCount(intval);
    }
    
    render() {
        return (
            <label className="order-form__label">Номинал Сертификата
                <div className="order-form__denomination denomination" id="denomination">
                    {/* <button className="denomination__minus" onClick={this.decrement.bind(this)}>-</button>
                    <button className="denomination__plus" onClick={this.increment.bind(this)}>+</button> */}
                    <select className='denomination__select' value={this.props.nominal} onChange={this.props.callback}>
                        {this.nominals.map((nominalValue)=>(
                            <option value={nominalValue} key={nominalValue}>{nominalValue.toLocaleString('ru',{style: 'decimal', minimumFractionDigits: 0})} ₽</option>
                        ))}
                        <option value='0' key='0'>Другая сумма..</option>
                    </select>
                </div>
            </label>
        );
    }
}
