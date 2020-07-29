import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ResizeObserverService } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-add',
  templateUrl: './depot-holding.html',
  styleUrls: ['./depot-holding.css'],
})
export class DepotHoldingComponent {


  locationAutofilled: boolean;
  legalEntityAutofilled: boolean;

  myForm = new FormGroup({
    instrumentId: new FormControl(''),
    legalEntity: new FormControl('')
  });

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData;

  constructor(private http: HttpClient) {
    this.rowData = [{
      accountID: 'DU538',
      recObligType : null,
      availType : 'Unemcumbered',
      instrID : 'BE0000291972',
      instrType : 'ISIN',
      legalEntityUcn : '006987275000',
      acctRehypoFlg : 'Yes',
      srcEventDt : null,
      srcEventID : null,
      bsnssDt : null,
      contractNumber : '10000000249542',
      agrRehypoFlg: null,
      instrIDs : null,
      posLocation : 'EUROC',
      settledQty : 1.62584065E8,
      tradedQty : null,
      legalName : 'TEMPLETON INCOME TRUST - TEMPLETON GLOBAL BOND FUND',
      tPlus0Pos : 3.2516813E8,
      tPlus1Pos : 3.2516813E8,
      tPlus2Pos : 3.2516813E8,
      tPlus3Pos : 3.2516813E8,
      tPlus4Pos : 3.2516813E8,
      tPlus5Pos : 3.2516813E8,
      tPlus6Pos : 3.2516813E8,
      tPlus7Pos : 3.2516813E8,
      maturityDate : '28-03-2028',
      securityType : 'Bond',
      securitySubType : 'Government (Non-US)',
      transferParValue : 3.2516813E8,
      groupID : null,
      action : 'ITF_REHYPO',
      toAccount : null,
      toDepot : null,
      ladderQty : [{
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 1.62584065E8,
          ladderCompIds : [{
            postingEntryId: '16674909/1',
            status : 'Released'
          }]
        }
      },
      {
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 0.0,
          ladderCompIds : null
        }
      },
      {
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 0.0,
          ladderCompIds : null
        }
      },
      {
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 0.0,
          ladderCompIds : null
        }
      },
      {
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 0.0,
          ladderCompIds : null
        }
      },
      {
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 0.0,
          ladderCompIds : null
        }
      },
      {
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 0.0,
          ladderCompIds : null
        }
      },
      {
        settledQty : 3.2516813E8,
        pendingQty : {
          debitQty : 0.0,
          creditQty : 0.0,
          ladderCompIds : null
        }
      }],
      tradeDate : '29-Jul-2020',
      settlementDate : '30-Jul-2020',
      custodian : null,
      masterDepotName: 'EUROCLEAR BRUSSELS',
      issueCountry : 'BE',
      transferTime : 'T+0',
      negativePosition : false,
      legalEntityName : 'TRANSPORTATION-1'
      }];

    this.columnDefs = [
      { headerName: 'Instrument', field: 'instrID', editable: true },
      { headerName: 'Account', field: 'accountID', editable: true },
      { headerName: 'Agreement', field: 'contractName', editable: true },
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

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    //   this.http
    //     .get(
    //       'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
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
}





