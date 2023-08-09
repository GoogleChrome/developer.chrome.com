---
api: printing
---

## Manifest {: #manifest }

All `chrome.printing` methods and events require you to declare the `"printing"` permission in the [extension manifest](/docs/extensions/mv3/manifest/). For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "printing"
  ],
  ...
}
```

## Examples {: #examples }

The examples below demonstrate using each of the methods in the printing namespace. This code is copied from or based on the [api-samples/printing](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/printing) in the extensions-samples Github repo.

### cancelJob()

This example uses the `onJobStatusChanged` handler to hide a 'cancel' button when the `jobStatus` is neither `PENDING` or `IN_PROGRESS`. Note that on some networks or when a Chromebook is connected directly to the printer, these states may pass too quickly for the cancel button to be visible long enough to be called. This is greatly simplified printing example.

```javascript
chrome.printing.onJobStatusChanged.addListener((jobId, status) => {
  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener('click', () => {
    chrome.printing.cancelJob(jobId).then((response) => {
      if (response !== undefined) {
        console.log(response.status);
      }
      if (chrome.runtime.lastError !== undefined) {
        console.log(chrome.runtime.lastError.message);
      }
    });
  });
  if (status !== "PENDING" && status !== "IN_PROGRESS") {
    cancelButton.style.visibility = 'hidden';
  } else {
    cancelButton.style.visibility = 'visible';
  }
}
```

### getPrinters() and getPrinterInfo()

A single example is used for these functions because getting printer information requires a printer ID, which is retrieved by calling `getPrinters()`. This example logs the name and description of the default printer to the console. This is a simplified version of the printing example.

```javascript/0,2
​​const printers = await chrome.printing.getPrinters();
const defaultPrinter = printers.find((printer) => {
  const printerInfo = await chrome.printing.getPrinterInfo(printer.id);
  return printerInfo.isDefault;
}
console.log(`Default printer: ${defaultPrinter.name}.\n\t${defaultPrinter.description}`);
```

### submitJob() {: #submitjob }

The `submitJob()` method requires three things.

* A `ticket` structure specifying which capabilities of the printer are to be used. If the user needs to select from available capabilities, you can retrieve them for a specific printer using `getPrinterInfo()`.
* A `SubmitJobRequest` structure, which specifies the printer to use, and the file or date to print. This structure contains a reference to the `ticket` structure.
* A blob of the file or data to print.

Calling `submitJob()` triggers a dialog box asking the user to confirm printing. Use the [`PrintingAPIExtensionsAllowlist`](https://chromeenterprise.google/policies/#PrintingAPIExtensionsAllowlist") to bypass confirmation.

This is a simplified version of the printing example. Notice that the `ticket` is attached to the `SubmitJobRequest` structure (line 8) and that the data to print is converted to a blob (line 10). Getting the ID of the printer (line 1) is more complicated [in the sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/printing) than is shown here.

```javascript/0,7,9
const defaultPrinter = getDefaultPrinter();
const ticket = getPrinterTicket(defaultPrinter);
const arrayBuffer = getPrintData();
const submitJobRequest = {
  job: {
    printerId: defaultPrinter,
    title: 'test job',
    ticket: ticket,
    contentType: 'application/pdf',
    document: new Blob([new Uint8Array(arrayBuffer)], {
      type: 'application/pdf'
    });
  }
};

chrome.printing.submitJob(submitJobRequest, (response) => {
  if (response !== undefined) {
    console.log(response.status);
  }
  if (chrome.runtime.lastError !== undefined) {
    console.log(chrome.runtime.lastError.message);
  }
});
```

### Roll printing {: #roll-printing }

This example shows how to build a printer ticket for continuous (or roll) printing, which is often used with receipt printing. The `submitJobRequest` object for roll printing is the same as that shown for the [`submitJob()`](#submitjob) example.

If you need to change the default value for paper cutting, use the `vendor_ticket_item` key. (The default varies from printer to printer.) When included, this key needs to be an array with one member: an object whose `id` is `'finishings'`. The value can either be `'trim'` for printers that cut the roll at the end of printing or `'none'` for printers that require the print job to be torn off.

```json/3
var ticket = {
  version: '1.0',
  print: {
    vendor_ticket_item = [{id: 'finishings', value: 'trim'}],
    color: {type: 'STANDARD_MONOCHROME'},
    duplex: {type: 'NO_DUPLEX'},
    page_orientation: {type: 'PORTRAIT'},
    copies: {copies: 1},
    dpi: {horizontal_dpi: 300, vertical_dpi: 300},
    media_size: {
      width_microns: 72320,
      height_microns: 100000
    },
    collate: {collate: false}
  }
};
```

Some printers do not support the `"finishings"` option. To determine if your printer does, call [`getPrinterInfo()`](#method-getPrinterInfo) and look for a `"display_name"` of `"finishings/11"`.

```json/2
"vendor_capability": [
  {
    "display_name": "finishings/11",
    "id": "finishings/11",
    "type": "TYPED_VALUE",
    "typed_value_cap": {
      "value_type": "BOOLEAN"
    }
  },
  ...
]
      ```

The values in a ticket's `media_size` key are specific to each printer. To select an appropriate size call [`getPrinterInfo()`](#method-getPrinterInfo). The returned [`GetPrinterResponse`](#type-GetPrinterInfoResponse) contains an array of supported media sizes at `"media_size"."option"`. Choose an option whose `"is_continuous_feed"` value is true. Use its height and width values for the ticket.

```json/4
"media_size": {
  "option": [
  {
    "custom_display_name": "",
    "is_continuous_feed": true,
    "max_height_microns": 2000000,
    "min_height_microns": 25400,
    "width_microns": 50800
  },
  …
  ]
}
```
