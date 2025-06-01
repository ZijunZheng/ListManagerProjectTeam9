const http = new coreHTTP();
let theList = [];

const result = document.querySelector(".result");
const input = document.querySelector("#listitem");
const addButton = document.querySelector(".add-btn");
const delButton = document.querySelector(".del-btn");

addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Show list in UI with edit options */
function ShowList() {
  let output = "<ul>";
  theList.forEach((item, index) => {
    output += `
      <li>
        <span class="item-text" data-index="${index}">${item}</span>
        <button class="edit-btn" data-index="${index}">Edit</button>
      </li>`;
  });
  output += "</ul>";
  result.innerHTML = output;

  // Re-attach edit button listeners
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", enableEdit);
  });

  // Also allow clicking the text itself to edit
  document.querySelectorAll(".item-text").forEach(span => {
    span.addEventListener("click", enableEdit);
  });
}

/* Fetch list from server */
async function GetList() {
  const data = await http.processRequest("GET", "/items");
  if (data.error) {
    result.innerHTML = `Error: ${data.error}`;
    return;
  }
  theList = data;
  ShowList();
}

/* Send list to server */
async function WriteList() {
  const data = await http.processRequest("POST", "/items", JSON.stringify(theList));
  if (data.error) {
    result.innerHTML = `Error: ${data.error}`;
  } else {
    theList = data;
    ShowList();
  }
}

/* Add new item */
async function httpPost(e) {
  e.preventDefault();
  const newItem = input.value.trim();
  if (newItem === "") return;
  theList.push(newItem);
  input.value = "";
  await WriteList();
}

/* Delete last item */
async function httpDelete(e) {
  e.preventDefault();
  if (theList.length > 0) {
    theList.pop();
    await WriteList();
  }
}

/* Edit handler */
function enableEdit(e) {
  const index = e.target.getAttribute("data-index");
  const currentText = theList[index];

  const newValue = prompt("Edit item:", currentText);
  if (newValue !== null && newValue.trim() !== "") {
    theList[index] = newValue.trim();
    WriteList();
  }
}

// Initial Load
async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  result.innerHTML = "Loading...";
  await GetList();
  addButton.disabled = false;
  delButton.disabled = false;
}

main();  