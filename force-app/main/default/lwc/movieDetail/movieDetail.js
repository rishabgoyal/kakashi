/* eslint-disable no-console */
/**
 * @File Name          : movieDetail.js
 * @Description        :
 * @Author             : RISHAB GOYAL
 * @Group              :
 * @Last Modified By   : RISHAB GOYAL
 * @Last Modified On   : 9/28/2019, 4:16:37 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    9/25/2019   RISHAB GOYAL     Initial Version
 **/
import { LightningElement, track, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";

export default class MovieDetail extends LightningElement {
  @track
  selectedMovie = "";

  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
    registerListener("showMovieDetail", this.showMovieDetailHandler, this);
  }

  showMovieDetailHandler(data) {
    this.selectedMovie = data;
  }
  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}