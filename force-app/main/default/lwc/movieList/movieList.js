/**
 * @File Name          : movieList.js
 * @Description        :
 * @Author             : RISHAB GOYAL
 * @Group              :
 * @Last Modified By   : RISHAB GOYAL
 * @Last Modified On   : 9/22/2019, 10:46:00 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    9/22/2019   RISHAB GOYAL     Initial Version
 **/
import { LightningElement, wire } from "lwc";
import getMovieList from "@salesforce/apex/BMSController.getMovieList";

export default class MovieList extends LightningElement {
  @wire(getMovieList)
  movieList;
}