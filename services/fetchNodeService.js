import axios from "axios";
import Swal from "sweetalert2";
const serverURL = "http://localhost:5000";
function getDate() {
  var cd = new Date();
  return `${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`;
}

function getTime() {
  var cd = new Date();
  return `${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`;
}

async function postData(url, body) {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    };
    var response = await axios.post(`${serverURL}/${url}`, body, config);
    var data = response.data;

    return data;
  } catch (e) {
    //  console.error('POST Error:', e);
    //  return(null)

    // alert(JSON.stringify(e.response))
    if (e.response.status == 401) {
      Swal.fire("Your session is expired pls regenerate token....");
    } else {
      Swal.fire("site is not working properly...");
    }
    console.error("GET Error:", e);
    return [];
  }
}

async function getData(url) {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    };
    var response = await axios.get(`${serverURL}/${url}`, config);
    var data = response.data;
    return data;
  } catch (e) {
    // without token called component is not working
    //   GIVES MESSAGE IN THE FORM OF SWAL //

    // alert(JSON.stringify(e.response))
    if (e.response.status == 401) {
      Swal.fire("Your session is expired pls regenerate token....");
    } else {
      Swal.fire("site is not working properly...");
    }
    console.error("GET Error:", e);
    return [];
  }
}
export { postData, serverURL, getDate, getTime, getData };
