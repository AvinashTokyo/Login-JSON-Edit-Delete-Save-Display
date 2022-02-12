document.getElementById("r_submit").addEventListener("click", RegisterForm);
document.getElementById("l_submit").addEventListener("click", LoginForm);
// document.getElementById("edit").addEventListener("click", edit);
// document.getElementById("save").addEventListener("click", save);
document.getElementById("login_nav").addEventListener("click", loginNav);
document.getElementById("login_nav2").addEventListener("click", loginNav);
document.getElementById("signup_nav").addEventListener("click", signupNav);
document.getElementById("signup_nav2").addEventListener("click", signupNav);

//Register Form
function RegisterForm(e) {
  console.log("Hii i m from Register Click.");
  e.preventDefault();
  let name = document.getElementById("r_name").value;
  let username = document.getElementById("r_username").value;
  let password = document.getElementById("r_password").value;
  //input field validation
  if (name == "") {
    namePopup();
    return false;
  } else if (username == "") {
    usernamePopup();
    return false;
  } else if (password == "") {
    passwordPopup();
    return false;
  } else {
    axios
      .post(
        "http://localhost:3000/users",
        { name: name, username: username, password: password },
        "Content-Type : application/json"
      )
      .then((res) => {
        console.log(res.data, "Register Data");
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Registration Successful");
    document.getElementById("r_form").reset();
  }
}

//Login Form
function LoginForm(e) {
  console.log("hii i m from login click.");
  e.preventDefault();
  let username = document.getElementById("l_username").value;
  let password = document.getElementById("l_password").value;

  if (username == "") {
    l_usernamePopup();
    return false;
  } else if (password == "") {
    l_passwordPopup();
    return false;
  } else {
    console.log("Else block");
    checkJSON(username,password);
  }
}

//Display Table function
function displayTable() {
  document.getElementById("login_div").style.display = "none";
  axios
    .get("http://localhost:3000/users")
    .then((res) => {
      let u = res.data;
      let temp = "";
      for (let i = 0; i < u.length; i++) {
        temp += "<tr>";
        temp += `<td><input value="${i + 1}" class="no-border" disabled></td>`;
        temp += `<td><input value="${u[i].id}" class="no-border" disabled></td>`;
        temp += `<td><input value="${u[i].name}" class="no-border" id="js_name${
          i + 1
        }" disabled> </td>`;
        temp += `<td><input value="${
          u[i].username
        }" class="no-border" id="js_username${i + 1}" disabled></td>`;
        temp += `<td><input value="${
          u[i].password
        }" class="no-border" id="js_password${i + 1}" disabled></td>`;
        temp += "</tr>";
      }
      document.getElementById("table_content").innerHTML += temp;
    })
    .catch((err) => {
      console.log(err);
    });
}

//Login Nav
function loginNav() {
  document.getElementById("user_table").style.display = "none";
  document.getElementById("div_hide").style.display = "none";
  document.getElementById("login_div").style.display = "flex";
}

// Signup Nav
function signupNav() {
  document.getElementById("user_table").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("div_hide").style.display = "flex";
}

//PopUp Function
function namePopup() {
  document.getElementById("namePopup").style.display = "flex";
  setTimeout(fun, 2500);
  function fun() {
    document.getElementById("namePopup").style.display = "none";
  }
}
function usernamePopup() {
  document.getElementById("usernamePopup").style.display = "flex";
  setTimeout(fun, 2500);
  function fun() {
    document.getElementById("usernamePopup").style.display = "none";
  }
}
function passwordPopup() {
  document.getElementById("passwordPopup").style.display = "flex";
  setTimeout(fun, 2500);
  function fun() {
    document.getElementById("passwordPopup").style.display = "none";
  }
}
function l_usernamePopup() {
  document.getElementById("l_usernamePopup").style.display = "flex";
  setTimeout(fun, 2500);
  function fun() {
    document.getElementById("l_usernamePopup").style.display = "none";
  }
}
function l_passwordPopup() {
  document.getElementById("l_passwordPopup").style.display = "flex";
  setTimeout(fun, 2500);
  function fun() {
    document.getElementById("l_passwordPopup").style.display = "none";
  }
}

//Name validations
$(document).ready(function () {
  $(".name-valid").on("keypress", function (e) {
    var regex = new RegExp("^[a-zA-Z ]*$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  });
});

//Edit Function
document.getElementById("edit").addEventListener("click", edit);
function edit() {
  let input = document.getElementById("input").value;
  if (input == "") {
    edit_Popup();
  } else {
    let table = document.getElementById("table_content");
    table.rows[input - 1].style.background = "pink";
    document.getElementById(`js_name${input}`).disabled = false;
    document.getElementById(`js_username${input}`).disabled = false;
    document.getElementById(`js_password${input}`).disabled = false;
  }
}

// Id is required function in table edit and save.
function edit_Popup() {
  document.getElementById("id_require").style.display = "flex";
  setTimeout(fun, 2500);
  function fun() {
    document.getElementById("id_require").style.display = "none";
  }
}

//Save Function
document.getElementById("save").addEventListener("click", save);
function save(e) {
  e.preventDefault();
  let input = document.getElementById("input").value;
  if (input == "") {
    edit_Popup();
  } else {
    let name = document.getElementById(`js_name${input}`).value;
    let username = document.getElementById(`js_username${input}`).value;
    let password = document.getElementById(`js_password${input}`).value;
    axios
      .put(
        `http://localhost:3000/users/${input}`,
        { name: name, username: username, password: password },
        "Content-Type : application/json"
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Update Successfully.");
  }
}

//Delete Function
document.getElementById("delete").addEventListener("click", deleteJS);
function deleteJS(e) {
  e.preventDefault();
  let input = document.getElementById("inputDelete").value;
  if (input == "") {
    edit_Popup();
  } else {
    // let name = document.getElementById(`js_name${input}`).value;
    // let username = document.getElementById(`js_username${input}`).value;
    // let password = document.getElementById(`js_password${input}`).value;
    axios.delete(`http://localhost:3000/users/${input}`).then().catch();
    console.log("Hii i m from Delete Function");
    alert("Delete Successfully.");
  }
}

//JSON Credentials
function checkJSON(username, password) {
  axios
    .get(`http://localhost:3000/users`)
    .then((response) => {
      return response.data;
    })
    .then((data) =>
      data.some(
        (data) => data.username == username && data.password == password
      )
    )
    .then((credential) => {
      if (credential) {
        console.log(credential, "true");
        alert("Login Successful");
        document.getElementById("l_form").reset();
        document.getElementById("div_hide").style.display = "none";
        document.getElementById("user_table").style.display = "flex";

        // Displaying Table
        displayTable();
      } else {
        document.getElementById("l_form").reset();
        alert("Invalid credentials");
        console.log(credential, "false");
      }
    });
}
