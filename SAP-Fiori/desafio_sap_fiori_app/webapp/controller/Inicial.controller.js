sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit:
            
            function () {
    
                let ImageList = {
                    Imagens : []
                };
                
                let ImageModel = new JSONModel(ImageList);

                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");
            },

            onPressBuscar: function(){

                //Instancia objeto input na variavel
                let inputBusca = this.byId("inpBusca");

                //coleta o valor digitado no input
                let query = inputBusca.getValue();

                //exibe valor digitado
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + query + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "01dc33e425msh06226454c430837p1d4fffjsnae37370831d8",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    
                    //instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    //clear tabela interna = array
                    oDadosImage.Imagens = [];

                    //loop que adiciona dados de uma tabela em outra tabela
                    let listaResultados = response.value;
                    let newItem;

                    //loop
                    for (var i = 0; i < listaResultados.length; i++){
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);  
                    }

                    oImageModel.refresh();

                }.bind(this)
                );

            }
        });
    });


