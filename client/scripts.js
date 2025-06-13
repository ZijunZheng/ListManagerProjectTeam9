const http = new coreHTTP();
let theList = [];

const result = document.querySelector(".result");
const input = document.querySelector("#listitem");
const addButton = document.querySelector(".add-btn");

addButton.addEventListener("click", httpPost);

/* Show list in UI with edit options */
function ShowList() {
  let output = "<ul>";
  theList.forEach((item, index) => {
    output += `
      <li class="list-item">
        <span class="item-text" data-index="${index}">${item}</span>
        <div class="actions">
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      </li>`;
  });
  output += "</ul>";
  result.innerHTML = output;

  // Attach listeners to new buttons
  document.querySelectorAll(".edit-btn").forEach(btn =>
    btn.addEventListener("click", enableEdit)
  );

  document.querySelectorAll(".delete-btn").forEach(btn =>
    btn.addEventListener("click", handleDelete)
  );

  document.querySelectorAll(".item-text").forEach(span =>
    span.addEventListener("click", enableEdit)
  );
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

/* Delete item */
async function handleDelete(e) {
  const index = e.target.getAttribute("data-index");
  if (index !== null) {
    theList.splice(index, 1);
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
  result.innerHTML = "Loading...";
  await GetList();
  addButton.disabled = false;
}

main();  