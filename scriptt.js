// Select the form and timetable elements 
const form = document.getElementById('timetableForm');
const timetable =
    document.getElementById('timetable').getElementsByTagName('tbody')[0];
// Load saved timetable data from localStorage 
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes("timetable.html")) {
        loadTimetable();
    }
});
// Handle form submission 
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // Get values from the form 
        const dayIndex = document.getElementById('day').value;
        const subjects = [
            document.getElementById('subject1').value,
            document.getElementById('subject2').value,
            document.getElementById('subject3').value,
            document.getElementById('subject4').value,
            document.getElementById('subject5').value
        ];
        // Convert day index to Roman numerals (I to VI) 
        const days = ["I", "II", "III", "IV", "V", "VI"];
        const day = days[parseInt(dayIndex) - 1];
        // Get saved timetable from localStorage or create a new one 
        let timetableData = JSON.parse(localStorage.getItem("timetableData")) || [];
        // Add new entry 
        timetableData.push({ day, subjects });
        // Save updated timetable to localStorage 
        localStorage.setItem("timetableData", JSON.stringify(timetableData));
        // Clear the form inputs 
        form.reset();
    });
}
// Function to load timetable on timetable.html 
function loadTimetable() {
    const savedTimetable = JSON.parse(localStorage.getItem("timetableData"))
        || [];
    const tableBody =
        document.getElementById('timetable').getElementsByTagName('tbody')[0];
    savedTimetable.forEach(entry => {
        const row = tableBody.insertRow();
        const cellDay = row.insertCell(0);
        cellDay.textContent = entry.day;
        entry.subjects.forEach(subject => {
            const cell = row.insertCell();
            cell.textContent = subject;
        });
    });
}
// Function to download timetable as PDF 
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("College Timetable", 10, 10);
    const table = document.getElementById('timetable');
    doc.autoTable({ html: table });
    doc.save("timetable.pdf");
}
