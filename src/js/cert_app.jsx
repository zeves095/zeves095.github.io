import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import { ControlledCertificateInput } from './controlled_input.jsx';
import { ControlledInput } from './controlled_input_discret.jsx';
import { CertsNominalSelect } from './certs_nominal_select.jsx';

document.debug = true;
const GIFT = 0;
const WEDDING = 1;

const Materialize = {};

export class CertApp extends React.Component{
    constructor(props){
        console.log
      super(props);
      this.config = {
          url: '/api/card/add-cert',
          certId: 55471,
          hardmin: props.nominal?props.nominal:1000,
      }
      this.state = {
        count: 1,
        nominal: props.nominal?props.nominal:10000,
        nominalMode: props.nominalMode?props.nominalMode:10000,
        showNominalInput: false,
        certype: props.certype?props.certype:GIFT
      };
    }

    certNominalChange(nominal){
        console.log('nominal', nominal);
        let state = {nominal};
        this.setState(state);
        return true;
    }

    certCountChange(count){
        let state = {count};
        this.setState(state);
        return true;
    }

    addCertToBasket(clickEvent){
        console.log('OK');
        return;
        clickEvent.preventDefault();
        $.ajax(this.config.url, {
            method: 'POST',
            dataType: 'json', // auto JSON.parse
            data: this.state
        }).success(this.callbackAJAX.bind(this));
    }
    callbackAJAX(response){
        console.log(response);
    }

    selectedNominal(selectEvent){
        const selectedValue = selectEvent.target.value;
        const state = {};
        switch(selectedValue){
            case '0':
                state.nominal = '';
                state.showNominalInput = true;
                break;
            default:
                state.nominal = selectedValue;
                state.showNominalInput = false;
        }
        state.nominalMode = selectedValue;
        
        this.setState(state);
    }

    render() {
        const total_summ = this.state.count * this.state.nominal;
        return (
            <div className="item_info">
				  {/* <div className="item-price">
                    <span className="item-price-value">{total_summ.toLocaleString('ru-RU',{style: 'decimal', minimumFractionDigits: 0})}</span>
                    <span className="rub1"></span>
				  </div> */}
                  <div className="item-info-btn-holder">
                    <CertsNominalSelect callback={this.selectedNominal.bind(this)} nominal={this.state.nominalMode}/>
                    { this.state.showNominalInput ? ( 
                    <ControlledCertificateInput minValue={this.config.hardmin} defaultValue={this.state.nominal} callback={this.certNominalChange.bind(this)} />
                    ): ''}
                    <ControlledInput name='Колличество'  minValue={this.config.hardmin} defaultValue={this.state.count} callback={this.certCountChange.bind(this)} />
                    {/* {total_summ ? ( */}
                        <button onClick={this.addCertToBasket.bind(this)} className="order__button-submit button button--black" disabled={(total_summ>0?false:true)}><span>Заказать</span> <span>сертификат</span></button>
                    {/* ) : '' } */}
                  </div>
            </div>
        )
    }
}

$('document').ready(function () {
    // if(typeof CertApp != 'undefined' && document.getElementById('cert-app')) ReactDOM.render(<CertApp />, document.getElementById('cert-app'));
    if(typeof CertApp != 'undefined' && document.getElementById('cert-app-wed')) ReactDOM.render(<CertApp nominal={15000} nominalMode={15000} certype={WEDDING} />, document.getElementById('cert-app-wed'));
});
