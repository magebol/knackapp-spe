
//-------------------------------------------   CREAR  -----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
$(document).on('knack-scene-render.scene_286', function(event, scene) {
	var apid = appid;
	var apk = apikey;
  
  $("#kn-scene_286").parent().parent().css('height','100%');
  $("#kn-scene_286").parent().css('height','100%');
  $("#kn-scene_286").css('height','100%');
  $("#kn-scene_286").append('<div id="canvas"></div>');
  $("#canvas").after('<button id="save-button">Salvar Diagrama</button>');
 
    LazyLoad.js(['https://unpkg.com/bpmn-js@7.0.1/dist/bpmn-modeler.development.js','https://unpkg.com/jquery@3.3.1/dist/jquery.js'], function () {
        console.log('All my files have completed loading!');
 
	var css_files = ['https://unpkg.com/bpmn-js@7.0.1/dist/assets/diagram-js.css', 'https://unpkg.com/bpmn-js@7.0.1/dist/assets/bpmn-font/css/bpmn.css'];
	LazyLoad.css(css_files, function () {
           console.log('All my CSS files have completed loading!');
	}); 
      
  /*** Viewer or Modeler Instances ***/
    // modeler instance
	var bpmnModeler = new BpmnJS({
	container: '#canvas',
        keyboard: {
          bindTo: window
        }
	});
  /***********************************************************/
  
  /*** CREATE new diagram */
	const start = async function () {
            
	//async function openD(bpmnXML) {
    try {

        const result = await bpmnModeler.createDiagram();
            // access viewer components
                var canvas = bpmnModeler.get('canvas');
                var overlays = bpmnModeler.get('overlays');

            // zoom to fit full viewport
                canvas.zoom('fit-viewport');

            //const { warnings } = result;
                console.log(warnings);

    } catch (err) {
          console.log(err.message, err.warnings);
      } 
	}
	// Call start
	start();
  /***********************************************************/
  
  /*** Save diagram contents and print them to the console. ***/
	async function exportDiagram() {
        try {
          var result = await bpmnModeler.saveXML({ format: true });
          console.log('DIAGRAM', result.xml);
                     
            var stringNew = result.xml;
            var stringNew2 = 'test test';
            var filename = 'process.txt';
          
            var formData = new FormData();
            var archivo = new Blob([stringNew2], {type: 'text/plain'}) ;
            formData.append('files', archivo, filename);
          
			sendFile(formData, "object_33", apid, apk);
           
        } catch (err) {
          console.error('No pudo salvarse el diagram BPMN 2.0', err);
        }
	}
  /***********************************************************/
  
  // wire save button
      $('#save-button').click(exportDiagram);
  });
}); 

//-------------------------------------------   VER  -----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
$(document).on('knack-scene-render.scene_285', function(event, scene) {
  
  $("#kn-scene_285").parent().parent().css('height','100%');
  $("#kn-scene_285").parent().css('height','100%');
  $("#kn-scene_285").css('height','100%');
  $("#kn-scene_285").append('<div id="canvas"></div>');

 LazyLoad.js(['https://unpkg.com/bpmn-js@7.0.1/dist/bpmn-viewer.development.js','https://unpkg.com/jquery@3.3.1/dist/jquery.js'], function () {
        console.log('All my files have completed loading!');
 
		var css_files = ['https://unpkg.com/bpmn-js@7.0.1/dist/assets/diagram-js.css', 'https://unpkg.com/bpmn-js@7.0.1/dist/assets/bpmn-font/css/bpmn.css'];
		LazyLoad.css(css_files, function () {
             console.log('All my CSS files have completed loading!');
		});
  
		var diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

  /*** Viewer or Modeler Instances ***/
	// viewer instance
	var bpmnViewer = new BpmnJS({
		container: '#canvas'
	});
  /***********************************************************/

  /*** VIEW existing diagram */
      async function openDiagram(bpmnXML) {

        // import diagram
        try {
          await bpmnViewer.importXML(bpmnXML);

          // access viewer components
          var canvas = bpmnViewer.get('canvas');
          var overlays = bpmnViewer.get('overlays');

          // zoom to fit full viewport
          canvas.zoom('fit-viewport');
          
        } catch (err) {
          console.error('could not import BPMN 2.0 diagram', err);
        }
      }

      // load external diagram file via AJAX and open it
      	$.get(diagramUrl, function(data) {;   
             openDiagram(data);
		});
  /***********************************************************/
  });
}); 


