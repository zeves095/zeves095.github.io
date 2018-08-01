import React from 'react';
// import $ from 'jquery';
// !!!Stateless component!!!
export class CertsNominalSelect extends React.Component{
    constructor(props) {
        super(props);
        this.nominals = [10000,25000,50000];
    }
    
    render() {
        return (
                <div className="form-group" style={{maxWidth: '300px'}}>
                    <label> Сумма на карте
                    <select className='form-control form-control-lg' style={{display: 'block', textAlign: 'center'}} value={this.props.nominal} onChange={this.props.callback}>
                        {this.nominals.map((nominalValue)=>(
                            <option value={nominalValue} key={nominalValue}>{nominalValue.toLocaleString('ru',{style: 'decimal', minimumFractionDigits: 0})} ₽</option>
                        ))}
                        <option value='0' key='0'>Другая сумма..</option>
                    </select>
                    </label>
                </div>
        );
    }
}
