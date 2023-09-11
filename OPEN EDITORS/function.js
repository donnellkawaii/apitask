// const { get } = require("express/lib/request");
// const axios = require('axios');
//get the stores data
async function getStores() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/stores/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getStoresByEmail() {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/stores/email/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// async function getLoginInfo() {
//   fetch('http://localhost:3000/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
// }

//display stores in table 
async function displayStoreInfo() {
  const storesInfo = await getStores();
  uname = document.getElementById("loginUname");
  // <img src= "" alt="Edit Icon" onclick="editAction()"></img>
  // document.getElementById("logiUser").textContent = loginUname.value;
  // console.log(storesInfo);
  // loginInfo();
  // const userType = req.user.type;
  // console.log(userType);
  let html = '';
  for (let i = 0; i < storesInfo.length; i++) {
  // if (storesInfo[i].type === 'Normaluser'){
    html += `
    <tr>
    <td>${storesInfo[i].id}</td>
    <td>${storesInfo[i].name}</td>
    <td>${storesInfo[i].location}</td>
    <td>${storesInfo[i].email}</td>
    <td>${storesInfo[i].date}</td>
    <td class="icon-cell">
    <img class="update-icon" src="../../icons/update.png" id = "updateIcon" alt="Edit Icon"  onclick="updateStoreModal()">
    <img class="delete-icon" src="../../icons/delete.png" alt="Delete Icon" onclick = "deleteStore()" >
    </td>
    </tr>
    `
  // }
  // } else if(storesInfo[i].type === 'Superuser'){
  //   const storesInfo = await getStores();
  //   for (let i = 0; i < storesInfo.length; i++){
  //     html += `
  //     <tr>
  //     <td>${storesInfo[i].id}</td>
  //     <td>${storesInfo[i].name}</td>
  //     <td>${storesInfo[i].location}</td>
  //     <td>${storesInfo[i].email}</td>
  //     <td>${storesInfo[i].date}</td>
  //     </tr>
  //     `
  //   }
  // }
  };
  document.getElementById("storeData").insertAdjacentHTML("afterbegin", html);
};

// login user
async function login() {
  const uname = document.getElementById("loginUname").value;
  const password = document.getElementById("password").value;
  // const Luname = document.getElementById("loginUname").value;
  // document.getElementById("logiUser").innerText = Luname;
  // const loginUser = document.getElementById("loginUser");
  // console.log(loginUser);
  const data = {
    username: uname,
    password: password
  };

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    // console.log(data);
    if (response.ok) {
      const storesInfo =  getStores();
      displayStoreInfo();

      // Handle successful login here
      // alert("Login successful!");
      // console.log(data);
      window.location = "http://127.0.0.1:5500/OPEN%20EDITORS/index.html";
      const responseData =  response.json();
      const userId = responseData.Id;

      // Render additional data using a GET request
      fetch(`http://localhost:3000/api/v1/stores/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      // Handle login failure here
      alert("Login failed!");
    }
  })
  .catch(error => {
    // Handle network or other errors here
    console.error('Error:', error);
  });
}

 
// function loginInfo(){
//   const uname = document.getElementById("loginUname").value;
//   document.getElementById("logiUser").innerText = uname;
// }

// add store modal
function addStoreModal(){
  // Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

// update store modal
function updateStoreModal() {
  // Get the modal
  const modal = document.getElementById("updateStoreModal");

  // Get all elements with class "update-icon"
  const updateIcons = document.querySelectorAll(".update-icon");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("updateStoreClose")[0];

  // When the user clicks the button, open the modal
  updateIcons.forEach(icon => {
    icon.onclick = function() {
      modal.style.display = "block";
    }
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//addStore
function addStore() {
  const submitButton = document.getElementById('submit-button');
  const messageElement = document.getElementById('message');

  submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    const getElementValue = id => document.getElementById(id).value;

    const name = getElementValue('addStoreName');
    const location = getElementValue('addStoreLocation');
    const email = getElementValue('addStoreEmail');
    const date = getElementValue('addStoreDate');
    const password = getElementValue('addStorePassword');

    if (name && location && email && date && password) {
      const data = {
        name,
        location,
        email,
        date,
        password
      };

      sendDataToAPI(data);
    } else {
      showMessage('All fields should be filled');
    }
  });

  function sendDataToAPI(data) {
    fetch('http://localhost:3000/api/v1/stores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          showMessage('Successfully Added');
          location.reload();
          clearFields();
        } else if (data.response === 'Email already exists') {
          showMessage('Store already exists');
          location.reload();
        } else {
          showMessage('Email already exists');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        showMessage('Email already exists');
      });
  }

  function showMessage(message) {
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 3000);
  }
};

function clearFields() {
  document.getElementById('addStoreName').value = '';
  document.getElementById('addStoreLocation').value = '';
  document.getElementById('addStoreEmail').value = '';
  document.getElementById('addStoreDate').value = '';
  document.getElementById('addStorePassword').value = '';
}
function updateClearFields() {
  document.getElementById('updateStoreName').value = '';
}

// const clearButton = document.getElementById('clear-button');

// clearButton.addEventListener('click', clearFields);

//update store
function updateStore() {
  const updateSubmitButton = document.getElementById('update-submit-button');
  const updateMessageElement = document.getElementById('update-message');
  const updateStoreNameInput = document.getElementById('updateStoreName');

  updateSubmitButton.addEventListener('click', async function(event) {
    event.preventDefault();

    const name = updateStoreNameInput.value;

    if (name.trim() === '') {
      showMessage('Empty field. Please provide a name.');
      return;
    }

    const id = document.querySelector('.update-icon').closest('tr').querySelector('td:first-child').textContent;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/stores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        showMessage('Store Updated Successfully');
        location.reload();
      } else {
        showMessage('Error updating store. Please try again.');
     
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error updating store. Please try again.');
    
    }
  });

  function showMessage(message) {
    updateMessageElement.textContent = message;
    updateMessageElement.style.display = 'block';

    setTimeout(() => {
      updateMessageElement.style.display = 'none';
    }, 3000);
  }

  const storeTable = document.getElementById('storeTable');
  storeTable.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('edit-icon')) {
      const row = target.closest('tr');
      const id = row.querySelector('td:first-child').textContent;

      updateStoreNameInput.value = row.querySelector('td:nth-child(2)').textContent;
      // document.getElementById('updateStoreLocation').value = row.querySelector('td:nth-child(3)').textContent;
    } else if (target.classList.contains('delete-icon')) {
      const row = target.closest('tr');
      const id = row.querySelector('td:first-child').textContent;
      // Handle delete action
    }
  });
}

function deleteStore() {
    
    // Add an event listener to all delete icons
document.querySelectorAll('.delete-icon').forEach(function(icon) {
  icon.addEventListener('click', function(event) {
    const row = event.target.closest('tr');
    const id = row.querySelector('td:first-child').textContent;

    try {
      // Make the delete request
      const response =  fetch(`http://localhost:3000/api/v1/stores/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        location.reload();
      }

      const data = response.json();

      if (data.success) {
        showMessage('Store Deleted Successfully');
        location.reload();
        // Optional: Remove the row from the table
        row.remove();
      } else {
        showMessage('Error Deleting store. Please try again.');
        location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error Deleting store. Please try again.');
      location.reload();
    }
  });
});

function showMessage(message) {
  const updateMessageElement = document.getElementById('delete-message');
  updateMessageElement.textContent = message;
  updateMessageElement.style.display = 'block';

  setTimeout(() => {
    updateMessageElement.style.display = 'none';
  }, 3000);
}


}

function logout(){
  document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Assuming you have an access token
                },
                body: JSON.stringify({ token: refreshToken }) // Assuming you have a refreshToken variable
            });

            if (response.ok) {
                console.log('Logout successful');
                window.location = "http://127.0.0.1:5500/OPEN%20EDITORS/index.html";
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
});

}


getStores();
displayStoreInfo();
// logout();
// addStoreModal()
// addStore();
// getLoginInfo();