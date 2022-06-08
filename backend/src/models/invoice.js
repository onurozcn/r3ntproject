module.exports = class Invoice {
  constructor(product, payment) {
    this.payment = payment
    this.product = product
  }
}
