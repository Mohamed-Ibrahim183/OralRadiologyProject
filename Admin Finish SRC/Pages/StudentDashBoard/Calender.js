import React from 'react';

const Calendarr = ({ year, month }) => {
  // Create a new date object for the first day of the given month and year
  const firstDay = new Date(year, month - 1, 1);

  // Find out the day of the week of the first day of the month
  const startingDayOfWeek = firstDay.getDay();

  // Get the number of days in the month
  const daysInMonth = new Date(year, month, 0).getDate();

  // Generate an array for the empty slots before the first day of the month
  const emptySlots = Array.from({ length: startingDayOfWeek }, (_, index) => (
    <td key={`empty-${index}`} className="calendar-day empty"></td>
  ));

  // Generate an array for the actual days of the month
  const days = Array.from({ length: daysInMonth }, (_, index) => (
    <td key={index} className="calendar-day">
      {index + 1}
    </td>
  ));

  // Combine the empty slots and the actual days to form the full calendar grid
  const totalSlots = [...emptySlots, ...days];

  // Break the total slots into rows for the weeks
  const rows = [];
  for (let i = 0; i < totalSlots.length; i += 7) {
    const weekRow = totalSlots.slice(i, i + 7);
    rows.push(
      <tr key={`week-${i / 7}`}>{weekRow}</tr>
    );
  }

  return (
    <div className="calendar-container">
      <table className="calendar">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      {/* Inline CSS for simplicity, you may want to move this to a CSS file */}
      <style jsx>{`
        .calendar-container {
          max-width: 100%;
          overflow-x: auto;
          white-space: nowrap;
        }
        .calendar {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .calendar th, .calendar td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        .calendar th {
          background-color: #f0f0f0;
        }
        .calendar td.empty {
          background-color: #fff;
          border: none;
        }
        .calendar-day {
          cursor: pointer;
        }
        .calendar-day:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default Calendarr;
