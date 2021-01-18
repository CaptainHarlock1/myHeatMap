//κανω fetch το dataset μου και του λεω να κανει τα πάντα με το φόρτωμα της σελίδας--
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
const req = new XMLHttpRequest();
req.open('GET', url, 'true');
req.send();
req.onload = function(){
 
      const json = JSON.parse(req.responseText);
      const dataset = json;
      
};
//--

      //ορίζω τον κανβά μου--
      let w = 650;
      let h = 500;
      let padding = 60;
      //--

