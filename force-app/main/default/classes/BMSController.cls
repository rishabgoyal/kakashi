/**
 * @File Name          : BMSController.cls
 * @Description        : 
 * @Author             : RISHAB GOYAL
 * @Group              : 
 * @Last Modified By   : RISHAB GOYAL
 * @Last Modified On   : 9/28/2019, 3:31:04 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    9/22/2019   RISHAB GOYAL     Initial Version
**/
public with sharing class BMSController {
    @AuraEnabled(cacheable=true)
   public static List<Movie__c> getMovieList()
   {
       return [Select id,Name,Audience__c,Description__c,Languages__c,Movie_Poster__c,Poster_Source__c,Rating__c from Movie__c ];
   }
}