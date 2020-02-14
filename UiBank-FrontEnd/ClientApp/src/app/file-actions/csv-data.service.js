"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CsvDataService = /** @class */ (function () {
    function CsvDataService() {
    }
    CsvDataService.exportToCsv = function (filename, rows) {
        if (!rows || !rows.length) {
            return;
        }
        var separator = ',';
        var keys = Object.keys(rows[0]);
        var csvContent = keys.join(separator) +
            '\n' +
            rows.map(function (row) {
                return keys.map(function (k) {
                    var cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date
                        ? cell.toLocaleString()
                        : cell.toString().replace(/"/g, '""');
                    if (cell.search(/("|,|\n)/g) >= 0) {
                        cell = "\"" + cell + "\"";
                    }
                    return cell;
                }).join(separator);
            }).join('\n');
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        }
        else {
            var link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    return CsvDataService;
}());
exports.CsvDataService = CsvDataService;
//# sourceMappingURL=csv-data.service.js.map