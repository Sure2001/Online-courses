import * as XLSX from 'xlsx';  
import { saveAs } from 'file-saver';  
import * as Papa from 'papaparse';  

// CSV Export
export const exportCSV = (filteredBuses) => {
    const csv = Papa.unparse(filteredBuses.map(bus => ({
        BusName: bus.busName,
        From: bus.from,
        To: bus.to,
        DepartureDate: bus.dateOfDeparture,
        ArrivalDate: bus.dateOfArrival,
        DepartureTime: bus.departureTime,
        ArrivalTime: bus.arrivalTime,
        Price: bus.price,
        TotalSeats: bus.Totalseats,
        Status: bus.status ? "Enabled" : "Disabled"
    })));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'buses.csv');
};

// Excel Export
export const exportExcel = (filteredBuses) => {
    const data = filteredBuses.map(bus => ({
        BusName: bus.busName,
        From: bus.from,
        To: bus.to,
        DepartureDate: bus.dateOfDeparture,
        ArrivalDate: bus.dateOfArrival,
        DepartureTime: bus.departureTime,
        ArrivalTime: bus.arrivalTime,
        Price: bus.price,
        TotalSeats: bus.Totalseats,
        Status: bus.status ? "Enabled" : "Disabled"
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Buses');

    XLSX.writeFile(wb, 'buses.xlsx');
};
