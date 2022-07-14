/**
 * @File Name          : movieTile.js
 * @Description        :
 * @Author             : RISHAB GOYAL
 * @Group              :
 * @Last Modified By   : RISHAB GOYAL
 * @Last Modified On   : 9/25/2019, 10:41:45 AM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    9/22/2019   RISHAB GOYAL     Initial Version
 **/
import { LightningElement, api, wire } from "lwc";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class MovieTile extends LightningElement {
  @api
  movie;

  @wire(CurrentPageReference) pageRef;

  showDetails() {
    let selectedMovie = this.movie;
    fireEvent(this.pageRef, "showMovieDetail", selectedMovie);
  }
}