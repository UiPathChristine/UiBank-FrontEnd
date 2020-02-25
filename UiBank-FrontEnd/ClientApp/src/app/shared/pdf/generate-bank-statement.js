// -- Create a base document template for the reports.
const createDocumentDefinition = (reportDate, subHeading, ...contentParts) => {
    const baseDocDefinition = {
        pageSize: 'A4',
        footer: (currentPage, pageCount) => {
            return {
                text: `${reportDate} : Page ${currentPage.toString()} of ${pageCount.toString()}`,
                alignment: 'center',
                fontSize: 7
            }
        },

        styles: {
            title: {
                fontSize: 24
            },
            titleSub: {
                fontSize: 18
            },
            titleDate: {
                fontSize: 14,
                alignment: 'right',
                bold: true
            }
        },

        content: [
            {
                columns: [
                    {text: 'TruePillars Investment Trust', style: 'title', width: '*'},
                    {text: reportDate, style: 'titleDate', width: '160'},
                ]
            },
            {text: `${subHeading}\n\n`, style: 'titleSub'},
        ],
    };
    const docDefinition = JSON.parse(JSON.stringify(baseDocDefinition));
    docDefinition.footer = baseDocDefinition.footer;
    docDefinition.content.push(...contentParts);
    return docDefinition;
};



// -- Make a Loan Note Register report. (This is attached to the button.)
function makeLoanNoteRegisterDoc() {

    // -- Table summary
    const tableSummary = {
        table: {
            widths: ['*', 70],
            body: [
                [{text: reportDate(), bold: true}, tdr(sumCurrentBalance(transformedLNRData), 'white')]
            ]
        }
    };

    // -- Generate the body of the document table, with headings
    const tableBody = (dataRows) => {
        const body = [
            [
                thl('Loan\nNote'),
                thl('\nReference'),
                thr('Interest\nRate'),
                thr('Initial\nPrincipal'),
                thr('Current\nBalance')
            ]
        ]
        dataRows.forEach((row, index) => {
            const tableRow = []
            tableRow.push(tdl(row['loanNote'], index))
            tableRow.push(tdl(row['reference'], index))
            tableRow.push(tdr(row['interestRate'].round(1, 1).toFixed(1).toString(), index))
            tableRow.push(tdr(asMoney(row['initialPrincipal']), index))
            tableRow.push(tdr(asMoney(row['currentBalance']), index))
            body.push(tableRow)
        })
        return body
    }

    // -- The main report table, with the table body.
    const tableData = {
        table: {
            headerRows: 1,
            widths: [50, '*', 70, 70, 70],

            body: tableBody(transformedLNRData),
        }
    };

    const docDefinition = createDocumentDefinition(reportDate(), 'Loan Note Register', tableSummary, ' ', tableData);
    pdfMake.createPdf(docDefinition).download(`loanNoteRegister-${reportDate()}.pdf`)
}



