let notes = [];
let activeIndex = 0;

const noteArea = document.getElementById("note");
const tabs = document.getElementById("tabs");
const addBtn = document.getElementById("add");
const deleteBtn = document.getElementById("delete");

// Load notes
chrome.storage.sync.get(["notes"], (res) => {
  notes = res.notes || [""]; 
  renderTabs();
  loadNote();
});

// Save notes
function save() {
  chrome.storage.sync.set({ notes });
}

// Render tabs
function renderTabs() {
  tabs.innerHTML = "";
  notes.forEach((_, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === activeIndex ? " active" : "");
    tab.textContent = `Note ${i + 1}`;
    tab.onclick = () => {
      activeIndex = i;
      loadNote();
      renderTabs();
    };
    tabs.appendChild(tab);
  });
}

// Load note
function loadNote() {
  noteArea.value = notes[activeIndex] || "";
}

// Auto save
noteArea.addEventListener("input", () => {
  notes[activeIndex] = noteArea.value;
  save();
});

// Add new note
addBtn.onclick = () => {
  notes.push("");
  activeIndex = notes.length - 1;
  save();
  renderTabs();
  loadNote();
};

// Delete note
deleteBtn.onclick = () => {
  if (notes.length === 1) return;
  notes.splice(activeIndex, 1);
  activeIndex = 0;
  save();
  renderTabs();
  loadNote();
};
