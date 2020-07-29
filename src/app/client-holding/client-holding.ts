import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ResizeObserverService } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-account',
  templateUrl: './client-holding.html',
  styleUrls: ['./client-holding.css'],
})
export class ClientHoldingComponent {

  constructor(private http: HttpClient) {
    this.rowData = [
      {
        accountID: 'VY199',
        recObligType: null,
        availType: 'Rehypothecated',
        instrID: 'CA013051DK06',
        instrType: 'ISIN',
        legalEntityUcn: '006987275000',
        acctRehypoFlg: 'Yes',
        srcEventDt: null,
        srcEventID: null,
        bsnssDt: null,
        contractNumber: '9000000047421',
        agrRehypoFlg: null,
        instrIDs: null,
        posLocation: 'REH02',
        settledQty: 2.827E7,
        tradedQty: null,
        legalName: '12345',
        tPlus0Pos: 2.827E7,
        tPlus1Pos: 2.827E7,
        tPlus2Pos: 2.827E7,
        tPlus3Pos: 2.827E7,
        tPlus4Pos: 2.827E7,
        tPlus5Pos: 2.827E7,
        tPlus6Pos: 2.827E7,
        tPlus7Pos: 2.827E7,
        maturityDate: '01-12-2043',
        securityType: 'Bond',
        securitySubType: 'Local Authority',
        transferParValue: 2.827E7,
        groupID: null,
        action: 'ITF_REHYPO',
        toAccount: null,
        toDepot: null,
        ladderQty: [
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          },
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          },
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          },
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          },
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          },
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          },
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          },
          {
            settledQty: 2.827E7,
            pendingQty: {
              debitQty: 0.0,
              creditQty: 0.0,
              ladderCompIds: null,

            }
          }
        ],
        tradeDate: '29-Jul-2020',
        settlementDate: '30-Jul-2020',
        custodian: null,
        masterDepotName: 'COLLATERAL PLEDGED ACCOUNT',
        issueCountry: 'CA',
        transferTime: null,
        legalEntityName: 'TRANSPORTATION-1',
        negativePosition: false
      }
    ];

    this.columnDefs = [
      { headerName: 'Instrument', field: 'instrID', editable: true },
      { headerName: 'Account', field: 'accountID', editable: true },
      { headerName: 'Agreement', field: 'contractName', editable: true, comparator: this.numericSort },
      { headerName: 'Counterparty Legal Name', field: 'legalName', width: 400, editable: true },
      { headerName: 'Rehypo Flag', field: 'acctRehypoFlg', editable: true },
      { headerName: 'Location', field: 'posLocation', editable: true, tooltipField: 'masterDepotName' },
      {
        headerName: 'Availability Type', field: 'availType', editable: true,
        /*cellStyle(params) {
          let color: availTypeColor (params.value);
          return { backgroundColor: color };
        }*/

      },
      {
        headerName: 'Maturity Date',
        field: 'maturityDate',
        editable: false,
        comparator: this.sortDate,
        filter: 'agDateColumnFilter',
        /*filterParams: {
          comparator: this.compareDate
        }*/
      },
      { headerName: 'Security Type', field: 'securityType', editable: false },
      { headerName: 'Security subType', field: 'securitySubType', editable: false },
      { headerName: 'Holdings', field: 'settledQty', cellStyle: { 'text-align': 'left' }, editable: true },
      { headerName: ' T Position', valueGetter: 'data.ladderQty["0"].settledQty', cellStyle: { 'text-align': 'left' }
      , editable: true },
      { headerName: 'T+1 Position', field: 'tPlus1Pos',  cellStyle: { 'text-align': 'left' }, editable: true },
      { headerName: 'T+2 Position', field: 'tPlus2Pos',  cellStyle: { 'text-align': 'left' }, editable: true },
      { headerName: 'T+3 Position', field: 'tPlus3Pos', cellStyle: { 'text-align': 'left' }, editable: true },
      { headerName: 'T+4 Position', field: 'tPlus4Pos',  cellStyle: { 'text-align': 'left' }, editable: true },
      { headerName: 'T+5 Position', field: 'tPlus5Pos',  cellStyle: { 'text-align': 'left' }, editable: true },
      { headerName: 'T+6 Position', field: 'tPlus6Pos',  cellStyle: { 'text-align': 'left' }, editable: true },
      { headerName: 'T+7 Position', field: 'tPlus7Pos',  cellStyle: { 'text-align': 'left' }, editable: true },

    ];

    this.defaultColDef = {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      suppressSizeToFit: false
    };
  }


  accountIdAutofilled: boolean;
  legalEntityAutofilled: boolean;

  myForm = new FormGroup({
    accountId: new FormControl(''),
    legalEntity: new FormControl('')
  });

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData;

   dates = {
    dateComparator(date1, date2) {
      const date1Number = this.monthToComparableNumber(date1);
      const date2Number = this.monthToComparableNumber(date2);
      if (date1Number === null && date2Number === null) {
        return 0;
      }
      if (date1Number === null) {
        return -1;
      }
      if (date2Number === null) {
        return 1;
      }
      return date1Number - date2Number;

    },

    monthToComparableNumber(date) {
      if (date === undefined || date === null || date.length !== 10) {
        return null;
      }
      const yearNumber = date.substring(6, 10);
      const monthNumber = date.substring(3, 5);
      const dayNumber = date.substring(0, 2);
      const result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
      return result;
    }
  };

   // tslint:disable-next-line:only-arrow-functions
   accountingCellRenderer = function(params) {
    if (params.value >= 0) {
      return params.value.toLocaleString();
    } else {
      return '(' + Math.abs(params.value).toLocaleString() + ')';
    }
  };

  cellRenderer = function(params) {
    const that = this;
    const link = document.createElement('a');
    link.href = '#';
    if (params.value >= 0) {
      link.innerText = params.value.toLocaleString();
    } else {
      link.innerText = '(' + Math.abs(params.value).toLocaleString() + ')';
    }
    link.addEventListener('click', (e) => {
      e.preventDefault();
      that.handleClick(params);
    });
    return link;
  };

  numericSort(valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
  }

/*function availTypeColor(val) {
    if (val === 'Encumbered') {
      return '#ffaaaa';
    } else if (val === 'Unencumbered') {
      return '#aaffaa';
    } else {
      return '#aaaaff';
    }
  }*/


sortDate(date1, date2, nodeA, nodeB, isInverted) {
    return this.dates.dateComparator(date1, date2);
  }



onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    //   this.http
    //     .get(
    //       'https://position.json'
    //     )
    //     .subscribe(data => {
    //       console.log(data)
    //       this.rowData = data;
    //     });
    // }

  }

abc() {
    alert('hello');
  }


sizeToFit() {
  this.gridApi.sizeColumnsToFit();
}



}




