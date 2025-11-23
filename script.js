// Select form and timetable elements 
const form = document.getElementById("timetableForm");
const timetable =
  document.getElementById("timetable")?.getElementsByTagName("tbody")[0]
  ;
const clearButton = document.getElementById("clearTimetable");
const downloadButton = document.getElementById("downloadPdf");
const filterYear = document.getElementById("filterYear");
const filterSection = document.getElementById("filterSection");
// Load saved timetable data on timetable.html 
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("timetable.html")) {
    loadTimetable();
  } else if (form) {
    renderTimetable();
  }
  // Attach filter event listeners 
  if (filterYear && filterSection) {
    filterYear.addEventListener("change", renderTimetable);
    filterSection.addEventListener("change", renderTimetable);
  }
});
// Handle form submission (only if form exists on the page) 
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Get values from the form 
    const year = document.getElementById("year").value;
    const section = document.getElementById("section").value;
    const dayIndex = document.getElementById("day").value;
    const subjects = [
      document.getElementById("subject1").value,
      document.getElementById("subject2").value,
      document.getElementById("subject3").value,
      document.getElementById("subject4").value,
      document.getElementById("subject5").value,
    ];
    // Convert day index to Roman numerals (I to VI) 
    const days = ["I", "II", "III", "IV", "V", "VI"];
    const day = days[parseInt(dayIndex) - 1];
    // Get saved timetable from localStorage or create a new one 
    let timetableData = JSON.parse(localStorage.getItem("timetableData")) || [];
    76
    // Add new entry with year and section 
    timetableData.push({ year, section, day, subjects });
    // Save updated timetable to localStorage 
    localStorage.setItem("timetableData", JSON.stringify(timetableData));
    // Refresh displayed timetable 
    renderTimetable();
    // Clear the form inputs 
    form.reset();
  });
}
// Function to render timetable on the main page 
function renderTimetable() {
  if (!timetable) return; // Ensure timetable exists before rendering 
  timetable.innerHTML = ""; // Clear existing rows 
  let timetableData = JSON.parse(localStorage.getItem("timetableData")) || [];
  // Apply filters if selected 
  const selectedYear = filterYear?.value || "";
  const selectedSection = filterSection?.value || "";
  let filteredData = timetableData.filter(entry => {
    return (selectedYear === "" || entry.year === selectedYear) &&
      (selectedSection === "" || entry.section === selectedSection);
  });
  // Populate the table 
  filteredData.forEach((entry) => {
    const row = timetable.insertRow();
    row.insertCell(0).textContent = entry.year;
    row.insertCell(1).textContent = entry.section;
    row.insertCell(2).textContent = entry.day;
    entry.subjects.forEach((subject) => {
      row.insertCell().textContent = subject;
    });
  });
}
// Function to load timetable on timetable.html 
function loadTimetable() {
  renderTimetable();
}
// Function to download timetable as PDF 
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("College Timetable", 10, 10);
  const table = document.getElementById("timetable");
  if (table) {
    doc.autoTable({ html: table });
    doc.save("timetable.pdf");
  } else {
    alert("No timetable available to download.");
  }
}
// Attach event listener to download button (if it exists) 
if (downloadButton) {
  downloadButton.addEventListener("click", downloadPDF);
}
// Function to clear the entire timetable 
function clearTimetable() {
  if (confirm("Are you sure you want to delete the entire timetable?")) {
    localStorage.removeItem("timetableData"); // Clear localStorage 
    if (timetable) timetable.innerHTML = ""; // Clear the displayed timetable 
  }
}
// Attach event listener to the "Clear Timetable" button (if it exists) 
if (clearButton) {
  clearButton.addEventListener("click", clearTimetable);
}
