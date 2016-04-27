//
// GetSearchSet
//
function GetSearchSet()
  {
    var search_set = '';
    
    if ((document.getElementById('set_select_sesiones') != null ) && (document.getElementById('set_select_sesiones').checked)) {
        search_set = 'set=sesiones';
    }
    if ((document.getElementById('set_select_intervenciones') != null ) && (document.getElementById('set_select_intervenciones').checked)) {
        search_set = 'set=intervenciones';
    }
    else if ((document.getElementById('set_select_anotaciones') != null ) && (document.getElementById('set_select_anotaciones').checked)) {
        search_set = 'set=anotaciones';
    }
    return search_set;
}
//
// GetSearchLegs
//
function GetSearchLegs()
{
    var search_legs = '';
    if (document.getElementById('legs') != null) {
		if (document.getElementById('legs').value != '') 	
          search_legs = 'legs='+document.getElementById('legs').value;
    }
    return search_legs;
}
//
// GetSearchGBody
//
function GetSearchGBody()
{
    var search_gbody = '';
    if (document.getElementById('gbody') != null) {
		if (document.getElementById('gbody').value != '') 	
			search_gbody = 'gbody='+document.getElementById('gbody').value;
    }
    return search_gbody;
}
//
// GetSearchDate
//
function GetSearchDate()
{
    var  search_date = '';


          if (document.getElementById('datepicker').value != null) {
              if (document.getElementById('datepicker').value != '') {
				 if (document.getElementById('days') != null) {
					if (!document.getElementById('days').checked)
						search_date = 'date='+document.getElementById('datepicker').value;
				 }
				 else
					search_date = 'date='+document.getElementById('datepicker').value;
			  }	 
          }
		
    return search_date;
}
//
// GetSearchDateFromUntil
//
function GetSearchDateFromUntil()
{
    var  search_date = '';

    if (document.getElementById('date_select').value == 'from_until') {
      if ((document.getElementById('datepicker_from') != null) && (document.getElementById('datepicker_until') != null)) {
        if (document.getElementById('datepicker_from').value != '') {
           if (isDate(document.getElementById('datepicker_from').value,'dd-MM-yyyy'))
              search_date = search_date + 'from='+document.getElementById('datepicker_from').value;
        }
        if (document.getElementById('datepicker_until').value != '') {
           if (isDate(document.getElementById('datepicker_until').value,'dd-MM-yyyy')) {
              if (search_date != '') search_date = search_date + '&';
              search_date = search_date + 'until='+document.getElementById('datepicker_until').value;
           }
        }
        if (search_date != '') search_date = 'date_select=from_until&' + search_date;
      }
    }
    else {
      if (document.getElementById('datepicker_from') != null) {
        if (document.getElementById('datepicker_from').value != '') {
           if (isDate(document.getElementById('datepicker_from').value,'dd-MM-yyyy')) {
              search_date = 'from='+document.getElementById('datepicker_from').value;
              search_date = search_date + '&until='+document.getElementById('datepicker_from').value;
           }
        }
        if (search_date != '') search_date = 'date_select=date&' + search_date;
      }
    }
   return search_date;
}
//
// GetSearchKeywords
//
function GetSearchKeywords()
{
    var keywords = '';
    var kwoption = '';

    if (document.getElementById('keywords') != null) {
		  if (document.getElementById('keywords').value != '') {
    			keywords = document.getElementById('keywords').value;
		    	if (keywords.length > 2) {
              keywords = URLEncode(keywords);
			        if (keywords != '')
				          keywords = 'kw='+ keywords;
          }
          else {
              keywords = '';
          }
		  }
    }
    if (document.getElementById('kw_exact') != null) {
        if (document.getElementById('kw_exact').checked) {
            kwoption = '&kwo=1';
        }
    }
    return keywords + kwoption
}
//
// CheckSearchDateFromUntil
//
function CheckSearchDateFromUntil()
{
    var  ok = true;

    if (document.getElementById('date_select').value == 'from_until') {
       if ((document.getElementById('datepicker_from') != null) && (document.getElementById('datepicker_until') != null)) {
          if ((document.getElementById('datepicker_from').value != '') && (!isDate(document.getElementById('datepicker_from').value,'dd-MM-yyyy'))) {
                //ok = false;
          }
          if (document.getElementById('datepicker_until') != null) {
              if ((document.getElementById('datepicker_until').value != '') && (!isDate(document.getElementById('datepicker_until').value),'dd-MM-yyyy')) {
                //ok = false;
              }
          }
       }
    }
    else
    {
      if (document.getElementById('datepicker_from') != null) {
         if (document.getElementById('datepicker_from').value != '') {
              if (!isDate(document.getElementById('datepicker_from').value,'dd-MM-yyyy')) {
                  ok = false;
              }
         }
      }
    }
   return ok;
}
//
// GetSearchSpeaker
//
function GetSearchSpeaker()
{
    var search_speaker = '';

    if (document.getElementById('speaker') != null) {
        search_speaker = 'speaker='+document.getElementById('speaker').value;
    }
    return search_speaker;
}
//
// GoDS
// 
function GoDS(aReset)
{
	var gourl;
    
	gourl = 'ds.asp?';
    
	SetWaitMessage('Consultando diario de sesiones ...')		
	//Wait(100);
	window.location.replace(gourl);
}
//
// GoBS
//
function GoBS(aReset)
{
	var gourl = 'bs.asp';
	var goquery = '';    
	var qLegs = '';
	var qGBody = '';
	var errtxt = '';
	var ok = false;
		

	if (aReset <= 0) {

		if (CheckSearchDateFromUntil()) {

			qLegs = GetSearchLegs();			
			qGBody = GetSearchGBody();		
			qDate = GetSearchDateFromUntil();		
			qKeywords = GetSearchKeywords();
			
			ok = (qLegs != '') || (qGBody != '') || (qDate != '') || (qKeywords != '');
			if (ok == false)  {
				errtxt = 'No se indicaron los criterios de busqueda.';
			}
		}
		else {
			ok = false;
			errtxt = 'Fecha incorrecta.';
		}	
	}
	else {
		if (aReset == 1) { // cambio de legislatura
			qLegs = GetSearchLegs();
			ok = true;
		}
		else {
			if (aReset == 2) { // reseteo de la busqueda
				ok = true;
			}
		}
	}

	if ((aReset == 0) && (ok == false)) {
		if (errtxt == '') 
			errtxt = 'No se indicaron los criterios de busqueda.';
		alert(errtxt);
		ok = false;
	}
	
	if (ok) {
		goquery = '';		
		if (aReset == 0) {
			if (qLegs != '') goquery = AddQueryItem(goquery,qLegs);
			if (qGBody != '') goquery = goquery = AddQueryItem(goquery,qGBody);		
			if (qDate != '') goquery = AddQueryItem(goquery,qDate);
			if (qKeywords != '') goquery = AddQueryItem(goquery,qKeywords);
			
			SetWaitMessage('Buscando ....');
			//Wait(100);
		}
		else {
			if (aReset == 1) {
				goquery="op=reset";
				if (qLegs != '') goquery = AddQueryItem(goquery,qLegs);
				SetWaitMessage('Cambiando legislatura ....');
				//Wait(100);
			}
			else {
				if (aReset == 2) {
					goquery="op=reset";
					SetWaitMessage('Limpiando ....');
					//Wait(100);
				}
			}			
		}
		
		if (goquery != '') goquery = '?' + goquery;
		window.location.replace(gourl + goquery);
	}
	else {
		return false;
	}
}
//
// GoPlay
//
function GoPlay(aPlayQuery)
{
	var player_url = './fp.asp';
	
	if (aPlayQuery != '') {
		player_url = player_url + '?' + aPlayQuery;		
		if (GetSearchKeywords() != '') 
			player_url = player_url+'&'+GetSearchKeywords();
		
		if (player_url != '') {
			callFancyBox(player_url);
		}
	}
	else {
		return false;
	}
}

//
// GoAbstract
//
function GoAbstract(aSessionQuery)
{
	var abstract_url = './od.asp';
	
	if (aSessionQuery != '') {
		abstract_url = abstract_url + '?' + aSessionQuery;
		if (abstract_url != '') {
			//alert(abstract_url);
			callFancyBox(abstract_url);
		}
	}
	else {
		return false;
	}
}

function callFancyBox(href) {
	var hiddenclicker = document.getElementById("hiddenclicker");
	hiddenclicker.title = '';
	hiddenclicker.href = href;
	$('#hiddenclicker').trigger('click');
}