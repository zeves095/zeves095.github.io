import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import 'sweetalert';


import { ControlledCertificateInput } from './controlled_input.jsx';
import { ControlledInput } from './controlled_input_discret.jsx';
import { CertsNominalSelect } from './certs_nominal_select.jsx';

document.debug = true;
const GIFT = 0;
const WEDDING = 1;

const Materialize = {};

export class CertApp extends React.Component{
    constructor(props){
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
        let state = {nominal};
        this.setState(state);
        return true;
    }

    certCountChange(count){
        let state = {count};
        this.setState(state);
        return true;
    }

    dialogue(context){

        var contact = document.createElement("input");
        contact.id = "swal-input-contact";
        contact.class = "swal-input-contact";
        contact.placeholder = "+7 900 000-00-00";

        var contactLabel = document.createElement("LABEL");
        contactLabel.innerHTML = "Контактный телефон";
        contactLabel.htmlFor = "swal-input-contact";

        var name =  document.createElement("input");
        name.id = "swal-input-name";
        name.class = "swal-input-name";
        name.placeholder = "Имя";

        var nameLabel = document.createElement("LABEL");
        nameLabel.innerHTML = "Укажите ваше имя";
        nameLabel.htmlFor = "swal-input-name";

        var wrapper = document.createElement("div");
        var intro = document.createElement("span");
        intro.innerHTML = "Заказ на "+context.count+" сертификат[ов], номиналом "+context.nominal+" Руб.<br /><br />";

        wrapper.appendChild(intro);
        wrapper.appendChild(nameLabel);
        wrapper.appendChild(name);
        wrapper.appendChild(contactLabel);
        wrapper.appendChild(contact);
        swal({
            title: 'Заказ сертификата',
            content: wrapper,
            buttons: {
                cancel: {
                    text: "Отмена",
                    value: null,
                    visible: true,
                    className: "button button--transparent",
                    closeModal: true,
                },
                confirm: {
                    text: "Заказать",
                    value: true,
                    visible: true,
                    className: "button button--black",
                    closeModal: true
                }
            }
        }).then(
        function (act) {
            if(!act) return;

            var result = {
                name: $('#swal-input-name').val(),
                contact: $('#swal-input-contact').val()
            };

            $.ajax({
                url: '/app/ajax/order/fast/cert/',
                method: 'post',
                data: {
                    name: result.name,
                    contact: result.contact,
                    count: context.count,
                    nominal: context.nominal
                },
                dataType: 'json'
            }).then(function (response) {
                if(response.code == 200){
                    if(typeof window['gti'] !== 'undefined'){
	                    window['gti'].addEcommerceEvent([{"name":null,"id":"00010626504","price":context.nominal,"brand":null,"category":"","variant":"","coupon":"","quantity":context.count}],'purchase',{"id":"DF" + response.data.purchase.actionField.id,"affiliation":"domfarfora.ru","revenue":(context.count * context.nominal),"tax":"","shiipping":"","coupon":""});
                    }
                }
                swal(response.code == 200 ? 'Успешно' : 'Ошибка', response.message, response.code == 200 ? 'success' : 'error');
            }.bind(context))
            .catch(function(arg) {
                swal('Ошибка', 'ошибка сервера - обратитесь к нам по телефону', 'error');
            });
        },
        function (dismiss) {

        }.bind(this)).catch(swal.noop);

        return true;
    }

    addCertToBasket(clickEvent){
        clickEvent.preventDefault();
        this.dialogue(this.state);
        return;
        $.ajax(this.config.url, {
            method: 'POST',
            dataType: 'json', // auto JSON.parse
            data: this.state
        }).success(this.callbackAJAX.bind(this));
    }
    callbackAJAX(response){

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
                    <ControlledCertificateInput minValue={this.config.hardmin} defaultValue='' callback={this.certNominalChange.bind(this)} />
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
