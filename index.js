import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tacker-app-jpbl-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    ulEl.innerHTML = ""
    for (let i = 0; i < leads.length; i++) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.target = "_blank"
        a.href = leads[i]
        a.textContent = leads[i]
        li.appendChild(a)
        ulEl.appendChild(li)
    }
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
}, function(error) {
    console.error("Firebase read failed:", error)
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    const value = inputEl.value.trim()
    if (value) {
        push(referenceInDB, value)
        inputEl.value = ""
    }
})