//-------------------------------------------   EDITAR  ----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
$(document).on('knack-scene-render.scene_284', function(event, scene) {
  
  $("#kn-scene_284").parent().parent().css('height','100%');
  $("#kn-scene_284").parent().css('height','100%');
  $("#kn-scene_284").css('height','100%');
  $("#kn-scene_284").append('<div id="canvas"></div>');
  $("#canvas").after('<button id="save-button">Salvar Diagrama</button>');
  
 LazyLoad.js(['https://unpkg.com/bpmn-js@7.0.1/dist/bpmn-modeler.development.js','https://unpkg.com/jquery@3.3.1/dist/jquery.js'], function () {
        console.log('All my files have completed loading!');
 
	var css_files = ['https://unpkg.com/bpmn-js@7.0.1/dist/assets/diagram-js.css', 'https://unpkg.com/bpmn-js@7.0.1/dist/assets/bpmn-font/css/bpmn.css'];
	LazyLoad.css(css_files, function () {
           console.log('All my CSS files have completed loading!');
	});
  
	var diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

  /*** Viewer or Modeler Instances ***/
    // modeler instance
	var bpmnModeler = new BpmnJS({
	container: '#canvas',
        keyboard: {
          bindTo: window
        }
	});
  /***********************************************************/
  
  /*** VIEW existing diagram */
      async function openDiagram(bpmnXML) {

        // import diagram
        try {
          await bpmnModeler.importXML(bpmnXML);

          // access viewer components
          var canvas = bpmnModeler.get('canvas');
          var overlays = bpmnModeler.get('overlays');

          // zoom to fit full viewport
          canvas.zoom('fit-viewport');
          
        } catch (err) {
          console.error('could not import BPMN 2.0 diagram', err);
        }
      }

      // load external diagram file via AJAX and open it
      	$.get(diagramUrl, function(data) {;   
             openDiagram(data);
		});
  /***********************************************************/
   
  /*** Save diagram contents and print them to the console. ***/
	async function exportDiagram() {
        try {

          var result = await bpmnModeler.saveXML({ format: true });
          console.error('La nueva versión del Diagrama ha sido guardada.');

          console.log('DIAGRAM', result.xml);
        } catch (err) {

          console.error('No pudo salvarse el diagram BPMN 2.0', err);
        }
	}
  /***********************************************************/  
  
  // wire save button
      $('#save-button').click(exportDiagram);
  });
}); 



//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    //Disable full page
//    $("body").on("contextmenu",function(e){
//        return false;
//    });
    //Disable part of page
//    $("#id").on("contextmenu",function(e){
//        return false;
//    });
    //Disable part of page
//    $('#id').bind('cut copy', function (e) {
//        e.preventDefault();
//    });
      //Disable cut copy paste
//    $('body').bind('cut copy', function (e) {
//        e.preventDefault();
//    });
    //Disable mouse right click
//    $("body").on("contextmenu",function(e){
//       return false;
//    });
});


//Call the function when your table renders -- INDICADORES DE ADMIN
//$(document).on('knack-view-render.view_44', function (event, view , data) {
//  addGroupExpandCollapse1(view);
//})
//Call the function when your table renders -- INDICADORES DE ADMIN
//$(document).on('knack-view-render.view_138', function (event, view , data) {
//  addGroupExpandCollapse1(view);
//})
//Call the function when your table renders -- INDICADORES DE ADMIN
//$(document).on('knack-view-render.view_163', function (event, view , data) {
//  addGroupExpandCollapse1(view);
//})
//Call the function when your table renders -- INDICADORES DE ADMIN
//$(document).on('knack-view-render.view_179', function (event, view , data) {
//  addGroupExpandCollapse1(view);
//})


var addGroupExpandCollapse1 = function(view) {
  
$('#' + view.key + ' .kn-group-level-1').nextUntil('.kn-group-level-1').toggle();
  
  $('#' + view.key + ' table thead tr th span a').attr('href','');
  
  $('#' + view.key + ' .kn-table-group').css("cursor","pointer");
  
  $('#' + view.key + " .kn-group-level-1 td").each(function () {
    if($(this).text().length > 1) {
      var RowText = $(this).html();
      $(this).html('<i class="fa fa-plus-square-o"></i>&nbsp;' + RowText);
    }
  });


  $('#' + view.key + ' .kn-group-level-1').click(function() {
    $(this).nextUntil('.kn-group-level-1').toggle();
    
    if($(this).html().indexOf('fa-minus') !== -1) {
      $(this).html($(this).html().replace('minus', 'plus'));
    } else {
      $(this).html($(this).html().replace('plus', 'minus'));
    }
  });
}

function sendData(data, object, appid, apikey) {
              Knack.showSpinner();
                         $.ajax({
                              url:'https://api.knack.com/v1/objects/'+object+'/records/',
                              type: 'POST',
                              headers: {
                              "Content-Type": "application/json",
                              "X-Knack-Application-Id":appid, 
                              "X-Knack-REST-API-Key":apikey
								},
                              data: JSON.stringify(data),
                              success: function (response) {
                                console.log('Record Added!');
                              }
                           }).done(function(responseData) {
      	  						console.log(responseData);
              					Knack.hideSpinner();
    					   });
}

function sendFile(form, object, app_id, apikey) {
    var url = 'https://api.knack.com/v1/applications/'+app_id+'/assets/file/upload';
    // Make the AJAX call
        Knack.showSpinner();

    $.ajax({
      url:  url,
      type: 'POST',
      headers: {
			"X-Knack-Application-Id":app_id, 
			"X-Knack-REST-API-Key":apikey
			},
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form,
	  success: function (response) {
            console.log('File Added!');
            console.log(response);
            console.log(response.id);
        	var fileid = response.id;
            var datos = {"field_261_raw": fileid};
            console.log(datos);
            //sendData(datos, object, app_id, apikey);
				},
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
         console.log("Status: " + textStatus);
         console.log("Error: " + errorThrown); 
				}  
    }).done(function(responseData) {
			Knack.hideSpinner();        
    });
}
var appid = process.env.APP_ID;
var apikey = process.env.API_KEY;
