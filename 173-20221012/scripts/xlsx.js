$(function () {
    GetDataXlxs();
});
function GetDataXlxs() {
        var service_data = [];
        var main_data = [];
        var idcat = [];
        var result = {}
        alasql('select * from xlsx("scripts/data/data.xlsx",{headers:true, sheetid:"Services", range:"A2:D500"})',
        [],function(data) {
        var arr;
        var cell = []
        $.each(data, function (i, v) { 
            const row = Object.values(v);
            if(row.length > 0 && row != ''){cell.push(row)}
        });
        var category; var main = [];
        for(i = 0 ; i < cell.length ; i++){
            if(cell[i].length > 3){ category = cell[i][0];  }
            else{cell[i].unshift(category)}main.push(cell[i])
        }
        $.each(main, function (i, v) { result[v[0]]=[] });
        $.each(main, function (i, v) { 
            var service = {'service':v[1], 'description':v[2],  'price':v[3],}
            result[v[0]].push(service);
        });
        $.getJSON('config.json', function(cfg) {if(cfg.debug !== '' && cfg.debug == 'on' && cfg.debug !== undefined){console.log(result)}});
        $.each(result, function (indexInArray, valueOfElement) { 
            $("div").each(function() {
                $.each(this.attributes,function(i,a){
                    if(a.name == 'service' && a.value == indexInArray){  
                        var column = $("#menu_service[service='"+a.value+"']").attr('column');
                        for(var i = 0; i < valueOfElement.length; i++){
                            let service_name = valueOfElement[i].service;
                            let service_price = valueOfElement[i].price;
                            let service_id = a.value;
                            load_TemplateService(column,service_name,service_price,service_id); 
                        }
                    }
                })
            })
        });
    });
}
function load_TemplateService(column,service_name,service_price,service_id){
    let layout;
    if(column !== undefined && column != '' && column < 3){layout = "/components/layouts/menu/col-"+column+".html"}else{layout = "/components/layouts/menu/col-1.html"}
    $.get(layout, function (data){
        data = data.replace('{service_name}', service_name).replace('{service_price}', service_price);
        $("#menu_service[service='"+service_id+"']").append(data)
    });
}