// -- Generate the Underlying Loan Summary report.
function makeUnderlyingLoanSummaryDoc() {

    const fontSize = 6;

    let cumOriginalPrincipal = new Big("0.0");
    let cumCurrentBalance = new Big("0.0");

    // -- Generate the body of the document table, with headings
    const tableBody = (dataRows) => {

        const body = [
            [
                thl('\nUnderlying Borrower', -1, {rowSpan: 2, fontSize: fontSize}),
                thr('Loan Notes', -1, {colSpan: 2, fontSize: fontSize}),
                thr(' '),
                thr('Original\nPrincipal', -1, {rowSpan: 2, fontSize: fontSize}),
                thr('Current\nBalance', -1, {rowSpan: 2, fontSize: fontSize}),
                thr('Borrower\nInterest Rate', -1, {rowSpan: 2, fontSize: fontSize}),
                thr('Term\n(Months)', -1, {rowSpan: 2, fontSize: fontSize}),
                thr('Drawdown\nDate', -1, {rowSpan: 2, fontSize: fontSize}),
                thr('Payments\nMade', -1, {rowSpan: 2, fontSize: fontSize}),
                thl('\nStatus', -1, {rowSpan: 2, fontSize: fontSize})
            ],
            [
                thl(' '),
                thr('first', -1, {fontSize: fontSize}),
                thr('last', -1, {fontSize: fontSize}),
                thr(' '),
                thr(' '),
                thr(' '),
                thr(' '),
                thr(' '),
                thr(' '),
                thr(' '),
            ]
        ];

        dataRows.forEach((row, index) => {
            const tableRow = [];
            tableRow.push(tdl(row['borrowerName'], index, {fontSize: fontSize}));
            tableRow.push(tdr(row['loanNoteFirst'], index, {fontSize: fontSize}));
            tableRow.push(tdr(row['loanNoteLast'], index, {fontSize: fontSize}));
            tableRow.push(tdr(asMoney(row['originalPrincipal']), index, {fontSize: fontSize}));
            tableRow.push(tdr(asMoney(row['currentBalance']), index, {fontSize: fontSize}));
            tableRow.push(tdr(row['borrowerRate'].round(2, 1).toFixed(2).toString(), index, {fontSize: fontSize}));
            tableRow.push(tdr(row['term'], index, {fontSize: fontSize}));
            tableRow.push(tdr(row['drawdown'].format('D MMM YYYY'), index, {fontSize: fontSize}));
            tableRow.push(tdr(row['payments'], index, {fontSize: fontSize}));
            tableRow.push(tdl(row['status'], index, {fontSize: fontSize}));
            body.push(tableRow);

            cumOriginalPrincipal = cumOriginalPrincipal.plus(row['originalPrincipal']);
            cumCurrentBalance = cumCurrentBalance.plus(row['currentBalance']);
        });

        /*  *
        body[1] = [
            tdl(`Total number of loans: ${dataRows.length}`, -1, {colSpan: 2, fillColor: 'black', color: 'white'}),
            tdl(' '),
            tdr(asMoney(cumLoanUnits), -1, {fillColor: 'black', color: 'white'}),
            tdr(asMoney(cumCashUnits), -1, {fillColor: 'black', color: 'white'}),
            tdr(asMoney(cumTotalUnits), -1, {fillColor: 'black', color: 'white'})
        ];
        /*  */
        return body;
    }

    const tableColumnWidths = ['*', 22, 22, 40, 40, 40, 25, 38, 28, 25];

    // -- The main report table, with the table body.
    const tableData = {
        table: {
            headerRows: 2,
            widths: tableColumnWidths,

            body: tableBody(transformedULSData),
        }
    };

    const tableSummaryData = {
        table: {
            headerRows: 0,
            widths: tableColumnWidths,

            body: [
                [
                    thr(`Total number of loans: ${transformedULSData.length}.`, -1, {colSpan: 3, fontSize: fontSize, color: 'white', fillColor: 'black' }),
                    thr(''),
                    thr(''),
                    thr(asMoney(cumOriginalPrincipal), -1, {fontSize: fontSize, color: 'white', fillColor: 'black'}),
                    thr(asMoney(cumCurrentBalance), -1, {fontSize: fontSize, color: 'white', fillColor: 'black'}),
                    thr('', -1, { colSpan: 5, color: 'white', fillColor: 'black' }),
                    thr(''),
                    thr(''),
                    thr(''),
                    thr('')
                ]
            ],
        }
    };

    const docDefinition = createDocumentDefinition(reportDate(), 'Underlying Loan Summary', tableSummaryData, ' ', tableData);
    pdfMake.createPdf(docDefinition).download(`underlyingLoanSummary-${reportDate()}.pdf`);
}



// -- Generate the Member Registry Report
function makeMemberRegisterDoc() {

    // -- Generate the body of the document table, with headings
    const tableBody = (dataRows) => {
        const body = [
            [
                thl(' ', -1, {colSpan: 2}),
                thl(' '),
                thr('Loan Units'),
                thr('Cash Units'),
                thr('Total Units')
            ],
            []
        ];

        let cumLoanUnits = new Big("0.0");
        let cumCashUnits = new Big("0.0");
        let cumTotalUnits = new Big("0.0");

        dataRows.forEach((row, index) => {
            const tableRow = [];
            tableRow.push(tdl(row['memberName'], index));
            tableRow.push(tdl(truncateContent(row['memberEmail']), index));
            tableRow.push(tdr(asMoney(row['loanUnits']), index));
            tableRow.push(tdr(asMoney(row['cashUnits']), index));
            tableRow.push(tdr(asMoney(row['totalUnits']), index));
            body.push(tableRow);

            cumLoanUnits = cumLoanUnits.plus(row['loanUnits']);
            cumCashUnits = cumCashUnits.plus(row['cashUnits']);
            cumTotalUnits = cumTotalUnits.plus(row['totalUnits']);
        });
        body[1] = [
            tdl(`Total for ${dataRows.length} members`, -1, {colSpan: 2, fillColor: 'black', color: 'white'}),
            tdl(' '),
            tdr(asMoney(cumLoanUnits), -1, {fillColor: 'black', color: 'white'}),
            tdr(asMoney(cumCashUnits), -1, {fillColor: 'black', color: 'white'}),
            tdr(asMoney(cumTotalUnits), -1, {fillColor: 'black', color: 'white'})
        ];
        return body;
    }

    // -- The main report table, with the table body.
    const tableData = {
        table: {
            headerRows: 1,
            widths: ['*', 100, 70, 70, 70],

            body: tableBody(transformedMRData),
        }
    };
    const docDefinition = createDocumentDefinition(reportDate(), 'Member Register', tableData);
    pdfMake.createPdf(docDefinition).download(`memberRegister-${reportDate()}.pdf`);
}
