import { config } from "../config/config"
import { NotificationManager} from 'react-notifications';

export const pageService = {
    getAbout,

    addSkill,
    addEducation,
    addWork,
    addContact,
    addDateProfile,

    updateSkill,
    updateEducation,
    updateWork,
    updateContact,

    getSkill,
    getEducation,
    getWork,
    getContact,
    
    deleteSkill,
    deleteEducation,
    deleteWork,
    deleteContact,
    deleteProfileImage,
    
    addProject,
    getProjects,
    deleteProjectImage,
    deleteProject,
    deleteProjectLink,
    addImageProfile,
    updateProjectLink,
}

function requestHandler(response){
    if(response.ok){
        
       return response.json().then(body => {
            return body;
        })
    }else{
        
        response.json().then(body => {
          NotificationManager.error(body.message, body.error, 3000);
        })
    }
}

function getAbout(){
    const requestOptions = {
        method: "GET",
       
      };
    return fetch(config.apiUrl+'/api/personal-info/get', requestOptions).then(requestHandler)
}

function addSkill(id,type,value){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: type, value: value, id: id})
       
      };
    return fetch(config.apiUrl+'/api/personal-info/add/skill', requestOptions).then(requestHandler)
}

function addEducation(id,organisation,city,country,qualification,date){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({organisation: organisation, city: city ,country: country, qualification: qualification, date: date,id : id})
      };

    return fetch(config.apiUrl+'/api/personal-info/add/education', requestOptions).then(requestHandler)
}

function addWork(id,employer,city,country,qualification,date){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({employer: employer, city: city ,country: country, qualification: qualification, date: date, id: id})
      };

    return fetch(config.apiUrl+'/api/personal-info/add/work', requestOptions).then(requestHandler)
}

function addContact(id,type,value){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({type: type, value: value,id: id})
      };

    return fetch(config.apiUrl+'/api/personal-info/add/contact', requestOptions).then(requestHandler)
}

function addDateProfile(value){
  const requestOptions = {
      method: "POST",
      body: value
    };

  return fetch(config.apiUrl+'/api/personal-info/add/profile', requestOptions).then(requestHandler)
}


function updateSkill(id,type,value){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: id, name: type, value: value})
       
      };
    return fetch(config.apiUrl+'/api/personal-info/update/skill', requestOptions).then(requestHandler)
}

function updateEducation(id,organisation,city,country,qualification,date){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: id, organisation: organisation, city: city ,country: country, qualification: qualification, date: date})
      };

    return fetch(config.apiUrl+'/api/personal-info/update/education', requestOptions).then(requestHandler)
}

function updateWork(id,employer,city,country,qualification,date){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: id, employer: employer, city: city ,country: country, qualification: qualification, date: date})
      };

    return fetch(config.apiUrl+'/api/personal-info/update/work', requestOptions).then(requestHandler)
}

function updateContact(id,type,value){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: Number(id), type: type, value: value})
      };

    return fetch(config.apiUrl+'/api/personal-info/update/contact', requestOptions).then(requestHandler)
}


function getSkill(id){
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
       
      };
    return fetch(config.apiUrl+'/api/personal-info/get/skill?id='+id, requestOptions).then(requestHandler)
}

function getEducation(id){
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

    return fetch(config.apiUrl+'/api/personal-info/get/education?id='+id, requestOptions).then(requestHandler)
}

function getWork(id){
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

    return fetch(config.apiUrl+'/api/personal-info/get/work?id='+id, requestOptions).then(requestHandler)
}

function getContact(id){
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

    return fetch(config.apiUrl+'/api/personal-info/get/contact?id='+id, requestOptions).then(requestHandler)
}

function deleteSkill(id){
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
       
      };
    return fetch(config.apiUrl+'/api/personal-info/delete/skill/'+id, requestOptions).then(requestHandler)
}

function deleteEducation(id){
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

    return fetch(config.apiUrl+'/api/personal-info/delete/education/'+id, requestOptions).then(requestHandler)
}

function deleteWork(id){
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

    return fetch(config.apiUrl+'/api/personal-info/delete/work/'+id, requestOptions).then(requestHandler)
}

function deleteContact(id){
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

    return fetch(config.apiUrl+'/api/personal-info/delete/contact/'+id, requestOptions).then(requestHandler)
}

function deleteProfileImage(){
  const requestOptions = {
      method: "DELETE",
    };

  return fetch(config.apiUrl+'/api/personal-info/delete/image', requestOptions).then(requestHandler)
}

//Project page

function getProjects(id){
  const requestOptions = {
      method: "GET",
    };
  if(id !== null){
    return fetch(config.apiUrl+'/api/porject/find?id='+id, requestOptions).then(requestHandler)
  }else{
    return fetch(config.apiUrl+'/api/porject/find', requestOptions).then(requestHandler)
  }
  
}

function addProject(value,links){
  const requestOptions = {
      method: "POST",
      body: value
    };
  
  let result =  fetch(config.apiUrl+'/api/porject/add', requestOptions).then(requestHandler)
  result.then(r=> addLinks(links,r.id))
  
}

function addLinks(links,id){

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        links: links,
        projectId: id
      })
  };
  return fetch(config.apiUrl+'/api/porject/add/link', requestOptions).then(requestHandler)

}
function updateProjectLink(id,type,link){

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
    
    
};
return fetch(config.apiUrl+'/api/porject/update/link?id='+id+'&link='+link+'&type='+type, requestOptions).then(requestHandler)

}
function deleteProjectImage(projectId,imageName){
  const requestOptions = {
      method: "DELETE",
    };

  return fetch(config.apiUrl+'/api/porject/delete/image?name='+imageName+'&projectId='+projectId, requestOptions).then(requestHandler)
}

function deleteProject(id){
  const requestOptions = {
      method: "DELETE",
    };

  return fetch(config.apiUrl+'/api/porject/delete?id='+id, requestOptions).then(requestHandler)
}

function deleteProjectLink(id){
  const requestOptions = {
      method: "DELETE",
    };

  return fetch(config.apiUrl+'/api/porject/link/'+id, requestOptions).then(requestHandler)
}

function addImageProfile(value){
  const requestOptions = {
      method: "POST",
      body: value
    };

  return fetch(config.apiUrl+'/api/porject/update/image', requestOptions).then(requestHandler)
}