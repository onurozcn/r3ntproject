const eventBus = require('./event-bus')

class PaymentProcessor {
  constructor() {
    eventBus.on('pay', ( product) => {
      this.pay(product)
    })
  }

  pay( product) {
    // if (balance < product.price) {
    //   return eventBus.emit('insufficient funds')
    // }

    eventBus.emit('payment successful', product, product.price)
  }
}

module.exports = new PaymentProcessor()
