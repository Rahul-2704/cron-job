const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const invoices = require("./data/invoice.json");

const archiveInvoicesTask = () => {
  console.log("Running archive invoices task:", new Date());
  try {
    const paidInvoices = invoices.filter(
      (invoice) => invoice.status === "paid"
    );
    if (paidInvoices.length > 0) {
      paidInvoices.forEach((invoice) => {
        invoices.splice(
          invoices.findIndex((e) => e.status === invoice.status),
          1
        );
      });

      console.log('paid invoices are::',invoices);

      fs.writeFileSync(
        path.join(__dirname, "./", "data", "invoice.json"),
        JSON.stringify(invoices),
        "utf-8"
      );

      fs.writeFileSync(
        path.join(__dirname, "./", "data", "archive.json"),
        JSON.stringify(paidInvoices),
        "utf-8"
      );
    }
  } catch (error) {
    console.log("err", error.message);
  }
};

cron.schedule("*/5 * * * * *", archiveInvoicesTask);
