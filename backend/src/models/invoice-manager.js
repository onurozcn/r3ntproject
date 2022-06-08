const eventBus = require('./event-bus')
const Invoice = require('./invoice')

class InvoiceManager {
  constructor() {
    eventBus.on('payment successful', (product, payment) => {
      const invoice = this.issueInvoice(product, payment)

      eventBus.emit('invoice created', invoice)
    })
  }

  issueInvoice(product, payment) {
    return new Invoice(product, payment)
  }
}

module.exports = new InvoiceManager()
