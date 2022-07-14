/* eslint-disable no-console */
/**
 * @File Name          : filterAccount.js
 * @Description        :
 * @Author             : RISHAB GOYAL
 * @Group              :
 * @Last Modified By   : RISHAB GOYAL
 * @Last Modified On   : 9/11/2019, 10:13:29 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    8/31/2019   RISHAB GOYAL     Initial Version
 **/
import { LightningElement } from "lwc";

export default class FilterAccount extends LightningElement {
  caseReason = "";

  handleClick(event) {
    let inputfield = this.template.querySelector("lightning-input");
    console.log(inputfield);
    console.log(inputfield.name);
    console.log(inputfield.value);
    this.caseReason = inputfield.value;
    inputfield.setAttribute("value", "Hello");
    console.log("Case Reason " + this.caseReason);
  }
}