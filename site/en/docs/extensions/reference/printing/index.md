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

### submitJob()

The `submitJob()` method requires three things.

* A `ticket` structure specifying which capabilities of the printer are to be used. If the user needs to select from available capabilities, you can retrieve them for a specific printer using `getPrinterInfo()`.
* A `SubmitJobRequest` structure, which specifies the printer to use, and the file or date to print. This structure contains a reference to the `ticket` structure. 
* A blob of the file or data to print.

Calling `submitJob()` triggers a dialog box asking the user to confirm printing. Use the [`PrintingAPIExtensionsAllowlist`](https://chromeenterprise.google/policies/#PrintingAPIExtensionsAllowlist") to bypass confirmation. 

This is a simplified version of the printing example. Notice that the `ticket` is attached to the `SubmitJobRequest` structure (line 8) and that the data to print is converted to a blob (line 10). Getting the ID of the printer (line 1) is more complicated [in the sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/printing)than is shown here. 

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


